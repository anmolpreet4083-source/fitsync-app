import React, { useState, useMemo, useEffect } from "react";
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
  Globe,
  ChefHat,
  Heart,
} from "lucide-react";
import { theme } from "./theme";
import {
  CUISINES,
  FOOD_DB,
  MEALS,
  initialLog,
  DEFAULT_TARGETS,
  GOALS,
  EXPERIENCE_LEVELS,
  EQUIPMENT_OPTIONS,
  TRAINING_LOCATIONS,
  DETAILED_EQUIPMENT,
  WORKOUT_TYPES,
  WORKOUT_LIBRARY,
  WEIGHT_HISTORY,
  INITIAL_MEASUREMENTS,
  NAV_ITEMS,
} from "./data";
import {
  STORAGE_KEY,
  loadSaved,
  sumField,
  inferMealFromTime,
  getGreeting,
  getQuickAddFoods,
  detectFamily,
  buildExerciseDetail,
  getExerciseMedia,
  parseSetsReps,
  parseDurationSeconds,
  scoreWorkout,
  deriveEquipmentTag,
} from "./helpers";
import { Ring, GradientRing, MacroBar, StatPill, ScreenHeader, Chip, PoseIcon, WorkoutCard } from "./components";









// Maps the richer, multi-select equipment list from Settings down to the simple
// single tag scoreWorkout() and WORKOUT_LIBRARY already use, so recommendations
// stay correct without retagging the whole library.












// Per-exercise media architecture. Each entry can define its own demo clip,
// a longer how-to video, a thumbnail, and a duration label — independent of
// every other exercise. Real videoUrl/thumbnail values are intentionally left
// unset until licensed or self-recorded footage exists; the UI already knows
// how to render whichever ones are present versus falling back to a
// "coming soon" placeholder, so adding real media later is a data-only change.
















