import React, { useState, useMemo } from "react";
import {
  Search,
  Camera,
  Barcode,
  Settings,
  Droplet,
  Footprints,
  Flame,
  Dumbbell,
  Plus,
  X,
  Check,
  Home as HomeIcon,
  Apple,
  BarChart3,
  MessageCircle,
  Play,
  Send,
  Sparkles,
  Scale,
  Leaf,
  ChevronRight,
  Target,
  Award,
  Ruler,
  Image,
  Filter,
  Moon,
  Bell,
  Zap,
  Bot,
} from "lucide-react";

const theme = {
  bg: "#0F1E1A",
  surface: "#182C26",
  surfaceAlt: "#20362E",
  border: "#2B4A40",
  lime: "#C9F065",
  coral: "#FF8B5E",
  sky: "#7EC8E3",
  purple: "#B39DFF",
  amber: "#FFC168",
  text: "#EDF3EE",
  muted: "#82998F",
};

const FOOD_DB = [
  { id: 1, name: "Grilled chicken breast", serving: "150g", kcal: 248, protein: 46, carbs: 0, fat: 5.4 },
  { id: 2, name: "Brown rice, cooked", serving: "1 cup", kcal: 216, protein: 5, carbs: 45, fat: 1.8 },
  { id: 3, name: "Avocado", serving: "1/2 medium", kcal: 120, protein: 1.5, carbs: 6, fat: 11 },
  { id: 4, name: "Greek yogurt, plain", serving: "170g", kcal: 100, protein: 17, carbs: 6, fat: 0.7 },
  { id: 5, name: "Whole wheat toast", serving: "1 slice", kcal: 80, protein: 4, carbs: 14, fat: 1 },
  { id: 6, name: "Almonds", serving: "28g handful", kcal: 164, protein: 6, carbs: 6, fat: 14 },
  { id: 7, name: "Banana", serving: "1 medium", kcal: 105, protein: 1.3, carbs: 27, fat: 0.4 },
  { id: 8, name: "Salmon fillet", serving: "170g", kcal: 367, protein: 39, carbs: 0, fat: 22 },
  { id: 9, name: "Protein smoothie", serving: "1 shake", kcal: 220, protein: 30, carbs: 15, fat: 4 },
  { id: 10, name: "Paneer pasta", serving: "1 bowl", kcal: 640, protein: 32, carbs: 70, fat: 22 },
];

const MEALS = ["Breakfast", "Lunch", "Snack", "Dinner"];

const initialLog = [
  { logId: "a1", meal: "Breakfast", food: FOOD_DB[3], qty: 1 },
  { logId: "a2", meal: "Breakfast", food: FOOD_DB[6], qty: 1 },
  { logId: "a3", meal: "Lunch", food: FOOD_DB[0], qty: 1 },
  { logId: "a4", meal: "Lunch", food: FOOD_DB[1], qty: 1 },
  { logId: "a5", meal: "Lunch", food: FOOD_DB[2], qty: 1 },
  { logId: "a6", meal: "Snack", food: FOOD_DB[8], qty: 1 },
  { logId: "a7", meal: "Dinner", food: FOOD_DB[5], qty: 1 },
  { logId: "a8", meal: "Dinner", food: FOOD_DB[4], qty: 2 },
];

const TARGETS = { kcal: 2200, protein: 120, carbs: 250, fat: 70, water: 2.5, steps: 10000 };

const GOALS = ["Lose Fat", "Build Muscle", "Gain Weight", "Get Stronger", "General Fitness"];
const EXPERIENCE_LEVELS = ["Beginner", "Intermediate", "Advanced"];
const EQUIPMENT_OPTIONS = ["Full Gym", "Home - Dumbbells", "Bodyweight Only"];
const WORKOUT_TYPES = ["All", "Strength", "Cardio", "Mobility", "Recovery"];

const WORKOUT_LIBRARY = [
  { id: 1, name: "Upper Body Strength", type: "Strength", exercises: 6, duration: 42, difficulty: "Intermediate", equipment: "Full Gym", goal: "Build Muscle" },
  { id: 2, name: "Lower Body Power", type: "Strength", exercises: 5, duration: 38, difficulty: "Intermediate", equipment: "Full Gym", goal: "Get Stronger" },
  { id: 3, name: "Full Body HIIT", type: "Cardio", exercises: 8, duration: 25, difficulty: "Beginner", equipment: "Bodyweight Only", goal: "Lose Fat" },
  { id: 4, name: "Core & Mobility", type: "Mobility", exercises: 6, duration: 20, difficulty: "Beginner", equipment: "Bodyweight Only", goal: "General Fitness" },
  { id: 5, name: "Home Dumbbell Push", type: "Strength", exercises: 5, duration: 30, difficulty: "Beginner", equipment: "Home - Dumbbells", goal: "Build Muscle" },
  { id: 6, name: "Advanced Powerlifting Split", type: "Strength", exercises: 4, duration: 50, difficulty: "Advanced", equipment: "Full Gym", goal: "Get Stronger" },
  { id: 7, name: "Recovery Stretch Flow", type: "Recovery", exercises: 8, duration: 15, difficulty: "Beginner", equipment: "Bodyweight Only", goal: "General Fitness" },
  { id: 8, name: "Full Body Gain Circuit", type: "Strength", exercises: 6, duration: 35, difficulty: "Intermediate", equipment: "Home - Dumbbells", goal: "Gain Weight" },
  { id: 9, name: "Deep Stretch & Mobility", type: "Recovery", exercises: 6, duration: 18, difficulty: "Beginner", equipment: "Bodyweight Only", goal: "General Fitness" },
  { id: 10, name: "Post-Leg-Day Recovery", type: "Recovery", exercises: 5, duration: 12, difficulty: "Beginner", equipment: "Bodyweight Only", goal: "General Fitness" },
];

const WEIGHT_HISTORY = [
  { label: "W1", value: 72.4 },
  { label: "W2", value: 72.1 },
  { label: "W3", value: 71.8 },
  { label: "W4", value: 71.9 },
  { label: "W5", value: 71.5 },
  { label: "W6", value: 71.2 },
];

const INITIAL_MEASUREMENTS = [{ label: "M1", waist: 82, hips: 96, chest: 98, arms: 33 }];

const NAV_ITEMS = [
  { key: "home", icon: HomeIcon, label: "Home" },
  { key: "nutrition", icon: Apple, label: "Nutrition" },
  { key: "workout", icon: Dumbbell, label: "Workout" },
  { key: "progress", icon: BarChart3, label: "Progress" },
  { key: "coach", icon: MessageCircle, label: "Coach" },
];

function sumField(log, field) {
  return log.reduce((acc, entry) => acc + entry.food[field] * entry.qty, 0);
}

function inferMealFromTime() {
  const hour = new Date().getHours();
  if (hour < 11) return "Breakfast";
  if (hour < 15) return "Lunch";
  if (hour < 18) return "Snack";
  return "Dinner";
}

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

