import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useResponsive } from "../hooks/useResponsive";

const animes = [
  { id: 1, nome: "Attack on Titan", genero: "Ação / Drama", episodios: 87, nota: "9.9", status: "Finalizado", cor: "#dc2626", img: "/images/attack-on-titan.jpg" },
  { id: 2, nome: "Demon Slayer", genero: "Ação / Sobrenatural", episodios: 44, nota: "9.7", status: "Em exibição", cor: "#7c3aed", img: "/images/demon-slayer.jpg" },
  { id: 3, nome: "Fullmetal Alchemist", genero: "Aventura / Fantasia", episodios: 64, nota: "9.8", status: "Finalizado", cor: "#d97706", img: "/images/fullmetal-alchemist.jpg" },
  { id: 4, nome: "Bleach", genero: "Ação / Sobrenatural", episodios: 52, nota: "9.6", status: "Em exibição", cor: "#0369a1", img: "/images/bleach.jpg" },
  { id: 5, nome: "One Piece", genero: "Aventura / Comédia", episodios: 1100, nota: "9.5", status: "Em exibição", cor: "#b45309", img: "/images/one-piece.jpg" },
  { id: 6, nome: "Jujutsu Kaisen", genero: "Ação / Sobrenatural", episodios: 48, nota: "9.4", status: "Em exibição", cor: "#065f46", img: "/images/jujutsu-kaisen.jpg" },
];

const StarIcon = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="#f59e0b" stroke="#f59e0b" strokeWidth="1"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>;
const TvIcon = () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="15" rx="2"/><polyline points="17 2 12 7 7 2"/></svg>;
const ArrowIcon = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>;