export default function FitSyncPrototype() {
  const saved = useMemo(() => loadSaved(), []);
  const [onboarded, setOnboarded] = useState(saved.onboarded ?? false);
  const [onboardStep, setOnboardStep] = useState(1);
  const [profile, setProfile] = useState(saved.profile ?? { name: "", age: "", height: "", startWeight: "", goal: null, experience: null, equipment: null, trainingLocations: [], equipmentDetailed: [], cycleAware: false, cycleStartDate: "", cycleLength: 28 });
  const [targets, setTargets] = useState(saved.targets ?? DEFAULT_TARGETS);
  const [unitsPref, setUnitsPref] = useState(saved.unitsPref ?? "kg");
  const [favorites, setFavorites] = useState(saved.favorites ?? { foods: [], workouts: [] });
  const [showSettings, setShowSettings] = useState(false);
  const [settingsToast, setSettingsToast] = useState(null);
  const [prefsDraft, setPrefsDraft] = useState(null);
  const [showQuickAdd, setShowQuickAdd] = useState(false);
  const [showPlanner, setShowPlanner] = useState(false);
  const [weekPlan, setWeekPlan] = useState(saved.weekPlan ?? { Mon: null, Tue: null, Wed: null, Thu: null, Fri: null, Sat: null, Sun: null });
  const [showWorkoutHistory, setShowWorkoutHistory] = useState(false);
  const [showNutritionHistory, setShowNutritionHistory] = useState(false);
  const [waterLogged, setWaterLogged] = useState(saved.waterLogged ?? 1.8);

  function logWater() {
    setWaterLogged((w) => Math.round(Math.min(w + 0.25, 5) * 100) / 100);
    awardXp(5, "water_logged");
  }

  const [activeScreen, setActiveScreen] = useState("home");
  const [log, setLog] = useState(saved.log ?? initialLog);
  const [showAddFood, setShowAddFood] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedFood, setSelectedFood] = useState(null);
  const [qty, setQty] = useState(1);
  const [targetMeal, setTargetMeal] = useState(inferMealFromTime());
  const [activeTab, setActiveTab] = useState("search");
  const [justAddedId, setJustAddedId] = useState(null);
  const [workoutDone, setWorkoutDone] = useState(saved.workoutDone ?? true);
  const [generatedWorkout, setGeneratedWorkout] = useState(null);
  const [workoutTypeFilter, setWorkoutTypeFilter] = useState("All");
  const [weightHistory, setWeightHistory] = useState(saved.weightHistory ?? WEIGHT_HISTORY);
  const [measurementLog, setMeasurementLog] = useState(saved.measurementLog ?? INITIAL_MEASUREMENTS);
  const [measurementForm, setMeasurementForm] = useState({ waist: "", hips: "", chest: "", arms: "" });
  const [photos, setPhotos] = useState(saved.photos ?? []);
  const [streak, setStreak] = useState(saved.streak ?? 4);
  const [workoutFeedback, setWorkoutFeedback] = useState(null);
  const [measurementError, setMeasurementError] = useState("");
  const [xpToast, setXpToast] = useState(null);
  const [activeSession, setActiveSession] = useState(null);
  const [sessionStats, setSessionStats] = useState({ startTime: null, setsCompleted: 0, prsThisSession: 0 });
  const [showVideoSection, setShowVideoSection] = useState(false);
  const [showSwapMenu, setShowSwapMenu] = useState(false);
  const [showWorkoutComplete, setShowWorkoutComplete] = useState(false);
  const [completedSummary, setCompletedSummary] = useState(null);
  const [currentSets, setCurrentSets] = useState(null);
  const [timer, setTimer] = useState(null);
  const [timerLabel, setTimerLabel] = useState("");
  const [expandedSections, setExpandedSections] = useState({ benefits: false, mistakes: false, alternatives: false });
  const [exerciseHistory, setExerciseHistory] = useState(saved.exerciseHistory ?? {});
  const [recordToast, setRecordToast] = useState(null);
  const [nutritionTab, setNutritionTab] = useState("today");
  const [selectedCuisine, setSelectedCuisine] = useState(null);
  const [dietaryPrefs, setDietaryPrefs] = useState([]);
  const [myRecipes, setMyRecipes] = useState(saved.myRecipes ?? []);
  const [recipeName, setRecipeName] = useState("");
  const [recipeServings, setRecipeServings] = useState(4);
  const [recipeIngredients, setRecipeIngredients] = useState([]);
  const [recipeIngredientPick, setRecipeIngredientPick] = useState(FOOD_DB[0].id);
  const [showRecipeBuilder, setShowRecipeBuilder] = useState(false);
  const [mealSuggestions, setMealSuggestions] = useState(null);
  const [progressTab, setProgressTab] = useState("overview");
  const [goalWeight, setGoalWeight] = useState(saved.goalWeight ?? null);
  const [goalWeightInput, setGoalWeightInput] = useState("");
  const [prCount, setPrCount] = useState(saved.prCount ?? 0);
  const [timeline, setTimeline] = useState(() => (saved.timeline ? saved.timeline.map((t) => ({ ...t, Icon: Award })) : []));
  const [xpLedger, setXpLedger] = useState(saved.xpLedger ?? [{ type: "seed", amount: 210, ts: Date.now() }]);
  const [unlockedAchievementIds, setUnlockedAchievementIds] = useState(saved.unlockedAchievementIds ?? []);
  const [achievementCelebration, setAchievementCelebration] = useState(null);
  const [showAchievements, setShowAchievements] = useState(false);
  const [achievementFilter, setAchievementFilter] = useState("All");
  const [lastWorkoutType, setLastWorkoutType] = useState(null);

  function addTimelineEvent(Icon, text, type) {
    setTimeline((prev) => [{ id: Date.now() + Math.random(), Icon, text, type: type || "other", ts: Date.now(), time: new Date().toLocaleString([], { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" }) }, ...prev].slice(0, 40));
  }

  function showXp(amount) {
    setXpToast(amount);
    setTimeout(() => setXpToast(null), 1600);
  }

  function awardXp(amount, type) {
    setXpLedger((prev) => [...prev, { type, amount, ts: Date.now() }]);
    showXp(amount);
  }

  useEffect(() => {
    if (timer === null) return;
    if (timer <= 0) {
      setTimer(null);
      return;
    }
    const t = setTimeout(() => setTimer((v) => (v !== null ? v - 1 : null)), 1000);
    return () => clearTimeout(t);
  }, [timer]);

  useEffect(() => {
    if (!activeSession) {
      setCurrentSets(null);
      return;
    }
    const ex = activeSession.list[activeSession.index];
    const parsed = parseSetsReps(ex.detail);
    if (parsed && parsed.unit === "reps") {
      setCurrentSets(Array.from({ length: parsed.sets }, () => ({ weight: 10, reps: parsed.amount, done: false })));
    } else {
      setCurrentSets(null);
    }
    setExpandedSections({ benefits: false, mistakes: false, alternatives: false });
    setTimer(null);
  }, [activeSession && activeSession.index, activeSession && activeSession.workout]);
  const [messages, setMessages] = useState([
    { role: "assistant", text: "Hey! I'm your coach. I'll keep an eye on your trends and help you adjust your plan. Ask me anything, or tell me how today's going." },
  ]);
  const [chatInput, setChatInput] = useState("");

  const kcalConsumed = useMemo(() => sumField(log, "kcal"), [log]);
  const proteinConsumed = useMemo(() => sumField(log, "protein"), [log]);
  const carbsConsumed = useMemo(() => sumField(log, "carbs"), [log]);
  const fatConsumed = useMemo(() => sumField(log, "fat"), [log]);
  const fiberConsumed = useMemo(() => log.reduce((acc, e) => acc + (e.food.fiber || 0) * e.qty, 0), [log]);
  const remaining = Math.max(targets.kcal - kcalConsumed, 0);
  const pctKcal = (kcalConsumed / targets.kcal) * 100;

  const cycleDay = useMemo(() => {
    if (!profile.cycleStartDate) return (new Date().getDate() % 28) + 1;
    const start = new Date(profile.cycleStartDate);
    const today = new Date();
    const diffDays = Math.floor((today - start) / (1000 * 60 * 60 * 24));
    const length = profile.cycleLength || 28;
    return ((diffDays % length) + length) % length + 1;
  }, [profile.cycleStartDate, profile.cycleLength]);

  const cyclePhase = useMemo(() => {
    if (cycleDay <= 5) return { name: "Menstrual", advice: "Lighter movement or full rest both make sense today — go with what your body wants.", tip: "Iron-rich foods (leafy greens, lentils, lean meat) can help support energy this week." };
    if (cycleDay <= 13) return { name: "Follicular", advice: "Energy typically rises through this phase — a solid window to push strength progression.", tip: "Good phase to try a slightly heavier set or a new PR if you're feeling strong." };
    if (cycleDay <= 16) return { name: "Ovulation", advice: "Often the highest-energy window in the cycle — great day for higher intensity if you feel good.", tip: "Stay on top of hydration; some people notice higher body temperature around this phase." };
    return { name: "Luteal", advice: "Energy can dip, especially later in this phase — moderate intensity and prioritizing recovery both help.", tip: "Extra sleep and magnesium-rich foods (nuts, seeds, dark chocolate) are commonly reported as helpful here." };
  }, [cycleDay]);
  const cycleLighterPhase = cyclePhase.name === "Menstrual" || cyclePhase.name === "Luteal";

  const filteredFoods = useMemo(() => {
    if (!query.trim()) return FOOD_DB;
    return FOOD_DB.filter((f) => f.name.toLowerCase().includes(query.toLowerCase()));
  }, [query]);

  function addToLog() {
    if (!selectedFood) return;
    setLog((prev) => [...prev, { logId: `${Date.now()}`, meal: targetMeal, food: selectedFood, qty, date: new Date().toDateString() }]);
    setSelectedFood(null);
    setQty(1);
    setQuery("");
    awardXp(10, "food_logged");
  }

  function removeEntry(logId) {
    setLog((prev) => prev.filter((e) => e.logId !== logId));
  }

  function quickAdd(food) {
    setLog((prev) => [...prev, { logId: `${Date.now()}`, meal: targetMeal, food, qty: 1, date: new Date().toDateString() }]);
    setJustAddedId(food.id);
    setTimeout(() => setJustAddedId(null), 900);
    awardXp(10, "food_logged");
  }

  const quickAddFoods = useMemo(() => getQuickAddFoods(log), [log]);

  const coachLine =
    remaining > 0
      ? `You have ${Math.round(remaining)} calories and ${Math.max(Math.round(targets.protein - proteinConsumed), 0)}g protein remaining.`
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
    awardXp(15, "weight_logged");
    addTimelineEvent(Scale, `Logged weight: ${next} kg`, "weight");
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
    awardXp(15, "measurement_logged");
    addTimelineEvent(Ruler, "Logged new measurements", "measurement");
  }

  function startWorkout(name) {
    setWorkoutDone(true);
    setWorkoutFeedback(name);
    setTimeout(() => setWorkoutFeedback(null), 2500);
    awardXp(30, "workout_quick");
    addTimelineEvent(Dumbbell, `Completed ${name}`, "workout");
  }

  function openSession(workout) {
    const list = workout.exerciseList || (workout.exercises && Array.isArray(workout.exercises) ? workout.exercises.map((e) => ({ name: e, detail: "", tip: "Focus on slow, controlled form." })) : []);
    setActiveSession({ workout, list, index: 0 });
    setSessionStats({ startTime: Date.now(), setsCompleted: 0, prsThisSession: 0 });
    setShowVideoSection(false);
    setShowSwapMenu(false);
  }

  function nextExercise() {
    setActiveSession((s) => {
      if (!s) return s;
      if (s.index < s.list.length - 1) return { ...s, index: s.index + 1 };
      return s;
    });
    setShowVideoSection(false);
    setShowSwapMenu(false);
  }

  function prevExercise() {
    setActiveSession((s) => (s && s.index > 0 ? { ...s, index: s.index - 1 } : s));
    setShowVideoSection(false);
    setShowSwapMenu(false);
  }

  function swapExercise(newName) {
    setActiveSession((s) => {
      if (!s) return s;
      const list = [...s.list];
      list[s.index] = { ...list[s.index], name: newName };
      return { ...s, list };
    });
    setShowSwapMenu(false);
  }

  function finishSession() {
    if (!activeSession) return;
    const durationMs = Date.now() - (sessionStats.startTime || Date.now());
    const durationMin = Math.max(1, Math.round(durationMs / 60000));
    setCompletedSummary({
      workoutName: activeSession.workout.name,
      durationMin,
      exercisesCount: activeSession.list.length,
      setsCompleted: sessionStats.setsCompleted,
      xpEarned: 30 + sessionStats.setsCompleted * 5 + sessionStats.prsThisSession * 20,
      prsThisSession: sessionStats.prsThisSession,
    });
    setWorkoutDone(true);
    awardXp(30, "workout_completed");
    setLastWorkoutType(activeSession.workout.type);
    addTimelineEvent(Dumbbell, `Completed ${activeSession.workout.name}`, "workout");
    setActiveSession(null);
    setShowWorkoutComplete(true);
  }

  function updateSet(i, field, delta) {
    setCurrentSets((prev) => {
      if (!prev) return prev;
      const next = [...prev];
      const val = Math.max(field === "weight" ? 0 : 1, next[i][field] + delta);
      next[i] = { ...next[i], [field]: val };
      return next;
    });
  }

  function completeSet(i) {
    const set = currentSets[i];
    setCurrentSets((prev) => {
      const next = [...prev];
      next[i] = { ...next[i], done: true };
      return next;
    });
    awardXp(5, "set_completed");
    setSessionStats((s) => ({ ...s, setsCompleted: s.setsCompleted + 1 }));
    if (i < currentSets.length - 1) {
      setTimer(60);
      setTimerLabel("Rest");
    } else {
      const ex = activeSession.list[activeSession.index];
      checkRecord(ex.name, set);
    }
  }

  function checkRecord(name, set) {
    const prevBest = exerciseHistory[name];
    const improved = !prevBest || set.reps > prevBest.reps || set.weight > prevBest.weight;
    if (improved) {
      setRecordToast(prevBest ? `New record on ${name}!` : null);
      if (prevBest) {
        setTimeout(() => setRecordToast(null), 2200);
        awardXp(20, "pr");
        setPrCount((p) => p + 1);
        setSessionStats((s) => ({ ...s, prsThisSession: s.prsThisSession + 1 }));
        addTimelineEvent(Award, `New PR: ${name} — ${set.weight}kg × ${set.reps}`, "pr");
      }
    }
    setExerciseHistory((prev) => ({ ...prev, [name]: { weight: set.weight, reps: set.reps } }));
  }

  function startDurationTimer(ex) {
    setTimer(parseDurationSeconds(ex.detail));
    setTimerLabel(ex.name);
  }

  function passesDiet(food) {
    if (dietaryPrefs.length === 0) return true;
    return dietaryPrefs.every((pref) => (food.diet || []).includes(pref));
  }

  function addRecipeIngredient() {
    const food = FOOD_DB.find((f) => f.id === recipeIngredientPick);
    if (!food) return;
    setRecipeIngredients((prev) => [...prev, { id: food.id, qty: 1 }]);
  }

  function removeRecipeIngredient(idx) {
    setRecipeIngredients((prev) => prev.filter((_, i) => i !== idx));
  }

  function computeRecipeTotals(ingredients) {
    return ingredients.reduce(
      (acc, ing) => {
        const food = FOOD_DB.find((f) => f.id === ing.id);
        if (!food) return acc;
        acc.kcal += food.kcal * ing.qty;
        acc.protein += food.protein * ing.qty;
        acc.carbs += food.carbs * ing.qty;
        acc.fat += food.fat * ing.qty;
        return acc;
      },
      { kcal: 0, protein: 0, carbs: 0, fat: 0 }
    );
  }

  function saveRecipe() {
    if (!recipeName.trim() || recipeIngredients.length === 0) return;
    const totals = computeRecipeTotals(recipeIngredients);
    setMyRecipes((prev) => [
      ...prev,
      {
        id: Date.now(),
        name: recipeName.trim(),
        servings: recipeServings,
        totals,
        perServing: {
          kcal: Math.round(totals.kcal / recipeServings),
          protein: Math.round(totals.protein / recipeServings),
          carbs: Math.round(totals.carbs / recipeServings),
          fat: Math.round(totals.fat / recipeServings),
        },
      },
    ]);
    setRecipeName("");
    setRecipeServings(4);
    setRecipeIngredients([]);
    setShowRecipeBuilder(false);
    awardXp(15, "recipe_saved");
  }

  function addRecipeServingToLog(recipe) {
    setLog((prev) => [
      ...prev,
      {
        logId: `${Date.now()}`,
        meal: targetMeal,
        food: { id: `recipe-${recipe.id}`, name: recipe.name, serving: "1 serving", kcal: recipe.perServing.kcal, protein: recipe.perServing.protein, carbs: recipe.perServing.carbs, fat: recipe.perServing.fat, fiber: 0 },
        qty: 1,
        date: new Date().toDateString(),
      },
    ]);
    awardXp(10, "recipe_logged");
  }

  function buildMealSuggestions() {
    const remainingKcal = Math.max(targets.kcal - kcalConsumed, 0);
    const remainingProtein = Math.max(targets.protein - proteinConsumed, 0);
    const scored = FOOD_DB.filter(passesDiet)
      .map((f) => {
        const kcalDiff = Math.abs(f.kcal - remainingKcal * 0.4);
        const proteinScore = Math.min(f.protein / (remainingProtein || 1), 1.5);
        return { ...f, _score: proteinScore * 100 - kcalDiff * 0.1 };
      })
      .sort((a, b) => b._score - a._score)
      .slice(0, 3);
    setMealSuggestions(scored);
  }

  function toggleFavoriteFood(id) {
    setFavorites((prev) => ({
      ...prev,
      foods: prev.foods.includes(id) ? prev.foods.filter((x) => x !== id) : [...prev.foods, id],
    }));
  }

  function toggleFavoriteWorkout(id) {
    setFavorites((prev) => ({
      ...prev,
      workouts: prev.workouts.includes(id) ? prev.workouts.filter((x) => x !== id) : [...prev.workouts, id],
    }));
  }

  function openPreferencesEditor() {
    setPrefsDraft({
      experience: profile.experience,
      goal: profile.goal,
      trainingLocations: profile.trainingLocations || [],
      equipmentDetailed: profile.equipmentDetailed || [],
    });
  }

  function toggleDraftMulti(field, value) {
    setPrefsDraft((d) => ({
      ...d,
      [field]: d[field].includes(value) ? d[field].filter((v) => v !== value) : [...d[field], value],
    }));
  }

  function savePreferences() {
    if (!prefsDraft) return;
    const derivedEquipment = deriveEquipmentTag(prefsDraft.equipmentDetailed) || profile.equipment;
    setProfile((p) => ({
      ...p,
      experience: prefsDraft.experience,
      goal: prefsDraft.goal,
      trainingLocations: prefsDraft.trainingLocations,
      equipmentDetailed: prefsDraft.equipmentDetailed,
      equipment: derivedEquipment,
    }));
    setPrefsDraft(null);
    setSettingsToast("Fitness preferences updated");
    setTimeout(() => setSettingsToast(null), 2200);
  }

  function exportData() {
    const blob = new Blob([JSON.stringify({ profile, log, weightHistory, measurementLog, exerciseHistory, timeline, targets }, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "fitsync-data.json";
    a.click();
    URL.revokeObjectURL(url);
  }

  function resetAllData() {
    window.localStorage.removeItem(STORAGE_KEY);
    window.location.reload();
  }

  const nutritionByDay = useMemo(() => {
    const groups = {};
    log.forEach((e) => {
      const day = e.date || new Date().toDateString();
      if (!groups[day]) groups[day] = { kcal: 0, protein: 0, entries: 0 };
      groups[day].kcal += e.food.kcal * e.qty;
      groups[day].protein += e.food.protein * e.qty;
      groups[day].entries += 1;
    });
    return Object.entries(groups).sort((a, b) => new Date(b[0]) - new Date(a[0]));
  }, [log]);

  function nutritionInsight() {
    const proteinPct = (proteinConsumed / targets.protein) * 100;
    const fiberPct = (fiberConsumed / targets.fiber) * 100;
    if (proteinPct >= 90) return { icon: Zap, color: theme.amber, label: "Protein", text: `You're at ${Math.round(proteinPct)}% of your protein goal — right on track.` };
    if (fiberPct < 50) return { icon: Leaf, color: theme.lime, label: "Fiber", text: `You're at ${Math.round(fiberConsumed)}g of ${targets.fiber}g fiber — a piece of fruit or legumes would help.` };
    return { icon: Droplet, color: theme.sky, label: "Hydration", text: "Keep sipping water through the rest of the day — you're doing well overall." };
  }

  const fitsyncScore = useMemo(() => {
    const training = workoutDone ? 90 : 55;
    const nutrition = Math.min(100, Math.round((proteinConsumed / targets.protein) * 100));
    const consistency = Math.min(100, streak * 12);
    const recovery = lastWorkoutType === "Recovery" ? 90 : 72;
    const overall = Math.round((training + nutrition + consistency + recovery) / 4);
    return { overall, training, nutrition, consistency, recovery };
  }, [workoutDone, proteinConsumed, streak, lastWorkoutType]);

  function scoreLabel(score) {
    if (score >= 80) return { text: "GREAT WEEK", color: theme.lime };
    if (score >= 60) return { text: "GOOD PROGRESS", color: theme.sky };
    return { text: "KEEP GOING", color: theme.coral };
  }

  function progressInsight() {
    const weightChange = weightHistory[weightHistory.length - 1].value - weightHistory[0].value;
    const weightStable = Math.abs(weightChange) < 0.5;
    if (weightStable && prCount > 0) {
      return `Your weight has been fairly stable, but you've set ${prCount} new personal record${prCount > 1 ? "s" : ""} and kept a ${streak}-day streak — real progress isn't only on the scale.`;
    }
    if (weightChange > 0 && (profile.goal === "Gain Weight" || profile.goal === "Build Muscle")) {
      return `You're up ${weightChange.toFixed(1)}kg since you started, which lines up with your ${profile.goal.toLowerCase()} goal. Keep your protein consistent to support it.`;
    }
    if (weightChange < 0 && profile.goal === "Lose Fat") {
      return `You're down ${Math.abs(weightChange).toFixed(1)}kg since you started — trending the right way for your goal.`;
    }
    if (streak >= 5) {
      return `Your ${streak}-day streak is the standout this week — consistency like this compounds more than any single workout.`;
    }
    return "Keep logging — the more data FITSYNC has, the more specific this analysis gets.";
  }

  function handlePhotoUpload(e) {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setPhotos((prev) => [...prev, { id: Date.now(), url: reader.result, date: new Date().toLocaleDateString() }]);
      addTimelineEvent(Image, "Added a progress photo", "photo");
      awardXp(10, "photo_added");
    };
    reader.readAsDataURL(file);
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
        reply = `You're on day ${cycleDay} — the ${cyclePhase.name} phase. ${cyclePhase.advice} ${cyclePhase.tip}`;
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

  const xp = useMemo(() => xpLedger.reduce((sum, e) => sum + e.amount, 0), [xpLedger]);
  const level = Math.floor(xp / 150) + 1;
  const xpIntoLevel = xp % 150;

  const workoutsThisWeek = useMemo(() => {
    const weekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
    return timeline.filter((t) => t.type === "workout" && t.ts >= weekAgo).length;
  }, [timeline]);

  useEffect(() => {
    if (!onboarded) return;
    try {
      const toSave = {
        onboarded,
        profile,
        log,
        workoutDone,
        weightHistory,
        measurementLog,
        photos,
        streak,
        exerciseHistory,
        myRecipes,
        goalWeight,
        prCount,
        targets,
        unitsPref,
        favorites,
        weekPlan,
        waterLogged,
        timeline: timeline.map((t) => ({ id: t.id, text: t.text, type: t.type, ts: t.ts, time: t.time })),
        xpLedger,
        unlockedAchievementIds,
      };
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
    } catch (e) {
      // storage full or unavailable — fail silently, app still works in-memory
    }
  }, [onboarded, profile, log, workoutDone, weightHistory, measurementLog, photos, streak, exerciseHistory, myRecipes, goalWeight, prCount, timeline, xpLedger, unlockedAchievementIds, targets, unitsPref, favorites, weekPlan, waterLogged]);

  const totalWorkouts = useMemo(() => timeline.filter((t) => t.type === "workout").length, [timeline]);
  const homeWorkouts = useMemo(() => timeline.filter((t) => t.type === "workout" && t.text.toLowerCase().includes("home")).length, [timeline]);
  const distinctWorkoutNames = useMemo(() => new Set(timeline.filter((t) => t.type === "workout").map((t) => t.text)).size, [timeline]);
  const cuisinesExplored = useMemo(() => new Set(log.map((e) => e.food.cuisine).filter(Boolean)).size, [log]);
  const realWeightLogs = Math.max(0, weightHistory.length - 6);
  const realMeasurementLogs = Math.max(0, measurementLog.length - 1);
  const earlyBirdDone = useMemo(() => timeline.some((t) => t.type === "workout" && new Date(t.ts).getHours() < 8), [timeline]);
  const nightOwlDone = useMemo(() => timeline.some((t) => t.type === "workout" && new Date(t.ts).getHours() >= 21), [timeline]);

  const ACHIEVEMENTS_LIST = useMemo(
    () => [
      { id: "a1", category: "Training", name: "First Rep", desc: "Complete your first workout", icon: Dumbbell, current: totalWorkouts, target: 1, xp: 30 },
      { id: "a2", category: "Training", name: "Getting Started", desc: "Complete 5 workouts", icon: Dumbbell, current: totalWorkouts, target: 5, xp: 40 },
      { id: "a3", category: "Training", name: "Gym Regular", desc: "Complete 25 workouts", icon: Dumbbell, current: totalWorkouts, target: 25, xp: 80 },
      { id: "a4", category: "Training", name: "Home Hero", desc: "Complete 10 workouts at home", icon: HomeIcon, current: homeWorkouts, target: 10, xp: 40 },
      { id: "a5", category: "Nutrition", name: "First Bite", desc: "Log your first meal", icon: Apple, current: log.length, target: 1, xp: 20 },
      { id: "a6", category: "Nutrition", name: "Food Tracker", desc: "Log 10 meals", icon: Apple, current: log.length, target: 10, xp: 30 },
      { id: "a7", category: "Nutrition", name: "World Food Explorer", desc: "Log foods from 5 different cuisines", icon: Globe, current: cuisinesExplored, target: 5, xp: 50 },
      { id: "a8", category: "Nutrition", name: "Home Chef", desc: "Create your first recipe", icon: ChefHat, current: myRecipes.length, target: 1, xp: 30 },
      { id: "a9", category: "Consistency", name: "3-Day Spark", desc: "Reach a 3-day streak", icon: Flame, current: streak, target: 3, xp: 20 },
      { id: "a10", category: "Consistency", name: "7-Day Streak", desc: "Reach a 7-day streak", icon: Flame, current: streak, target: 7, xp: 40 },
      { id: "a11", category: "Consistency", name: "14-Day Momentum", desc: "Reach a 14-day streak", icon: Flame, current: streak, target: 14, xp: 60 },
      { id: "a12", category: "Consistency", name: "Unstoppable", desc: "Reach a 30-day streak", icon: Sparkles, current: streak, target: 30, xp: 100 },
      { id: "a13", category: "Strength", name: "First PR", desc: "Set your first personal record", icon: Award, current: prCount, target: 1, xp: 40 },
      { id: "a14", category: "Strength", name: "Record Breaker", desc: "Set 5 personal records", icon: Award, current: prCount, target: 5, xp: 70 },
      { id: "a15", category: "Strength", name: "Exercise Explorer", desc: "Track history for 5 different exercises", icon: Target, current: Object.keys(exerciseHistory).length, target: 5, xp: 40 },
      { id: "a16", category: "Progress", name: "First Check-In", desc: "Log your weight", icon: Scale, current: realWeightLogs, target: 1, xp: 20 },
      { id: "a17", category: "Progress", name: "Measure Up", desc: "Log body measurements", icon: Ruler, current: realMeasurementLogs, target: 1, xp: 20 },
      { id: "a18", category: "Progress", name: "First Snapshot", desc: "Add a progress photo", icon: Image, current: photos.length, target: 1, xp: 30 },
      { id: "a19", category: "Progress", name: "Goal Setter", desc: "Set a fitness goal", icon: Target, current: profile.goal ? 1 : 0, target: 1, xp: 20 },
      { id: "a20", category: "Special", name: "Early Bird", desc: "Complete a workout before 8 AM", icon: Sparkles, current: earlyBirdDone ? 1 : 0, target: 1, xp: 30 },
      { id: "a21", category: "Special", name: "Night Owl", desc: "Complete a workout after 9 PM", icon: Moon, current: nightOwlDone ? 1 : 0, target: 1, xp: 30 },
      { id: "a22", category: "Special", name: "Workout Explorer", desc: "Try 3 different workouts", icon: Sparkles, current: distinctWorkoutNames, target: 3, xp: 40 },
    ],
    [totalWorkouts, homeWorkouts, log, cuisinesExplored, myRecipes, streak, prCount, exerciseHistory, realWeightLogs, realMeasurementLogs, photos, profile.goal, earlyBirdDone, nightOwlDone, distinctWorkoutNames]
  );

  const achievements = ACHIEVEMENTS_LIST.map((a) => ({ ...a, unlocked: a.current >= a.target }));
  const unlockedCount = achievements.filter((a) => a.unlocked).length;
  const featuredAchievements = [...achievements].sort((a, b) => {
    if (a.unlocked !== b.unlocked) return a.unlocked ? -1 : 1;
    return b.current / b.target - a.current / a.target;
  }).slice(0, 3);

  useEffect(() => {
    const newlyUnlocked = achievements.find((a) => a.unlocked && !unlockedAchievementIds.includes(a.id));
    if (newlyUnlocked) {
      setUnlockedAchievementIds((prev) => [...prev, newlyUnlocked.id]);
      setAchievementCelebration(newlyUnlocked);
      awardXp(newlyUnlocked.xp, "achievement");
      setTimeout(() => setAchievementCelebration(null), 3200);
    }
  }, [achievements, unlockedAchievementIds]);

  const challenges = [
    { id: 1, label: "Log 3 meals today", done: log.length >= 3, xpReward: 20 },
    { id: 2, label: `Hit protein target (${targets.protein}g)`, done: proteinConsumed >= targets.protein, xpReward: 25 },
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
            {[1, 2, 3, 4].map((s) => (
              <div key={s} style={{ flex: 1, height: 3, borderRadius: 2, background: s <= onboardStep ? theme.lime : theme.surfaceAlt }} />
            ))}
          </div>

          {onboardStep === 1 && (
            <>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 20, fontWeight: 600, color: theme.text, marginBottom: 6 }}>About you</div>
              <div style={{ fontSize: 13, color: theme.muted, marginBottom: 20 }}>Optional — helps personalize your experience.</div>
              <input
                value={profile.name}
                onChange={(e) => setProfile((p) => ({ ...p, name: e.target.value }))}
                placeholder="Name"
                style={{ width: "100%", background: theme.surface, border: `1px solid ${theme.border}`, borderRadius: 10, padding: "12px 14px", color: theme.text, fontSize: 13, marginBottom: 10, outline: "none" }}
              />
              <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
                <input
                  type="number"
                  value={profile.age}
                  onChange={(e) => setProfile((p) => ({ ...p, age: e.target.value }))}
                  placeholder="Age"
                  style={{ flex: 1, background: theme.surface, border: `1px solid ${theme.border}`, borderRadius: 10, padding: "12px 14px", color: theme.text, fontSize: 13, outline: "none" }}
                />
                <input
                  type="number"
                  value={profile.height}
                  onChange={(e) => setProfile((p) => ({ ...p, height: e.target.value }))}
                  placeholder="Height (cm)"
                  style={{ flex: 1, background: theme.surface, border: `1px solid ${theme.border}`, borderRadius: 10, padding: "12px 14px", color: theme.text, fontSize: 13, outline: "none" }}
                />
              </div>
              <input
                type="number"
                value={profile.startWeight}
                onChange={(e) => setProfile((p) => ({ ...p, startWeight: e.target.value }))}
                placeholder="Current weight (kg)"
                style={{ width: "100%", background: theme.surface, border: `1px solid ${theme.border}`, borderRadius: 10, padding: "12px 14px", color: theme.text, fontSize: 13, outline: "none" }}
              />
            </>
          )}

          {onboardStep === 2 && (
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

          {onboardStep === 3 && (
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

          {onboardStep === 4 && (
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

              {profile.cycleAware && (
                <div style={{ marginBottom: 20 }}>
                  <div style={{ fontSize: 11, color: theme.muted, marginBottom: 6 }}>First day of your last period</div>
                  <input
                    type="date"
                    value={profile.cycleStartDate}
                    onChange={(e) => setProfile((p) => ({ ...p, cycleStartDate: e.target.value }))}
                    style={{ width: "100%", background: theme.surface, border: `1px solid ${theme.border}`, borderRadius: 10, padding: "10px 12px", color: theme.text, fontSize: 13, marginBottom: 12, outline: "none" }}
                  />
                  <div style={{ fontSize: 11, color: theme.muted, marginBottom: 6 }}>Typical cycle length (days)</div>
                  <input
                    type="number"
                    value={profile.cycleLength}
                    onChange={(e) => setProfile((p) => ({ ...p, cycleLength: Number(e.target.value) || 28 }))}
                    style={{ width: "100%", background: theme.surface, border: `1px solid ${theme.border}`, borderRadius: 10, padding: "10px 12px", color: theme.text, fontSize: 13, outline: "none" }}
                  />
                  <div style={{ fontSize: 10, color: theme.muted, marginTop: 8, lineHeight: 1.4 }}>
                    This is optional and just for general training guidance — not medical tracking. Skip the date and we'll leave this off for now.
                  </div>
                </div>
              )}
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
                if (onboardStep < 4) {
                  setOnboardStep((s) => s + 1);
                } else {
                  setOnboarded(true);
                }
              }}
              disabled={(onboardStep === 2 && !profile.goal) || (onboardStep === 3 && (!profile.experience || !profile.equipment))}
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
                opacity: (onboardStep === 2 && !profile.goal) || (onboardStep === 3 && (!profile.experience || !profile.equipment)) ? 0.4 : 1,
              }}
            >
              {onboardStep < 4 ? "Continue" : "Get Started"} <ChevronRight size={14} />
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
            <button onClick={() => setShowSettings(true)} style={{ background: "none", border: "none", padding: 4 }}>
              <Settings size={18} color={theme.muted} />
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
                      {profile.name ? profile.name : "there"}
                    </span>
                    <span style={{ fontSize: 16 }}>👋</span>
                  </div>
                  <div style={{ fontSize: 11.5, color: theme.muted, marginTop: 1 }}>Keep pushing, you're doing great!</div>
                </div>
              </div>

              <button
                onClick={() => setActiveScreen("progress")}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  width: "100%",
                  background: theme.surface,
                  border: `1px solid ${theme.border}`,
                  borderRadius: 14,
                  padding: "12px 14px",
                  marginBottom: 14,
                  textAlign: "left",
                }}
              >
                <div style={{ textAlign: "center" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 3, justifyContent: "center" }}>
                    <Flame size={14} color={theme.coral} />
                    <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 15, color: theme.text }}>{streak}</span>
                  </div>
                  <div style={{ fontSize: 8.5, color: theme.muted, textTransform: "uppercase" }}>Streak</div>
                </div>
                <div style={{ width: 1, height: 28, background: theme.border }} />
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
                    <span style={{ fontSize: 11, color: theme.text }}>Level {level}</span>
                    <span style={{ fontSize: 9, color: theme.muted }}>{xpIntoLevel}/150 XP</span>
                  </div>
                  <div style={{ height: 5, borderRadius: 3, background: theme.surfaceAlt, overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${(xpIntoLevel / 150) * 100}%`, background: theme.lime, borderRadius: 3 }} />
                  </div>
                </div>
                <div style={{ display: "flex", gap: 4 }}>
                  {achievements.filter((b) => b.unlocked).slice(0, 3).map((b) => (
                    <div key={b.id} style={{ width: 26, height: 26, borderRadius: 8, background: "rgba(201,240,101,0.12)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <b.icon size={12} color={theme.lime} />
                    </div>
                  ))}
                </div>
              </button>

              <div style={{ background: theme.surface, border: `1px solid ${theme.border}`, borderRadius: 14, padding: "14px 16px", marginBottom: 14 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                  <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, fontWeight: 600, color: theme.text }}>Today's Progress</span>
                  <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 15, color: theme.lime, fontWeight: 500 }}>
                    {Math.round(
                      ((Math.min(kcalConsumed / targets.kcal, 1) +
                        Math.min(proteinConsumed / targets.protein, 1) +
                        Math.min(7420 / targets.steps, 1) +
                        Math.min(1.8 / targets.water, 1)) /
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
                        ((Math.min(kcalConsumed / targets.kcal, 1) +
                          Math.min(proteinConsumed / targets.protein, 1) +
                          Math.min(7420 / targets.steps, 1) +
                          Math.min(1.8 / targets.water, 1)) /
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
                  { icon: Flame, color: theme.coral, label: "Calories", value: `${Math.round(kcalConsumed)}`, target: targets.kcal },
                  { icon: Zap, color: theme.amber, label: "Protein", value: `${Math.round(proteinConsumed)}`, target: `${targets.protein}g` },
                  { icon: Footprints, color: theme.lime, label: "Steps", value: "7,420", target: "10k" },
                  { icon: Droplet, color: theme.sky, label: "Water", value: `${waterLogged}`, target: "2.5L" },
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
                  { icon: Droplet, title: "Drink 2.5L Water", subtitle: `${waterLogged} / 2.5 L`, done: waterLogged >= targets.water, onToggle: logWater },
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
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4 }}>
                <ScreenHeader title="Nutrition" subtitle="Your personalized food hub" />
                <button onClick={() => setShowNutritionHistory(true)} style={{ background: theme.surface, border: `1px solid ${theme.border}`, borderRadius: 8, padding: 7 }}>
                  <BarChart3 size={14} color={theme.muted} />
                </button>
              </div>

              <div style={{ display: "flex", gap: 6, marginBottom: 16 }}>
                {[
                  { key: "today", label: "Today" },
                  { key: "explore", label: "Explore" },
                  { key: "meals", label: "Meals" },
                ].map((t) => (
                  <button
                    key={t.key}
                    onClick={() => setNutritionTab(t.key)}
                    style={{
                      flex: 1,
                      padding: "9px 0",
                      borderRadius: 10,
                      fontSize: 12.5,
                      fontWeight: 600,
                      border: `1px solid ${nutritionTab === t.key ? theme.lime : theme.border}`,
                      background: nutritionTab === t.key ? "rgba(201,240,101,0.1)" : "transparent",
                      color: nutritionTab === t.key ? theme.lime : theme.muted,
                    }}
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              {nutritionTab === "today" && (
                <>
                  <button
                    onClick={() => setShowNutritionHistory(true)}
                    style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, width: "100%", background: theme.surface, border: `1px solid ${theme.border}`, color: theme.text, borderRadius: 10, padding: "9px 0", fontSize: 12, marginBottom: 12 }}
                  >
                    View nutrition history <ChevronRight size={13} />
                  </button>
                  <div style={{ background: theme.surface, border: `1px solid ${theme.border}`, borderRadius: 14, padding: "14px 16px", marginBottom: 14 }}>
                    <div style={{ fontSize: 10, letterSpacing: 1, color: theme.muted, textTransform: "uppercase", marginBottom: 4 }}>Today's Nutrition</div>
                    <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 4 }}>
                      <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 26, color: theme.text }}>{Math.round(kcalConsumed)}</span>
                      <span style={{ fontSize: 12, color: theme.muted }}>/ {targets.kcal} kcal</span>
                    </div>
                    <div style={{ height: 7, borderRadius: 4, background: theme.surfaceAlt, overflow: "hidden", marginBottom: 6 }}>
                      <div style={{ height: "100%", width: `${Math.min((kcalConsumed / targets.kcal) * 100, 100)}%`, background: theme.lime, borderRadius: 4 }} />
                    </div>
                    <div style={{ fontSize: 11, color: theme.lime, marginBottom: 12 }}>{Math.max(Math.round(targets.kcal - kcalConsumed), 0)} kcal remaining</div>
                    {[
                      ["Protein", proteinConsumed, targets.protein, theme.coral],
                      ["Carbs", carbsConsumed, targets.carbs, theme.lime],
                      ["Fat", fatConsumed, targets.fat, theme.sky],
                      ["Fiber", fiberConsumed, targets.fiber, theme.amber],
                    ].map(([label, val, target, color]) => (
                      <div key={label} style={{ marginBottom: 6 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
                          <span style={{ fontSize: 10.5, color: theme.muted }}>{label}</span>
                          <span style={{ fontSize: 10.5, color: theme.text, fontFamily: "'IBM Plex Mono', monospace" }}>{Math.round(val)}/{Math.round(target)}g</span>
                        </div>
                        <div style={{ height: 5, borderRadius: 3, background: theme.surfaceAlt, overflow: "hidden" }}>
                          <div style={{ height: "100%", width: `${Math.min((val / target) * 100, 100)}%`, background: color, borderRadius: 3 }} />
                        </div>
                      </div>
                    ))}
                  </div>

                  {(() => {
                    const insight = nutritionInsight();
                    return (
                      <div style={{ display: "flex", alignItems: "center", gap: 10, background: theme.surface, border: `1px solid ${theme.border}`, borderRadius: 12, padding: "11px 14px", marginBottom: 16 }}>
                        <insight.icon size={16} color={insight.color} style={{ flexShrink: 0 }} />
                        <div style={{ fontSize: 12, color: theme.text, lineHeight: 1.4 }}>{insight.text}</div>
                      </div>
                    );
                  })()}

                  <button
                    onClick={() => setShowAddFood(true)}
                    style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, background: theme.lime, color: "#12211D", border: "none", borderRadius: 10, padding: "12px 0", fontSize: 13, fontWeight: 600, marginBottom: 20, width: "100%" }}
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
                            <div key={e.logId} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 10px", background: theme.surface, borderRadius: 10, marginBottom: 6 }}>
                              <div>
                                <div style={{ fontSize: 12.5, color: theme.text }}>{e.food.name} {e.qty > 1 ? `×${e.qty}` : ""}</div>
                                <div style={{ fontSize: 10.5, color: theme.muted }}>{e.food.serving}</div>
                              </div>
                              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                                <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 12, color: theme.text }}>{Math.round(e.food.kcal * e.qty)}</span>
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

              {nutritionTab === "explore" && (
                <>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 10 }}>
                    <Globe size={13} color={theme.muted} style={{ flexShrink: 0 }} />
                    <span style={{ fontSize: 10, letterSpacing: 1, color: theme.muted, textTransform: "uppercase" }}>Browse by cuisine</span>
                  </div>
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 14 }}>
                    <button
                      onClick={() => setSelectedCuisine(null)}
                      style={{ padding: "6px 11px", borderRadius: 8, fontSize: 11, border: `1px solid ${!selectedCuisine ? theme.lime : theme.border}`, background: !selectedCuisine ? "rgba(201,240,101,0.08)" : "transparent", color: !selectedCuisine ? theme.lime : theme.muted }}
                    >
                      All
                    </button>
                    {CUISINES.map((c) => (
                      <button
                        key={c}
                        onClick={() => setSelectedCuisine(c)}
                        style={{ padding: "6px 11px", borderRadius: 8, fontSize: 11, border: `1px solid ${selectedCuisine === c ? theme.lime : theme.border}`, background: selectedCuisine === c ? "rgba(201,240,101,0.08)" : "transparent", color: selectedCuisine === c ? theme.lime : theme.muted }}
                      >
                        {c}
                      </button>
                    ))}
                  </div>

                  <div style={{ fontSize: 10, letterSpacing: 1, color: theme.muted, textTransform: "uppercase", marginBottom: 8 }}>Dietary preferences</div>
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 16 }}>
                    {["vegetarian", "vegan", "glutenFree", "dairyFree"].map((d) => {
                      const active = dietaryPrefs.includes(d);
                      const label = d === "glutenFree" ? "Gluten-free" : d === "dairyFree" ? "Dairy-free" : d[0].toUpperCase() + d.slice(1);
                      return (
                        <button
                          key={d}
                          onClick={() => setDietaryPrefs((prev) => (active ? prev.filter((x) => x !== d) : [...prev, d]))}
                          style={{ padding: "6px 11px", borderRadius: 8, fontSize: 11, border: `1px solid ${active ? theme.sky : theme.border}`, background: active ? "rgba(126,200,227,0.1)" : "transparent", color: active ? theme.sky : theme.muted }}
                        >
                          {label}
                        </button>
                      );
                    })}
                  </div>

                  {FOOD_DB.filter((f) => (!selectedCuisine || f.cuisine === selectedCuisine) && passesDiet(f)).length === 0 ? (
                    <div style={{ fontSize: 12, color: theme.muted, padding: "20px 0", textAlign: "center" }}>No dishes match these filters yet.</div>
                  ) : (
                    FOOD_DB.filter((f) => (!selectedCuisine || f.cuisine === selectedCuisine) && passesDiet(f)).map((f) => (
                      <div key={f.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: theme.surface, border: `1px solid ${theme.border}`, borderRadius: 10, padding: "10px 12px", marginBottom: 6 }}>
                        <div>
                          <div style={{ fontSize: 13, color: theme.text }}>{f.name}</div>
                          <div style={{ fontSize: 10.5, color: theme.muted }}>{f.cuisine} · {f.serving} · {f.kcal} kcal</div>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                          <button onClick={() => toggleFavoriteFood(f.id)} style={{ background: "none", border: "none", padding: 4 }}>
                            <Heart size={15} color={favorites.foods.includes(f.id) ? theme.coral : theme.muted} fill={favorites.foods.includes(f.id) ? theme.coral : "none"} />
                          </button>
                          <button
                            onClick={() => quickAdd(f)}
                            style={{ width: 28, height: 28, borderRadius: "50%", background: theme.surfaceAlt, border: `1px solid ${theme.border}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}
                          >
                            <Plus size={13} color={theme.lime} />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </>
              )}

              {nutritionTab === "meals" && (
                <>
                  <div style={{ background: theme.surface, border: `1px solid ${theme.lime}`, borderRadius: 12, padding: "14px 16px", marginBottom: 20 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                      <Sparkles size={15} color={theme.lime} />
                      <span style={{ fontSize: 13, color: theme.text, fontWeight: 600 }}>AI Meal Builder</span>
                    </div>
                    <div style={{ fontSize: 11.5, color: theme.muted, marginBottom: 10, lineHeight: 1.4 }}>
                      Based on what's left today: {Math.max(Math.round(targets.kcal - kcalConsumed), 0)} kcal and {Math.max(Math.round(targets.protein - proteinConsumed), 0)}g protein remaining.
                    </div>
                    <button
                      onClick={buildMealSuggestions}
                      style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, width: "100%", background: theme.lime, color: "#12211D", border: "none", borderRadius: 10, padding: "10px 0", fontSize: 12.5, fontWeight: 600 }}
                    >
                      Build my meal
                    </button>
                    {mealSuggestions && (
                      <div style={{ marginTop: 12 }}>
                        {mealSuggestions.map((f) => (
                          <div key={f.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: theme.surfaceAlt, borderRadius: 10, padding: "9px 11px", marginBottom: 6 }}>
                            <div>
                              <div style={{ fontSize: 12.5, color: theme.text }}>{f.name}</div>
                              <div style={{ fontSize: 10, color: theme.muted }}>{f.kcal} kcal · {f.protein}g protein</div>
                            </div>
                            <button onClick={() => quickAdd(f)} style={{ background: theme.lime, color: "#12211D", border: "none", borderRadius: 8, padding: "5px 10px", fontSize: 10.5, fontWeight: 600 }}>Add</button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <ChefHat size={14} color={theme.text} />
                      <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, fontWeight: 600, color: theme.text }}>My Recipes</span>
                    </div>
                    <button
                      onClick={() => setShowRecipeBuilder((s) => !s)}
                      style={{ display: "flex", alignItems: "center", gap: 4, background: "transparent", border: `1px solid ${theme.lime}`, color: theme.lime, borderRadius: 8, padding: "6px 10px", fontSize: 11, fontWeight: 600 }}
                    >
                      <Plus size={12} /> Create
                    </button>
                  </div>

                  {showRecipeBuilder && (
                    <div style={{ background: theme.surface, border: `1px solid ${theme.border}`, borderRadius: 12, padding: "14px", marginBottom: 16 }}>
                      <input
                        value={recipeName}
                        onChange={(e) => setRecipeName(e.target.value)}
                        placeholder="Recipe name"
                        style={{ width: "100%", background: theme.surfaceAlt, border: `1px solid ${theme.border}`, borderRadius: 8, padding: "9px 11px", color: theme.text, fontSize: 13, marginBottom: 10, outline: "none" }}
                      />
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                        <span style={{ fontSize: 11, color: theme.muted }}>Servings</span>
                        <button onClick={() => setRecipeServings((s) => Math.max(1, s - 1))} style={{ width: 24, height: 24, borderRadius: 6, border: `1px solid ${theme.border}`, background: theme.surfaceAlt, color: theme.text }}>−</button>
                        <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 13, color: theme.text }}>{recipeServings}</span>
                        <button onClick={() => setRecipeServings((s) => s + 1)} style={{ width: 24, height: 24, borderRadius: 6, border: `1px solid ${theme.border}`, background: theme.surfaceAlt, color: theme.text }}>+</button>
                      </div>

                      <div style={{ display: "flex", gap: 6, marginBottom: 10 }}>
                        <select
                          value={recipeIngredientPick}
                          onChange={(e) => setRecipeIngredientPick(Number(e.target.value))}
                          style={{ flex: 1, background: theme.surfaceAlt, border: `1px solid ${theme.border}`, borderRadius: 8, padding: "9px 8px", color: theme.text, fontSize: 12, outline: "none" }}
                        >
                          {FOOD_DB.map((f) => (
                            <option key={f.id} value={f.id}>{f.name}</option>
                          ))}
                        </select>
                        <button onClick={addRecipeIngredient} style={{ background: theme.lime, color: "#12211D", border: "none", borderRadius: 8, padding: "0 14px", fontSize: 12, fontWeight: 600 }}>Add</button>
                      </div>

                      {recipeIngredients.length > 0 && (
                        <div style={{ marginBottom: 10 }}>
                          {recipeIngredients.map((ing, i) => {
                            const food = FOOD_DB.find((f) => f.id === ing.id);
                            return (
                              <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 12, color: theme.muted, padding: "5px 0" }}>
                                <span>{food ? food.name : "Unknown"}</span>
                                <button onClick={() => removeRecipeIngredient(i)} style={{ background: "none", border: "none" }}>
                                  <X size={12} color={theme.muted} />
                                </button>
                              </div>
                            );
                          })}
                        </div>
                      )}

                      {recipeIngredients.length > 0 && (
                        <div style={{ fontSize: 11, color: theme.sky, marginBottom: 10 }}>
                          Per serving: {Math.round(computeRecipeTotals(recipeIngredients).kcal / recipeServings)} kcal · {Math.round(computeRecipeTotals(recipeIngredients).protein / recipeServings)}g protein
                        </div>
                      )}

                      <button
                        onClick={saveRecipe}
                        style={{ width: "100%", background: theme.lime, color: "#12211D", border: "none", borderRadius: 8, padding: "10px 0", fontSize: 12.5, fontWeight: 600 }}
                      >
                        Save recipe
                      </button>
                    </div>
                  )}

                  {myRecipes.length === 0 ? (
                    <div style={{ fontSize: 12, color: theme.muted, padding: "10px 0" }}>No recipes yet — create one above.</div>
                  ) : (
                    myRecipes.map((r) => (
                      <div key={r.id} style={{ background: theme.surface, border: `1px solid ${theme.border}`, borderRadius: 12, padding: "12px 14px", marginBottom: 8 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                          <span style={{ fontSize: 13, color: theme.text, fontWeight: 600 }}>{r.name}</span>
                          <span style={{ fontSize: 10.5, color: theme.muted }}>{r.servings} servings</span>
                        </div>
                        <div style={{ fontSize: 11, color: theme.muted, marginBottom: 10 }}>
                          Per serving: {r.perServing.kcal} kcal · {r.perServing.protein}g protein · {r.perServing.carbs}g carbs · {r.perServing.fat}g fat
                        </div>
                        <button
                          onClick={() => addRecipeServingToLog(r)}
                          style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, width: "100%", background: "transparent", border: `1px solid ${theme.lime}`, color: theme.lime, borderRadius: 8, padding: "8px 0", fontSize: 12, fontWeight: 600 }}
                        >
                          <Plus size={12} /> Add 1 serving to log
                        </button>
                      </div>
                    ))
                  )}
                </>
              )}
            </>
          )}


          {activeScreen === "workout" && (
            <>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4 }}>
                <ScreenHeader title="Workout" subtitle={`For your goal: ${profile.goal || "Not set"}`} />
                <div style={{ display: "flex", gap: 6 }}>
                  <button onClick={() => setShowPlanner(true)} style={{ background: theme.surface, border: `1px solid ${theme.border}`, borderRadius: 8, padding: 7 }}>
                    <Sparkles size={14} color={theme.muted} />
                  </button>
                  <button onClick={() => setShowWorkoutHistory(true)} style={{ background: theme.surface, border: `1px solid ${theme.border}`, borderRadius: 8, padding: 7 }}>
                    <BarChart3 size={14} color={theme.muted} />
                  </button>
                </div>
              </div>

              <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
                <button onClick={() => setShowPlanner(true)} style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 6, background: theme.surface, border: `1px solid ${theme.border}`, color: theme.text, borderRadius: 10, padding: "9px 0", fontSize: 12 }}>
                  <Target size={13} /> Weekly Planner
                </button>
                <button onClick={() => setShowWorkoutHistory(true)} style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 6, background: theme.surface, border: `1px solid ${theme.border}`, color: theme.text, borderRadius: 10, padding: "9px 0", fontSize: 12 }}>
                  <ChevronRight size={13} /> History
                </button>
              </div>

              {workoutFeedback && (
                <div style={{ display: "flex", alignItems: "center", gap: 8, background: "rgba(201,240,101,0.1)", border: `1px solid ${theme.lime}`, borderRadius: 12, padding: "10px 12px", marginBottom: 14 }}>
                  <Check size={15} color={theme.lime} />
                  <span style={{ fontSize: 12.5, color: theme.text }}>Started <strong>{workoutFeedback}</strong> — marked as today's workout.</span>
                </div>
              )}

              {profile.cycleAware && (
                <div style={{ display: "flex", alignItems: "flex-start", gap: 8, background: theme.surface, border: `1px solid ${theme.border}`, borderRadius: 12, padding: "10px 12px", marginBottom: 14 }}>
                  <Moon size={14} color={theme.sky} style={{ marginTop: 1, flexShrink: 0 }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 12, color: theme.text, fontWeight: 600, marginBottom: 2 }}>
                      Day {cycleDay} · {cyclePhase.name} phase
                    </div>
                    <div style={{ fontSize: 11.5, color: theme.muted, lineHeight: 1.4, marginBottom: 4 }}>{cyclePhase.advice}</div>
                    <div style={{ fontSize: 10.5, color: theme.sky, lineHeight: 1.4 }}>{cyclePhase.tip}</div>
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
                  <div style={{ fontSize: 10, color: theme.muted, marginTop: 8, marginBottom: 10, fontStyle: "italic" }}>Demo output — real AI generation comes next.</div>
                  <button
                    onClick={() => openSession(generatedWorkout)}
                    style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, width: "100%", background: theme.lime, color: "#12211D", border: "none", borderRadius: 8, padding: "9px 0", fontSize: 12, fontWeight: 600 }}
                  >
                    <Play size={12} /> Start this workout
                  </button>
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
                    <WorkoutCard key={w.id} w={w} recommended onStart={() => openSession(w)} isFavorite={favorites.workouts.includes(w.id)} onToggleFavorite={() => toggleFavoriteWorkout(w.id)} />
                  ))}
                </>
              )}

              <div style={{ fontSize: 10, letterSpacing: 1.5, color: theme.muted, textTransform: "uppercase", marginBottom: 8, marginTop: recommended.length > 0 ? 10 : 0 }}>
                {recommended.length > 0 ? "More in library" : "Library"}
              </div>
              {rest.length === 0 && recommended.length === 0 ? (
                <div style={{ fontSize: 12, color: theme.muted, padding: "10px 0" }}>No workouts match this filter.</div>
              ) : (
                rest.map((w) => <WorkoutCard key={w.id} w={w} onStart={() => openSession(w)} isFavorite={favorites.workouts.includes(w.id)} onToggleFavorite={() => toggleFavoriteWorkout(w.id)} />)
              )}
            </>
          )}

          {activeScreen === "progress" && (
            <>
              <ScreenHeader title="Progress" subtitle={`${getGreeting()}, your fitness journey`} />

              <div style={{ display: "flex", gap: 5, marginBottom: 16, flexWrap: "wrap" }}>
                {[
                  { key: "overview", label: "Overview" },
                  { key: "body", label: "Body" },
                  { key: "strength", label: "Strength" },
                  { key: "journey", label: "Journey" },
                ].map((t) => (
                  <button
                    key={t.key}
                    onClick={() => setProgressTab(t.key)}
                    style={{
                      flexShrink: 0,
                      padding: "8px 13px",
                      borderRadius: 9,
                      fontSize: 11.5,
                      fontWeight: 600,
                      border: `1px solid ${progressTab === t.key ? theme.lime : theme.border}`,
                      background: progressTab === t.key ? "rgba(201,240,101,0.1)" : "transparent",
                      color: progressTab === t.key ? theme.lime : theme.muted,
                    }}
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              {progressTab === "overview" && (
                <>
                  <div
                    style={{
                      position: "relative",
                      overflow: "hidden",
                      background: `radial-gradient(circle at 15% 0%, rgba(179,157,255,0.18), transparent 60%), ${theme.surface}`,
                      border: `1px solid ${theme.border}`,
                      borderRadius: 16,
                      padding: "16px 18px",
                      marginBottom: 14,
                    }}
                  >
                    <div style={{ fontSize: 10, letterSpacing: 1.5, color: theme.purple, textTransform: "uppercase", marginBottom: 6, fontWeight: 600 }}>Your Fitness Journey</div>
                    <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 18, color: theme.text, fontWeight: 700, marginBottom: 12 }}>{profile.goal || "Goal not set"}</div>
                    {goalWeight ? (
                      <>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 6 }}>
                          <span style={{ fontSize: 10.5, color: theme.muted }}>{weightHistory[0].value} kg start</span>
                          <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 20, color: theme.purple, fontWeight: 600 }}>
                            {Math.round(Math.min(100, Math.max(0, Math.abs((weightHistory[weightHistory.length - 1].value - weightHistory[0].value) / (goalWeight - weightHistory[0].value)) * 100)))}%
                          </span>
                          <span style={{ fontSize: 10.5, color: theme.muted }}>{goalWeight} kg goal</span>
                        </div>
                        <div style={{ height: 8, borderRadius: 5, background: theme.surfaceAlt, overflow: "hidden" }}>
                          <div
                            style={{
                              height: "100%",
                              borderRadius: 5,
                              background: `linear-gradient(90deg, ${theme.purple}, ${theme.sky})`,
                              boxShadow: `0 0 10px ${theme.purple}88`,
                              width: `${Math.min(100, Math.max(0, Math.abs((weightHistory[weightHistory.length - 1].value - weightHistory[0].value) / (goalWeight - weightHistory[0].value)) * 100))}%`,
                              transition: "width 0.6s ease",
                            }}
                          />
                        </div>
                      </>
                    ) : (
                      <div style={{ fontSize: 12, color: theme.muted }}>Set a goal weight in the Body tab to see your journey progress here.</div>
                    )}
                  </div>

                  <div
                    style={{
                      position: "relative",
                      background: `radial-gradient(circle at 50% -10%, rgba(201,240,101,0.14), transparent 55%), ${theme.surface}`,
                      border: `1px solid ${theme.lime}55`,
                      boxShadow: `0 0 24px rgba(201,240,101,0.08)`,
                      borderRadius: 18,
                      padding: "22px 18px 18px",
                      marginBottom: 14,
                      textAlign: "center",
                    }}
                  >
                    <div style={{ fontSize: 10, letterSpacing: 1.5, color: theme.muted, textTransform: "uppercase", marginBottom: 12 }}>FitSync Score</div>
                    <div style={{ position: "relative", width: 168, height: 168, margin: "0 auto 14px" }}>
                      <GradientRing percent={fitsyncScore.overall} size={168} stroke={14} gradFrom={theme.sky} gradTo={theme.lime} id="score" />
                      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                        <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 44, fontWeight: 700, color: theme.text, lineHeight: 1 }}>{fitsyncScore.overall}</span>
                        <span style={{ fontSize: 9, color: theme.muted, letterSpacing: 1 }}>OUT OF 100</span>
                      </div>
                    </div>
                    <div
                      style={{
                        display: "inline-block",
                        fontSize: 11,
                        fontWeight: 700,
                        letterSpacing: 0.5,
                        color: scoreLabel(fitsyncScore.overall).color,
                        background: `${scoreLabel(fitsyncScore.overall).color}18`,
                        border: `1px solid ${scoreLabel(fitsyncScore.overall).color}55`,
                        borderRadius: 20,
                        padding: "4px 14px",
                        marginBottom: 18,
                      }}
                    >
                      {scoreLabel(fitsyncScore.overall).text}
                    </div>
                    {[
                      ["Training", fitsyncScore.training, theme.coral],
                      ["Nutrition", fitsyncScore.nutrition, theme.amber],
                      ["Consistency", fitsyncScore.consistency, theme.lime],
                      ["Recovery", fitsyncScore.recovery, theme.sky],
                    ].map(([label, val, color]) => (
                      <div key={label} style={{ marginBottom: 9, textAlign: "left" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                          <span style={{ fontSize: 11, color: theme.muted }}>{label}</span>
                          <span style={{ fontSize: 11, color: theme.text, fontFamily: "'IBM Plex Mono', monospace" }}>{val}%</span>
                        </div>
                        <div style={{ height: 6, borderRadius: 3, background: theme.surfaceAlt, overflow: "hidden" }}>
                          <div style={{ height: "100%", width: `${val}%`, background: `linear-gradient(90deg, ${color}99, ${color})`, borderRadius: 3, boxShadow: `0 0 6px ${color}66`, transition: "width 0.6s ease" }} />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div style={{ display: "flex", alignItems: "flex-start", gap: 10, background: theme.surface, border: `1px solid ${theme.lime}`, borderRadius: 12, padding: "12px 14px", marginBottom: 14 }}>
                    <Bot size={16} color={theme.lime} style={{ flexShrink: 0, marginTop: 1 }} />
                    <div>
                      <div style={{ fontSize: 10, letterSpacing: 1, color: theme.lime, textTransform: "uppercase", marginBottom: 4 }}>FitSync Analysis</div>
                      <div style={{ fontSize: 12, color: theme.text, lineHeight: 1.5 }}>{progressInsight()}</div>
                    </div>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                    <div style={{ background: theme.surface, border: `1px solid ${theme.border}`, borderRadius: 12, padding: "12px 14px" }}>
                      <div style={{ fontSize: 9, color: theme.muted, textTransform: "uppercase", marginBottom: 4 }}>Weight</div>
                      <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 17, color: theme.text }}>{weightHistory[weightHistory.length - 1].value} kg</div>
                    </div>
                    <div style={{ background: theme.surface, border: `1px solid ${theme.border}`, borderRadius: 12, padding: "12px 14px" }}>
                      <div style={{ fontSize: 9, color: theme.muted, textTransform: "uppercase", marginBottom: 4 }}>PRs set</div>
                      <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 17, color: theme.text }}>{prCount}</div>
                    </div>
                    <div style={{ background: theme.surface, border: `1px solid ${theme.border}`, borderRadius: 12, padding: "12px 14px" }}>
                      <div style={{ fontSize: 9, color: theme.muted, textTransform: "uppercase", marginBottom: 4 }}>Workouts this week</div>
                      <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 17, color: theme.text }}>{workoutsThisWeek}</div>
                    </div>
                    <div style={{ background: theme.surface, border: `1px solid ${theme.border}`, borderRadius: 12, padding: "12px 14px" }}>
                      <div style={{ fontSize: 9, color: theme.muted, textTransform: "uppercase", marginBottom: 4 }}>Streak</div>
                      <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 17, color: theme.text }}>🔥 {streak}</div>
                    </div>
                  </div>
                </>
              )}

              {progressTab === "body" && (
                <>
                  <div style={{ fontSize: 10, letterSpacing: 1.5, color: theme.muted, textTransform: "uppercase", marginBottom: 8 }}>Goal Weight</div>
                  <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
                    <input
                      type="number"
                      value={goalWeightInput}
                      onChange={(e) => setGoalWeightInput(e.target.value)}
                      placeholder={goalWeight ? `Current: ${goalWeight}kg` : "e.g. 58"}
                      style={{ flex: 1, background: theme.surface, border: `1px solid ${theme.border}`, borderRadius: 10, padding: "10px 12px", color: theme.text, fontSize: 13, outline: "none" }}
                    />
                    <button
                      onClick={() => { if (goalWeightInput) { setGoalWeight(Number(goalWeightInput)); setGoalWeightInput(""); } }}
                      style={{ background: theme.purple, color: "#12211D", border: "none", borderRadius: 10, padding: "0 16px", fontSize: 12.5, fontWeight: 600 }}
                    >
                      Set
                    </button>
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
                    style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, background: "transparent", border: `1px solid ${theme.border}`, color: theme.text, borderRadius: 10, padding: "11px 0", fontSize: 13, width: "100%", marginBottom: 20 }}
                  >
                    <Scale size={15} /> Log today's weight
                  </button>

                  <div style={{ fontSize: 10, letterSpacing: 1.5, color: theme.muted, textTransform: "uppercase", marginBottom: 8 }}>Body Change Since Start</div>
                  <div style={{ background: theme.surface, border: `1px solid ${theme.border}`, borderRadius: 12, padding: "14px", marginBottom: 12 }}>
                    {[
                      ["Waist", measurementLog[measurementLog.length - 1].waist - measurementLog[0].waist],
                      ["Hips", measurementLog[measurementLog.length - 1].hips - measurementLog[0].hips],
                      ["Chest", measurementLog[measurementLog.length - 1].chest - measurementLog[0].chest],
                      ["Arms", measurementLog[measurementLog.length - 1].arms - measurementLog[0].arms],
                    ].map(([label, delta]) => (
                      <div key={label} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: `1px solid ${theme.border}` }}>
                        <span style={{ fontSize: 12, color: theme.muted }}>{label}</span>
                        <span style={{ fontSize: 12, color: delta === 0 ? theme.muted : theme.sky, fontFamily: "'IBM Plex Mono', monospace" }}>{delta > 0 ? "+" : ""}{delta} cm</span>
                      </div>
                    ))}
                  </div>

                  <div style={{ background: theme.surface, border: `1px solid ${theme.border}`, borderRadius: 12, padding: "14px", marginBottom: 20 }}>
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

                  <div style={{ fontSize: 10, letterSpacing: 1.5, color: theme.muted, textTransform: "uppercase", marginBottom: 8 }}>Progress Photos</div>
                  <div>
                    {photos.length === 0 ? (
                      <div style={{ fontSize: 12, color: theme.muted, marginBottom: 10 }}>No photos yet — add your first to start tracking visually.</div>
                    ) : (
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 6, marginBottom: 10 }}>
                        {photos.map((p) => (
                          <img key={p.id} src={p.url} alt="Progress" style={{ width: "100%", aspectRatio: "1", objectFit: "cover", borderRadius: 8, border: `1px solid ${theme.border}` }} />
                        ))}
                      </div>
                    )}
                    <label htmlFor="photo-upload" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, width: "100%", border: `1px solid ${theme.border}`, borderRadius: 10, padding: "11px 0", fontSize: 13, color: theme.text, cursor: "pointer" }}>
                      <Image size={15} /> Add photo
                    </label>
                    <input id="photo-upload" type="file" accept="image/*" onChange={handlePhotoUpload} style={{ display: "none" }} />
                  </div>
                </>
              )}

              {progressTab === "strength" && (
                <>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 18 }}>
                    <div style={{ background: theme.surface, border: `1px solid ${theme.border}`, borderRadius: 12, padding: "14px", textAlign: "center" }}>
                      <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 26, color: theme.lime, fontWeight: 700 }}>{prCount}</div>
                      <div style={{ fontSize: 10, color: theme.muted, textTransform: "uppercase" }}>Total PRs</div>
                    </div>
                    <div style={{ background: theme.surface, border: `1px solid ${theme.border}`, borderRadius: 12, padding: "14px", textAlign: "center" }}>
                      <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 26, color: theme.text, fontWeight: 700 }}>{Object.keys(exerciseHistory).length}</div>
                      <div style={{ fontSize: 10, color: theme.muted, textTransform: "uppercase" }}>Exercises tracked</div>
                    </div>
                  </div>

                  <div style={{ fontSize: 10, letterSpacing: 1.5, color: theme.muted, textTransform: "uppercase", marginBottom: 8 }}>Personal Bests</div>
                  {Object.keys(exerciseHistory).length === 0 ? (
                    <div style={{ fontSize: 12, color: theme.muted, padding: "20px 0", textAlign: "center" }}>
                      Complete a set-based exercise in a workout session to start tracking personal bests here.
                    </div>
                  ) : (
                    Object.entries(exerciseHistory).map(([name, best]) => (
                      <div key={name} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: theme.surface, border: `1px solid ${theme.border}`, borderRadius: 10, padding: "10px 12px", marginBottom: 6 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                          <PoseIcon family={detectFamily(name)} color={theme.lime} size={26} />
                          <span style={{ fontSize: 12.5, color: theme.text }}>{name}</span>
                        </div>
                        <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 12, color: theme.lime }}>{best.weight}kg × {best.reps}</span>
                      </div>
                    ))
                  )}
                </>
              )}

              {progressTab === "journey" && (
                <>
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

                  <div style={{ fontSize: 10, letterSpacing: 1.5, color: theme.muted, textTransform: "uppercase", marginBottom: 8 }}>Timeline</div>
                  <div style={{ marginBottom: 20 }}>
                    {timeline.length === 0 ? (
                      <div style={{ fontSize: 12, color: theme.muted, padding: "10px 0" }}>Nothing logged yet — complete a workout or log your weight to start your timeline.</div>
                    ) : (
                      timeline.map((t) => (
                        <div key={t.id} style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 10 }}>
                          <div style={{ width: 28, height: 28, borderRadius: 8, background: theme.surface, border: `1px solid ${theme.border}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                            <t.Icon size={13} color={theme.lime} />
                          </div>
                          <div>
                            <div style={{ fontSize: 12, color: theme.text }}>{t.text}</div>
                            <div style={{ fontSize: 10, color: theme.muted }}>{t.time}</div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
                    <span style={{ fontSize: 10, letterSpacing: 1.5, color: theme.muted, textTransform: "uppercase" }}>Featured Achievements</span>
                    <span style={{ fontSize: 10.5, color: theme.lime }}>{unlockedCount} unlocked</span>
                  </div>
                  <div style={{ marginBottom: 10 }}>
                    {featuredAchievements.map((a) => (
                      <div key={a.id} style={{ background: theme.surface, border: `1px solid ${a.unlocked ? theme.lime : theme.border}`, borderRadius: 12, padding: "12px 14px", marginBottom: 8 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: a.unlocked ? 0 : 8 }}>
                          <div style={{ width: 32, height: 32, borderRadius: 9, background: a.unlocked ? "rgba(201,240,101,0.12)" : theme.surfaceAlt, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                            <a.icon size={15} color={a.unlocked ? theme.lime : theme.muted} />
                          </div>
                          <div style={{ flex: 1 }}>
                            <div style={{ fontSize: 12.5, color: theme.text, fontWeight: 500 }}>{a.name}</div>
                            {a.unlocked && <div style={{ fontSize: 10.5, color: theme.muted }}>{a.desc}</div>}
                          </div>
                          {a.unlocked && <Check size={16} color={theme.lime} />}
                        </div>
                        {!a.unlocked && (
                          <>
                            <div style={{ fontSize: 10.5, color: theme.muted, marginBottom: 6 }}>{a.desc}</div>
                            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                              <div style={{ flex: 1, height: 5, borderRadius: 3, background: theme.surfaceAlt, overflow: "hidden" }}>
                                <div style={{ height: "100%", width: `${Math.min(100, (a.current / a.target) * 100)}%`, background: theme.lime, borderRadius: 3 }} />
                              </div>
                              <span style={{ fontSize: 10, color: theme.muted, fontFamily: "'IBM Plex Mono', monospace", flexShrink: 0 }}>{a.current}/{a.target}</span>
                            </div>
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => setShowAchievements(true)}
                    style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, width: "100%", background: "transparent", border: `1px solid ${theme.lime}`, color: theme.lime, borderRadius: 10, padding: "11px 0", fontSize: 12.5, fontWeight: 600 }}
                  >
                    View all achievements <ChevronRight size={14} />
                  </button>
                </>
              )}
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

        {activeSession && (() => {
          const ex = activeSession.list[activeSession.index];
          const detail = buildExerciseDetail(ex);
          const media = getExerciseMedia(ex.name);
          const isLast = activeSession.index === activeSession.list.length - 1;
          const prevRecord = exerciseHistory[ex.name];
          return (
            <div style={{ position: "absolute", inset: 0, background: theme.bg, zIndex: 30, display: "flex", flexDirection: "column" }}>
              <div style={{ padding: "20px 22px 0" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
                  <button onClick={() => setActiveSession(null)} style={{ background: "none", border: "none", padding: 4 }}>
                    <X size={18} color={theme.muted} />
                  </button>
                  <span style={{ fontSize: 11, color: theme.muted, fontFamily: "'IBM Plex Mono', monospace" }}>
                    {activeSession.index + 1} / {activeSession.list.length}
                  </span>
                </div>
                <div style={{ fontSize: 12, color: theme.muted, marginBottom: 12 }}>{activeSession.workout.name}</div>
                <div style={{ height: 4, borderRadius: 3, background: theme.surfaceAlt, overflow: "hidden", marginBottom: 16 }}>
                  <div style={{ height: "100%", borderRadius: 3, background: theme.lime, width: `${((activeSession.index + 1) / activeSession.list.length) * 100}%`, transition: "width 0.3s ease" }} />
                </div>
              </div>

              <div style={{ flex: 1, overflowY: "auto", padding: "0 22px 20px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 14 }}>
                  <div style={{ width: 68, height: 68, borderRadius: 14, background: theme.surface, border: `1px solid ${theme.border}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <PoseIcon family={detectFamily(ex.name)} color={theme.lime} size={44} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 19, fontWeight: 700, color: theme.text, lineHeight: 1.2, marginBottom: 3 }}>{ex.name}</div>
                    <div style={{ fontSize: 11, color: theme.muted }}>{detail.category}</div>
                  </div>
                  <div style={{ position: "relative" }}>
                    <button
                      onClick={() => setShowSwapMenu((s) => !s)}
                      style={{ display: "flex", alignItems: "center", gap: 4, background: theme.surface, border: `1px solid ${theme.border}`, borderRadius: 8, padding: "6px 10px", fontSize: 10.5, color: theme.muted }}
                    >
                      Swap
                    </button>
                    {showSwapMenu && (
                      <div style={{ position: "absolute", top: 32, right: 0, background: theme.surface, border: `1px solid ${theme.border}`, borderRadius: 10, padding: 6, width: 190, boxShadow: "0 10px 24px rgba(0,0,0,0.5)", zIndex: 5 }}>
                        {[
                          ["Easier", detail.alternatives.easier],
                          ["Harder", detail.alternatives.harder],
                          ["No equipment", detail.alternatives.noEquipment],
                        ].map(([label, altName]) => (
                          <button
                            key={label}
                            onClick={() => swapExercise(altName)}
                            style={{ display: "block", width: "100%", textAlign: "left", background: "none", border: "none", padding: "8px 8px", borderRadius: 6, fontSize: 11.5, color: theme.text }}
                          >
                            <span style={{ color: theme.muted, fontSize: 9.5, display: "block", textTransform: "uppercase", letterSpacing: 0.5 }}>{label}</span>
                            {altName}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 14 }}>
                  {detail.primary.map((m) => (
                    <span key={m} style={{ fontSize: 10, color: theme.lime, background: "rgba(201,240,101,0.1)", border: `1px solid ${theme.lime}`, borderRadius: 6, padding: "3px 8px" }}>{m}</span>
                  ))}
                  {detail.secondary.map((m) => (
                    <span key={m} style={{ fontSize: 10, color: theme.muted, background: theme.surfaceAlt, border: `1px solid ${theme.border}`, borderRadius: 6, padding: "3px 8px" }}>{m}</span>
                  ))}
                </div>

                <div style={{ marginBottom: 14 }}>
                  <button
                    onClick={() => setShowVideoSection((s) => !s)}
                    style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", background: theme.surface, border: `1px solid ${theme.border}`, borderRadius: 10, padding: "11px 14px" }}
                  >
                    <span style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12.5, color: theme.text, fontWeight: 500 }}>
                      <Play size={13} color={theme.lime} /> Demonstration video
                    </span>
                    <ChevronRight size={14} color={theme.muted} style={{ transform: showVideoSection ? "rotate(90deg)" : "none", transition: "transform 0.15s" }} />
                  </button>
                  {showVideoSection && (
                    <div style={{ marginTop: 8 }}>
                      {media.videoUrl ? (
                        <video src={media.videoUrl} poster={media.thumbnail || undefined} controls loop style={{ width: "100%", borderRadius: 10, background: "#000" }} />
                      ) : (
                        <div style={{ background: theme.surfaceAlt, border: `1px dashed ${theme.border}`, borderRadius: 10, padding: "26px 14px", textAlign: "center" }}>
                          <Play size={20} color={theme.muted} style={{ marginBottom: 8 }} />
                          <div style={{ fontSize: 12, color: theme.muted }}>Video guide coming soon</div>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {ex.detail && (
                  <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 15, color: theme.text, marginBottom: 12 }}>{ex.detail}</div>
                )}

                {prevRecord && (
                  <div style={{ fontSize: 11, color: theme.sky, marginBottom: 12 }}>
                    Last time: {prevRecord.weight}kg × {prevRecord.reps}
                  </div>
                )}

                <div style={{ background: theme.surface, border: `1px solid ${theme.border}`, borderRadius: 12, padding: "12px 14px", marginBottom: 14 }}>
                  <div style={{ fontSize: 10, letterSpacing: 1, color: theme.lime, textTransform: "uppercase", marginBottom: 6 }}>Coach Tip</div>
                  <div style={{ fontSize: 13, color: theme.text, lineHeight: 1.5 }}>{detail.coachTip}</div>
                </div>

                {currentSets ? (
                  <div style={{ marginBottom: 16 }}>
                    <div style={{ fontSize: 10, letterSpacing: 1, color: theme.muted, textTransform: "uppercase", marginBottom: 8 }}>Your Sets</div>
                    {currentSets.map((set, i) => (
                      <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 10px", background: theme.surface, border: `1px solid ${set.done ? theme.lime : theme.border}`, borderRadius: 10, marginBottom: 6 }}>
                        <span style={{ fontSize: 11, color: theme.muted, width: 16 }}>{i + 1}</span>
                        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                          <button disabled={set.done} onClick={() => updateSet(i, "weight", -2.5)} style={{ width: 22, height: 22, borderRadius: 6, border: `1px solid ${theme.border}`, background: theme.surfaceAlt, color: theme.text, fontSize: 12 }}>−</button>
                          <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 12, color: theme.text, minWidth: 42, textAlign: "center" }}>{set.weight}kg</span>
                          <button disabled={set.done} onClick={() => updateSet(i, "weight", 2.5)} style={{ width: 22, height: 22, borderRadius: 6, border: `1px solid ${theme.border}`, background: theme.surfaceAlt, color: theme.text, fontSize: 12 }}>+</button>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                          <button disabled={set.done} onClick={() => updateSet(i, "reps", -1)} style={{ width: 22, height: 22, borderRadius: 6, border: `1px solid ${theme.border}`, background: theme.surfaceAlt, color: theme.text, fontSize: 12 }}>−</button>
                          <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 12, color: theme.text, minWidth: 34, textAlign: "center" }}>{set.reps}r</span>
                          <button disabled={set.done} onClick={() => updateSet(i, "reps", 1)} style={{ width: 22, height: 22, borderRadius: 6, border: `1px solid ${theme.border}`, background: theme.surfaceAlt, color: theme.text, fontSize: 12 }}>+</button>
                        </div>
                        <div style={{ flex: 1 }} />
                        {set.done ? (
                          <Check size={16} color={theme.lime} />
                        ) : (
                          <button onClick={() => completeSet(i)} style={{ background: theme.lime, color: "#12211D", border: "none", borderRadius: 8, padding: "5px 10px", fontSize: 10.5, fontWeight: 600 }}>Complete</button>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div style={{ background: theme.surface, border: `1px solid ${theme.border}`, borderRadius: 12, padding: "14px", marginBottom: 16, textAlign: "center" }}>
                    {ex.detail && /second|minute/i.test(ex.detail) ? (
                      <button onClick={() => startDurationTimer(ex)} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, width: "100%", background: theme.lime, color: "#12211D", border: "none", borderRadius: 10, padding: "11px 0", fontSize: 13, fontWeight: 600 }}>
                        <Play size={13} /> Start timer
                      </button>
                    ) : (
                      <button onClick={() => awardXp(10, "duration_exercise")} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, width: "100%", background: theme.lime, color: "#12211D", border: "none", borderRadius: 10, padding: "11px 0", fontSize: 13, fontWeight: 600 }}>
                        <Check size={13} /> Mark complete
                      </button>
                    )}
                  </div>
                )}

                {timer !== null && (
                  <div style={{ background: theme.surface, border: `1px solid ${theme.lime}`, borderRadius: 12, padding: "16px", marginBottom: 16, textAlign: "center" }}>
                    <div style={{ fontSize: 10, letterSpacing: 1.5, color: theme.muted, textTransform: "uppercase", marginBottom: 4 }}>{timerLabel === "Rest" ? "Rest" : timerLabel}</div>
                    <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 32, color: theme.lime, marginBottom: 10 }}>{timer}</div>
                    <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
                      {timerLabel === "Rest" && (
                        <button onClick={() => setTimer((t) => (t !== null ? t + 15 : 15))} style={{ border: `1px solid ${theme.border}`, background: "transparent", color: theme.text, borderRadius: 8, padding: "6px 12px", fontSize: 11 }}>+15 sec</button>
                      )}
                      <button onClick={() => setTimer(null)} style={{ border: `1px solid ${theme.border}`, background: "transparent", color: theme.muted, borderRadius: 8, padding: "6px 12px", fontSize: 11 }}>Skip</button>
                    </div>
                  </div>
                )}

                {[
                  { key: "benefits", label: "Benefits", items: detail.benefits },
                  { key: "steps", label: "How to do it", items: detail.steps, numbered: true, alwaysOpen: true },
                  { key: "mistakes", label: "Common mistakes", items: detail.mistakes },
                ].map((section) => (
                  <div key={section.key} style={{ marginBottom: 10 }}>
                    <button
                      onClick={() => !section.alwaysOpen && setExpandedSections((s) => ({ ...s, [section.key]: !s[section.key] }))}
                      style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", background: theme.surface, border: `1px solid ${theme.border}`, borderRadius: 10, padding: "11px 14px" }}
                    >
                      <span style={{ fontSize: 12.5, color: theme.text, fontWeight: 500 }}>{section.label}</span>
                      {!section.alwaysOpen && <ChevronRight size={14} color={theme.muted} style={{ transform: expandedSections[section.key] ? "rotate(90deg)" : "none", transition: "transform 0.15s" }} />}
                    </button>
                    {(section.alwaysOpen || expandedSections[section.key]) && (
                      <div style={{ padding: "10px 14px 4px" }}>
                        {section.items.map((item, i) => (
                          <div key={i} style={{ display: "flex", gap: 8, marginBottom: 8, fontSize: 12, color: theme.muted, lineHeight: 1.5 }}>
                            <span style={{ color: theme.lime, flexShrink: 0 }}>{section.numbered ? `${i + 1}.` : "•"}</span>
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}

                <div style={{ marginBottom: 4 }}>
                  <button
                    onClick={() => setExpandedSections((s) => ({ ...s, alternatives: !s.alternatives }))}
                    style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", background: theme.surface, border: `1px solid ${theme.border}`, borderRadius: 10, padding: "11px 14px" }}
                  >
                    <span style={{ fontSize: 12.5, color: theme.text, fontWeight: 500 }}>Alternatives</span>
                    <ChevronRight size={14} color={theme.muted} style={{ transform: expandedSections.alternatives ? "rotate(90deg)" : "none", transition: "transform 0.15s" }} />
                  </button>
                  {expandedSections.alternatives && (
                    <div style={{ padding: "10px 14px 4px", fontSize: 12, color: theme.muted, lineHeight: 1.7 }}>
                      <div><strong style={{ color: theme.text }}>Too hard?</strong> {detail.alternatives.easier}</div>
                      <div><strong style={{ color: theme.text }}>Want more?</strong> {detail.alternatives.harder}</div>
                      <div><strong style={{ color: theme.text }}>No equipment?</strong> {detail.alternatives.noEquipment}</div>
                    </div>
                  )}
                </div>
              </div>

              <div style={{ padding: "14px 22px 20px", display: "flex", gap: 10 }}>
                {activeSession.index > 0 && (
                  <button onClick={prevExercise} style={{ flex: 1, padding: "14px 0", borderRadius: 12, border: `1px solid ${theme.border}`, background: "transparent", color: theme.muted, fontSize: 14 }}>Back</button>
                )}
                {!isLast ? (
                  <button onClick={nextExercise} style={{ flex: 2, padding: "14px 0", borderRadius: 12, border: "none", background: theme.lime, color: "#12211D", fontSize: 14, fontWeight: 600 }}>Next exercise</button>
                ) : (
                  <button onClick={finishSession} style={{ flex: 2, display: "flex", alignItems: "center", justifyContent: "center", gap: 6, padding: "14px 0", borderRadius: 12, border: "none", background: theme.lime, color: "#12211D", fontSize: 14, fontWeight: 600 }}>
                    <Check size={16} /> Finish workout
                  </button>
                )}
              </div>
            </div>
          );
        })()}

        {recordToast && (
          <div style={{ position: "absolute", top: 70, left: "50%", transform: "translateX(-50%)", background: theme.coral, color: "#12211D", fontFamily: "'IBM Plex Mono', monospace", fontSize: 12, fontWeight: 600, padding: "6px 14px", borderRadius: 20, boxShadow: "0 6px 16px rgba(0,0,0,0.4)", zIndex: 35, whiteSpace: "nowrap" }}>
            🔥 {recordToast}
          </div>
        )}

        {showAchievements && (
          <div style={{ position: "absolute", inset: 0, background: theme.bg, zIndex: 30, display: "flex", flexDirection: "column" }}>
            <div style={{ padding: "20px 20px 0" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
                <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 18, fontWeight: 700, color: theme.text }}>Achievements</span>
                <button onClick={() => setShowAchievements(false)} style={{ background: "none", border: "none", padding: 4 }}>
                  <X size={18} color={theme.muted} />
                </button>
              </div>
              <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
                <div style={{ flex: 1, background: theme.surface, border: `1px solid ${theme.border}`, borderRadius: 10, padding: "10px", textAlign: "center" }}>
                  <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 18, color: theme.lime }}>{unlockedCount}</div>
                  <div style={{ fontSize: 9, color: theme.muted, textTransform: "uppercase" }}>Unlocked</div>
                </div>
                <div style={{ flex: 1, background: theme.surface, border: `1px solid ${theme.border}`, borderRadius: 10, padding: "10px", textAlign: "center" }}>
                  <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 18, color: theme.text }}>{achievements.length}</div>
                  <div style={{ fontSize: 9, color: theme.muted, textTransform: "uppercase" }}>Total</div>
                </div>
                <div style={{ flex: 1, background: theme.surface, border: `1px solid ${theme.border}`, borderRadius: 10, padding: "10px", textAlign: "center" }}>
                  <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 18, color: theme.amber }}>
                    {achievements.filter((a) => a.unlocked).reduce((s, a) => s + a.xp, 0)}
                  </div>
                  <div style={{ fontSize: 9, color: theme.muted, textTransform: "uppercase" }}>XP earned</div>
                </div>
              </div>
              <div style={{ display: "flex", gap: 5, marginBottom: 14, flexWrap: "wrap" }}>
                {["All", "Training", "Nutrition", "Consistency", "Strength", "Progress", "Special"].map((c) => (
                  <button
                    key={c}
                    onClick={() => setAchievementFilter(c)}
                    style={{
                      padding: "6px 11px",
                      borderRadius: 8,
                      fontSize: 11,
                      border: `1px solid ${achievementFilter === c ? theme.lime : theme.border}`,
                      background: achievementFilter === c ? "rgba(201,240,101,0.08)" : "transparent",
                      color: achievementFilter === c ? theme.lime : theme.muted,
                    }}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
            <div style={{ flex: 1, overflowY: "auto", padding: "0 20px 20px" }}>
              {achievements
                .filter((a) => achievementFilter === "All" || a.category === achievementFilter)
                .map((a) => (
                  <div key={a.id} style={{ background: theme.surface, border: `1px solid ${a.unlocked ? theme.lime : theme.border}`, borderRadius: 12, padding: "12px 14px", marginBottom: 8, opacity: a.unlocked ? 1 : 0.85 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                      <div style={{ width: 34, height: 34, borderRadius: 9, background: a.unlocked ? "rgba(201,240,101,0.12)" : theme.surfaceAlt, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <a.icon size={16} color={a.unlocked ? theme.lime : theme.muted} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 13, color: theme.text, fontWeight: 500 }}>{a.name}</div>
                        <div style={{ fontSize: 10.5, color: theme.muted }}>{a.desc}</div>
                      </div>
                      {a.unlocked ? (
                        <div style={{ display: "flex", alignItems: "center", gap: 4, color: theme.lime, fontSize: 10, fontFamily: "'IBM Plex Mono', monospace", flexShrink: 0 }}>
                          <Check size={13} /> +{a.xp}xp
                        </div>
                      ) : (
                        <span style={{ fontSize: 10, color: theme.muted, fontFamily: "'IBM Plex Mono', monospace", flexShrink: 0 }}>{a.current}/{a.target}</span>
                      )}
                    </div>
                    {!a.unlocked && (
                      <div style={{ height: 5, borderRadius: 3, background: theme.surfaceAlt, overflow: "hidden" }}>
                        <div style={{ height: "100%", width: `${Math.min(100, (a.current / a.target) * 100)}%`, background: theme.lime, borderRadius: 3 }} />
                      </div>
                    )}
                  </div>
                ))}
            </div>
          </div>
        )}

        {showSettings && (
          <div style={{ position: "absolute", inset: 0, background: theme.bg, zIndex: 30, display: "flex", flexDirection: "column" }}>
            <div style={{ padding: "20px 20px 0", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 18, fontWeight: 700, color: theme.text }}>Settings</span>
              <button onClick={() => setShowSettings(false)} style={{ background: "none", border: "none", padding: 4 }}>
                <X size={18} color={theme.muted} />
              </button>
            </div>
            <div style={{ flex: 1, overflowY: "auto", padding: "16px 20px 24px" }}>
              <div style={{ fontSize: 10, letterSpacing: 1.5, color: theme.muted, textTransform: "uppercase", marginBottom: 8 }}>Profile</div>
              <input value={profile.name} onChange={(e) => setProfile((p) => ({ ...p, name: e.target.value }))} placeholder="Name" style={{ width: "100%", background: theme.surface, border: `1px solid ${theme.border}`, borderRadius: 10, padding: "11px 13px", color: theme.text, fontSize: 13, marginBottom: 8, outline: "none" }} />
              <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
                <input type="number" value={profile.age} onChange={(e) => setProfile((p) => ({ ...p, age: e.target.value }))} placeholder="Age" style={{ flex: 1, background: theme.surface, border: `1px solid ${theme.border}`, borderRadius: 10, padding: "11px 13px", color: theme.text, fontSize: 13, outline: "none" }} />
                <input type="number" value={profile.height} onChange={(e) => setProfile((p) => ({ ...p, height: e.target.value }))} placeholder="Height (cm)" style={{ flex: 1, background: theme.surface, border: `1px solid ${theme.border}`, borderRadius: 10, padding: "11px 13px", color: theme.text, fontSize: 13, outline: "none" }} />
              </div>

              <div style={{ fontSize: 10, letterSpacing: 1.5, color: theme.muted, textTransform: "uppercase", marginBottom: 8 }}>Units</div>
              <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
                {["kg", "lb"].map((u) => (
                  <button key={u} onClick={() => setUnitsPref(u)} style={{ flex: 1, padding: "10px 0", borderRadius: 10, border: `1px solid ${unitsPref === u ? theme.lime : theme.border}`, background: unitsPref === u ? "rgba(201,240,101,0.08)" : "transparent", color: unitsPref === u ? theme.lime : theme.muted, fontSize: 12.5 }}>
                    {u === "kg" ? "Kilograms" : "Pounds"}
                  </button>
                ))}
              </div>

              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
                <span style={{ fontSize: 10, letterSpacing: 1.5, color: theme.muted, textTransform: "uppercase" }}>Fitness Preferences</span>
                {!prefsDraft && (
                  <button onClick={openPreferencesEditor} style={{ fontSize: 11, color: theme.lime, background: "none", border: "none", fontWeight: 600 }}>
                    Edit
                  </button>
                )}
              </div>

              {!prefsDraft ? (
                <div style={{ background: theme.surface, border: `1px solid ${theme.border}`, borderRadius: 12, padding: "12px 14px", marginBottom: 20, fontSize: 12, color: theme.muted, lineHeight: 1.7 }}>
                  <div><strong style={{ color: theme.text }}>Experience:</strong> {profile.experience || "Not set"}</div>
                  <div><strong style={{ color: theme.text }}>Goal:</strong> {profile.goal || "Not set"}</div>
                  <div><strong style={{ color: theme.text }}>Locations:</strong> {(profile.trainingLocations || []).join(", ") || "Not set"}</div>
                  <div><strong style={{ color: theme.text }}>Equipment:</strong> {(profile.equipmentDetailed || []).join(", ") || "Not set"}</div>
                </div>
              ) : (
                <div style={{ background: theme.surface, border: `1px solid ${theme.border}`, borderRadius: 12, padding: "14px", marginBottom: 20 }}>
                  <div style={{ fontSize: 9.5, color: theme.muted, textTransform: "uppercase", marginBottom: 6 }}>Experience Level</div>
                  <div style={{ display: "flex", gap: 6, marginBottom: 16 }}>
                    {EXPERIENCE_LEVELS.map((e) => (
                      <button
                        key={e}
                        onClick={() => setPrefsDraft((d) => ({ ...d, experience: e }))}
                        style={{ flex: 1, padding: "8px 0", borderRadius: 8, fontSize: 11, border: `1px solid ${prefsDraft.experience === e ? theme.lime : theme.border}`, background: prefsDraft.experience === e ? "rgba(201,240,101,0.08)" : "transparent", color: prefsDraft.experience === e ? theme.lime : theme.muted }}
                      >
                        {e}
                      </button>
                    ))}
                  </div>

                  <div style={{ fontSize: 9.5, color: theme.muted, textTransform: "uppercase", marginBottom: 6 }}>Training Locations</div>
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 16 }}>
                    {TRAINING_LOCATIONS.map((loc) => (
                      <button
                        key={loc}
                        onClick={() => toggleDraftMulti("trainingLocations", loc)}
                        style={{ padding: "7px 12px", borderRadius: 8, fontSize: 11, border: `1px solid ${prefsDraft.trainingLocations.includes(loc) ? theme.sky : theme.border}`, background: prefsDraft.trainingLocations.includes(loc) ? "rgba(126,200,227,0.1)" : "transparent", color: prefsDraft.trainingLocations.includes(loc) ? theme.sky : theme.muted }}
                      >
                        {loc}
                      </button>
                    ))}
                  </div>

                  <div style={{ fontSize: 9.5, color: theme.muted, textTransform: "uppercase", marginBottom: 6 }}>Available Equipment</div>
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 16 }}>
                    {DETAILED_EQUIPMENT.map((eq) => (
                      <button
                        key={eq}
                        onClick={() => toggleDraftMulti("equipmentDetailed", eq)}
                        style={{ padding: "7px 12px", borderRadius: 8, fontSize: 11, border: `1px solid ${prefsDraft.equipmentDetailed.includes(eq) ? theme.lime : theme.border}`, background: prefsDraft.equipmentDetailed.includes(eq) ? "rgba(201,240,101,0.08)" : "transparent", color: prefsDraft.equipmentDetailed.includes(eq) ? theme.lime : theme.muted }}
                      >
                        {eq}
                      </button>
                    ))}
                  </div>

                  <div style={{ fontSize: 9.5, color: theme.muted, textTransform: "uppercase", marginBottom: 6 }}>Fitness Goal</div>
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 18 }}>
                    {GOALS.map((g) => (
                      <button
                        key={g}
                        onClick={() => setPrefsDraft((d) => ({ ...d, goal: g }))}
                        style={{ padding: "7px 12px", borderRadius: 8, fontSize: 11, border: `1px solid ${prefsDraft.goal === g ? theme.lime : theme.border}`, background: prefsDraft.goal === g ? "rgba(201,240,101,0.08)" : "transparent", color: prefsDraft.goal === g ? theme.lime : theme.muted }}
                      >
                        {g}
                      </button>
                    ))}
                  </div>

                  <div style={{ display: "flex", gap: 8 }}>
                    <button onClick={() => setPrefsDraft(null)} style={{ flex: 1, padding: "10px 0", borderRadius: 8, border: `1px solid ${theme.border}`, background: "transparent", color: theme.muted, fontSize: 12 }}>
                      Cancel
                    </button>
                    <button onClick={savePreferences} style={{ flex: 2, padding: "10px 0", borderRadius: 8, border: "none", background: theme.lime, color: "#12211D", fontSize: 12, fontWeight: 600 }}>
                      Save Preferences
                    </button>
                  </div>
                </div>
              )}

              <div style={{ fontSize: 10, letterSpacing: 1.5, color: theme.muted, textTransform: "uppercase", marginBottom: 8 }}>Nutrition Targets</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 20 }}>
                {[
                  ["kcal", "Calories"],
                  ["protein", "Protein (g)"],
                  ["carbs", "Carbs (g)"],
                  ["fat", "Fat (g)"],
                ].map(([key, label]) => (
                  <div key={key}>
                    <div style={{ fontSize: 9.5, color: theme.muted, marginBottom: 4 }}>{label}</div>
                    <input
                      type="number"
                      value={targets[key]}
                      onChange={(e) => setTargets((t) => ({ ...t, [key]: Number(e.target.value) || 0 }))}
                      style={{ width: "100%", background: theme.surface, border: `1px solid ${theme.border}`, borderRadius: 8, padding: "9px 10px", color: theme.text, fontSize: 12.5, outline: "none" }}
                    />
                  </div>
                ))}
              </div>

              <div style={{ fontSize: 10, letterSpacing: 1.5, color: theme.muted, textTransform: "uppercase", marginBottom: 8 }}>Data</div>
              <button onClick={exportData} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, width: "100%", background: "transparent", border: `1px solid ${theme.border}`, color: theme.text, borderRadius: 10, padding: "11px 0", fontSize: 13, marginBottom: 8 }}>
                Export my data
              </button>
              <button
                onClick={() => {
                  if (window.confirm("This will permanently erase all your FitSync data on this device. Continue?")) resetAllData();
                }}
                style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, width: "100%", background: "transparent", border: `1px solid ${theme.coral}`, color: theme.coral, borderRadius: 10, padding: "11px 0", fontSize: 13 }}
              >
                Reset all data
              </button>
              <div style={{ fontSize: 10, color: theme.muted, marginTop: 20, lineHeight: 1.5, textAlign: "center" }}>
                Data is stored locally on this device only. There's no account or cloud sync yet.
              </div>
            </div>
          </div>
        )}

        {showQuickAdd && (
          <>
            <div onClick={() => setShowQuickAdd(false)} style={{ position: "absolute", inset: 0, background: "rgba(8,15,13,0.6)", zIndex: 25 }} />
            <div style={{ position: "absolute", bottom: 90, right: 20, zIndex: 26, display: "flex", flexDirection: "column", gap: 8 }}>
              {[
                { icon: Apple, label: "Log Food", action: () => { setShowAddFood(true); setShowQuickAdd(false); } },
                { icon: Droplet, label: "Log Water", action: () => { logWater(); setShowQuickAdd(false); } },
                { icon: Scale, label: "Log Weight", action: () => { setActiveScreen("progress"); setProgressTab("body"); setShowQuickAdd(false); } },
                { icon: Dumbbell, label: "Start Workout", action: () => { setActiveScreen("workout"); setShowQuickAdd(false); } },
                { icon: Image, label: "Progress Photo", action: () => { setActiveScreen("progress"); setProgressTab("body"); setShowQuickAdd(false); } },
              ].map((item) => (
                <button
                  key={item.label}
                  onClick={item.action}
                  style={{ display: "flex", alignItems: "center", gap: 10, background: theme.surface, border: `1px solid ${theme.border}`, borderRadius: 12, padding: "10px 16px 10px 12px", boxShadow: "0 6px 16px rgba(0,0,0,0.3)" }}
                >
                  <div style={{ width: 30, height: 30, borderRadius: 8, background: theme.surfaceAlt, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <item.icon size={14} color={theme.lime} />
                  </div>
                  <span style={{ fontSize: 12.5, color: theme.text }}>{item.label}</span>
                </button>
              ))}
            </div>
          </>
        )}

        {!showAddFood && !activeSession && !showSettings && !showAchievements && !showWorkoutHistory && !showNutritionHistory && !showPlanner && (
          <button
            onClick={() => setShowQuickAdd((s) => !s)}
            style={{
              position: "absolute",
              bottom: 90,
              right: 20,
              zIndex: 24,
              width: 50,
              height: 50,
              borderRadius: "50%",
              background: theme.lime,
              border: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 6px 16px rgba(201,240,101,0.35)",
              transform: showQuickAdd ? "rotate(45deg)" : "none",
              transition: "transform 0.2s ease",
            }}
          >
            <Plus size={22} color="#12211D" />
          </button>
        )}

        {showWorkoutHistory && (
          <div style={{ position: "absolute", inset: 0, background: theme.bg, zIndex: 30, display: "flex", flexDirection: "column" }}>
            <div style={{ padding: "20px 20px 0", display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
              <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 18, fontWeight: 700, color: theme.text }}>Workout History</span>
              <button onClick={() => setShowWorkoutHistory(false)} style={{ background: "none", border: "none", padding: 4 }}>
                <X size={18} color={theme.muted} />
              </button>
            </div>
            <div style={{ flex: 1, overflowY: "auto", padding: "0 20px 20px" }}>
              {timeline.filter((t) => t.type === "workout").length === 0 ? (
                <div style={{ fontSize: 12, color: theme.muted, padding: "30px 0", textAlign: "center" }}>
                  Your strength story starts with your first workout.
                </div>
              ) : (
                timeline.filter((t) => t.type === "workout").map((t) => (
                  <div key={t.id} style={{ display: "flex", alignItems: "center", gap: 10, background: theme.surface, border: `1px solid ${theme.border}`, borderRadius: 12, padding: "12px 14px", marginBottom: 8 }}>
                    <div style={{ width: 32, height: 32, borderRadius: 9, background: theme.surfaceAlt, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <Dumbbell size={15} color={theme.lime} />
                    </div>
                    <div>
                      <div style={{ fontSize: 13, color: theme.text }}>{t.text}</div>
                      <div style={{ fontSize: 10.5, color: theme.muted }}>{t.time}</div>
                    </div>
                  </div>
                ))
              )}
              <div style={{ fontSize: 10, color: theme.muted, marginTop: 12, textAlign: "center", lineHeight: 1.5 }}>
                Set-by-set detail per session isn't stored yet — this shows which workouts you completed and when.
              </div>
            </div>
          </div>
        )}

        {showNutritionHistory && (
          <div style={{ position: "absolute", inset: 0, background: theme.bg, zIndex: 30, display: "flex", flexDirection: "column" }}>
            <div style={{ padding: "20px 20px 0", display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
              <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 18, fontWeight: 700, color: theme.text }}>Nutrition History</span>
              <button onClick={() => setShowNutritionHistory(false)} style={{ background: "none", border: "none", padding: 4 }}>
                <X size={18} color={theme.muted} />
              </button>
            </div>
            <div style={{ flex: 1, overflowY: "auto", padding: "0 20px 20px" }}>
              {nutritionByDay.map(([day, data]) => (
                <div key={day} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: theme.surface, border: `1px solid ${theme.border}`, borderRadius: 12, padding: "12px 14px", marginBottom: 8 }}>
                  <div>
                    <div style={{ fontSize: 13, color: theme.text }}>{day}</div>
                    <div style={{ fontSize: 10.5, color: theme.muted }}>{data.entries} items logged</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 13, color: theme.text }}>{Math.round(data.kcal)} kcal</div>
                    <div style={{ fontSize: 10.5, color: theme.muted }}>{Math.round(data.protein)}g protein</div>
                  </div>
                </div>
              ))}
              <div style={{ fontSize: 10, color: theme.muted, marginTop: 12, textAlign: "center", lineHeight: 1.5 }}>
                Only days logged since this feature was added will appear here.
              </div>
            </div>
          </div>
        )}

        {showPlanner && (
          <div style={{ position: "absolute", inset: 0, background: theme.bg, zIndex: 30, display: "flex", flexDirection: "column" }}>
            <div style={{ padding: "20px 20px 0", display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
              <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 18, fontWeight: 700, color: theme.text }}>Weekly Planner</span>
              <button onClick={() => setShowPlanner(false)} style={{ background: "none", border: "none", padding: 4 }}>
                <X size={18} color={theme.muted} />
              </button>
            </div>
            <div style={{ flex: 1, overflowY: "auto", padding: "0 20px 20px" }}>
              {Object.keys(weekPlan).map((day) => (
                <div key={day} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: theme.surface, border: `1px solid ${theme.border}`, borderRadius: 12, padding: "12px 14px", marginBottom: 8 }}>
                  <div style={{ fontSize: 12.5, color: theme.text, fontWeight: 600, width: 42 }}>{day}</div>
                  <select
                    value={weekPlan[day] ?? ""}
                    onChange={(e) => setWeekPlan((p) => ({ ...p, [day]: e.target.value || null }))}
                    style={{ flex: 1, background: theme.surfaceAlt, border: `1px solid ${theme.border}`, borderRadius: 8, padding: "9px 8px", color: theme.text, fontSize: 12, outline: "none", marginLeft: 10 }}
                  >
                    <option value="">Rest day</option>
                    {WORKOUT_LIBRARY.map((w) => (
                      <option key={w.id} value={w.name}>{w.name}</option>
                    ))}
                  </select>
                </div>
              ))}
              <div style={{ fontSize: 10, color: theme.muted, marginTop: 12, textAlign: "center", lineHeight: 1.5 }}>
                This plan is a reference for you — starting a workout from here still happens from the Workout tab.
              </div>
            </div>
          </div>
        )}

        <div style={{ position: "absolute", bottom: 78, right: 16, zIndex: 25 }}>
          {showQuickAdd && (
            <div style={{ position: "absolute", bottom: 54, right: 0, background: theme.surface, border: `1px solid ${theme.border}`, borderRadius: 14, padding: 8, width: 190, boxShadow: "0 10px 30px rgba(0,0,0,0.5)" }}>
              {[
                { icon: Apple, label: "Log Food", action: () => { setShowAddFood(true); setShowQuickAdd(false); } },
                { icon: Droplet, label: "Log Water", action: () => { logWater(); setShowQuickAdd(false); } },
                { icon: Scale, label: "Log Weight", action: () => { setActiveScreen("progress"); setProgressTab("body"); setShowQuickAdd(false); } },
                { icon: Dumbbell, label: "Start Workout", action: () => { setActiveScreen("workout"); setShowQuickAdd(false); } },
                { icon: Image, label: "Progress Photo", action: () => { setActiveScreen("progress"); setProgressTab("body"); setShowQuickAdd(false); } },
              ].map((item) => (
                <button
                  key={item.label}
                  onClick={item.action}
                  style={{ display: "flex", alignItems: "center", gap: 10, width: "100%", background: "none", border: "none", padding: "9px 8px", borderRadius: 8, fontSize: 12.5, color: theme.text, textAlign: "left" }}
                >
                  <item.icon size={14} color={theme.lime} /> {item.label}
                </button>
              ))}
            </div>
          )}
          <button
            onClick={() => setShowQuickAdd((s) => !s)}
            style={{
              width: 48,
              height: 48,
              borderRadius: "50%",
              background: theme.lime,
              border: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 6px 18px rgba(201,240,101,0.35)",
              transform: showQuickAdd ? "rotate(45deg)" : "none",
              transition: "transform 0.2s ease",
            }}
          >
            <Plus size={22} color="#12211D" />
          </button>
        </div>


        {achievementCelebration && (
          <div
            style={{
              position: "absolute",
              top: 60,
              left: 16,
              right: 16,
              zIndex: 40,
              background: theme.surface,
              border: `1px solid ${theme.lime}`,
              boxShadow: `0 8px 24px rgba(201,240,101,0.2)`,
              borderRadius: 14,
              padding: "14px 16px",
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <div style={{ width: 40, height: 40, borderRadius: 10, background: "rgba(201,240,101,0.15)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <achievementCelebration.icon size={20} color={theme.lime} />
            </div>
            <div>
              <div style={{ fontSize: 10, letterSpacing: 1, color: theme.lime, textTransform: "uppercase", fontWeight: 600 }}>Achievement Unlocked</div>
              <div style={{ fontSize: 13, color: theme.text, fontWeight: 600 }}>{achievementCelebration.name} · +{achievementCelebration.xp} XP</div>
            </div>
          </div>
        )}

        {settingsToast && (
          <div
            style={{
              position: "absolute",
              top: 70,
              left: "50%",
              transform: "translateX(-50%)",
              background: theme.surface,
              border: `1px solid ${theme.lime}`,
              color: theme.text,
              fontSize: 12.5,
              fontWeight: 500,
              padding: "8px 16px",
              borderRadius: 20,
              boxShadow: "0 6px 16px rgba(0,0,0,0.4)",
              zIndex: 40,
              whiteSpace: "nowrap",
            }}
          >
            ✓ {settingsToast}
          </div>
        )}

        {xpToast && (
          <div
            style={{
              position: "absolute",
              top: 70,
              left: "50%",
              transform: "translateX(-50%)",
              background: theme.lime,
              color: "#12211D",
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: 13,
              fontWeight: 600,
              padding: "6px 14px",
              borderRadius: 20,
              boxShadow: "0 6px 16px rgba(0,0,0,0.4)",
              zIndex: 20,
              animation: "none",
            }}
          >
            +{xpToast} XP
          </div>
        )}

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