function getQuickAddFoods(log, limit = 4) {
  const counts = {};
  const lastLogged = {};
  log.forEach((e, idx) => {
    counts[e.food.id] = (counts[e.food.id] || 0) + 1;
    lastLogged[e.food.id] = idx;
  });
  return Object.keys(counts)
    .sort((a, b) => {
      const freqDiff = counts[b] - counts[a];
      if (freqDiff !== 0) return freqDiff;
      return lastLogged[b] - lastLogged[a];
    })
    .slice(0, limit)
    .map((id) => FOOD_DB.find((f) => f.id === Number(id)))
    .filter(Boolean);
}

function scoreWorkout(w, profile) {
  let score = 0;
  if (profile.goal && w.goal === profile.goal) score += 2;
  if (profile.experience && w.difficulty === profile.experience) score += 1;
  if (profile.equipment && w.equipment === profile.equipment) score += 1;
  return score;
}

function Ring({ percent, size = 108, stroke = 10 }) {
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

function MacroBar({ label, consumed, target, color }) {
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

function StatPill({ icon, value, target, label }) {
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

function ScreenHeader({ title, subtitle }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 18, fontWeight: 600, color: theme.text }}>{title}</div>
      {subtitle && <div style={{ fontSize: 12, color: theme.muted, marginTop: 2 }}>{subtitle}</div>}
    </div>
  );
}