function Home() {
  const { theme } = useTheme();
  const { isMobile, isTablet } = useResponsive();
  const font = "'Inter', sans-serif";
  const fontDisplay = "'Plus Jakarta Sans', sans-serif";

  const heroPad = isMobile ? "60px 20px 60px" : isTablet ? "80px 32px 80px" : "100px 48px 96px";
  const h1Size = isMobile ? "36px" : isTablet ? "46px" : "58px";
  const gridCols = isMobile ? "1fr" : isTablet ? "repeat(2, 1fr)" : "repeat(3, 1fr)";
  const secPad = isMobile ? "36px 20px" : isTablet ? "48px 32px" : "64px 48px";

  const btn = {
    display: "inline-flex", alignItems: "center", gap: "8px",
    background: "#7c3aed", color: "#fff", padding: isMobile ? "12px 22px" : "13px 28px",
    borderRadius: "10px", textDecoration: "none", fontWeight: "600",
    fontSize: isMobile ? "14px" : "15px", fontFamily: font,
  };

  const badge = (status) => ({
    fontSize: "11px", padding: "3px 10px", borderRadius: "20px", fontWeight: "600",
    background: status === "Finalizado" ? theme.success : theme.info,
    color: status === "Finalizado" ? theme.successText : theme.infoText,
  });

  return (
    <div style={{ background: theme.bg, minHeight: `calc(100vh - ${isMobile ? "68px" : "92px"})`, transition: "background 0.3s", fontFamily: font }}>

      {/* Hero */}
      <div style={{ background: "linear-gradient(160deg, #080814 0%, #0d1628 45%, #0a1929 100%)", padding: heroPad, textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "radial-gradient(ellipse 70% 55% at 50% 0%, rgba(124,58,237,0.1) 0%, transparent 70%)" }} />

        <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(124,58,237,0.1)", color: "#c4b5fd", padding: isMobile ? "8px 16px" : "10px 22px", borderRadius: "100px", fontSize: isMobile ? "12px" : "14px", fontWeight: "500", marginBottom: "20px", border: "1px solid rgba(124,58,237,0.2)" }}>
          <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#7c3aed" }} />
          Seu catálogo pessoal de animes
        </div>

        <h1 style={{ color: "#f1f5f9", fontSize: h1Size, fontWeight: "800", lineHeight: "1.1", marginBottom: "16px", letterSpacing: isMobile ? "-0.5px" : "-1.5px", fontFamily: fontDisplay }}>
          Organize sua jornada<br />
          <span style={{ color: "#a78bfa" }}>no mundo dos animes</span>
        </h1>

        <p style={{ color: "#475569", fontSize: isMobile ? "15px" : "17px", maxWidth: "460px", margin: "0 auto 32px", lineHeight: "1.7" }}>
          Acompanhe episódios, marque favoritos e descubra novos títulos com o AniTrack.
        </p>

        <Link to="/dashboard/minha-lista" style={btn}> Acessar Minha Lista <ArrowIcon /> </Link>

        <div style={{ display: "flex", justifyContent: "center", marginTop: isMobile ? "40px" : "60px", flexWrap: "wrap", gap: isMobile ? "0" : "0" }}>
          {[["500+", "Animes catalogados"], ["12k+", "Episódios registrados"], ["98%", "Satisfação"]].map(([n, l], i, arr) => (
            <div key={l} style={{ display: "flex", alignItems: "center" }}>
              <div style={{ textAlign: "center", padding: isMobile ? "0 20px" : "0 40px" }}>
                <span style={{ color: "#a78bfa", fontSize: isMobile ? "24px" : "32px", fontWeight: "800", display: "block", fontFamily: fontDisplay }}>{n}</span>
                <p style={{ color: "#334155", fontSize: isMobile ? "11px" : "13px", marginTop: "4px" }}>{l}</p>
              </div>
              {i < arr.length - 1 && <div style={{ width: "1px", height: "32px", background: "rgba(255,255,255,0.06)" }} />}
            </div>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div style={{ padding: secPad, maxWidth: "1120px", margin: "0 auto" }}>
        <h2 style={{ color: theme.text, fontSize: isMobile ? "22px" : "28px", fontWeight: "700", fontFamily: fontDisplay, letterSpacing: "-0.5px", marginBottom: "6px" }}>Destaques do Catálogo</h2>
        <p style={{ color: theme.textMuted, fontSize: "14px", marginBottom: "28px" }}>Os títulos mais populares entre os usuários do AniTrack</p>

        <div style={{ display: "grid", gridTemplateColumns: gridCols, gap: "16px" }}>
          {animes.map((a) => (
            <div key={a.id} style={{ background: theme.bgCard, border: `1px solid ${theme.border}`, borderRadius: "16px", overflow: "hidden", borderTop: `3px solid ${a.cor}` }}>
              <div style={{ position: "relative", height: isMobile ? "160px" : "200px", overflow: "hidden", background: "#0d0d1e" }}>
                <img src={a.img} alt={a.nome} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center", display: "block" }} />
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "80px", background: "linear-gradient(to top, rgba(10,10,20,0.9), transparent)" }} />
              </div>
              <div style={{ padding: "16px" }}>
                <p style={{ color: theme.text, fontWeight: "700", fontSize: "15px", fontFamily: fontDisplay, marginBottom: "3px" }}>{a.nome}</p>
                <p style={{ color: theme.textMuted, fontSize: "12px", marginBottom: "10px" }}>{a.genero}</p>
                <div style={{ display: "flex", alignItems: "center", gap: "5px", color: theme.textMuted, fontSize: "12px", marginBottom: "10px" }}><TvIcon /> {a.episodios} episódios</div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "10px", borderTop: `1px solid ${theme.border}` }}>
                  <span style={{ display: "flex", alignItems: "center", gap: "5px", color: "#f59e0b", fontSize: "13px", fontWeight: "600" }}><StarIcon /> {a.nota}</span>
                  <span style={badge(a.status)}>{a.status}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: "rgba(124,58,237,0.06)", border: "1px solid rgba(124,58,237,0.12)", borderRadius: "20px", padding: isMobile ? "36px 24px" : "56px 40px", textAlign: "center", marginTop: "16px" }}>
          <p style={{ color: theme.text, fontSize: isMobile ? "20px" : "26px", fontWeight: "700", fontFamily: fontDisplay, marginBottom: "10px" }}>Pronto para organizar sua lista?</p>
          <p style={{ color: theme.textMuted, fontSize: "14px", marginBottom: "24px" }}>Acesse o dashboard e comece a adicionar seus animes favoritos agora mesmo.</p>
          <Link to="/dashboard/minha-lista" style={btn}>Ir para Minha Lista <ArrowIcon /></Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
