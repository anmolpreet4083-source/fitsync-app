// Static data: food database, workout library, exercise content, defaults.
// No React state here — safe to import anywhere without side effects.

import { Home as HomeIcon, Apple, Dumbbell, BarChart3, MessageCircle } from "lucide-react";

export const CUISINES = ["Indian", "Mexican", "Japanese", "Italian", "Thai", "Middle Eastern", "Chinese", "American", "Mediterranean", "Caribbean", "African", "Filipino"];

export const FOOD_DB = [
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

export const MEALS = ["Breakfast", "Lunch", "Snack", "Dinner"];

export const initialLog = [
  { logId: "a1", meal: "Breakfast", food: FOOD_DB[3], qty: 1 },
  { logId: "a2", meal: "Breakfast", food: FOOD_DB[6], qty: 1 },
  { logId: "a3", meal: "Lunch", food: FOOD_DB[0], qty: 1 },
  { logId: "a4", meal: "Lunch", food: FOOD_DB[1], qty: 1 },
  { logId: "a5", meal: "Lunch", food: FOOD_DB[2], qty: 1 },
  { logId: "a6", meal: "Snack", food: FOOD_DB[8], qty: 1 },
  { logId: "a7", meal: "Dinner", food: FOOD_DB[5], qty: 1 },
  { logId: "a8", meal: "Dinner", food: FOOD_DB[4], qty: 2 },
];

export const DEFAULT_TARGETS = { kcal: 2200, protein: 120, carbs: 250, fat: 70, fiber: 28, water: 2.5, steps: 10000 };

export const GOALS = ["Lose Fat", "Build Muscle", "Gain Weight", "Tone & Sculpt", "Get Stronger", "General Fitness"];

export const EXPERIENCE_LEVELS = ["Beginner", "Intermediate", "Advanced"];

export const EQUIPMENT_OPTIONS = ["Full Gym", "Home - Dumbbells", "Bodyweight Only"];

export const TRAINING_LOCATIONS = ["Home", "Gym", "Outdoors"];

export const DETAILED_EQUIPMENT = ["No equipment", "Dumbbells", "Resistance bands", "Bench", "Pull-up bar", "Kettlebells", "Barbells", "Cable machines", "Smith machine", "Gym machines"];

export const WORKOUT_TYPES = ["All", "Strength", "Cardio", "Mobility", "Recovery"];

export const WORKOUT_LIBRARY = [
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

export const WEIGHT_HISTORY = [
  { label: "W1", value: 72.4 },
  { label: "W2", value: 72.1 },
  { label: "W3", value: 71.8 },
  { label: "W4", value: 71.9 },
  { label: "W5", value: 71.5 },
  { label: "W6", value: 71.2 },
];

export const INITIAL_MEASUREMENTS = [{ label: "M1", waist: 82, hips: 96, chest: 98, arms: 33 }];

export const NAV_ITEMS = [
  { key: "home", icon: HomeIcon, label: "Home" },
  { key: "nutrition", icon: Apple, label: "Nutrition" },
  { key: "workout", icon: Dumbbell, label: "Workout" },
  { key: "progress", icon: BarChart3, label: "Progress" },
  { key: "coach", icon: MessageCircle, label: "Coach" },
];

export const EXERCISE_FAMILIES = {
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

export const EXERCISE_MEDIA = {
  "Barbell Squat": { videoUrl: null, thumbnail: null, duration: "0:15", longVideoUrl: null },
  "Push-ups": { videoUrl: null, thumbnail: null, duration: "0:12", longVideoUrl: null },
  "Plank": { videoUrl: null, thumbnail: null, duration: "0:10", longVideoUrl: null },
  "Dumbbell Bench Press": { videoUrl: null, thumbnail: null, duration: "0:14", longVideoUrl: null },
  "Romanian Deadlift": { videoUrl: null, thumbnail: null, duration: "0:16", longVideoUrl: null },
  "Glute Bridge": { videoUrl: null, thumbnail: null, duration: "0:11", longVideoUrl: null },
};

export const POSES = {
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

