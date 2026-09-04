// Pure helper functions used across screens — no React state, no JSX.
import { FOOD_DB, EXERCISE_FAMILIES, EXERCISE_MEDIA } from "./data";

export const STORAGE_KEY = "fitsync_data_v1";

export function loadSaved() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    return {};
  }
}

export function sumField(log, field) {
  return log.reduce((acc, entry) => acc + entry.food[field] * entry.qty, 0);
}

export function inferMealFromTime() {
  const hour = new Date().getHours();
  if (hour < 11) return "Breakfast";
  if (hour < 15) return "Lunch";
  if (hour < 18) return "Snack";
  return "Dinner";
}

export function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

export function getQuickAddFoods(log, limit = 4) {
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

export function detectFamily(name) {
  const n = name.toLowerCase();
  if (n.includes("squat")) return "squat";
  if (n.includes("press")) return "press";
  if (n.includes("row") || n.includes("pulldown") || n.includes("pull-up") || n.includes("pull up")) return "pull";
  if (n.includes("push-up") || n.includes("push up") || n.includes("dip")) return "push";
  if (n.includes("deadlift") || n.includes("hinge")) return "hinge";
  if (n.includes("lunge")) return "lunge";
  if (n.includes("plank") || n.includes("crunch") || n.includes("dead bug") || n.includes("bird dog")) return "core";
  if (n.includes("curl") && !n.includes("kickback")) return "curl";
  if (n.includes("kickback") || n.includes("tricep")) return "triceps";
  if (n.includes("raise")) return "raise";
  if (n.includes("calf")) return "calf";
  if (n.includes("jack") || n.includes("mountain climber") || n.includes("burpee") || n.includes("high knee")) return "cardio";
  if (
    n.includes("stretch") || n.includes("pose") || n.includes("roll") || n.includes("breathing") ||
    n.includes("twist") || n.includes("fold") || n.includes("bridge") || n.includes("child") ||
    n.includes("cobra") || n.includes("pigeon") || n.includes("butterfly") || n.includes("cat-cow") ||
    n.includes("hydrant") || n.includes("donkey") || n.includes("walking recovery")
  )
    return "mobility";
  return "default";
}

export function buildExerciseDetail(ex) {
  const family = EXERCISE_FAMILIES[detectFamily(ex.name)] || EXERCISE_FAMILIES.default;
  return { ...family, coachTip: ex.tip, name: ex.name, detail: ex.detail };
}

export function getExerciseMedia(name) {
  return EXERCISE_MEDIA[name] || { videoUrl: null, thumbnail: null, duration: null, longVideoUrl: null };
}

export function parseSetsReps(detail) {
  if (!detail) return null;
  const m = detail.match(/(\d+)\s*sets?\s*x\s*(\d+)\s*([a-z ]+)/i);
  if (!m) return null;
  const unit = /rep/i.test(m[3]) ? "reps" : "seconds";
  return { sets: parseInt(m[1]), amount: parseInt(m[2]), unit };
}

export function parseDurationSeconds(detail) {
  if (!detail) return 45;
  const mMin = detail.match(/(\d+)\s*minute/i);
  if (mMin) return parseInt(mMin[1]) * 60;
  const mSec = detail.match(/(\d+)\s*second/i);
  if (mSec) return parseInt(mSec[1]);
  return 45;
}

export function scoreWorkout(w, profile) {
  let score = 0;
  if (profile.goal && w.goal === profile.goal) score += 2;
  if (profile.experience && w.difficulty === profile.experience) score += 1;
  if (profile.equipment && w.equipment === profile.equipment) score += 1;
  return score;
}

export function deriveEquipmentTag(detailed) {
  if (!detailed || detailed.length === 0) return null;
  const hasHeavy = detailed.some((d) => ["Barbells", "Cable machines", "Smith machine", "Gym machines"].includes(d));
  if (hasHeavy) return "Full Gym";
  const hasHome = detailed.some((d) => ["Dumbbells", "Kettlebells", "Bench", "Resistance bands", "Pull-up bar"].includes(d));
  if (hasHome) return "Home - Dumbbells";
  return "Bodyweight Only";
}

