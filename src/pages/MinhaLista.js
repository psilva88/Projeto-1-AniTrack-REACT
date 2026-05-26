import { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { useAnime } from "../context/AnimeContext";
import { useResponsive } from "../hooks/useResponsive";

const FILTROS = [
  { key: "Todos", label: "Todos" },
  { key: "Assistindo", label: "Assistindo" },
  { key: "Pausado", label: "Pausado" },
  { key: "Finalizado", label: "Finalizado" },
  { key: "Favoritos", label: "Favoritos" },
];

// Ícones
const StarIcon = ({ filled }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill={filled ? "#f59e0b" : "none"} stroke={filled ? "#f59e0b" : "#475569"} strokeWidth="2">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
);
const TrashIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
    <path d="M10 11v6M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
  </svg>
);
const PlusIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
  </svg>
);
const EditIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
  </svg>
);
const CheckIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);
const XSmallIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);
const ListIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/>
    <line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/>
    <line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>
  </svg>
);
const GridIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
    <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
  </svg>
);
const ImgIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/>
    <polyline points="21 15 16 10 5 21"/>
  </svg>
);

// Modal de edição
function EditModal({ anime, onSave, onCancel, theme, font, fontDisplay }) {
  const [form, setForm] = useState({
    nome: anime.nome,
    totalEps: String(anime.totalEps),
    assistidos: String(anime.assistidos),
    status: anime.status,
    capa: anime.capa || "",
  });
  const [erros, setErros] = useState({});

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    if (erros[name]) setErros((p) => ({ ...p, [name]: "" }));
  }

  function validar() {
    const e = {};
    if (!form.nome.trim()) e.nome = "Nome obrigatório.";
    if (!form.totalEps || Number(form.totalEps) <= 0) e.totalEps = "Valor inválido.";
    if (form.assistidos === "" || Number(form.assistidos) < 0) e.assistidos = "Valor inválido.";
    if (Number(form.assistidos) > Number(form.totalEps)) e.assistidos = "Maior que o total.";
    return e;
  }

  function handleSave() {
    const novosErros = validar();
    if (Object.keys(novosErros).length > 0) { setErros(novosErros); return; }
    onSave({
      nome: form.nome.trim(),
      totalEps: Number(form.totalEps),
      assistidos: Number(form.assistidos),
      status: form.status,
      capa: form.capa.trim(),
    });
  }

  const input = (hasError) => ({
    width: "100%", padding: "9px 12px", borderRadius: "8px",
    border: `1.5px solid ${hasError ? "#ef4444" : theme.inputBorder}`,
    background: theme.inputBg, color: theme.text,
    fontSize: "14px", fontFamily: font, outline: "none", boxSizing: "border-box",
  });
  const lbl = { color: theme.textMuted, fontSize: "11px", fontWeight: "600", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "5px", display: "block", fontFamily: font };

  return (
    // Overlay
    <div
      style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", zIndex: 500, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}
      onClick={onCancel}
    >
      {/* Card do modal */}
      <div
        style={{ background: theme.bgCard, border: `1px solid ${theme.border}`, borderRadius: "16px", padding: "28px", width: "100%", maxWidth: "480px", position: "relative" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
          <h3 style={{ color: theme.text, fontSize: "17px", fontWeight: "700", fontFamily: fontDisplay }}>Editar anime</h3>
          <button onClick={onCancel} style={{ background: "none", border: "none", cursor: "pointer", color: theme.textMuted, display: "flex", padding: "2px" }}>
            <XSmallIcon />
          </button>
        </div>

        {/* Preview da capa */}
        {form.capa && (
          <div style={{ marginBottom: "16px", display: "flex", gap: "12px", alignItems: "center" }}>
            <img src={form.capa} alt="preview" style={{ width: "50px", height: "70px", borderRadius: "6px", objectFit: "cover" }} onError={(e) => { e.target.style.display = "none"; }} />
            <span style={{ color: theme.textMuted, fontSize: "12px", fontFamily: font }}>Preview da capa atual</span>
          </div>
        )}

        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          {/* Nome */}
          <div>
            <label style={lbl}>Nome do anime</label>
            <input style={input(!!erros.nome)} name="nome" value={form.nome} onChange={handleChange} />
            {erros.nome && <p style={{ color: "#ef4444", fontSize: "11px", marginTop: "4px" }}>{erros.nome}</p>}
          </div>

          {/* Episódios */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
            <div>
              <label style={lbl}>Total de eps</label>
              <input style={input(!!erros.totalEps)} name="totalEps" type="number" min="1" value={form.totalEps} onChange={handleChange} />
              {erros.totalEps && <p style={{ color: "#ef4444", fontSize: "11px", marginTop: "4px" }}>{erros.totalEps}</p>}
            </div>
            <div>
              <label style={lbl}>Assistidos</label>
              <input style={input(!!erros.assistidos)} name="assistidos" type="number" min="0" value={form.assistidos} onChange={handleChange} />
              {erros.assistidos && <p style={{ color: "#ef4444", fontSize: "11px", marginTop: "4px" }}>{erros.assistidos}</p>}
            </div>
          </div>

          {/* Status */}
          <div>
            <label style={lbl}>Status</label>
            <select style={input(false)} name="status" value={form.status} onChange={handleChange}>
              <option value="Assistindo">Assistindo</option>
              <option value="Pausado">Pausado</option>
              <option value="Finalizado">Finalizado</option>
            </select>
          </div>

          {/* URL da capa */}
          <div>
            <label style={lbl}>URL da capa</label>
            <input style={input(false)} name="capa" value={form.capa} onChange={handleChange} placeholder="https://..." />
          </div>
        </div>

        {/* Botões */}
        <div style={{ display: "flex", gap: "10px", marginTop: "22px" }}>
          <button onClick={onCancel} style={{ flex: 1, padding: "11px", borderRadius: "8px", border: `1px solid ${theme.border}`, background: "transparent", color: theme.text, fontSize: "14px", fontWeight: "500", fontFamily: font, cursor: "pointer" }}>
            Cancelar
          </button>
          <button onClick={handleSave} style={{ flex: 1, padding: "11px", borderRadius: "8px", border: "none", background: "#7c3aed", color: "#fff", fontSize: "14px", fontWeight: "600", fontFamily: font, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" }}>
            <CheckIcon /> Salvar alterações
          </button>
        </div>
      </div>
    </div>
  );
}

// Componente principal
function MinhaLista() {
  const { theme } = useTheme();
  const { animes, addAnime, removeAnime, toggleFavorito, updateEpisodios, updateAnime } = useAnime();
  const { isMobile } = useResponsive();

  const [filtro, setFiltro] = useState("Todos");
  const [visualizacao, setVisualizacao] = useState("lista");
  const [editandoId, setEditandoId] = useState(null);
  const [form, setForm] = useState({ nome: "", totalEps: "", assistidos: "", status: "Assistindo", capa: "" });
  const [erros, setErros] = useState({});

  const font = "'Inter', sans-serif";
  const fontDisplay = "'Plus Jakarta Sans', sans-serif";

  const animeEditando = animes.find((a) => a.id === editandoId);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    if (erros[name]) setErros((p) => ({ ...p, [name]: "" }));
  }

  function validar() {
    const e = {};
    if (!form.nome.trim()) e.nome = "Nome obrigatório.";
    if (!form.totalEps || Number(form.totalEps) <= 0) e.totalEps = "Valor inválido.";
    if (form.assistidos === "" || Number(form.assistidos) < 0) e.assistidos = "Valor inválido.";
    if (Number(form.assistidos) > Number(form.totalEps)) e.assistidos = "Maior que o total.";
    return e;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const novosErros = validar();
    if (Object.keys(novosErros).length > 0) { setErros(novosErros); return; }
    addAnime({ id: Date.now(), nome: form.nome.trim(), totalEps: Number(form.totalEps), assistidos: Number(form.assistidos), favorito: false, status: form.status, capa: form.capa.trim() });
    setForm({ nome: "", totalEps: "", assistidos: "", status: "Assistindo", capa: "" });
    setErros({});
  }

  function handleSaveEdit(dados) {
    updateAnime(editandoId, dados);
    setEditandoId(null);
  }

  const listaFiltrada =
    filtro === "Todos" ? animes
    : filtro === "Favoritos" ? animes.filter((a) => a.favorito)
    : animes.filter((a) => a.status === filtro);

  const statusColor = (s) => {
    if (s === "Finalizado") return { bg: theme.success, text: theme.successText };
    if (s === "Assistindo") return { bg: theme.info, text: theme.infoText };
    if (s === "Pausado") return { bg: theme.warning, text: theme.warningText };
    return { bg: theme.tagBg, text: theme.tagText };
  };

  const card = { background: theme.bgCard, border: `1px solid ${theme.border}`, borderRadius: "14px", padding: isMobile ? "18px 16px" : "24px", marginBottom: "18px" };
  const input = { width: "100%", padding: "10px 13px", borderRadius: "8px", border: `1px solid ${theme.inputBorder}`, background: theme.inputBg, color: theme.text, fontSize: "14px", fontFamily: font, outline: "none", boxSizing: "border-box" };
  const lbl = { color: theme.textMuted, fontSize: "11px", fontWeight: "600", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "6px", display: "block", fontFamily: font };
  const viewBtn = (active) => ({ display: "flex", alignItems: "center", gap: "6px", padding: "7px 14px", borderRadius: "8px", border: "none", cursor: "pointer", fontSize: "13px", fontWeight: active ? "600" : "400", fontFamily: font, background: active ? "#7c3aed" : theme.tagBg, color: active ? "#fff" : theme.tagText });
  const epBtn = (disabled) => ({ width: "28px", height: "28px", borderRadius: "6px", border: `1px solid ${theme.border}`, background: disabled ? theme.tagBg : theme.inputBg, color: disabled ? theme.textMuted : theme.text, cursor: disabled ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px", fontWeight: "600", flexShrink: 0 });

  // ── Vista lista ──
  function AnimeRow({ anime }) {
    const pct = anime.totalEps > 0 ? Math.round((anime.assistidos / anime.totalEps) * 100) : 0;
    const sc = statusColor(anime.status);
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 0", borderBottom: `1px solid ${theme.border}`, gap: "10px", flexWrap: isMobile ? "wrap" : "nowrap" }}>
        {anime.capa ? (
          <img src={anime.capa} alt={anime.nome} style={{ width: "36px", height: "50px", borderRadius: "5px", objectFit: "cover", flexShrink: 0 }} onError={(e) => { e.target.style.display = "none"; }} />
        ) : (
          <div style={{ width: "36px", height: "50px", borderRadius: "5px", background: theme.tagBg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, opacity: 0.5 }}><ImgIcon /></div>
        )}
        <div style={{ flex: 1, minWidth: isMobile ? "100%" : "120px" }}>
          <p style={{ color: theme.text, fontWeight: "600", fontSize: "14px", fontFamily: fontDisplay }}>{anime.nome}</p>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "6px" }}>
            <button style={epBtn(anime.assistidos <= 0)} onClick={() => updateEpisodios(anime.id, -1)} disabled={anime.assistidos <= 0}>−</button>
            <span style={{ color: theme.textMuted, fontSize: "12px", fontFamily: font, minWidth: "80px", textAlign: "center" }}>{anime.assistidos}/{anime.totalEps} eps · {pct}%</span>
            <button style={epBtn(anime.assistidos >= anime.totalEps)} onClick={() => updateEpisodios(anime.id, 1)} disabled={anime.assistidos >= anime.totalEps}>+</button>
          </div>
          <div style={{ width: "110px", height: "3px", background: theme.border, borderRadius: "2px", overflow: "hidden", marginTop: "6px" }}>
            <div style={{ height: "100%", width: `${pct}%`, background: pct === 100 ? "#10b981" : "#7c3aed", borderRadius: "2px" }} />
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 }}>
          <button style={{ background: "none", border: "none", cursor: "pointer", display: "flex", padding: "2px" }} onClick={() => toggleFavorito(anime.id)}><StarIcon filled={anime.favorito} /></button>
          <span style={{ fontSize: "11px", padding: "3px 10px", borderRadius: "20px", fontWeight: "600", fontFamily: font, background: sc.bg, color: sc.text, whiteSpace: "nowrap" }}>{anime.status}</span>
          <button
            onClick={() => setEditandoId(anime.id)}
            style={{ display: "inline-flex", alignItems: "center", gap: "4px", background: theme.accentLight, color: theme.accentText, border: "none", borderRadius: "7px", padding: "6px 10px", cursor: "pointer", fontSize: "12px", fontWeight: "600", fontFamily: font }}
          >
            <EditIcon /> Editar
          </button>
          <button style={{ display: "inline-flex", alignItems: "center", gap: "4px", background: theme.danger, color: theme.dangerText, border: "none", borderRadius: "7px", padding: "6px 10px", cursor: "pointer", fontSize: "12px", fontWeight: "600", fontFamily: font }} onClick={() => removeAnime(anime.id)}>
            <TrashIcon /> Remover
          </button>
        </div>
      </div>
    );
  }

  // ── Vista grade ──
  function AnimeCard({ anime }) {
    const pct = anime.totalEps > 0 ? Math.round((anime.assistidos / anime.totalEps) * 100) : 0;
    const sc = statusColor(anime.status);
    return (
      <div style={{ background: theme.bgCard, border: `1px solid ${theme.border}`, borderRadius: "14px", overflow: "hidden", display: "flex", flexDirection: "column" }}>
        <div style={{ position: "relative", height: "280px", background: theme.tagBg, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
          {anime.capa ? (
            <img src={anime.capa} alt={anime.nome} style={{ width: "100%", height: "100%", objectFit: "cover" }} onError={(e) => { e.target.style.opacity = "0"; }} />
          ) : (
            <div style={{ opacity: 0.4, display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}><ImgIcon /><span style={{ color: theme.textMuted, fontSize: "11px", fontFamily: font }}>Sem capa</span></div>
          )}
          <span style={{ position: "absolute", top: "8px", right: "8px", fontSize: "10px", padding: "3px 8px", borderRadius: "20px", fontWeight: "600", fontFamily: font, background: sc.bg, color: sc.text }}>{anime.status}</span>
          <button style={{ position: "absolute", top: "6px", left: "6px", background: "rgba(0,0,0,0.5)", border: "none", borderRadius: "50%", width: "28px", height: "28px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }} onClick={() => toggleFavorito(anime.id)}>
            <StarIcon filled={anime.favorito} />
          </button>
          {/* Botão editar */}
          <button
            onClick={() => setEditandoId(anime.id)}
            style={{ position: "absolute", bottom: "8px", right: "8px", background: "rgba(124,58,237,0.85)", border: "none", borderRadius: "7px", padding: "5px 9px", cursor: "pointer", display: "flex", alignItems: "center", gap: "4px", color: "#fff", fontSize: "11px", fontWeight: "600", fontFamily: font }}
          >
            <EditIcon /> Editar
          </button>
        </div>
        <div style={{ padding: "14px", flex: 1, display: "flex", flexDirection: "column", gap: "10px" }}>
          <p style={{ color: theme.text, fontWeight: "700", fontSize: "14px", fontFamily: fontDisplay, lineHeight: "1.3" }}>{anime.nome}</p>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <button style={epBtn(anime.assistidos <= 0)} onClick={() => updateEpisodios(anime.id, -1)} disabled={anime.assistidos <= 0}>−</button>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                <span style={{ color: theme.textMuted, fontSize: "11px", fontFamily: font }}>{anime.assistidos}/{anime.totalEps} eps</span>
                <span style={{ color: theme.textMuted, fontSize: "11px", fontFamily: font }}>{pct}%</span>
              </div>
              <div style={{ height: "3px", background: theme.border, borderRadius: "2px", overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${pct}%`, background: pct === 100 ? "#10b981" : "#7c3aed", borderRadius: "2px" }} />
              </div>
            </div>
            <button style={epBtn(anime.assistidos >= anime.totalEps)} onClick={() => updateEpisodios(anime.id, 1)} disabled={anime.assistidos >= anime.totalEps}>+</button>
          </div>
          <button style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "5px", background: theme.danger, color: theme.dangerText, border: "none", borderRadius: "7px", padding: "6px", cursor: "pointer", fontSize: "12px", fontWeight: "600", fontFamily: font, marginTop: "auto" }} onClick={() => removeAnime(anime.id)}>
            <TrashIcon /> Remover
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Modal de edição */}
      {editandoId && animeEditando && (
        <EditModal
          anime={animeEditando}
          onSave={handleSaveEdit}
          onCancel={() => setEditandoId(null)}
          theme={theme}
          font={font}
          fontDisplay={fontDisplay}
        />
      )}

      <h2 style={{ color: theme.text, fontSize: isMobile ? "20px" : "22px", fontWeight: "700", fontFamily: fontDisplay, marginBottom: "4px" }}>Minha Lista</h2>
      <p style={{ color: theme.textMuted, fontSize: "14px", fontFamily: font, marginBottom: "20px" }}>Gerencie seus animes, episódios e favoritos.</p>

      {/* Formulário */}
      <div style={card}>
        <p style={{ color: theme.text, fontSize: "14px", fontWeight: "600", fontFamily: font, marginBottom: "16px" }}>Adicionar novo anime</p>
        <form onSubmit={handleSubmit}>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 150px", gap: "12px", marginBottom: "12px" }}>
            <div>
              <label style={lbl}>Nome do anime *</label>
              <input style={input} name="nome" value={form.nome} onChange={handleChange} placeholder="Ex: Naruto Shippuden" />
              {erros.nome && <p style={{ color: "#ef4444", fontSize: "11px", marginTop: "4px" }}>{erros.nome}</p>}
            </div>
            <div>
              <label style={lbl}>Status</label>
              <select style={input} name="status" value={form.status} onChange={handleChange}>
                <option value="Assistindo">Assistindo</option>
                <option value="Pausado">Pausado</option>
                <option value="Finalizado">Finalizado</option>
              </select>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "110px 110px 1fr", gap: "12px" }}>
            <div>
              <label style={lbl}>Total eps *</label>
              <input style={input} name="totalEps" type="number" min="1" value={form.totalEps} onChange={handleChange} placeholder="220" />
              {erros.totalEps && <p style={{ color: "#ef4444", fontSize: "11px", marginTop: "4px" }}>{erros.totalEps}</p>}
            </div>
            <div>
              <label style={lbl}>Assistidos *</label>
              <input style={input} name="assistidos" type="number" min="0" value={form.assistidos} onChange={handleChange} placeholder="0" />
              {erros.assistidos && <p style={{ color: "#ef4444", fontSize: "11px", marginTop: "4px" }}>{erros.assistidos}</p>}
            </div>
            <div style={isMobile ? { gridColumn: "1 / -1" } : {}}>
              <label style={lbl}>URL da capa (opcional)</label>
              <input style={input} name="capa" value={form.capa} onChange={handleChange} placeholder="https://..." />
            </div>
          </div>
          <button type="submit" style={{ display: "inline-flex", alignItems: "center", gap: "7px", background: "#7c3aed", color: "#fff", border: "none", padding: "10px 22px", borderRadius: "8px", cursor: "pointer", fontWeight: "600", fontSize: "14px", fontFamily: font, marginTop: "16px", width: isMobile ? "100%" : "auto", justifyContent: "center" }}>
            <PlusIcon /> Adicionar à lista
          </button>
        </form>
      </div>

      {/* Lista */}
      <div style={card}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px", flexWrap: "wrap", gap: "10px" }}>
          <p style={{ color: theme.text, fontSize: "14px", fontWeight: "600", fontFamily: font }}>
            Meus Animes{" "}
            <span style={{ color: theme.textMuted, fontWeight: "400" }}>({listaFiltrada.length} título{listaFiltrada.length !== 1 ? "s" : ""})</span>
          </p>
          <div style={{ display: "flex", gap: "4px", background: theme.inputBg, padding: "3px", borderRadius: "10px", border: `1px solid ${theme.border}` }}>
            <button style={viewBtn(visualizacao === "lista")} onClick={() => setVisualizacao("lista")}><ListIcon /> {!isMobile && "Lista"}</button>
            <button style={viewBtn(visualizacao === "grade")} onClick={() => setVisualizacao("grade")}><GridIcon /> {!isMobile && "Grade"}</button>
          </div>
        </div>

        <div style={{ display: "flex", gap: "6px", marginBottom: "18px", flexWrap: "wrap" }}>
          {FILTROS.map(({ key, label }) => (
            <button key={key} onClick={() => setFiltro(key)} style={{ padding: "6px 14px", borderRadius: "20px", border: "none", cursor: "pointer", fontSize: "13px", fontWeight: filtro === key ? "600" : "400", fontFamily: font, background: filtro === key ? (key === "Favoritos" ? "#92400e" : "#7c3aed") : theme.tagBg, color: filtro === key ? "#fff" : theme.tagText, display: "flex", alignItems: "center", gap: "4px" }}>
              {key === "Favoritos" && <svg width="11" height="11" viewBox="0 0 24 24" fill={filtro === key ? "#fff" : "#f59e0b"} stroke={filtro === key ? "#fff" : "#f59e0b"} strokeWidth="1.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>}
              {label}
            </button>
          ))}
        </div>

        {listaFiltrada.length === 0 ? (
          <p style={{ color: theme.textMuted, textAlign: "center", padding: "32px 0", fontSize: "14px", fontFamily: font }}>
            {filtro === "Favoritos" ? "Nenhum anime favoritado ainda." : "Nenhum anime nessa categoria ainda."}
          </p>
        ) : visualizacao === "lista" ? (
          <div>{listaFiltrada.map((a) => <AnimeRow key={a.id} anime={a} />)}</div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(auto-fill, minmax(200px, 1fr))", gap: "14px" }}>
            {listaFiltrada.map((a) => <AnimeCard key={a.id} anime={a} />)}
          </div>
        )}
      </div>
    </div>
  );
}

export default MinhaLista;
