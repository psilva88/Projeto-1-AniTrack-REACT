import { createContext, useState, useContext } from "react";

export const AnimeContext = createContext();

const hoje = new Date().toLocaleDateString("pt-BR");

const animesIniciais = [
  {
    id: 1, nome: "Attack on Titan", totalEps: 87, assistidos: 87,
    favorito: true, status: "Finalizado",
    capa: "https://cdn.myanimelist.net/images/anime/10/47347.jpg",
  },
  {
    id: 2, nome: "Demon Slayer", totalEps: 44, assistidos: 26,
    favorito: true, status: "Assistindo",
    capa: "https://cdn.myanimelist.net/images/anime/1286/99889.jpg",
  },
  {
    id: 3, nome: "Jujutsu Kaisen", totalEps: 48, assistidos: 12,
    favorito: false, status: "Assistindo",
    capa: "https://cdn.myanimelist.net/images/anime/1171/109222.jpg",
  },
  {
    id: 4, nome: "Spy x Family", totalEps: 25, assistidos: 25,
    favorito: false, status: "Finalizado",
    capa: "https://cdn.myanimelist.net/images/anime/1441/122795.jpg",
  },
  {
    id: 5, nome: "Vinland Saga", totalEps: 48, assistidos: 0,
    favorito: false, status: "Pausado",
    capa: "https://cdn.myanimelist.net/images/anime/1500/103005.jpg",
  },
];

const historicoInicial = [
  { id: 1, acao: "Adicionou", anime: "Attack on Titan", data: "10/05/2025" },
  { id: 2, acao: "Finalizou", anime: "Demon Slayer (Season 1)", data: "08/05/2025" },
  { id: 3, acao: "Favoritou", anime: "Jujutsu Kaisen", data: "05/05/2025" },
  { id: 4, acao: "Adicionou", anime: "Spy x Family", data: "01/05/2025" },
  { id: 5, acao: "Finalizou", anime: "Death Note", data: "25/04/2025" },
];

export function AnimeProvider({ children }) {
  const [animes, setAnimes] = useState(animesIniciais);
  const [historico, setHistorico] = useState(historicoInicial);

  function addHistorico(acao, anime) {
    setHistorico((prev) => [{ id: Date.now(), acao, anime, data: hoje }, ...prev]);
  }

  function addAnime(novo) {
    setAnimes((prev) => [novo, ...prev]);
    addHistorico("Adicionou", novo.nome);
  }

  function removeAnime(id) {
    setAnimes((prev) => prev.filter((a) => a.id !== id));
  }

  function toggleFavorito(id) {
    setAnimes((prev) =>
      prev.map((a) => {
        if (a.id === id) {
          if (!a.favorito) addHistorico("Favoritou", a.nome);
          return { ...a, favorito: !a.favorito };
        }
        return a;
      })
    );
  }

  // Atualiza episódios assistidos com limite 0 de totalEps
  function updateEpisodios(id, delta) {
    setAnimes((prev) =>
      prev.map((a) => {
        if (a.id !== id) return a;
        const novoVal = Math.min(Math.max(0, a.assistidos + delta), a.totalEps);
        // Se chegou ao total, muda status para Finalizado automaticamente
        const novoStatus = novoVal === a.totalEps && a.totalEps > 0 ? "Finalizado" : a.status;
        if (novoVal === a.totalEps && a.totalEps > 0 && a.status !== "Finalizado") {
          addHistorico("Finalizou", a.nome);
        }
        return { ...a, assistidos: novoVal, status: novoStatus };
      })
    );
  }


  // Editar todos os campos de um anime existente
  function updateAnime(id, dados) {
    setAnimes((prev) =>
      prev.map((a) => (a.id === id ? { ...a, ...dados } : a))
    );
    addHistorico("Editou", dados.nome || "anime");
  }

  const stats = {
    total: animes.length,
    episodiosAssistidos: animes.reduce((s, a) => s + a.assistidos, 0),
    finalizados: animes.filter((a) => a.status === "Finalizado").length,
    favoritos: animes.filter((a) => a.favorito).length,
  };

  return (
    <AnimeContext.Provider value={{ animes, historico, stats, addAnime, removeAnime, toggleFavorito, updateEpisodios, updateAnime }}>
      {children}
    </AnimeContext.Provider>
  );
}

export function useAnime() {
  return useContext(AnimeContext);
}
