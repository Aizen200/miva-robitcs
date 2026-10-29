import type { CSSProperties } from "react";
import type { ProductArt as Kind } from "@/lib/data";

// Flat, looping illustrations standing in for product renders.
// Animations are CSS keyframes from globals.css; `origin` is in viewBox units.

const INK = "#1b1b1b";
const BODY = "#f7f5f1";
const EDGE = "#2a2a2a";
const BRAND = "#ec5a14";

const loop = (name: string, secs: number, origin: string, delay = 0): CSSProperties => ({
  transformOrigin: origin,
  animation: `${name} ${secs}s ease-in-out ${delay}s infinite`,
});

const stroke = { stroke: EDGE, strokeWidth: 1.5 };

function Axis() {
  return (
    <>
      <ellipse cx="100" cy="178" rx="46" ry="5" fill="#000" opacity=".08" />
      <rect x="68" y="160" width="64" height="16" rx="3" fill={INK} />
      <rect x="80" y="136" width="40" height="26" rx="7" fill={BODY} {...stroke} />
      <g className="svg-part" style={loop("swing-a", 5, "100px 140px")}>
        <rect x="91" y="76" width="18" height="70" rx="9" fill={BODY} {...stroke} />
        <circle cx="100" cy="140" r="10" fill={INK} />
        <circle cx="100" cy="140" r="3.5" fill={BRAND} />
        <g className="svg-part" style={loop("swing-b", 5, "100px 84px")}>
          <rect x="94" y="76" width="68" height="16" rx="8" fill={BODY} {...stroke} />
          <text x="112" y="87.5" fontSize="6.5" fontFamily="serif" letterSpacing="1.5" fill={INK}>MIVA</text>
          <circle cx="100" cy="84" r="9.5" fill={INK} />
          <circle cx="100" cy="84" r="3" fill={BRAND} />
          <g className="svg-part" style={loop("swing-c", 5, "156px 84px")}>
            <rect x="150" y="88" width="12" height="18" rx="2" fill={INK} />
            <rect x="146" y="104" width="20" height="5" rx="1.5" fill={INK} />
            <rect x="147" y="109" width="4" height="12" fill={INK} />
            <rect x="161" y="109" width="4" height="12" fill={INK} />
            <rect x="147" y="118" width="4" height="4" fill={BRAND} />
            <rect x="161" y="118" width="4" height="4" fill={BRAND} />
          </g>
        </g>
      </g>
    </>
  );
}

function Navis() {
  return (
    <>
      <ellipse cx="100" cy="172" rx="62" ry="5" fill="#000" opacity=".1" />
      {[0, 0.8, 1.6].map((d) => (
        <circle
          key={d}
          className="svg-part"
          cx="100"
          cy="64"
          r="16"
          fill="none"
          stroke={BRAND}
          strokeWidth="1.2"
          style={{ transformOrigin: "100px 64px", animation: `ping 2.4s ease-out ${d}s infinite` }}
        />
      ))}
      <g className="svg-part" style={loop("bob", 1.6, "100px 100px")}>
        <rect x="88" y="60" width="24" height="12" rx="4" fill={INK} />
        <rect x="40" y="72" width="120" height="82" rx="12" fill={INK} />
        <rect x="52" y="82" width="96" height="48" rx="6" fill={BODY} />
        <text x="100" y="110" fontSize="10" fontFamily="serif" letterSpacing="3" textAnchor="middle" fill={INK}>MIVA</text>
        <rect x="40" y="136" width="120" height="5" fill={BRAND} />
        <circle cx="54" cy="146" r="2" fill={BRAND} />
      </g>
      {[64, 136].map((cx) => (
        <g key={cx}>
          <circle cx={cx} cy="160" r="11" fill={INK} />
          <g className="svg-part" style={{ transformOrigin: `${cx}px 160px`, animation: "spin 2s linear infinite" }}>
            <rect x={cx - 1} y="152" width="2" height="16" fill="#555" />
            <rect x={cx - 8} y="159" width="16" height="2" fill="#555" />
          </g>
        </g>
      ))}
    </>
  );
}

