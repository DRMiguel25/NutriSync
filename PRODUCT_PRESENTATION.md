# NutriSync — Product Presentation Report
### "Eat smart, live better — no excuses."

---

## 1. The Problem (2 min)

**What are we solving?**

- 73% of people who start a diet quit within the first 2 weeks because they don't have a clear, personalized plan.
- Most nutrition apps are complex, expensive, or require subscriptions.
- People don't know how many calories they need or how to distribute their macronutrients.
- Generic meal plans don't account for dietary preferences (vegan, vegetarian, allergies).

> **Key message:** People want to eat better, but they don't know WHERE to start.

---

## 2. Our Solution: NutriSync (3 min)

NutriSync is a **free, web-based nutrition app** that generates a personalized weekly meal plan in under 2 minutes.

### How it works — 3 steps:

| Step | What the user does | What happens |
|------|-------------------|--------------|
| **1. Survey** | Answers 4 quick screens about their body, goals, and dietary preferences | Data is collected client-side |
| **2. Processing** | The app calculates using the **Mifflin-St Jeor formula** | Daily calories and macro targets are generated |
| **3. Plan** | Receives a complete 7-day meal plan | Breakfast, lunch, dinner, and snacks for every day |

### Key features:
- **Calorie calculation** based on age, weight, height, sex, and activity level
- **Macronutrient breakdown** (protein, carbs, fats) adjusted by goal
- **3 dietary modes**: Standard, Vegetarian, Vegan
- **User authentication** — register and login to save plans
- **Daily meal tracking** — check off meals as you complete them
- **Adherence dashboard** — see your weekly progress percentage
- **Plan history** — compare past plans and track your journey

---

## 3. What Makes NutriSync a Better Option (3 min)

### Competitive comparison:

| Feature | NutriSync | MyFitnessPal | Noom | Generic Diet PDF |
|---------|:---------:|:------------:|:----:|:----------------:|
| Free to use | ✅ | ❌ (premium) | ❌ ($60/mo) | ✅ |
| Personalized meal plan | ✅ | ❌ | ✅ | ❌ |
| No app install required | ✅ | ❌ | ❌ | ✅ |
| Dietary preference support | ✅ | Partial | ✅ | ❌ |
| Daily tracking | ✅ | ✅ | ✅ | ❌ |
| Works offline (client-side) | ✅ | ❌ | ❌ | ✅ |
| No account required to try | ✅ | ❌ | ❌ | ✅ |

### Our advantages:
1. **Zero cost** — no subscriptions, no hidden fees
2. **Instant results** — no waiting, no onboarding flow that takes 20 minutes
3. **No download** — runs in any browser, mobile or desktop
4. **Privacy** — all data stays on the user's device (localStorage)
5. **Science-based** — uses the Mifflin-St Jeor equation, the gold standard for calorie estimation

---

## 4. Target Audience (1 min)

| Segment | Why NutriSync works for them |
|---------|------------------------------|
| **University students** | Free, quick, accessible from a phone |
| **Gym beginners** | Clear calorie and macro targets for their goal |
| **People with dietary restrictions** | Vegan and vegetarian meal plans included |
| **Health-curious adults** | No commitment needed — try it in 2 minutes |

---

## 5. Technical Overview (2 min)

For the technical audience — how we built it:

- **Frontend:** React 19 + Tailwind CSS v4
- **Icons:** Lucide React
- **Architecture:** Single-file component (`App.jsx`)
- **State management:** React `useState` hooks
- **Data persistence:** `localStorage` (no backend, no server costs)
- **Authentication:** Client-side with hashed passwords
- **Formula:** Mifflin-St Jeor for BMR, activity multipliers for TDEE
- **Goal adjustment:** −500 kcal (lose), +400 kcal (gain), 0 (maintain)

### Macro distribution by goal:

| Goal | Protein | Carbs | Fats |
|------|---------|-------|------|
| Lose weight | 40% | 30% | 30% |
| Gain muscle | 30% | 45% | 25% |
| Maintain | 30% | 40% | 30% |

---

## 6. Live Demo Script (3 min)

> **Tip:** This is where you SHOW the app live. Don't read from slides — let the product speak.

### Demo flow:
1. Open the app → show the landing page and brand
2. Click "Get My Plan" → show the auth screen, create an account
3. Walk through the 4 survey steps with sample data
4. Show the results: calories, macros, 7-day meal plan
5. Click "Save My Plan" → show the dashboard
6. Check off a few meals → show the adherence percentage update in real-time

### Sample data for demo:
- Name: Maria García
- Age: 25, Weight: 62 kg, Height: 163 cm, Female
- Goal: Lose weight
- Activity: Moderate, 3 meals/day
- Diet: Vegetarian

**Expected result:** ~1,553 kcal/day

---

## 7. Future Improvements (1 min)

- Water intake tracking
- Weekly weight log with progress chart
- Export meal plan as PDF
- Push notification reminders
- Integration with fitness trackers
- Multi-language support (English / Spanish)

---

## 8. Closing (30 sec)

> **"NutriSync puts a nutritionist in your pocket — for free, in 2 minutes, with no excuses."**

### Call to action:
- Try it now: `npm run dev` → `http://localhost:5173`
- All code is in a single file: `src/App.jsx`

---

## Presentation Tips (from class guidelines)

- ⏱️ **Time:** Keep it between 10–15 minutes
- 🎯 **Purpose:** Present the uses of the product + show why it's a better option
- 💬 **Language:** Use words your team understands — avoid unnecessary jargon
- 📋 **Clarity:** Know what you're presenting AND what was asked of you
- 📊 **Slides = SUPPORT:** Don't read from them. Know your product, talk about it naturally