function Chip({ label, active, onClick }) {
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

function WorkoutCard({ w, onStart, recommended }) {
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

export default function FitSyncPrototype() {
  const [onboarded, setOnboarded] = useState(false);
  const [onboardStep, setOnboardStep] = useState(1);
  const [profile, setProfile] = useState({ goal: null, experience: null, equipment: null, cycleAware: false });

  const [activeScreen, setActiveScreen] = useState("home");
  const [log, setLog] = useState(initialLog);
  const [showAddFood, setShowAddFood] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedFood, setSelectedFood] = useState(null);
  const [qty, setQty] = useState(1);
  const [targetMeal, setTargetMeal] = useState(inferMealFromTime());
  const [activeTab, setActiveTab] = useState("search");
  const [justAddedId, setJustAddedId] = useState(null);
  const [workoutDone, setWorkoutDone] = useState(true);
  const [generatedWorkout, setGeneratedWorkout] = useState(null);
  const [workoutTypeFilter, setWorkoutTypeFilter] = useState("All");
  const [weightHistory, setWeightHistory] = useState(WEIGHT_HISTORY);
  const [measurementLog, setMeasurementLog] = useState(INITIAL_MEASUREMENTS);
  const [measurementForm, setMeasurementForm] = useState({ waist: "", hips: "", chest: "", arms: "" });
  const [photos, setPhotos] = useState([]);
  const [streak, setStreak] = useState(4);
  const [workoutFeedback, setWorkoutFeedback] = useState(null);
  const [measurementError, setMeasurementError] = useState("");
  const [messages, setMessages] = useState([
    { role: "assistant", text: "Hey! I'm your coach. I'll keep an eye on your trends and help you adjust your plan. Ask me anything, or tell me how today's going." },
  ]);
  const [chatInput, setChatInput] = useState("");

  const kcalConsumed = useMemo(() => sumField(log, "kcal"), [log]);
  const proteinConsumed = useMemo(() => sumField(log, "protein"), [log]);
  const carbsConsumed = useMemo(() => sumField(log, "carbs"), [log]);
  const fatConsumed = useMemo(() => sumField(log, "fat"), [log]);
  const remaining = Math.max(TARGETS.kcal - kcalConsumed, 0);
  const pctKcal = (kcalConsumed / TARGETS.kcal) * 100;

  const cycleDay = useMemo(() => (new Date().getDate() % 28) + 1, []);
  const cycleLighterPhase = cycleDay <= 5;

  const filteredFoods = useMemo(() => {
    if (!query.trim()) return FOOD_DB;
    return FOOD_DB.filter((f) => f.name.toLowerCase().includes(query.toLowerCase()));
  }, [query]);

  function addToLog() {
    if (!selectedFood) return;
    setLog((prev) => [...prev, { logId: `${Date.now()}`, meal: targetMeal, food: selectedFood, qty }]);
    setSelectedFood(null);
    setQty(1);
    setQuery("");
  }

  function removeEntry(logId) {
    setLog((prev) => prev.filter((e) => e.logId !== logId));
  }

  function quickAdd(food) {
    setLog((prev) => [...prev, { logId: `${Date.now()}`, meal: targetMeal, food, qty: 1 }]);
    setJustAddedId(food.id);
    setTimeout(() => setJustAddedId(null), 900);
  }

  const quickAddFoods = useMemo(() => getQuickAddFoods(log), [log]);

  const coachLine =
    remaining > 0
      ? `You have ${Math.round(remaining)} calories and ${Math.max(Math.round(TARGETS.protein - proteinConsumed), 0)}g protein remaining.`
      : "You've hit your calorie target for today.";

  function generateWorkout() {
    setGeneratedWorkout({
      name: `AI Generated — ${profile.goal || "General Fitness"} Focus`,
      exercises: [
        "Lat Pulldown — 3×10",
        "Chest Press — 3×10",
        "Seated Row — 3×12",
        "Shoulder Press — 3×10",
        "Biceps Curl — 3×12",
      ],
    });
  }

  function logWeight() {
    const last = weightHistory[weightHistory.length - 1];
    const next = Math.round((last.value - 0.1) * 10) / 10;
    setWeightHistory((prev) => [...prev, { label: `W${prev.length + 1}`, value: next }]);
    setStreak((s) => s + 1);
  }

  function logMeasurements() {
    const { waist, hips, chest, arms } = measurementForm;
    if (!waist || !hips || !chest || !arms) {
      setMeasurementError("Fill in all four fields to log measurements.");
      setTimeout(() => setMeasurementError(""), 3000);
      return;
    }
    setMeasurementLog((prev) => [
      ...prev,
      { label: `M${prev.length + 1}`, waist: Number(waist), hips: Number(hips), chest: Number(chest), arms: Number(arms) },
    ]);
    setMeasurementForm({ waist: "", hips: "", chest: "", arms: "" });
    setStreak((s) => s + 1);
    setMeasurementError("saved");
    setTimeout(() => setMeasurementError(""), 2000);
  }

  function startWorkout(name) {
    setWorkoutDone(true);
    setWorkoutFeedback(name);
    setTimeout(() => setWorkoutFeedback(null), 2500);
  }

  function handlePhotoUpload(e) {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPhotos((prev) => [...prev, { id: Date.now(), url, date: new Date().toLocaleDateString() }]);
    e.target.value = "";
  }

  function sendMessage() {
    if (!chatInput.trim()) return;
    const userText = chatInput.trim();
    setMessages((prev) => [...prev, { role: "user", text: userText }]);
    setChatInput("");
    setTimeout(() => {
      const lower = userText.toLowerCase();
      let reply = "Got it — I'll factor that into your plan. (Demo reply — full AI coach comes next.)";
      if (lower.includes("tired") || lower.includes("sleep")) {
        reply = "Since you're low on sleep, let's ease off intensity today. Want me to swap today's workout for a lighter recovery session?";
      } else if (lower.includes("pizza") || lower.includes("cheat") || lower.includes("junk")) {
        reply = "That's completely okay. You've still got room today — let's focus on protein for your next meal.";
      } else if (lower.includes("weight") || lower.includes("progress")) {
        reply = "Your weight trend over the last few weeks looks steady. Check the Progress tab for the full chart.";
      } else if (lower.includes("cycle") && profile.cycleAware) {
        reply = `You're around day ${cycleDay} of your tracked cycle. I'd suggest ${cycleLighterPhase ? "keeping today lighter — recovery or mobility work suits this phase" : "training at your normal intensity"}.`;
      } else if (lower.includes("streak") || lower.includes("badge") || lower.includes("level")) {
        reply = "Check the Progress tab — your streak, level, and badges are all there.";
      }
      setMessages((prev) => [...prev, { role: "assistant", text: reply }]);
    }, 700);
  }

  const rankedWorkouts = useMemo(() => {
    let list = [...WORKOUT_LIBRARY];
    if (workoutTypeFilter !== "All") list = list.filter((w) => w.type === workoutTypeFilter);
    return list.map((w) => ({ ...w, _score: scoreWorkout(w, profile) })).sort((a, b) => b._score - a._score);
  }, [profile, workoutTypeFilter]);
  const recommended = rankedWorkouts.filter((w) => w._score > 0).slice(0, 3);
  const recommendedIds = new Set(recommended.map((w) => w.id));
  const rest = rankedWorkouts.filter((w) => !recommendedIds.has(w.id));

  const xp = streak * 15 + (workoutDone ? 30 : 0) + log.length * 10 + measurementLog.length * 15 + weightHistory.length * 5;
  const level = Math.floor(xp / 150) + 1;
  const xpIntoLevel = xp % 150;

  const badges = [
    { id: 1, name: "First Workout", unlocked: workoutDone, icon: Dumbbell },
    { id: 2, name: "7-Day Streak", unlocked: streak >= 7, icon: Flame },
    { id: 3, name: "10 Meals Logged", unlocked: log.length >= 10, icon: Apple },
    { id: 4, name: "Goal Set", unlocked: !!profile.goal, icon: Target },
    { id: 5, name: "Consistency", unlocked: streak >= 3, icon: Check },
    { id: 6, name: "Progress Tracked", unlocked: measurementLog.length >= 2 || photos.length >= 1, icon: Ruler },
  ];

  const challenges = [
    { id: 1, label: "Log 3 meals today", done: log.length >= 3, xpReward: 20 },
    { id: 2, label: `Hit protein target (${TARGETS.protein}g)`, done: proteinConsumed >= TARGETS.protein, xpReward: 25 },
    { id: 3, label: "Complete today's workout", done: workoutDone, xpReward: 30 },
  ];

  const latestMeasurement = measurementLog[measurementLog.length - 1];
  const baselineMeasurement = measurementLog[0];

  if (!onboarded) {
    return (
      <div style={{ display: "flex", justifyContent: "center", background: "#080F0D", padding: "24px 12px", fontFamily: "Inter, sans-serif" }}>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap');
          * { box-sizing: border-box; }
          button { font-family: inherit; cursor: pointer; }
        `}</style>
        <div
          style={{
            width: 380,
            height: 760,
            background: theme.bg,
            borderRadius: 32,
            border: `1px solid ${theme.border}`,
            overflow: "hidden",
            position: "relative",
            boxShadow: "0 30px 60px rgba(0,0,0,0.5)",
            display: "flex",
            flexDirection: "column",
            padding: "28px 22px",
          }}
        >
          <div style={{ display: "flex", gap: 6, marginBottom: 24 }}>
            {[1, 2, 3].map((s) => (
              <div key={s} style={{ flex: 1, height: 3, borderRadius: 2, background: s <= onboardStep ? theme.lime : theme.surfaceAlt }} />
            ))}
          </div>

          {onboardStep === 1 && (
            <>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 20, fontWeight: 600, color: theme.text, marginBottom: 6 }}>What's your main goal?</div>
              <div style={{ fontSize: 13, color: theme.muted, marginBottom: 20 }}>This shapes your calorie target and workout plan.</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {GOALS.map((g) => (
                  <Chip key={g} label={g} active={profile.goal === g} onClick={() => setProfile((p) => ({ ...p, goal: g }))} />
                ))}
              </div>
            </>
          )}

          {onboardStep === 2 && (
            <>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 20, fontWeight: 600, color: theme.text, marginBottom: 6 }}>Your experience & setup</div>
              <div style={{ fontSize: 13, color: theme.muted, marginBottom: 16 }}>So workouts match your level and what you have access to.</div>
              <div style={{ fontSize: 10, letterSpacing: 1.5, color: theme.muted, textTransform: "uppercase", marginBottom: 8 }}>Experience</div>
              <div style={{ display: "flex", gap: 8, marginBottom: 18 }}>
                {EXPERIENCE_LEVELS.map((e) => (
                  <div key={e} style={{ flex: 1 }}>
                    <Chip label={e} active={profile.experience === e} onClick={() => setProfile((p) => ({ ...p, experience: e }))} />
                  </div>
                ))}
              </div>
              <div style={{ fontSize: 10, letterSpacing: 1.5, color: theme.muted, textTransform: "uppercase", marginBottom: 8 }}>Equipment</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {EQUIPMENT_OPTIONS.map((eq) => (
                  <Chip key={eq} label={eq} active={profile.equipment === eq} onClick={() => setProfile((p) => ({ ...p, equipment: eq }))} />
                ))}
              </div>
            </>
          )}

          {onboardStep === 3 && (
            <>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 20, fontWeight: 600, color: theme.text, marginBottom: 6 }}>One more thing</div>
              <div style={{ fontSize: 13, color: theme.muted, marginBottom: 20 }}>Optional — you can change this anytime in Settings.</div>
              <button
                onClick={() => setProfile((p) => ({ ...p, cycleAware: !p.cycleAware }))}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "100%",
                  padding: "14px 16px",
                  borderRadius: 12,
                  border: `1px solid ${profile.cycleAware ? theme.lime : theme.border}`,
                  background: theme.surface,
                  marginBottom: 20,
                }}
              >
                <div style={{ textAlign: "left" }}>
                  <div style={{ fontSize: 13, color: theme.text, fontWeight: 500 }}>Cycle-aware coaching</div>
                  <div style={{ fontSize: 11, color: theme.muted, marginTop: 2 }}>Adjusts workout intensity & recommendations across your cycle</div>
                </div>
                <div style={{ width: 40, height: 22, borderRadius: 12, background: profile.cycleAware ? theme.lime : theme.surfaceAlt, position: "relative", flexShrink: 0, marginLeft: 12 }}>
                  <div style={{ width: 16, height: 16, borderRadius: "50%", background: theme.bg, position: "absolute", top: 3, left: profile.cycleAware ? 21 : 3, transition: "left 0.2s ease" }} />
                </div>
              </button>
            </>
          )}

          <div style={{ marginTop: "auto", display: "flex", gap: 8 }}>
            {onboardStep > 1 && (
              <button
                onClick={() => setOnboardStep((s) => s - 1)}
                style={{ flex: 1, padding: "13px 0", borderRadius: 10, border: `1px solid ${theme.border}`, background: "transparent", color: theme.muted, fontSize: 13 }}
              >
                Back
              </button>
            )}
            <button
              onClick={() => {
                if (onboardStep < 3) {
                  setOnboardStep((s) => s + 1);
                } else {
                  setOnboarded(true);
                }
              }}
              disabled={(onboardStep === 1 && !profile.goal) || (onboardStep === 2 && (!profile.experience || !profile.equipment))}
              style={{
                flex: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 6,
                padding: "13px 0",
                borderRadius: 10,
                border: "none",
                background: theme.lime,
                color: "#12211D",
                fontSize: 13,
                fontWeight: 600,
                opacity: (onboardStep === 1 && !profile.goal) || (onboardStep === 2 && (!profile.experience || !profile.equipment)) ? 0.4 : 1,
              }}
            >
              {onboardStep < 3 ? "Continue" : "Get Started"} <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", justifyContent: "center", background: "#080F0D", padding: "24px 12px", fontFamily: "Inter, sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; }
        button { font-family: inherit; cursor: pointer; }
        input { font-family: inherit; }
      `}</style>

      <div
        style={{
          width: 380,
          height: 760,
          background: theme.bg,
          borderRadius: 32,
          border: `1px solid ${theme.border}`,
          overflow: "hidden",
          position: "relative",
          boxShadow: "0 30px 60px rgba(0,0,0,0.5)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 20px 8px" }}>
          <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 15, letterSpacing: 3, color: theme.text }}>
            FITSYNC
          </span>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 4, background: theme.surface, border: `1px solid ${theme.border}`, borderRadius: 20, padding: "4px 9px" }}>
              <Flame size={12} color={theme.coral} />
              <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, color: theme.text }}>{streak}</span>
              <span style={{ width: 1, height: 10, background: theme.border, margin: "0 2px" }} />
              <Award size={12} color={theme.lime} />
              <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, color: theme.text }}>LV{level}</span>
            </div>
            <button style={{ background: "none", border: "none", padding: 4 }}>
              <Bell size={18} color={theme.muted} />
            </button>
          </div>
        </div>

        <div style={{ flex: 1, overflowY: "auto", padding: "8px 20px 100px", display: "flex", flexDirection: "column" }}>

          {activeScreen === "home" && (
            <>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                <div
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: "50%",
                    background: `linear-gradient(135deg, ${theme.lime}, ${theme.sky})`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <Dumbbell size={22} color="#12211D" />
                </div>
                <div>
                  <div style={{ fontSize: 13, color: theme.muted }}>{getGreeting()},</div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 18, fontWeight: 700, color: theme.text }}>
                      {profile.goal ? "Athlete" : "there"}
                    </span>
                    <span style={{ fontSize: 16 }}>👋</span>
                  </div>
                  <div style={{ fontSize: 11.5, color: theme.muted, marginTop: 1 }}>Keep pushing, you're doing great!</div>
                </div>
              </div>

              <div style={{ background: theme.surface, border: `1px solid ${theme.border}`, borderRadius: 14, padding: "14px 16px", marginBottom: 14 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                  <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, fontWeight: 600, color: theme.text }}>Today's Progress</span>
                  <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 15, color: theme.lime, fontWeight: 500 }}>
                    {Math.round(
                      ((Math.min(kcalConsumed / TARGETS.kcal, 1) +
                        Math.min(proteinConsumed / TARGETS.protein, 1) +
                        Math.min(7420 / TARGETS.steps, 1) +
                        Math.min(1.8 / TARGETS.water, 1)) /
                        4) *
                        100
                    )}
                    %
                  </span>
                </div>
                <div style={{ height: 8, borderRadius: 5, background: theme.surfaceAlt, overflow: "hidden" }}>
                  <div
                    style={{
                      height: "100%",
                      borderRadius: 5,
                      background: `linear-gradient(90deg, ${theme.lime}, ${theme.sky})`,
                      width: `${Math.round(
                        ((Math.min(kcalConsumed / TARGETS.kcal, 1) +
                          Math.min(proteinConsumed / TARGETS.protein, 1) +
                          Math.min(7420 / TARGETS.steps, 1) +
                          Math.min(1.8 / TARGETS.water, 1)) /
                          4) *
                          100
                      )}%`,
                      transition: "width 0.5s ease",
                    }}
                  />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 8, marginBottom: 16 }}>
                {[
                  { icon: Flame, color: theme.coral, label: "Calories", value: `${Math.round(kcalConsumed)}`, target: TARGETS.kcal },
                  { icon: Zap, color: theme.amber, label: "Protein", value: `${Math.round(proteinConsumed)}`, target: `${TARGETS.protein}g` },
                  { icon: Footprints, color: theme.lime, label: "Steps", value: "7,420", target: "10k" },
                  { icon: Droplet, color: theme.sky, label: "Water", value: "1.8", target: "2.5L" },
                ].map((s) => (
                  <div
                    key={s.label}
                    style={{
                      background: theme.surface,
                      border: `1px solid ${theme.border}`,
                      borderRadius: 12,
                      padding: "10px 6px",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 3,
                    }}
                  >
                    <s.icon size={16} color={s.color} />
                    <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, color: theme.text, textAlign: "center" }}>
                      {s.value}
                      <span style={{ color: theme.muted, fontSize: 9 }}>/{s.target}</span>
                    </span>
                    <span style={{ fontSize: 8.5, color: theme.muted, textTransform: "uppercase", letterSpacing: 0.5 }}>{s.label}</span>
                  </div>
                ))}
              </div>

              <div style={{ background: theme.surface, border: `1px solid ${theme.border}`, borderRadius: 14, padding: "14px 16px", marginBottom: 14 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                  <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, fontWeight: 600, color: theme.text }}>Today's Plan</span>
                  <button
                    onClick={() => setActiveScreen("workout")}
                    style={{ background: "none", border: "none", color: theme.lime, fontSize: 11.5, fontWeight: 600 }}
                  >
                    See all
                  </button>
                </div>

                {[
                  { icon: Dumbbell, title: "Upper Body", subtitle: "6 exercises · 42 min", done: workoutDone, onToggle: () => setWorkoutDone((d) => !d) },
                  { icon: Footprints, title: "10,000 Steps", subtitle: "7,420 / 10,000", done: false, onToggle: null },
                  { icon: Droplet, title: "Drink 2.5L Water", subtitle: "1.8 / 2.5 L", done: false, onToggle: null },
                ].map((item, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      padding: "9px 0",
                      borderTop: i > 0 ? `1px solid ${theme.border}` : "none",
                    }}
                  >
                    <div style={{ width: 32, height: 32, borderRadius: 8, background: theme.surfaceAlt, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <item.icon size={15} color={theme.sky} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 12.5, color: theme.text, fontWeight: 500 }}>{item.title}</div>
                      <div style={{ fontSize: 10.5, color: theme.muted }}>{item.subtitle}</div>
                    </div>
                    <button
                      onClick={item.onToggle || undefined}
                      style={{
                        width: 22,
                        height: 22,
                        borderRadius: "50%",
                        border: `1.5px solid ${item.done ? theme.lime : theme.border}`,
                        background: item.done ? theme.lime : "transparent",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        cursor: item.onToggle ? "pointer" : "default",
                      }}
                    >
                      {item.done && <Check size={13} color="#12211D" />}
                    </button>
                  </div>
                ))}
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  background: theme.surface,
                  border: `1px solid ${theme.border}`,
                  borderRadius: 14,
                  padding: "14px 16px",
                  marginBottom: 14,
                }}
              >
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 10.5, color: theme.purple, fontWeight: 600, letterSpacing: 0.5, marginBottom: 4 }}>YOUR GOAL</div>
                  <div style={{ fontSize: 15, color: theme.text, fontWeight: 600, marginBottom: 3 }}>{profile.goal || "Not set"}</div>
                  <div style={{ fontSize: 12, color: theme.muted, display: "flex", alignItems: "center", gap: 6 }}>
                    {weightHistory[0].value} kg <ChevronRight size={12} /> {weightHistory[weightHistory.length - 1].value} kg
                  </div>
                </div>
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 12,
                    background: "rgba(179,157,255,0.15)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <Dumbbell size={20} color={theme.purple} />
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  background: theme.surface,
                  border: `1px solid ${theme.border}`,
                  borderRadius: 14,
                  padding: "14px 16px",
                }}
              >
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 10.5, color: theme.lime, fontWeight: 600, letterSpacing: 0.5, marginBottom: 4 }}>COACH ADVICE</div>
                  <div style={{ fontSize: 12.5, color: theme.text, lineHeight: 1.4 }}>{coachLine}</div>
                </div>
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 12,
                    background: "rgba(201,240,101,0.12)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <Bot size={22} color={theme.lime} />
                </div>
              </div>
            </>
          )}

          {activeScreen === "nutrition" && (
            <>
              <ScreenHeader title="Nutrition" subtitle={`${Math.round(kcalConsumed)} of ${TARGETS.kcal} kcal today`} />
              <button
                onClick={() => setShowAddFood(true)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 6,
                  background: theme.lime,
                  color: "#12211D",
                  border: "none",
                  borderRadius: 10,
                  padding: "12px 0",
                  fontSize: 13,
                  fontWeight: 600,
                  marginBottom: 20,
                }}
              >
                <Plus size={15} /> Log food
              </button>
              {MEALS.map((meal) => {
                const entries = log.filter((e) => e.meal === meal);
                return (
                  <div key={meal} style={{ marginBottom: 14 }}>
                    <div style={{ fontSize: 10, letterSpacing: 1.5, color: theme.muted, textTransform: "uppercase", marginBottom: 6 }}>{meal}</div>
                    {entries.length === 0 ? (
                      <div style={{ fontSize: 12, color: theme.muted, padding: "6px 2px" }}>Nothing logged yet</div>
                    ) : (
                      entries.map((e) => (
                        <div
                          key={e.logId}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            padding: "8px 10px",
                            background: theme.surface,
                            borderRadius: 10,
                            marginBottom: 6,
                          }}
                        >
                          <div>
                            <div style={{ fontSize: 12.5, color: theme.text }}>
                              {e.food.name} {e.qty > 1 ? `×${e.qty}` : ""}
                            </div>
                            <div style={{ fontSize: 10.5, color: theme.muted }}>{e.food.serving}</div>
                          </div>
                          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                            <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 12, color: theme.text }}>
                              {Math.round(e.food.kcal * e.qty)}
                            </span>
                            <button onClick={() => removeEntry(e.logId)} style={{ background: "none", border: "none", padding: 2 }}>
                              <X size={13} color={theme.muted} />
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                );
              })}
            </>
          )}

          {activeScreen === "workout" && (
            <>
              <ScreenHeader title="Workout" subtitle={`For your goal: ${profile.goal || "Not set"}`} />

              {workoutFeedback && (
                <div style={{ display: "flex", alignItems: "center", gap: 8, background: "rgba(201,240,101,0.1)", border: `1px solid ${theme.lime}`, borderRadius: 12, padding: "10px 12px", marginBottom: 14 }}>
                  <Check size={15} color={theme.lime} />
                  <span style={{ fontSize: 12.5, color: theme.text }}>Started <strong>{workoutFeedback}</strong> — marked as today's workout.</span>
                </div>
              )}

              {profile.cycleAware && (
                <div style={{ display: "flex", alignItems: "flex-start", gap: 8, background: theme.surface, border: `1px solid ${theme.border}`, borderRadius: 12, padding: "10px 12px", marginBottom: 14 }}>
                  <Moon size={14} color={theme.sky} style={{ marginTop: 1, flexShrink: 0 }} />
                  <div style={{ fontSize: 12, color: theme.text, lineHeight: 1.4 }}>
                    Day {cycleDay} of your tracked cycle — {cycleLighterPhase ? "today's a good day for lighter intensity or recovery work." : "you're clear for normal training intensity."}
                  </div>
                </div>
              )}

              <button
                onClick={generateWorkout}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 6,
                  background: "transparent",
                  border: `1px solid ${theme.lime}`,
                  color: theme.lime,
                  borderRadius: 10,
                  padding: "12px 0",
                  fontSize: 13,
                  fontWeight: 600,
                  marginBottom: 14,
                }}
              >
                <Sparkles size={15} /> Generate AI workout
              </button>

              {generatedWorkout && (
                <div style={{ background: theme.surface, border: `1px solid ${theme.lime}`, borderRadius: 12, padding: "12px 14px", marginBottom: 18 }}>
                  <div style={{ fontSize: 13, color: theme.text, fontWeight: 600, marginBottom: 8 }}>{generatedWorkout.name}</div>
                  {generatedWorkout.exercises.map((ex, i) => (
                    <div key={i} style={{ fontSize: 12, color: theme.muted, marginBottom: 4 }}>{ex}</div>
                  ))}
                  <div style={{ fontSize: 10, color: theme.muted, marginTop: 8, fontStyle: "italic" }}>Demo output — real AI generation comes next.</div>
                </div>
              )}

              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 14, flexWrap: "wrap" }}>
                <Filter size={13} color={theme.muted} style={{ flexShrink: 0 }} />
                {WORKOUT_TYPES.map((t) => (
                  <button
                    key={t}
                    onClick={() => setWorkoutTypeFilter(t)}
                    style={{
                      flexShrink: 0,
                      padding: "6px 11px",
                      borderRadius: 8,
                      fontSize: 11,
                      border: `1px solid ${workoutTypeFilter === t ? theme.lime : theme.border}`,
                      background: workoutTypeFilter === t ? "rgba(201,240,101,0.08)" : "transparent",
                      color: workoutTypeFilter === t ? theme.lime : theme.muted,
                    }}
                  >
                    {t}
                  </button>
                ))}
              </div>

              {recommended.length > 0 && (
                <>
                  <div style={{ fontSize: 10, letterSpacing: 1.5, color: theme.lime, textTransform: "uppercase", marginBottom: 8 }}>Recommended for you</div>
                  {recommended.map((w) => (
                    <WorkoutCard key={w.id} w={w} recommended onStart={() => startWorkout(w.name)} />
                  ))}
                </>
              )}

              <div style={{ fontSize: 10, letterSpacing: 1.5, color: theme.muted, textTransform: "uppercase", marginBottom: 8, marginTop: recommended.length > 0 ? 10 : 0 }}>
                {recommended.length > 0 ? "More in library" : "Library"}
              </div>
              {rest.length === 0 && recommended.length === 0 ? (
                <div style={{ fontSize: 12, color: theme.muted, padding: "10px 0" }}>No workouts match this filter.</div>
              ) : (
                rest.map((w) => <WorkoutCard key={w.id} w={w} onStart={() => startWorkout(w.name)} />)
              )}
            </>
          )}

          {activeScreen === "progress" && (
            <>
              <ScreenHeader title="Progress" subtitle="Weight, measurements, photos & achievements" />

              <div style={{ background: theme.surface, border: `1px solid ${theme.border}`, borderRadius: 12, padding: "14px", marginBottom: 16, display: "flex", alignItems: "center", gap: 16 }}>
                <div style={{ textAlign: "center" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 4, justifyContent: "center" }}>
                    <Flame size={16} color={theme.coral} />
                    <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 18, color: theme.text }}>{streak}</span>
                  </div>
                  <div style={{ fontSize: 9, color: theme.muted, textTransform: "uppercase", letterSpacing: 1 }}>Day streak</div>
                </div>
                <div style={{ width: 1, height: 34, background: theme.border }} />
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                    <span style={{ fontSize: 11, color: theme.text }}>Level {level}</span>
                    <span style={{ fontSize: 10, color: theme.muted }}>{xpIntoLevel}/150 XP</span>
                  </div>
                  <div style={{ height: 6, borderRadius: 4, background: theme.surfaceAlt, overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${(xpIntoLevel / 150) * 100}%`, background: theme.lime, borderRadius: 4 }} />
                  </div>
                </div>
              </div>

              <div style={{ fontSize: 10, letterSpacing: 1.5, color: theme.muted, textTransform: "uppercase", marginBottom: 8 }}>Today's challenges</div>
              <div style={{ marginBottom: 20 }}>
                {challenges.map((c) => (
                  <div key={c.id} style={{ display: "flex", alignItems: "center", gap: 10, background: theme.surface, border: `1px solid ${theme.border}`, borderRadius: 10, padding: "10px 12px", marginBottom: 6 }}>
                    <div style={{ width: 18, height: 18, borderRadius: "50%", border: `1.5px solid ${c.done ? theme.lime : theme.muted}`, background: c.done ? theme.lime : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      {c.done && <Check size={11} color="#12211D" />}
                    </div>
                    <span style={{ fontSize: 12.5, color: c.done ? theme.muted : theme.text, textDecoration: c.done ? "line-through" : "none", flex: 1 }}>{c.label}</span>
                    <span style={{ fontSize: 10, color: theme.lime, fontFamily: "'IBM Plex Mono', monospace" }}>+{c.xpReward}xp</span>
                  </div>
                ))}
              </div>

              <div style={{ fontSize: 10, letterSpacing: 1.5, color: theme.muted, textTransform: "uppercase", marginBottom: 8 }}>Weight</div>
              <div style={{ background: theme.surface, border: `1px solid ${theme.border}`, borderRadius: 12, padding: "16px 14px", marginBottom: 12 }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 12 }}>
                  <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 24, color: theme.text }}>{weightHistory[weightHistory.length - 1].value}</span>
                  <span style={{ fontSize: 12, color: theme.muted }}>kg</span>
                  <span style={{ fontSize: 11, color: theme.lime, marginLeft: "auto" }}>
                    {(weightHistory[weightHistory.length - 1].value - weightHistory[0].value).toFixed(1)} kg since W1
                  </span>
                </div>
                <svg viewBox="0 0 300 100" width="100%" height="100">
                  {(() => {
                    const vals = weightHistory.map((w) => w.value);
                    const min = Math.min(...vals);
                    const max = Math.max(...vals);
                    const range = max - min || 1;
                    const points = weightHistory.map((w, i) => {
                      const x = (i / (weightHistory.length - 1)) * 280 + 10;
                      const y = 90 - ((w.value - min) / range) * 70;
                      return `${x},${y}`;
                    });
                    return (
                      <>
                        <polyline points={points.join(" ")} fill="none" stroke={theme.lime} strokeWidth="2.5" />
                        {points.map((p, i) => {
                          const [x, y] = p.split(",");
                          return <circle key={i} cx={x} cy={y} r="3" fill={theme.lime} />;
                        })}
                      </>
                    );
                  })()}
                </svg>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  {weightHistory.map((w) => (
                    <span key={w.label} style={{ fontSize: 9, color: theme.muted }}>{w.label}</span>
                  ))}
                </div>
              </div>
              <button
                onClick={logWeight}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 6,
                  background: "transparent",
                  border: `1px solid ${theme.border}`,
                  color: theme.text,
                  borderRadius: 10,
                  padding: "11px 0",
                  fontSize: 13,
                  width: "100%",
                  marginBottom: 20,
                }}
              >
                <Scale size={15} /> Log today's weight
              </button>

              <div style={{ fontSize: 10, letterSpacing: 1.5, color: theme.muted, textTransform: "uppercase", marginBottom: 8 }}>Measurements</div>
              <div style={{ background: theme.surface, border: `1px solid ${theme.border}`, borderRadius: 12, padding: "14px", marginBottom: 12 }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 14 }}>
                  {[
                    ["Waist", latestMeasurement.waist, baselineMeasurement.waist],
                    ["Hips", latestMeasurement.hips, baselineMeasurement.hips],
                    ["Chest", latestMeasurement.chest, baselineMeasurement.chest],
                    ["Arms", latestMeasurement.arms, baselineMeasurement.arms],
                  ].map(([label, val, base]) => {
                    const delta = val - base;
                    return (
                      <div key={label}>
                        <div style={{ fontSize: 9, color: theme.muted, textTransform: "uppercase", letterSpacing: 1 }}>{label}</div>
                        <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
                          <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 16, color: theme.text }}>{val}</span>
                          <span style={{ fontSize: 10, color: theme.muted }}>cm</span>
                          {delta !== 0 && <span style={{ fontSize: 10, color: theme.sky }}>{delta > 0 ? "+" : ""}{delta}</span>}
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 10 }}>
                  {["waist", "hips", "chest", "arms"].map((field) => (
                    <input
                      key={field}
                      type="number"
                      placeholder={`${field[0].toUpperCase()}${field.slice(1)} (cm)`}
                      value={measurementForm[field]}
                      onChange={(e) => setMeasurementForm((f) => ({ ...f, [field]: e.target.value }))}
                      style={{ background: theme.surfaceAlt, border: `1px solid ${theme.border}`, borderRadius: 8, padding: "8px 10px", color: theme.text, fontSize: 12, outline: "none" }}
                    />
                  ))}
                </div>
                <button
                  onClick={logMeasurements}
                  style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, width: "100%", background: theme.lime, color: "#12211D", border: "none", borderRadius: 8, padding: "10px 0", fontSize: 12, fontWeight: 600 }}
                >
                  <Ruler size={13} /> Log measurements
                </button>
                {measurementError && (
                  <div style={{ fontSize: 11, color: measurementError === "saved" ? theme.lime : theme.coral, marginTop: 8, textAlign: "center" }}>
                    {measurementError === "saved" ? "✓ Measurements saved" : measurementError}
                  </div>
                )}
              </div>

              <div style={{ fontSize: 10, letterSpacing: 1.5, color: theme.muted, textTransform: "uppercase", marginBottom: 8, marginTop: 8 }}>Progress photos</div>
              <div style={{ marginBottom: 20 }}>
                {photos.length === 0 ? (
                  <div style={{ fontSize: 12, color: theme.muted, marginBottom: 10 }}>No photos yet — add your first to start tracking visually.</div>
                ) : (
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 6, marginBottom: 10 }}>
                    {photos.map((p) => (
                      <img key={p.id} src={p.url} alt="Progress" style={{ width: "100%", aspectRatio: "1", objectFit: "cover", borderRadius: 8, border: `1px solid ${theme.border}` }} />
                    ))}
                  </div>
                )}
                <label
                  htmlFor="photo-upload"
                  style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, width: "100%", border: `1px solid ${theme.border}`, borderRadius: 10, padding: "11px 0", fontSize: 13, color: theme.text, cursor: "pointer" }}
                >
                  <Image size={15} /> Add photo
                </label>
                <input id="photo-upload" type="file" accept="image/*" onChange={handlePhotoUpload} style={{ display: "none" }} />
              </div>

              <div style={{ fontSize: 10, letterSpacing: 1.5, color: theme.muted, textTransform: "uppercase", marginBottom: 8 }}>Badges</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                {badges.map((b) => (
                  <div
                    key={b.id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      background: theme.surface,
                      border: `1px solid ${b.unlocked ? theme.lime : theme.border}`,
                      borderRadius: 10,
                      padding: "10px 12px",
                      opacity: b.unlocked ? 1 : 0.45,
                    }}
                  >
                    <b.icon size={15} color={b.unlocked ? theme.lime : theme.muted} />
                    <span style={{ fontSize: 11, color: theme.text }}>{b.name}</span>
                  </div>
                ))}
              </div>
            </>
          )}

          {activeScreen === "coach" && (
            <div style={{ display: "flex", flexDirection: "column", flex: 1, minHeight: 0 }}>
              <ScreenHeader title="Coach" subtitle="Demo replies for now — real AI comes next" />
              <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: 10, marginBottom: 12 }}>
                {messages.map((m, i) => (
                  <div
                    key={i}
                    style={{
                      alignSelf: m.role === "user" ? "flex-end" : "flex-start",
                      maxWidth: "80%",
                      background: m.role === "user" ? theme.lime : theme.surface,
                      color: m.role === "user" ? "#12211D" : theme.text,
                      border: m.role === "user" ? "none" : `1px solid ${theme.border}`,
                      borderRadius: 12,
                      padding: "9px 12px",
                      fontSize: 13,
                      lineHeight: 1.4,
                    }}
                  >
                    {m.text}
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <input
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                  placeholder="Message your coach…"
                  style={{ flex: 1, background: theme.surface, border: `1px solid ${theme.border}`, borderRadius: 10, padding: "10px 12px", color: theme.text, fontSize: 13, outline: "none" }}
                />
                <button
                  onClick={sendMessage}
                  style={{ background: theme.lime, border: "none", borderRadius: 10, width: 40, display: "flex", alignItems: "center", justifyContent: "center" }}
                >
                  <Send size={15} color="#12211D" />
                </button>
              </div>
            </div>
          )}
        </div>

        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            background: theme.surface,
            borderTop: `1px solid ${theme.border}`,
            display: "flex",
            justifyContent: "space-around",
            padding: "10px 0 14px",
          }}
        >
          {NAV_ITEMS.map(({ key, icon: Icon, label }) => {
            const active = activeScreen === key;
            return (
              <button
                key={key}
                onClick={() => setActiveScreen(key)}
                style={{ background: "none", border: "none", display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}
              >
                <Icon size={17} color={active ? theme.lime : theme.muted} />
                <span style={{ fontSize: 9, color: active ? theme.lime : theme.muted, letterSpacing: 0.3 }}>{label}</span>
              </button>
            );
          })}
        </div>

        {showAddFood && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(8,15,13,0.7)",
              display: "flex",
              alignItems: "flex-end",
              zIndex: 10,
            }}
          >
            <div
              style={{
                width: "100%",
                maxHeight: "82%",
                background: theme.bg,
                borderTopLeftRadius: 24,
                borderTopRightRadius: 24,
                border: `1px solid ${theme.border}`,
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 18px 8px" }}>
                <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 15, fontWeight: 600, color: theme.text }}>Log food</span>
                <button
                  onClick={() => {
                    setShowAddFood(false);
                    setSelectedFood(null);
                    setQuery("");
                  }}
                  style={{ background: "none", border: "none" }}
                >
                  <X size={18} color={theme.muted} />
                </button>
              </div>

              <div style={{ display: "flex", gap: 8, padding: "4px 18px 12px" }}>
                {[
                  { key: "search", label: "Search", icon: Search },
                  { key: "photo", label: "Photo", icon: Camera },
                  { key: "barcode", label: "Barcode", icon: Barcode },
                ].map(({ key, label, icon: Icon }) => (
                  <button
                    key={key}
                    onClick={() => setActiveTab(key)}
                    style={{
                      flex: 1,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 6,
                      padding: "9px 0",
                      borderRadius: 10,
                      border: `1px solid ${activeTab === key ? theme.lime : theme.border}`,
                      background: activeTab === key ? "rgba(201,240,101,0.08)" : "transparent",
                      color: activeTab === key ? theme.lime : theme.muted,
                      fontSize: 12,
                    }}
                  >
                    <Icon size={13} /> {label}
                  </button>
                ))}
              </div>

              {activeTab !== "search" ? (
                <div style={{ padding: "30px 18px", textAlign: "center", color: theme.muted, fontSize: 13 }}>
                  {activeTab === "photo" ? "Photo recognition" : "Barcode scanning"} ships in a later version — search works today.
                </div>
              ) : selectedFood ? (
                <div style={{ padding: "4px 18px 20px" }}>
                  <div style={{ fontSize: 15, color: theme.text, fontWeight: 500, marginBottom: 2 }}>{selectedFood.name}</div>
                  <div style={{ fontSize: 12, color: theme.muted, marginBottom: 16 }}>{selectedFood.serving} per serving</div>

                  <div style={{ display: "flex", gap: 6, marginBottom: 16, flexWrap: "wrap" }}>
                    {MEALS.map((m) => (
                      <button
                        key={m}
                        onClick={() => setTargetMeal(m)}
                        style={{
                          padding: "5px 10px",
                          borderRadius: 8,
                          fontSize: 11,
                          border: `1px solid ${targetMeal === m ? theme.lime : theme.border}`,
                          background: targetMeal === m ? "rgba(201,240,101,0.08)" : "transparent",
                          color: targetMeal === m ? theme.lime : theme.muted,
                        }}
                      >
                        {m}
                      </button>
                    ))}
                  </div>

                  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 18, marginBottom: 18 }}>
                    <button
                      onClick={() => setQty((q) => Math.max(1, q - 1))}
                      style={{ width: 32, height: 32, borderRadius: "50%", border: `1px solid ${theme.border}`, background: theme.surface, color: theme.text }}
                    >
                      −
                    </button>
                    <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 18, color: theme.text, minWidth: 24, textAlign: "center" }}>{qty}</span>
                    <button
                      onClick={() => setQty((q) => q + 1)}
                      style={{ width: 32, height: 32, borderRadius: "50%", border: `1px solid ${theme.border}`, background: theme.surface, color: theme.text }}
                    >
                      +
                    </button>
                  </div>

                  <div style={{ display: "flex", justifyContent: "space-around", marginBottom: 20 }}>
                    {[
                      ["kcal", Math.round(selectedFood.kcal * qty)],
                      ["Protein", `${Math.round(selectedFood.protein * qty)}g`],
                      ["Carbs", `${Math.round(selectedFood.carbs * qty)}g`],
                      ["Fat", `${Math.round(selectedFood.fat * qty)}g`],
                    ].map(([label, val]) => (
                      <div key={label} style={{ textAlign: "center" }}>
                        <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 15, color: theme.text }}>{val}</div>
                        <div style={{ fontSize: 9, color: theme.muted, textTransform: "uppercase", letterSpacing: 1 }}>{label}</div>
                      </div>
                    ))}
                  </div>

                  <div style={{ display: "flex", gap: 8 }}>
                    <button
                      onClick={() => setSelectedFood(null)}
                      style={{ flex: 1, padding: "12px 0", borderRadius: 10, border: `1px solid ${theme.border}`, background: "transparent", color: theme.muted, fontSize: 13 }}
                    >
                      Back
                    </button>
                    <button
                      onClick={addToLog}
                      style={{ flex: 2, padding: "12px 0", borderRadius: 10, border: "none", background: theme.lime, color: "#12211D", fontSize: 13, fontWeight: 600 }}
                    >
                      Add to {targetMeal.toLowerCase()}
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  {quickAddFoods.length > 0 && !query.trim() && (
                    <div style={{ padding: "0 18px 14px" }}>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
                        <span style={{ fontSize: 10, letterSpacing: 1.5, color: theme.muted, textTransform: "uppercase" }}>Quick add · adds to {targetMeal.toLowerCase()}</span>
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                        {quickAddFoods.map((f) => (
                          <button
                            key={f.id}
                            onClick={() => quickAdd(f)}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                              width: "100%",
                              padding: "10px 12px",
                              background: theme.surface,
                              border: `1px solid ${justAddedId === f.id ? theme.lime : theme.border}`,
                              borderRadius: 10,
                              textAlign: "left",
                            }}
                          >
                            <div>
                              <div style={{ fontSize: 13, color: theme.text }}>{f.name}</div>
                              <div style={{ fontSize: 10.5, color: theme.muted }}>{f.serving} · {f.kcal} kcal</div>
                            </div>
                            {justAddedId === f.id ? (
                              <Check size={16} color={theme.lime} />
                            ) : (
                              <div style={{ width: 26, height: 26, borderRadius: "50%", background: theme.surfaceAlt, display: "flex", alignItems: "center", justifyContent: "center" }}>
                                <Plus size={13} color={theme.lime} />
                              </div>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                  <div style={{ padding: "0 18px 10px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, background: theme.surface, border: `1px solid ${theme.border}`, borderRadius: 10, padding: "9px 12px" }}>
                      <Search size={14} color={theme.muted} />
                      <input
                        autoFocus
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search foods…"
                        style={{ flex: 1, background: "transparent", border: "none", outline: "none", color: theme.text, fontSize: 13 }}
                      />
                    </div>
                  </div>
                  <div style={{ overflowY: "auto", padding: "0 18px 20px" }}>
                    {filteredFoods.length === 0 ? (
                      <div style={{ textAlign: "center", color: theme.muted, fontSize: 12, padding: "20px 0" }}>No matches. Try another term.</div>
                    ) : (
                      filteredFoods.map((f) => (
                        <button
                          key={f.id}
                          onClick={() => setSelectedFood(f)}
                          style={{
                            width: "100%",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            padding: "10px 4px",
                            background: "none",
                            border: "none",
                            borderBottom: `1px solid ${theme.border}`,
                            textAlign: "left",
                          }}
                        >
                          <div>
                            <div style={{ fontSize: 13, color: theme.text }}>{f.name}</div>
                            <div style={{ fontSize: 10.5, color: theme.muted }}>{f.serving}</div>
                          </div>
                          <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 12, color: theme.muted }}>{f.kcal} kcal</span>
                        </button>
                      ))
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