function Eagle() {
  const rotor = (cx: number, cy: number, rx: number, fill: string, delay: number) => (
    <ellipse
      className="svg-part"
      cx={cx}
      cy={cy}
      rx={rx}
      ry="2.5"
      fill={fill}
      style={{ transformOrigin: `${cx}px ${cy}px`, animation: `prop 0.18s linear ${delay}s infinite` }}
    />
  );
  return (
    <>
      <ellipse cx="100" cy="182" rx="40" ry="4" fill="#000" opacity=".08" />
      <polygon points="100,124 66,180 134,180" fill={BRAND} opacity=".12" className="svg-part" style={loop("bob", 2.4, "100px 150px")} />
      <g className="svg-part" style={loop("hover", 3, "100px 90px")}>
        {rotor(68, 64, 17, "#8a857e", 0.05)}
        {rotor(132, 64, 17, "#8a857e", 0.1)}
        <rect x="66" y="64" width="4" height="12" fill="#3a3a3a" />
        <rect x="130" y="64" width="4" height="12" fill="#3a3a3a" />
        <rect x="34" y="82" width="132" height="5" rx="2" fill={INK} />
        <rect x="39" y="70" width="6" height="14" rx="1" fill={INK} />
        <rect x="155" y="70" width="6" height="14" rx="1" fill={INK} />
        {rotor(42, 70, 24, INK, 0)}
        {rotor(158, 70, 24, INK, 0.08)}
        <rect x="72" y="74" width="56" height="28" rx="12" fill={BODY} {...stroke} />
        <rect x="72" y="90" width="56" height="3" fill={BRAND} />
        <text x="100" y="86" fontSize="6" fontFamily="serif" letterSpacing="1.5" textAnchor="middle" fill={INK}>MIVA</text>
        <path d="M84 102 76 124M116 102l8 22" stroke={INK} strokeWidth="3" strokeLinecap="round" />
        <path d="M70 124h12M118 124h12" stroke={INK} strokeWidth="3" strokeLinecap="round" />
        <rect x="94" y="102" width="12" height="7" fill={INK} />
        <circle cx="100" cy="115" r="8" fill={INK} />
        <circle cx="100" cy="115" r="3" fill={BRAND} />
      </g>
    </>
  );
}

function Eye() {
  return (
    <>
      <defs>
        <clipPath id="lens-clip">
          <circle cx="100" cy="96" r="26" />
        </clipPath>
      </defs>
      <ellipse cx="100" cy="180" rx="40" ry="4" fill="#000" opacity=".08" />
      <rect x="72" y="170" width="56" height="8" rx="2" fill={INK} />
      <rect x="93" y="140" width="14" height="32" fill={INK} />
      <rect x="54" y="52" width="92" height="90" rx="10" fill={BODY} {...stroke} />
      {[62, 68, 74].map((y) => (
        <rect key={y} x="60" y={y} width="10" height="2" rx="1" fill="#9a958e" />
      ))}
      <circle cx="134" cy="64" r="3" fill={BRAND} />
      <circle cx="100" cy="96" r="32" fill={INK} />
      <circle cx="100" cy="96" r="26" fill="#2c2c2c" />
      <circle cx="100" cy="96" r="16" fill="#151515" />
      <circle
        className="svg-part"
        cx="100"
        cy="96"
        r="7"
        fill={BRAND}
        style={{ transformOrigin: "100px 96px", animation: "ping 2.6s ease-out infinite" }}
      />
      <circle cx="100" cy="96" r="5" fill={BRAND} />
      <g clipPath="url(#lens-clip)">
        <rect className="svg-part" x="70" y="95" width="60" height="2" fill={BRAND} opacity=".8" style={loop("scan", 2.4, "100px 96px")} />
      </g>
      <circle cx="91" cy="86" r="4" fill="#fff" opacity=".25" />
    </>
  );
}

