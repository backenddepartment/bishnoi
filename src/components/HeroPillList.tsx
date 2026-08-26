import type { CSSProperties } from "react";
import type { HeroPill } from "./heroContent";

const pillStyle: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: ".375rem",
  fontSize: ".8125rem",
  padding: ".4rem 1rem",
  color: "rgba(255,255,255,0.92)",
  fontWeight: 500,
  background: "rgba(26,22,19,0.6)",
  backdropFilter: "blur(12px)",
  border: "1px solid rgba(243,107,33,0.38)",
  borderRadius: "9999px",
  whiteSpace: "nowrap",
};

export default function HeroPillList({ pills }: { pills: HeroPill[] }) {
  return (
    <ul style={{ display: "flex", flexWrap: "wrap", gap: ".5rem" }} className="justify-start lg:justify-end">
      {pills.map((pill) => (
        <li key={pill.label}>
          {pill.href ? (
            <a href={pill.href} target="_blank" rel="noreferrer" className="hover-spring-sm" style={pillStyle}>
              <span>{pill.label}</span>
              <span className="text-[.75rem] sm:text-[.65rem]" style={{ color: "#F36B21" }}>↗</span>
            </a>
          ) : (
            <span style={pillStyle}>{pill.label}</span>
          )}
        </li>
      ))}
    </ul>
  );
}
