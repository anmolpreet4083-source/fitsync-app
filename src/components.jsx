import React from "react";
import { Play, Dumbbell, Leaf, Heart } from "lucide-react";
import { theme } from "./theme";
import { POSES } from "./data";

export function Ring({ percent, size = 108, stroke = 10 }) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const clamped = Math.min(Math.max(percent, 0), 100);
  return (
    <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={theme.surfaceAlt} strokeWidth={stroke} />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke={theme.lime}
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={c}
        strokeDashoffset={c - (clamped / 100) * c}
        style={{ transition: "stroke-dashoffset 0.6s ease" }}
      />
    </svg>
  );
}

export function GradientRing({ percent, size = 168, stroke = 14, gradFrom, gradTo, id }) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const clamped = Math.min(Math.max(percent, 0), 100);
  const gradId = `grad-${id}`;
  return (
    <svg width={size} height={size} style={{ transform: "rotate(-90deg)", filter: `drop-shadow(0 0 18px ${gradTo}66)` }}>
      <defs>
        <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={gradFrom} />
          <stop offset="100%" stopColor={gradTo} />
        </linearGradient>
      </defs>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={theme.surfaceAlt} strokeWidth={stroke} />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke={`url(#${gradId})`}
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={c}
        strokeDashoffset={c - (clamped / 100) * c}
        style={{ transition: "stroke-dashoffset 0.8s ease" }}
      />
    </svg>
  );
}

export function MacroBar({ label, consumed, target, color }) {
  const pct = Math.min((consumed / target) * 100, 100);
  return (
    <div style={{ marginBottom: 10 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
        <span style={{ fontFamily: "Inter, sans-serif", fontSize: 11, letterSpacing: 1, color: theme.muted, textTransform: "uppercase" }}>
          {label}
        </span>
        <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, color: theme.text }}>
          {Math.round(consumed)}
          <span style={{ color: theme.muted }}>/{target}g</span>
        </span>
      </div>
      <div style={{ height: 6, borderRadius: 4, background: theme.surfaceAlt, overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${pct}%`, background: color, borderRadius: 4, transition: "width 0.5s ease" }} />
      </div>
    </div>
  );
}

export function StatPill({ icon, value, target, label }) {
  return (
    <div
      style={{
        flex: 1,
        background: theme.surface,
        border: `1px solid ${theme.border}`,
        borderRadius: 12,
        padding: "10px 8px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 4,
      }}
    >
      {icon}
      <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 13, color: theme.text }}>
        {value}
        {target ? <span style={{ color: theme.muted }}>/{target}</span> : null}
      </span>
      <span style={{ fontFamily: "Inter, sans-serif", fontSize: 9, letterSpacing: 1, color: theme.muted, textTransform: "uppercase" }}>
        {label}
      </span>
    </div>
  );
}

export function ScreenHeader({ title, subtitle }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 18, fontWeight: 600, color: theme.text }}>{title}</div>
      {subtitle && <div style={{ fontSize: 12, color: theme.muted, marginTop: 2 }}>{subtitle}</div>}
    </div>
  );
}

export function Chip({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "10px 14px",
        borderRadius: 10,
        fontSize: 13,
        border: `1px solid ${active ? theme.lime : theme.border}`,
        background: active ? "rgba(201,240,101,0.1)" : theme.surface,
        color: active ? theme.lime : theme.text,
        textAlign: "left",
      }}
    >
      {label}
    </button>
  );
}

export function PoseIcon({ family, color, size = 44 }) {
  const poseKey =
    family === "squat" || family === "calf" ? "squat" :
    family === "press" ? "press" :
    family === "raise" ? "raise" :
    family === "pull" ? "pull" :
    family === "push" || family === "core" ? "push" :
    family === "lunge" ? "lunge" :
    family === "hinge" ? "hinge" :
    family === "curl" || family === "triceps" ? "curl" :
    family === "cardio" ? "cardio" :
    family === "mobility" ? "mobility" :
    "standing";
  const pose = POSES[poseKey];
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <circle cx={pose.head.cx} cy={pose.head.cy} r={pose.head.r} stroke={color} strokeWidth={5} />
      {pose.lines.map((l, i) => (
        <line key={i} x1={l[0]} y1={l[1]} x2={l[2]} y2={l[3]} stroke={color} strokeWidth={5} strokeLinecap="round" />
      ))}
    </svg>
  );
}

export function WorkoutCard({ w, onStart, recommended, isFavorite, onToggleFavorite }) {
  const Icon = w.type === "Recovery" ? Leaf : Dumbbell;
  return (
    <div
      style={{
        background: theme.surface,
        border: `1px solid ${recommended ? theme.lime : theme.border}`,
        borderRadius: 12,
        padding: "12px 14px",
        marginBottom: 10,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
        <div style={{ width: 34, height: 34, borderRadius: 8, background: theme.surfaceAlt, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <Icon size={16} color={theme.lime} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13, color: theme.text, fontWeight: 500 }}>{w.name}</div>
          <div style={{ fontSize: 11, color: theme.muted }}>{w.type} · {w.exercises} exercises · {w.duration} min</div>
        </div>
        <button onClick={onToggleFavorite} style={{ background: "none", border: "none", padding: 4, flexShrink: 0 }}>
          <Heart size={15} color={isFavorite ? theme.coral : theme.muted} fill={isFavorite ? theme.coral : "none"} />
        </button>
        <button
          onClick={onStart}
          style={{ display: "flex", alignItems: "center", gap: 4, background: theme.lime, color: "#12211D", border: "none", borderRadius: 8, padding: "7px 10px", fontSize: 11, fontWeight: 600, flexShrink: 0 }}
        >
          <Play size={12} /> START
        </button>
      </div>
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
        {[w.difficulty, w.equipment, w.goal].map((tag) => (
          <span key={tag} style={{ fontSize: 9.5, color: theme.muted, background: theme.surfaceAlt, border: `1px solid ${theme.border}`, borderRadius: 6, padding: "3px 7px" }}>
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