function Os() {
  return (
    <>
      <ellipse cx="100" cy="172" rx="44" ry="4" fill="#000" opacity=".08" />
      <rect x="26" y="44" width="148" height="98" rx="7" fill={INK} />
      <rect x="32" y="50" width="136" height="86" rx="3" fill="#101010" />
      {[62, 100, 138].map((cx, i) => (
        <g key={cx}>
          <circle cx={cx} cy="82" r="13" fill="none" stroke="#333" strokeWidth="3" />
          <circle
            cx={cx}
            cy="82"
            r="13"
            fill="none"
            stroke={BRAND}
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray="82"
            transform={`rotate(-90 ${cx} 82)`}
            style={{ animation: `dash ${3 + i * 0.6}s ease-in-out ${i * 0.4}s infinite` }}
          />
        </g>
      ))}
      {Array.from({ length: 12 }, (_, i) => (
        <rect
          key={i}
          className="svg-part"
          x={44 + i * 9.6}
          y="106"
          width="5"
          height="22"
          rx="1"
          fill={i % 4 === 0 ? BRAND : "#4a4a4a"}
          style={{ transformOrigin: `0 128px`, animation: `bar ${1.4 + (i % 3) * 0.4}s ease-in-out ${i * 0.12}s infinite` }}
        />
      ))}
      <rect x="92" y="142" width="16" height="22" fill={INK} />
      <rect x="68" y="162" width="64" height="7" rx="2" fill={INK} />
    </>
  );
}

// Semi-humanoid: torso, head and two arms on a mobile base.
function Assist() {
  return (
    <>
      <ellipse cx="100" cy="182" rx="44" ry="4" fill="#000" opacity=".08" />
      <rect x="68" y="158" width="64" height="18" rx="7" fill={INK} />
      <circle cx="80" cy="176" r="5" fill="#3a3a3a" />
      <circle cx="120" cy="176" r="5" fill="#3a3a3a" />
      <rect x="92" y="126" width="16" height="34" fill={INK} />
      <g className="svg-part" style={loop("bob", 2.2, "100px 100px")}>
        <g className="svg-part" style={loop("swing-a", 4, "68px 88px")}>
          <rect x="58" y="82" width="13" height="40" rx="6.5" fill={BODY} {...stroke} />
          <rect x="58" y="118" width="13" height="26" rx="6.5" fill={INK} />
        </g>
        <g className="svg-part" style={loop("swing-b", 4, "132px 88px", 0.5)}>
          <rect x="129" y="82" width="13" height="40" rx="6.5" fill={BODY} {...stroke} />
          <rect x="129" y="118" width="13" height="26" rx="6.5" fill={INK} />
          <rect x="129" y="143" width="4" height="7" fill={BRAND} />
          <rect x="138" y="143" width="4" height="7" fill={BRAND} />
        </g>
        <rect x="70" y="78" width="60" height="52" rx="13" fill={BODY} {...stroke} />
        <rect x="70" y="100" width="60" height="4" fill={BRAND} />
        <text x="100" y="118" fontSize="7" fontFamily="serif" letterSpacing="2" textAnchor="middle" fill={INK}>MIVA</text>
        <rect x="95" y="68" width="10" height="12" fill={INK} />
        <rect x="80" y="38" width="40" height="32" rx="13" fill={BODY} {...stroke} />
        <rect x="85" y="48" width="30" height="12" rx="6" fill={INK} />
        <circle cx="93" cy="54" r="2" fill={BRAND} />
        <circle cx="107" cy="54" r="2" fill={BRAND} />
      </g>
    </>
  );
}

const ART: Record<Kind, () => React.JSX.Element> = {
  axis: Axis,
  navis: Navis,
  eagle: Eagle,
  eye: Eye,
  os: Os,
  assist: Assist,
};

export function ProductArt({ kind, className = "" }: { kind: Kind; className?: string }) {
  const Art = ART[kind];
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden>
      <Art />
    </svg>
  );
}
