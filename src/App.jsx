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

const CUISINES = ["Indian", "Mexican", "Japanese", "Italian", "Thai", "Middle Eastern", "Chinese", "American", "Mediterranean", "Caribbean", "African", "Filipino"];

const FOOD_DB = [
  { id: 1, name: "Grilled chicken breast", serving: "150g", kcal: 248, protein: 46, carbs: 0, fat: 5.4, fiber: 0, cuisine: "American", diet: ["glutenFree", "dairyFree"] },
  { id: 2, name: "Brown rice, cooked", serving: "1 cup", kcal: 216, protein: 5, carbs: 45, fat: 1.8, fiber: 3.5, cuisine: "American", diet: ["vegan", "vegetarian", "glutenFree", "dairyFree"] },
  { id: 3, name: "Avocado", serving: "1/2 medium", kcal: 120, protein: 1.5, carbs: 6, fat: 11, fiber: 5, cuisine: "American", diet: ["vegan", "vegetarian", "glutenFree", "dairyFree"] },
  { id: 4, name: "Greek yogurt, plain", serving: "170g", kcal: 100, protein: 17, carbs: 6, fat: 0.7, fiber: 0, cuisine: "Mediterranean", diet: ["vegetarian", "glutenFree"] },
  { id: 5, name: "Whole wheat toast", serving: "1 slice", kcal: 80, protein: 4, carbs: 14, fat: 1, fiber: 2, cuisine: "American", diet: ["vegan", "vegetarian", "dairyFree"] },
  { id: 6, name: "Almonds", serving: "28g handful", kcal: 164, protein: 6, carbs: 6, fat: 14, fiber: 3.5, cuisine: "American", diet: ["vegan", "vegetarian", "glutenFree", "dairyFree"] },
  { id: 7, name: "Banana", serving: "1 medium", kcal: 105, protein: 1.3, carbs: 27, fat: 0.4, fiber: 3, cuisine: "American", diet: ["vegan", "vegetarian", "glutenFree", "dairyFree"] },
  { id: 8, name: "Salmon fillet", serving: "170g", kcal: 367, protein: 39, carbs: 0, fat: 22, fiber: 0, cuisine: "American", diet: ["glutenFree", "dairyFree"] },
  { id: 9, name: "Protein smoothie", serving: "1 shake", kcal: 220, protein: 30, carbs: 15, fat: 4, fiber: 2, cuisine: "American", diet: ["vegetarian", "glutenFree"] },
  { id: 10, name: "Paneer pasta", serving: "1 bowl", kcal: 640, protein: 32, carbs: 70, fat: 22, fiber: 4, cuisine: "Italian", diet: ["vegetarian"] },
  { id: 11, name: "Rajma Chawal", serving: "1 bowl · 350g", kcal: 520, protein: 20, carbs: 78, fat: 12, fiber: 14, cuisine: "Indian", diet: ["vegan", "vegetarian", "glutenFree", "dairyFree"] },
  { id: 12, name: "Butter Chicken", serving: "1 serving · 320g", kcal: 540, protein: 32, carbs: 24, fat: 36, fiber: 3, cuisine: "Indian", diet: ["glutenFree"] },
  { id: 13, name: "Chole", serving: "1 bowl · 300g", kcal: 420, protein: 15, carbs: 58, fat: 14, fiber: 12, cuisine: "Indian", diet: ["vegan", "vegetarian", "glutenFree", "dairyFree"] },
  { id: 14, name: "Palak Paneer", serving: "1 bowl · 300g", kcal: 380, protein: 18, carbs: 16, fat: 27, fiber: 5, cuisine: "Indian", diet: ["vegetarian", "glutenFree"] },
  { id: 15, name: "Aloo Paratha", serving: "1 piece", kcal: 290, protein: 6, carbs: 40, fat: 12, fiber: 4, cuisine: "Indian", diet: ["vegan", "vegetarian", "dairyFree"] },
  { id: 16, name: "Tacos (beef, 2)", serving: "2 tacos", kcal: 380, protein: 22, carbs: 32, fat: 18, fiber: 5, cuisine: "Mexican", diet: ["glutenFree"] },
  { id: 17, name: "Burrito Bowl", serving: "1 bowl · 400g", kcal: 610, protein: 34, carbs: 68, fat: 20, fiber: 11, cuisine: "Mexican", diet: ["glutenFree"] },
  { id: 18, name: "Enchiladas (2)", serving: "2 pieces", kcal: 470, protein: 20, carbs: 42, fat: 25, fiber: 6, cuisine: "Mexican", diet: [] },
  { id: 19, name: "Sushi Roll (8pc)", serving: "8 pieces", kcal: 300, protein: 10, carbs: 50, fat: 6, fiber: 2, cuisine: "Japanese", diet: ["dairyFree"] },
  { id: 20, name: "Chicken Ramen", serving: "1 bowl", kcal: 500, protein: 28, carbs: 60, fat: 15, fiber: 4, cuisine: "Japanese", diet: [] },
  { id: 21, name: "Miso Soup", serving: "1 cup", kcal: 60, protein: 4, carbs: 6, fat: 2, fiber: 1, cuisine: "Japanese", diet: ["vegan", "vegetarian", "dairyFree"] },
  { id: 22, name: "Spaghetti Bolognese", serving: "1 plate · 350g", kcal: 590, protein: 28, carbs: 68, fat: 20, fiber: 5, cuisine: "Italian", diet: ["dairyFree"] },
  { id: 23, name: "Margherita Pizza (2 slices)", serving: "2 slices", kcal: 480, protein: 18, carbs: 56, fat: 20, fiber: 3, cuisine: "Italian", diet: ["vegetarian"] },
  { id: 24, name: "Risotto", serving: "1 bowl", kcal: 420, protein: 10, carbs: 60, fat: 14, fiber: 2, cuisine: "Italian", diet: ["vegetarian", "glutenFree"] },
  { id: 25, name: "Pad Thai", serving: "1 plate", kcal: 550, protein: 22, carbs: 65, fat: 20, fiber: 4, cuisine: "Thai", diet: [] },
  { id: 26, name: "Green Curry with Chicken", serving: "1 bowl", kcal: 480, protein: 26, carbs: 30, fat: 28, fiber: 4, cuisine: "Thai", diet: ["glutenFree", "dairyFree"] },
  { id: 27, name: "Hummus & Pita", serving: "1 serving", kcal: 350, protein: 11, carbs: 45, fat: 15, fiber: 8, cuisine: "Middle Eastern", diet: ["vegan", "vegetarian", "dairyFree"] },
  { id: 28, name: "Falafel Wrap", serving: "1 wrap", kcal: 460, protein: 15, carbs: 55, fat: 20, fiber: 9, cuisine: "Middle Eastern", diet: ["vegan", "vegetarian", "dairyFree"] },
  { id: 29, name: "Chicken Shawarma Wrap", serving: "1 wrap", kcal: 520, protein: 32, carbs: 45, fat: 22, fiber: 4, cuisine: "Middle Eastern", diet: ["dairyFree"] },
  { id: 30, name: "Vegetable Fried Rice", serving: "1 bowl · 300g", kcal: 420, protein: 10, carbs: 65, fat: 12, fiber: 4, cuisine: "Chinese", diet: ["vegan", "vegetarian", "dairyFree"] },
  { id: 31, name: "Kung Pao Chicken", serving: "1 serving", kcal: 490, protein: 30, carbs: 28, fat: 26, fiber: 3, cuisine: "Chinese", diet: ["dairyFree"] },
  { id: 32, name: "Cheeseburger", serving: "1 burger", kcal: 550, protein: 28, carbs: 40, fat: 30, fiber: 2, cuisine: "American", diet: [] },
  { id: 33, name: "Grilled Chicken Salad", serving: "1 bowl", kcal: 380, protein: 35, carbs: 18, fat: 18, fiber: 6, cuisine: "American", diet: ["glutenFree", "dairyFree"] },
  { id: 34, name: "Greek Salad", serving: "1 bowl", kcal: 320, protein: 9, carbs: 16, fat: 26, fiber: 5, cuisine: "Mediterranean", diet: ["vegetarian", "glutenFree"] },
  { id: 35, name: "Grilled Salmon & Veg", serving: "1 plate", kcal: 460, protein: 38, carbs: 12, fat: 28, fiber: 4, cuisine: "Mediterranean", diet: ["glutenFree", "dairyFree"] },
  { id: 36, name: "Jerk Chicken & Rice", serving: "1 plate", kcal: 610, protein: 36, carbs: 68, fat: 20, fiber: 4, cuisine: "Caribbean", diet: ["glutenFree", "dairyFree"] },
  { id: 37, name: "Jollof Rice", serving: "1 bowl", kcal: 450, protein: 9, carbs: 78, fat: 12, fiber: 4, cuisine: "African", diet: ["vegan", "vegetarian", "glutenFree", "dairyFree"] },
  { id: 38, name: "Chicken Adobo & Rice", serving: "1 plate", kcal: 580, protein: 32, carbs: 60, fat: 22, fiber: 2, cuisine: "Filipino", diet: ["glutenFree", "dairyFree"] },
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

const TARGETS = { kcal: 2200, protein: 120, carbs: 250, fat: 70, fiber: 28, water: 2.5, steps: 10000 };

const GOALS = ["Lose Fat", "Build Muscle", "Gain Weight", "Tone & Sculpt", "Get Stronger", "General Fitness"];
const EXPERIENCE_LEVELS = ["Beginner", "Intermediate", "Advanced"];
const EQUIPMENT_OPTIONS = ["Full Gym", "Home - Dumbbells", "Bodyweight Only"];
const WORKOUT_TYPES = ["All", "Strength", "Cardio", "Mobility", "Recovery"];

const WORKOUT_LIBRARY = [
  {
    id: 1, name: "Upper Body Strength", type: "Strength", exercises: 6, duration: 42, difficulty: "Intermediate", equipment: "Full Gym", goal: "Build Muscle",
    exerciseList: [
      { name: "Lat Pulldown", detail: "3 sets x 10 reps", tip: "Sit tall, pull the bar to your upper chest, squeeze your back, control the return." },
      { name: "Chest Press", detail: "3 sets x 10 reps", tip: "Press the handles forward until arms extend, avoid locking your elbows." },
      { name: "Seated Row", detail: "3 sets x 12 reps", tip: "Pull handles to your torso, squeeze your shoulder blades together." },
      { name: "Shoulder Press", detail: "3 sets x 10 reps", tip: "Press overhead until arms are extended, avoid arching your lower back." },
      { name: "Biceps Curl", detail: "3 sets x 12 reps", tip: "Curl the weight up without swinging your torso." },
      { name: "Triceps Pushdown", detail: "3 sets x 12 reps", tip: "Push the bar down until arms are straight, keep elbows tucked in." },
    ],
  },
  {
    id: 2, name: "Lower Body Power", type: "Strength", exercises: 5, duration: 38, difficulty: "Intermediate", equipment: "Full Gym", goal: "Get Stronger",
    exerciseList: [
      { name: "Barbell Squat", detail: "4 sets x 8 reps", tip: "Feet shoulder-width apart, sit back and down, keep your chest up." },
      { name: "Romanian Deadlift", detail: "3 sets x 10 reps", tip: "Hinge at the hips, keep your back flat, lower the bar along your legs." },
      { name: "Leg Press", detail: "3 sets x 12 reps", tip: "Push through your heels, avoid locking your knees at the top." },
      { name: "Walking Lunges", detail: "3 sets x 12 each leg", tip: "Step forward, lower until both knees are near 90°, push back up." },
      { name: "Calf Raise", detail: "3 sets x 15 reps", tip: "Rise onto your toes, pause, then lower slowly." },
    ],
  },
  {
    id: 3, name: "Full Body HIIT", type: "Cardio", exercises: 8, duration: 25, difficulty: "Beginner", equipment: "Bodyweight Only", goal: "Lose Fat",
    exerciseList: [
      { name: "Jumping Jacks", detail: "45 seconds", tip: "Keep a steady rhythm and land softly." },
      { name: "Bodyweight Squats", detail: "45 seconds", tip: "Full range of motion, keep your chest up." },
      { name: "Mountain Climbers", detail: "45 seconds", tip: "Keep your hips low, drive your knees in quickly." },
      { name: "Push-ups", detail: "45 seconds", tip: "Modify on your knees if needed, keep your core tight." },
      { name: "Burpees", detail: "45 seconds", tip: "Move at your own pace, prioritize form over speed." },
      { name: "High Knees", detail: "45 seconds", tip: "Pump your arms, land softly on the balls of your feet." },
      { name: "Plank Hold", detail: "45 seconds", tip: "Keep your body in a straight line, engage your core." },
      { name: "Cooldown Walk", detail: "60 seconds", tip: "Walk it out and focus on breathing deeply." },
    ],
  },
  {
    id: 4, name: "Core & Mobility", type: "Mobility", exercises: 6, duration: 20, difficulty: "Beginner", equipment: "Bodyweight Only", goal: "General Fitness",
    exerciseList: [
      { name: "Cat-Cow Stretch", detail: "10 reps", tip: "Alternate arching and rounding your spine slowly." },
      { name: "Bird Dog", detail: "3 sets x 10 each side", tip: "Extend opposite arm and leg, keep your hips level." },
      { name: "Dead Bug", detail: "3 sets x 12 reps", tip: "Lower the opposite arm and leg without arching your lower back." },
      { name: "Plank", detail: "3 sets x 30 seconds", tip: "Keep a straight line from head to heels." },
      { name: "Hip Flexor Stretch", detail: "30 seconds each side", tip: "From a lunge position, gently push your hips forward." },
      { name: "World's Greatest Stretch", detail: "5 reps each side", tip: "Lunge, rotate your torso, and reach up toward the ceiling." },
    ],
  },
  {
    id: 5, name: "Home Dumbbell Push", type: "Strength", exercises: 5, duration: 30, difficulty: "Beginner", equipment: "Home - Dumbbells", goal: "Build Muscle",
    exerciseList: [
      { name: "Dumbbell Bench Press", detail: "3 sets x 10 reps", tip: "Lower the weights to chest level, press up evenly on both sides." },
      { name: "Dumbbell Shoulder Press", detail: "3 sets x 10 reps", tip: "Press overhead, avoid arching your lower back." },
      { name: "Incline Push-ups", detail: "3 sets x 12 reps", tip: "Hands on a stable elevated surface, keep your core tight." },
      { name: "Lateral Raise", detail: "3 sets x 12 reps", tip: "Raise your arms to shoulder height with a slight bend in the elbows." },
      { name: "Triceps Kickback", detail: "3 sets x 12 reps", tip: "Hinge forward, extend your arm back, squeeze your triceps." },
    ],
  },
  {
    id: 6, name: "Advanced Powerlifting Split", type: "Strength", exercises: 4, duration: 50, difficulty: "Advanced", equipment: "Full Gym", goal: "Get Stronger",
    exerciseList: [
      { name: "Barbell Back Squat", detail: "5 sets x 5 reps", tip: "Heavy compound lift — brace your core, controlled descent." },
      { name: "Barbell Bench Press", detail: "5 sets x 5 reps", tip: "Retract your shoulder blades, keep a controlled bar path." },
      { name: "Deadlift", detail: "3 sets x 5 reps", tip: "Neutral spine, drive through your heels, hips and shoulders rise together." },
      { name: "Overhead Press", detail: "4 sets x 6 reps", tip: "Brace your core and press straight overhead." },
    ],
  },
  {
    id: 7, name: "Recovery Stretch Flow", type: "Recovery", exercises: 8, duration: 15, difficulty: "Beginner", equipment: "Bodyweight Only", goal: "General Fitness",
    exerciseList: [
      { name: "Child's Pose", detail: "60 seconds", tip: "Sit back onto your heels, reach arms forward, breathe deeply." },
      { name: "Seated Forward Fold", detail: "45 seconds", tip: "Hinge from your hips, reach toward your toes, relax your neck." },
      { name: "Figure-4 Stretch", detail: "45 seconds each side", tip: "Cross ankle over knee, gently pull your leg toward your chest." },
      { name: "Thread the Needle", detail: "45 seconds each side", tip: "On all fours, thread one arm under the other and rotate." },
      { name: "Standing Quad Stretch", detail: "30 seconds each side", tip: "Pull your heel toward your glutes, keep knees together." },
      { name: "Deep Breathing", detail: "90 seconds", tip: "Slow inhales and exhales, relax your shoulders." },
      { name: "Neck Rolls", detail: "30 seconds", tip: "Gentle circles, avoid forcing the range of motion." },
      { name: "Shoulder Rolls", detail: "30 seconds", tip: "Roll your shoulders back and down slowly." },
    ],
  },
  {
    id: 8, name: "Full Body Gain Circuit", type: "Strength", exercises: 6, duration: 35, difficulty: "Intermediate", equipment: "Home - Dumbbells", goal: "Gain Weight",
    exerciseList: [
      { name: "Goblet Squat", detail: "4 sets x 10 reps", tip: "Hold the dumbbell at chest height, squat with control." },
      { name: "Dumbbell Romanian Deadlift", detail: "3 sets x 10 reps", tip: "Hinge at the hips, keep dumbbells close to your legs." },
      { name: "Push-ups", detail: "3 sets to near-failure", tip: "Full range of motion, keep your core tight." },
      { name: "Bent-over Row", detail: "3 sets x 10 reps", tip: "Hinge forward, pull the dumbbells to your hips." },
      { name: "Overhead Press", detail: "3 sets x 10 reps", tip: "Press the dumbbells overhead with control." },
      { name: "Plank", detail: "3 sets x 40 seconds", tip: "Straight body line, engage your core throughout." },
    ],
  },
  {
    id: 9, name: "Deep Stretch & Mobility", type: "Recovery", exercises: 6, duration: 18, difficulty: "Beginner", equipment: "Bodyweight Only", goal: "General Fitness",
    exerciseList: [
      { name: "Downward Dog", detail: "45 seconds", tip: "Push your hips up and back, heels reaching toward the floor." },
      { name: "Pigeon Pose", detail: "45 seconds each side", tip: "Deep hip opener — keep your hips as square as possible." },
      { name: "Cobra Stretch", detail: "30 seconds", tip: "Gently press your chest up, keep your shoulders relaxed." },
      { name: "Butterfly Stretch", detail: "45 seconds", tip: "Soles of your feet together, gently press your knees down." },
      { name: "Spinal Twist", detail: "30 seconds each side", tip: "Lying down, drop your knees to one side and look the other way." },
      { name: "Deep Breathing", detail: "60 seconds", tip: "Slow, controlled breaths to finish the session calmly." },
    ],
  },
  {
    id: 10, name: "Post-Leg-Day Recovery", type: "Recovery", exercises: 5, duration: 12, difficulty: "Beginner", equipment: "Bodyweight Only", goal: "General Fitness",
    exerciseList: [
      { name: "Foam Roll Quads", detail: "60 seconds", tip: "Slow rolls, pause briefly on any tender spots." },
      { name: "Standing Calf Stretch", detail: "30 seconds each side", tip: "Lean into a wall, keep your back heel down." },
      { name: "Seated Hamstring Stretch", detail: "45 seconds each side", tip: "Reach toward your toes, keep your back flat." },
      { name: "Glute Bridge Hold", detail: "45 seconds", tip: "Squeeze your glutes at the top, hips lifted." },
      { name: "Walking Recovery", detail: "3 minutes", tip: "Easy pace, focus on breathing and letting your legs loosen up." },
    ],
  },
  {
    id: 11, name: "Sculpt & Tone Circuit", type: "Strength", exercises: 6, duration: 30, difficulty: "Beginner", equipment: "Home - Dumbbells", goal: "Tone & Sculpt",
    exerciseList: [
      { name: "Dumbbell Squat to Press", detail: "3 sets x 12 reps", tip: "Squat down, press the dumbbells overhead as you stand." },
      { name: "Renegade Row", detail: "3 sets x 10 each side", tip: "Plank position, row one dumbbell at a time without twisting your hips." },
      { name: "Sumo Squat", detail: "3 sets x 15 reps", tip: "Wide stance, toes turned out, squat with control." },
      { name: "Lateral Lunge", detail: "3 sets x 10 each side", tip: "Step wide to the side, sit back into the hip you're loading." },
      { name: "Triceps Dips", detail: "3 sets x 12 reps", tip: "Use a bench or sturdy chair, lower with control." },
      { name: "Standing Side Crunch", detail: "3 sets x 15 each side", tip: "Bring your elbow and knee together, engage your obliques." },
    ],
  },
  {
    id: 12, name: "Glute & Core Tone", type: "Strength", exercises: 5, duration: 25, difficulty: "Beginner", equipment: "Bodyweight Only", goal: "Tone & Sculpt",
    exerciseList: [
      { name: "Glute Bridge", detail: "3 sets x 15 reps", tip: "Squeeze your glutes at the top, avoid overarching your back." },
      { name: "Fire Hydrants", detail: "3 sets x 12 each side", tip: "On all fours, lift your leg out to the side with control." },
      { name: "Donkey Kicks", detail: "3 sets x 12 each side", tip: "Kick your heel toward the ceiling, squeeze your glute at the top." },
      { name: "Bicycle Crunches", detail: "3 sets x 20 reps", tip: "Controlled twist, avoid pulling on your neck." },
      { name: "Side Plank", detail: "3 sets x 30 seconds each side", tip: "Stack your hips, keep your body in a straight line." },
    ],
  },
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

const EXERCISE_FAMILIES = {
  squat: {
    category: "Compound · Lower Body",
    primary: ["Quads", "Glutes"],
    secondary: ["Core", "Hamstrings"],
    benefits: ["Builds lower-body strength", "Improves everyday movement patterns like sitting and standing", "Engages your core for stability"],
    steps: ["Stand with feet shoulder-width apart, weight in your heels.", "Sit your hips back and down as if sitting into a chair.", "Keep your chest up and knees tracking over your toes.", "Drive through your heels to stand back up."],
    mistakes: ["Knees collapsing inward", "Rounding your lower back", "Rising onto your toes"],
    alternatives: { easier: "Bodyweight squat", harder: "Barbell back squat", noEquipment: "Bodyweight squat, slow tempo" },
  },
  press: {
    category: "Compound · Upper Body Push",
    primary: ["Shoulders", "Chest"],
    secondary: ["Triceps", "Core"],
    benefits: ["Builds pressing strength", "Improves shoulder stability", "Carries over to everyday pushing movements"],
    steps: ["Start with the weight at shoulder height, elbows slightly forward.", "Brace your core before pressing.", "Press up until your arms are extended, without locking out hard.", "Lower with control back to the start position."],
    mistakes: ["Arching your lower back excessively", "Flaring elbows too wide", "Using momentum instead of controlled strength"],
    alternatives: { easier: "Seated press with lighter weight", harder: "Standing overhead press", noEquipment: "Pike push-up" },
  },
  pull: {
    category: "Compound · Upper Body Pull",
    primary: ["Back", "Lats"],
    secondary: ["Biceps", "Rear Shoulders"],
    benefits: ["Builds a stronger back", "Improves posture", "Balances out pushing exercises"],
    steps: ["Set up with a stable grip and braced core.", "Initiate the pull by drawing your shoulder blades together.", "Pull through until your elbows pass your torso.", "Control the return to a full stretch."],
    mistakes: ["Using momentum or swinging", "Shrugging shoulders up toward your ears", "Only using your arms instead of your back"],
    alternatives: { easier: "Band-assisted row", harder: "Weighted row or pull-up", noEquipment: "Towel row against a table edge" },
  },
  push: {
    category: "Compound · Upper Body Push",
    primary: ["Chest", "Shoulders"],
    secondary: ["Triceps", "Core"],
    benefits: ["Builds functional pushing strength", "No equipment needed", "Strengthens your core to keep your body straight"],
    steps: ["Hands slightly wider than shoulders, body in a straight line.", "Lower your chest toward the floor with control.", "Keep your elbows at roughly a 45° angle from your body.", "Press back up to the start position."],
    mistakes: ["Letting your hips sag", "Flaring elbows out to 90°", "Not going through a full range of motion"],
    alternatives: { easier: "Incline push-up on a bench or step", harder: "Deficit or weighted push-up", noEquipment: "Already bodyweight — try knee push-ups to regress" },
  },
  hinge: {
    category: "Compound · Posterior Chain",
    primary: ["Hamstrings", "Glutes"],
    secondary: ["Lower Back", "Core"],
    benefits: ["Strengthens your posterior chain", "Improves hip hinge mechanics for daily life", "Reduces lower-back injury risk when done with good form"],
    steps: ["Stand tall holding the weight in front of your thighs.", "Push your hips back while keeping a flat back.", "Lower until you feel a stretch in your hamstrings.", "Drive your hips forward to return to standing."],
    mistakes: ["Rounding your back", "Bending the knees too much (turning it into a squat)", "Letting the weight drift away from your body"],
    alternatives: { easier: "Single-dumbbell Romanian deadlift", harder: "Barbell deadlift", noEquipment: "Bodyweight good morning" },
  },
  lunge: {
    category: "Compound · Lower Body",
    primary: ["Quads", "Glutes"],
    secondary: ["Core", "Balance"],
    benefits: ["Builds single-leg strength and balance", "Corrects side-to-side strength imbalances", "Carries over to walking and running mechanics"],
    steps: ["Step forward into a controlled stride.", "Lower until both knees are around 90°.", "Keep your front knee tracking over your foot, not caving in.", "Push back through your front heel to return to standing."],
    mistakes: ["Letting the front knee cave inward", "Taking a stride that's too short", "Leaning too far forward"],
    alternatives: { easier: "Stationary split squat, holding support", harder: "Walking lunge with added weight", noEquipment: "Bodyweight reverse lunge" },
  },
  core: {
    category: "Isolation · Core",
    primary: ["Abs", "Obliques"],
    secondary: ["Hip Flexors", "Lower Back"],
    benefits: ["Builds core stability", "Supports better posture", "Protects your spine during other lifts"],
    steps: ["Set up in a stable, controlled starting position.", "Engage your core before moving.", "Move slowly and with control — avoid rushing reps.", "Keep breathing steadily throughout."],
    mistakes: ["Holding your breath", "Using momentum instead of control", "Letting your lower back arch off the floor"],
    alternatives: { easier: "Shorter hold or fewer reps", harder: "Add a slow tempo or extra hold", noEquipment: "Already bodyweight" },
  },
  curl: {
    category: "Isolation · Arms",
    primary: ["Biceps"],
    secondary: ["Forearms"],
    benefits: ["Builds arm strength and size", "Simple, low-injury-risk movement", "Great for tracking visible progress"],
    steps: ["Stand tall, arms fully extended, weights at your sides.", "Curl the weight up without swinging your torso.", "Squeeze at the top briefly.", "Lower slowly back to the start."],
    mistakes: ["Swinging your body to generate momentum", "Only doing half the range of motion", "Moving too fast"],
    alternatives: { easier: "Lighter weight or fewer reps", harder: "Slower tempo or heavier weight", noEquipment: "Resistance band curl" },
  },
  triceps: {
    category: "Isolation · Arms",
    primary: ["Triceps"],
    secondary: [],
    benefits: ["Builds arm definition", "Complements pressing strength", "Quick to add to any upper-body day"],
    steps: ["Set up with elbows tucked close to your body.", "Extend your arms fully without flaring your elbows out.", "Squeeze your triceps at full extension.", "Return with control."],
    mistakes: ["Letting elbows drift outward", "Using your shoulders instead of your triceps", "Rushing the movement"],
    alternatives: { easier: "Lighter weight, focus on form", harder: "Slower eccentric (lowering) phase", noEquipment: "Bodyweight dips on a chair" },
  },
  cardio: {
    category: "Cardio · Full Body",
    primary: ["Heart & Lungs"],
    secondary: ["Full Body"],
    benefits: ["Raises your heart rate efficiently", "Burns calories in a short amount of time", "No equipment required"],
    steps: ["Keep a steady, sustainable pace rather than sprinting the first few seconds.", "Land softly to protect your joints.", "Breathe rhythmically throughout.", "Slow down if your form starts to break down."],
    mistakes: ["Going too hard too fast and burning out", "Landing heavily instead of softly", "Holding your breath"],
    alternatives: { easier: "Slower pace or a low-impact variation", harder: "Add a jump or increase your pace", noEquipment: "Already bodyweight" },
  },
  mobility: {
    category: "Mobility · Recovery",
    primary: ["Targeted muscle group"],
    secondary: ["Connective tissue"],
    benefits: ["Improves flexibility and range of motion", "Helps your body recover between workouts", "Can reduce muscle tightness and soreness"],
    steps: ["Ease into the position gently — never force it.", "Breathe slowly and deeply throughout.", "Hold at a point of mild tension, not pain.", "Release slowly and switch sides if needed."],
    mistakes: ["Bouncing instead of holding steady", "Forcing a deeper stretch than feels comfortable", "Holding your breath"],
    alternatives: { easier: "Shorter hold, smaller range of motion", harder: "Deepen the stretch slightly or hold longer", noEquipment: "Already equipment-free" },
  },
  raise: {
    category: "Isolation · Shoulders",
    primary: ["Shoulders"],
    secondary: ["Upper Back"],
    benefits: ["Builds shoulder definition", "Improves shoulder stability", "Low-impact and joint-friendly"],
    steps: ["Start with weights at your sides, slight bend in the elbows.", "Raise your arms out to the sides to shoulder height.", "Pause briefly at the top.", "Lower with control."],
    mistakes: ["Using momentum to swing the weights up", "Raising above shoulder height", "Shrugging your shoulders up"],
    alternatives: { easier: "Lighter weight", harder: "Slower tempo, pause at the top", noEquipment: "Resistance band lateral raise" },
  },
  calf: {
    category: "Isolation · Lower Body",
    primary: ["Calves"],
    secondary: [],
    benefits: ["Builds lower-leg strength", "Supports ankle stability", "Quick and easy to add to any leg day"],
    steps: ["Stand tall, weight balanced evenly.", "Rise up onto your toes as high as comfortable.", "Pause briefly at the top.", "Lower slowly back down."],
    mistakes: ["Rushing through reps", "Not going through a full range of motion", "Using momentum to bounce up"],
    alternatives: { easier: "Fewer reps or seated variation", harder: "Single-leg calf raise", noEquipment: "Already bodyweight" },
  },
  default: {
    category: "Full Body",
    primary: ["Multiple muscle groups"],
    secondary: ["Core"],
    benefits: ["Supports your overall training goal", "Builds strength and coordination", "Fits well into a balanced routine"],
    steps: ["Set up in a stable, controlled position.", "Move through the exercise with control.", "Keep your core engaged throughout.", "Return to the start position with control."],
    mistakes: ["Rushing through reps", "Losing core tension", "Using momentum instead of muscle control"],
    alternatives: { easier: "Reduce weight, reps, or range of motion", harder: "Increase weight, reps, or slow the tempo", noEquipment: "Try a bodyweight variation" },
  },
};

function detectFamily(name) {
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

function buildExerciseDetail(ex) {
  const family = EXERCISE_FAMILIES[detectFamily(ex.name)] || EXERCISE_FAMILIES.default;
  return { ...family, coachTip: ex.tip, name: ex.name, detail: ex.detail };
}

function parseSetsReps(detail) {
  if (!detail) return null;
  const m = detail.match(/(\d+)\s*sets?\s*x\s*(\d+)\s*([a-z ]+)/i);
  if (!m) return null;
  const unit = /rep/i.test(m[3]) ? "reps" : "seconds";
  return { sets: parseInt(m[1]), amount: parseInt(m[2]), unit };
}

function parseDurationSeconds(detail) {
  if (!detail) return 45;
  const mMin = detail.match(/(\d+)\s*minute/i);
  if (mMin) return parseInt(mMin[1]) * 60;
  const mSec = detail.match(/(\d+)\s*second/i);
  if (mSec) return parseInt(mSec[1]);
  return 45;
}

const STORAGE_KEY = "fitsync_data_v1";

function loadSaved() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    return {};
  }
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

function GradientRing({ percent, size = 168, stroke = 14, gradFrom, gradTo, id }) {
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

const POSES = {
  standing: { head: { cx: 50, cy: 20, r: 8 }, lines: [[50,28,50,60],[50,35,30,50],[50,35,70,50],[50,60,35,90],[50,60,65,90]] },
  squat: { head: { cx: 50, cy: 25, r: 8 }, lines: [[50,33,50,58],[50,38,25,38],[50,38,75,38],[50,58,30,68],[30,68,25,90],[50,58,70,68],[70,68,75,90]] },
  press: { head: { cx: 50, cy: 25, r: 8 }, lines: [[50,33,50,65],[50,38,30,15],[50,38,70,15],[50,65,38,90],[50,65,62,90]] },
  raise: { head: { cx: 50, cy: 22, r: 8 }, lines: [[50,30,50,60],[50,35,20,35],[50,35,80,35],[50,60,38,90],[50,60,62,90]] },
  pull: { head: { cx: 45, cy: 30, r: 8 }, lines: [[45,38,60,60],[50,45,30,50],[55,50,35,55],[60,60,50,90],[60,60,70,90]] },
  push: { head: { cx: 20, cy: 50, r: 7 }, lines: [[27,50,90,50],[35,50,35,70],[55,50,55,70]] },
  lunge: { head: { cx: 50, cy: 22, r: 8 }, lines: [[50,30,55,58],[50,35,35,45],[55,35,70,30],[55,58,40,70],[40,70,40,90],[55,58,75,75],[75,75,85,90]] },
  hinge: { head: { cx: 40, cy: 30, r: 8 }, lines: [[40,38,65,55],[45,42,40,65],[50,45,45,68],[65,55,55,90],[65,55,75,90]] },
  curl: { head: { cx: 50, cy: 22, r: 8 }, lines: [[50,30,50,60],[50,35,65,40],[65,40,60,25],[50,35,35,50],[50,60,38,90],[50,60,62,90]] },
  cardio: { head: { cx: 45, cy: 20, r: 8 }, lines: [[45,28,55,55],[50,32,65,25],[50,35,35,45],[55,55,40,60],[40,60,35,45],[55,55,70,80],[70,80,80,90]] },
  mobility: { head: { cx: 30, cy: 55, r: 7 }, lines: [[35,60,55,75],[35,62,15,68],[40,65,20,72],[55,75,85,78]] },
};

function PoseIcon({ family, color, size = 44 }) {
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
  const saved = useMemo(() => loadSaved(), []);
  const [onboarded, setOnboarded] = useState(saved.onboarded ?? false);
  const [onboardStep, setOnboardStep] = useState(1);
  const [profile, setProfile] = useState(saved.profile ?? { goal: null, experience: null, equipment: null, cycleAware: false, cycleStartDate: "", cycleLength: 28 });

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
  const remaining = Math.max(TARGETS.kcal - kcalConsumed, 0);
  const pctKcal = (kcalConsumed / TARGETS.kcal) * 100;

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
    setLog((prev) => [...prev, { logId: `${Date.now()}`, meal: targetMeal, food: selectedFood, qty }]);
    setSelectedFood(null);
    setQty(1);
    setQuery("");
    awardXp(10, "food_logged");
  }

  function removeEntry(logId) {
    setLog((prev) => prev.filter((e) => e.logId !== logId));
  }

  function quickAdd(food) {
    setLog((prev) => [...prev, { logId: `${Date.now()}`, meal: targetMeal, food, qty: 1 }]);
    setJustAddedId(food.id);
    setTimeout(() => setJustAddedId(null), 900);
    awardXp(10, "food_logged");
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
  }

  function openSession(workout) {
    const list = workout.exerciseList || (workout.exercises && Array.isArray(workout.exercises) ? workout.exercises.map((e) => ({ name: e, detail: "", tip: "Focus on slow, controlled form." })) : []);
    setActiveSession({ workout, list, index: 0 });
  }

  function nextExercise() {
    setActiveSession((s) => {
      if (!s) return s;
      if (s.index < s.list.length - 1) return { ...s, index: s.index + 1 };
      return s;
    });
  }

  function prevExercise() {
    setActiveSession((s) => (s && s.index > 0 ? { ...s, index: s.index - 1 } : s));
  }

  function finishSession() {
    if (!activeSession) return;
    setWorkoutDone(true);
    setWorkoutFeedback(activeSession.workout.name);
    setTimeout(() => setWorkoutFeedback(null), 2500);
    awardXp(30, "workout_completed");
    setLastWorkoutType(activeSession.workout.type);
    addTimelineEvent(Dumbbell, `Completed ${activeSession.workout.name}`, "workout");
    setActiveSession(null);
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
      },
    ]);
    awardXp(10, "recipe_logged");
  }

  function buildMealSuggestions() {
    const remainingKcal = Math.max(TARGETS.kcal - kcalConsumed, 0);
    const remainingProtein = Math.max(TARGETS.protein - proteinConsumed, 0);
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

  function nutritionInsight() {
    const proteinPct = (proteinConsumed / TARGETS.protein) * 100;
    const fiberPct = (fiberConsumed / TARGETS.fiber) * 100;
    if (proteinPct >= 90) return { icon: Zap, color: theme.amber, label: "Protein", text: `You're at ${Math.round(proteinPct)}% of your protein goal — right on track.` };
    if (fiberPct < 50) return { icon: Leaf, color: theme.lime, label: "Fiber", text: `You're at ${Math.round(fiberConsumed)}g of ${TARGETS.fiber}g fiber — a piece of fruit or legumes would help.` };
    return { icon: Droplet, color: theme.sky, label: "Hydration", text: "Keep sipping water through the rest of the day — you're doing well overall." };
  }

  const fitsyncScore = useMemo(() => {
    const training = workoutDone ? 90 : 55;
    const nutrition = Math.min(100, Math.round((proteinConsumed / TARGETS.protein) * 100));
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
        timeline: timeline.map((t) => ({ id: t.id, text: t.text, type: t.type, ts: t.ts, time: t.time })),
        xpLedger,
      };
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
    } catch (e) {
      // storage full or unavailable — fail silently, app still works in-memory
    }
  }, [onboarded, profile, log, workoutDone, weightHistory, measurementLog, photos, streak, exerciseHistory, myRecipes, goalWeight, prCount, timeline, xpLedger]);

  const badges = [
    { id: 1, name: "First Workout", unlocked: workoutDone, icon: Dumbbell },
    { id: 2, name: "7-Day Streak", unlocked: streak >= 7, icon: Flame },
    { id: 3, name: "10 Meals Logged", unlocked: log.length >= 10, icon: Apple },
    { id: 4, name: "Goal Set", unlocked: !!profile.goal, icon: Target },
    { id: 5, name: "Consistency", unlocked: streak >= 3, icon: Check },
    { id: 6, name: "Progress Tracked", unlocked: measurementLog.length >= 2 || photos.length >= 1, icon: Ruler },
    { id: 7, name: "Level 3", unlocked: level >= 3, icon: Award },
    { id: 8, name: "30-Day Streak", unlocked: streak >= 30, icon: Sparkles },
    { id: 9, name: "First Photo", unlocked: photos.length >= 1, icon: Image },
    { id: 10, name: "Recovery Fan", unlocked: workoutTypeFilter === "Recovery", icon: Leaf },
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
                  {badges.filter((b) => b.unlocked).slice(0, 3).map((b) => (
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
              <ScreenHeader title="Nutrition" subtitle="Your personalized food hub" />

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
                  <div style={{ background: theme.surface, border: `1px solid ${theme.border}`, borderRadius: 14, padding: "14px 16px", marginBottom: 14 }}>
                    <div style={{ fontSize: 10, letterSpacing: 1, color: theme.muted, textTransform: "uppercase", marginBottom: 4 }}>Today's Nutrition</div>
                    <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 4 }}>
                      <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 26, color: theme.text }}>{Math.round(kcalConsumed)}</span>
                      <span style={{ fontSize: 12, color: theme.muted }}>/ {TARGETS.kcal} kcal</span>
                    </div>
                    <div style={{ height: 7, borderRadius: 4, background: theme.surfaceAlt, overflow: "hidden", marginBottom: 6 }}>
                      <div style={{ height: "100%", width: `${Math.min((kcalConsumed / TARGETS.kcal) * 100, 100)}%`, background: theme.lime, borderRadius: 4 }} />
                    </div>
                    <div style={{ fontSize: 11, color: theme.lime, marginBottom: 12 }}>{Math.max(Math.round(TARGETS.kcal - kcalConsumed), 0)} kcal remaining</div>
                    {[
                      ["Protein", proteinConsumed, TARGETS.protein, theme.coral],
                      ["Carbs", carbsConsumed, TARGETS.carbs, theme.lime],
                      ["Fat", fatConsumed, TARGETS.fat, theme.sky],
                      ["Fiber", fiberConsumed, TARGETS.fiber, theme.amber],
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
                        <button
                          onClick={() => quickAdd(f)}
                          style={{ width: 28, height: 28, borderRadius: "50%", background: theme.surfaceAlt, border: `1px solid ${theme.border}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}
                        >
                          <Plus size={13} color={theme.lime} />
                        </button>
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
                      Based on what's left today: {Math.max(Math.round(TARGETS.kcal - kcalConsumed), 0)} kcal and {Math.max(Math.round(TARGETS.protein - proteinConsumed), 0)}g protein remaining.
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
                    <WorkoutCard key={w.id} w={w} recommended onStart={() => openSession(w)} />
                  ))}
                </>
              )}

              <div style={{ fontSize: 10, letterSpacing: 1.5, color: theme.muted, textTransform: "uppercase", marginBottom: 8, marginTop: recommended.length > 0 ? 10 : 0 }}>
                {recommended.length > 0 ? "More in library" : "Library"}
              </div>
              {rest.length === 0 && recommended.length === 0 ? (
                <div style={{ fontSize: 12, color: theme.muted, padding: "10px 0" }}>No workouts match this filter.</div>
              ) : (
                rest.map((w) => <WorkoutCard key={w.id} w={w} onStart={() => openSession(w)} />)
              )}
            </>
          )}

          {activeScreen === "progress" && (
            <>
              <ScreenHeader title="Progress" subtitle={`${getGreeting()}, your fitness journey`} />

              <div style={{ display: "flex", gap: 5, marginBottom: 16, overflowX: "auto" }}>
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
                      overflow: "hidden",
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
                  <div>
                    <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 19, fontWeight: 700, color: theme.text, lineHeight: 1.2, marginBottom: 3 }}>{ex.name}</div>
                    <div style={{ fontSize: 11, color: theme.muted }}>{detail.category}</div>
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
