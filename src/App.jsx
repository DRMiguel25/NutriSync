import { useState } from 'react';
import {
    Leaf, ArrowRight, ArrowLeft, ClipboardList, Cpu, Utensils, ChevronRight,
    RotateCcw, Activity, Target, Flame, Dumbbell, Scale, Heart, Apple, Beef,
    Droplets, Zap, Sun, Moon, Coffee, Cookie, Check, Lock, User, LogOut,
    Save, Calendar, CheckCircle, BarChart3, History, Eye, EyeOff, Shield,
    Mail, Trash2, AlertTriangle, Home, ChevronDown, MessageCircle, HelpCircle,
} from 'lucide-react';

/* ──────────────────────────────────────────────
   MEAL PLAN DATA
   ────────────────────────────────────────────── */

const MEAL_PLANS = {
    none: [
        { day: 'Monday', breakfast: 'Greek yogurt parfait with granola & berries', lunch: 'Grilled chicken Caesar salad with whole-grain croutons', dinner: 'Pan-seared salmon with roasted sweet potatoes & broccoli', snack: 'Apple slices with almond butter' },
        { day: 'Tuesday', breakfast: 'Scrambled eggs with whole-wheat toast & avocado', lunch: 'Turkey & avocado wrap with side salad', dinner: 'Lean beef stir-fry with brown rice & mixed vegetables', snack: 'Trail mix with nuts & dried fruit' },
        { day: 'Wednesday', breakfast: 'Overnight oats with chia seeds, banana & honey', lunch: 'Grilled shrimp bowl with quinoa, black beans & corn', dinner: 'Herb-crusted chicken breast with mashed sweet potatoes & green beans', snack: 'Cottage cheese with pineapple' },
        { day: 'Thursday', breakfast: 'Protein smoothie with spinach, banana & peanut butter', lunch: 'Mediterranean tuna salad with olives & feta', dinner: 'Pork tenderloin with roasted Brussels sprouts & wild rice', snack: 'Hard-boiled eggs with cherry tomatoes' },
        { day: 'Friday', breakfast: 'Whole-grain pancakes with fresh berries & maple syrup', lunch: 'Chicken & vegetable soup with whole-wheat bread', dinner: 'Baked cod with lemon-herb couscous & asparagus', snack: 'Protein bar & a banana' },
        { day: 'Saturday', breakfast: 'Veggie omelet with mushrooms, peppers & cheese', lunch: 'BBQ chicken salad with corn, black beans & ranch', dinner: 'Grilled steak with baked potato & steamed broccoli', snack: 'Greek yogurt with granola' },
        { day: 'Sunday', breakfast: 'Avocado toast with poached eggs & everything seasoning', lunch: 'Asian chicken lettuce wraps with peanut sauce', dinner: 'Slow-cooker chicken tikka masala with basmati rice', snack: 'Mixed berries with dark chocolate squares' },
    ],
    vegetarian: [
        { day: 'Monday', breakfast: 'Greek yogurt parfait with granola & mixed berries', lunch: 'Caprese panini with fresh mozzarella, tomato & basil', dinner: 'Vegetable stir-fry with tofu & brown rice', snack: 'Hummus with carrot & celery sticks' },
        { day: 'Tuesday', breakfast: 'Spinach & cheese omelet with whole-wheat toast', lunch: 'Black bean & corn quesadilla with Greek yogurt dip', dinner: 'Eggplant Parmesan with whole-wheat pasta & side salad', snack: 'Apple slices with peanut butter' },
        { day: 'Wednesday', breakfast: 'Overnight oats with almond milk, chia seeds & banana', lunch: 'Mediterranean falafel wrap with tahini sauce', dinner: 'Mushroom risotto with Parmesan & roasted asparagus', snack: 'Mixed nuts & dried cranberries' },
        { day: 'Thursday', breakfast: 'Smoothie bowl with açaí, granola & fresh fruit', lunch: 'Spinach & ricotta stuffed shells with marinara', dinner: 'Vegetable curry with chickpeas & jasmine rice', snack: 'Cottage cheese with sliced peaches' },
        { day: 'Friday', breakfast: 'Whole-grain waffles with strawberries & whipped cream', lunch: 'Greek salad with quinoa, olives & feta cheese', dinner: 'Stuffed bell peppers with rice, beans & cheese', snack: 'Protein smoothie with berries' },
        { day: 'Saturday', breakfast: 'Banana pancakes with maple syrup & walnuts', lunch: 'Grilled halloumi wrap with roasted vegetables', dinner: 'Pasta primavera with garlic bread & Caesar salad', snack: 'Energy balls with oats & dark chocolate' },
        { day: 'Sunday', breakfast: 'Avocado toast with cherry tomatoes & microgreens', lunch: 'Lentil soup with crusty bread & side salad', dinner: 'Homemade margherita pizza with arugula salad', snack: 'Greek yogurt with honey & walnuts' },
    ],
    vegan: [
        { day: 'Monday', breakfast: 'Açaí smoothie bowl with coconut, granola & berries', lunch: 'Roasted vegetable & hummus wrap with mixed greens', dinner: 'Thai peanut noodles with tofu & vegetables', snack: 'Fresh fruit salad with mint' },
        { day: 'Tuesday', breakfast: 'Chia pudding with coconut milk, mango & granola', lunch: 'Quinoa & black bean power bowl with avocado', dinner: 'Chickpea tikka masala with basmati rice & naan', snack: 'Roasted chickpeas with spices' },
        { day: 'Wednesday', breakfast: 'Tofu scramble with peppers, onions & spinach', lunch: 'Mediterranean lentil salad with sun-dried tomatoes', dinner: 'Sweet potato & black bean tacos with cashew crema', snack: 'Almond butter & banana on rice cakes' },
        { day: 'Thursday', breakfast: 'Green smoothie with kale, banana, mango & flax', lunch: 'Falafel bowl with tabbouleh & tahini dressing', dinner: 'Mushroom & walnut bolognese with whole-wheat pasta', snack: 'Trail mix with nuts, seeds & dark chocolate' },
        { day: 'Friday', breakfast: 'Overnight oats with oat milk, berries & hemp seeds', lunch: 'Spicy Thai coconut soup with vegetables & rice noodles', dinner: 'Stuffed acorn squash with wild rice & cranberries', snack: 'Edamame with sea salt' },
        { day: 'Saturday', breakfast: 'Banana oat pancakes with maple syrup & blueberries', lunch: 'BBQ jackfruit sandwich with coleslaw', dinner: 'Vegetable pad Thai with crispy tofu & peanuts', snack: 'Dates stuffed with almond butter' },
        { day: 'Sunday', breakfast: 'Avocado toast on sourdough with hemp seeds & red pepper flakes', lunch: 'Roasted cauliflower & lentil curry bowl', dinner: 'Vegan Buddha bowl with sweet potato, kale & tahini', snack: 'Frozen banana ice cream with cacao nibs' },
    ],
};

/* ──────────────────────────────────────────────
   TIPS DATA
   ────────────────────────────────────────────── */

const TIPS_BY_GOAL = {
    lose: [
        'Drink a full glass of water 20 minutes before each meal — it naturally reduces portion sizes.',
        'Focus on high-fiber vegetables and lean proteins to stay satisfied longer with fewer calories.',
        'Practice mindful eating: chew slowly, savor flavors, and stop when you feel 80% full.',
        'Get 7–9 hours of quality sleep — poor sleep increases hunger hormones and cravings.',
    ],
    gain: [
        'Eat every 3–4 hours to maintain a consistent caloric surplus throughout the day.',
        'Add healthy calorie-dense foods like nuts, nut butter, avocado, and olive oil to your meals.',
        'Prioritize post-workout nutrition — consume protein and carbs within 45 minutes of training.',
        'Track your intake for the first 2 weeks to ensure you\'re consistently hitting your surplus target.',
    ],
    maintain: [
        'Build consistent meal timing habits — your body thrives on routine and regularity.',
        'Aim for a balanced plate: ½ vegetables, ¼ lean protein, ¼ complex carbohydrates.',
        'Stay hydrated — aim for at least 8 glasses of water per day, more if you\'re active.',
        'Weigh yourself weekly at the same time to catch trends early and adjust accordingly.',
    ],
};

/* ──────────────────────────────────────────────
   UTILITY FUNCTIONS
   ────────────────────────────────────────────── */

function calculateCalories(data) {
    const { age, weight, height, sex, goal, activity } = data;
    // Mifflin-St Jeor
    let bmr;
    if (sex === 'male') {
        bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
        bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }
    const activityMultipliers = { sedentary: 1.2, moderate: 1.55, active: 1.9 };
    let tdee = bmr * (activityMultipliers[activity] || 1.2);
    if (goal === 'lose') tdee -= 500;
    if (goal === 'gain') tdee += 400;
    return Math.round(tdee);
}

function calculateMacros(calories, goal) {
    const ratios = {
        lose: { protein: 0.40, carbs: 0.30, fats: 0.30 },
        gain: { protein: 0.30, carbs: 0.45, fats: 0.25 },
        maintain: { protein: 0.30, carbs: 0.40, fats: 0.30 },
    };
    const r = ratios[goal] || ratios.maintain;
    return {
        protein: { grams: Math.round((calories * r.protein) / 4), pct: Math.round(r.protein * 100) },
        carbs: { grams: Math.round((calories * r.carbs) / 4), pct: Math.round(r.carbs * 100) },
        fats: { grams: Math.round((calories * r.fats) / 9), pct: Math.round(r.fats * 100) },
    };
}

/* ──────────────────────────────────────────────
   AUTH & STORAGE UTILITIES
   ────────────────────────────────────────────── */

function simpleHash(str) {
    let h = 0;
    for (let i = 0; i < str.length; i++) { h = ((h << 5) - h) + str.charCodeAt(i); h |= 0; }
    return h.toString(36);
}

function getUsers() { return JSON.parse(localStorage.getItem('nutrisync_users') || '[]'); }
function saveUsers(u) { localStorage.setItem('nutrisync_users', JSON.stringify(u)); }
function getSession() {
    const sid = localStorage.getItem('nutrisync_session');
    return sid ? getUsers().find((u) => u.id === sid) || null : null;
}
function setSession(id) { localStorage.setItem('nutrisync_session', id); }
function clearSession() { localStorage.removeItem('nutrisync_session'); }

function registerUser(name, email, password) {
    const users = getUsers();
    if (users.find((u) => u.email === email)) return { error: 'Email already registered' };
    const user = { id: Date.now().toString(36), name, email, passwordHash: simpleHash(password) };
    users.push(user); saveUsers(users); setSession(user.id);
    return { user };
}

function loginUser(email, password) {
    const users = getUsers();
    const user = users.find((u) => u.email === email && u.passwordHash === simpleHash(password));
    if (!user) return { error: 'Invalid email or password' };
    setSession(user.id);
    return { user };
}

function getUserPlans(userId) { return JSON.parse(localStorage.getItem(`nutrisync_plans_${userId}`) || '[]'); }
function saveUserPlans(userId, plans) { localStorage.setItem(`nutrisync_plans_${userId}`, JSON.stringify(plans)); }

/* ──────────────────────────────────────────────
   COMPONENTS
   ────────────────────────────────────────────── */

// ─── Navbar ───
function Navbar({ user, onLogout, onDashboard, onHome, screen }) {
    return (
        <>
            {/* Top nav */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-100 shadow-sm">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-2 cursor-pointer" onClick={onHome}>
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#2E7D32] to-[#4CAF50] flex items-center justify-center shadow-md">
                            <Leaf className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xl font-bold bg-gradient-to-r from-[#2E7D32] to-[#1565C0] bg-clip-text text-transparent">NutriSync</span>
                    </div>
                    {user ? (
                        <div className="flex items-center gap-3">
                            <button onClick={onDashboard} className="hidden sm:flex items-center gap-1.5 text-sm font-medium transition cursor-pointer px-3 py-1.5 rounded-lg hover:bg-gray-50">
                                <BarChart3 className={`w-4 h-4 ${screen === 'dashboard' ? 'text-[#2E7D32]' : 'text-gray-500'}`} />
                                <span className={screen === 'dashboard' ? 'text-[#2E7D32]' : 'text-gray-500'}>Dashboard</span>
                            </button>
                            <div className="flex items-center gap-2 pl-3 border-l border-gray-200">
                                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#2E7D32] to-[#1565C0] flex items-center justify-center">
                                    <span className="text-xs font-bold text-white">{user.name.charAt(0).toUpperCase()}</span>
                                </div>
                                <span className="hidden sm:block text-sm font-medium text-gray-700 max-w-[100px] truncate">{user.name}</span>
                                <button onClick={onLogout} className="text-gray-400 hover:text-red-500 transition cursor-pointer" title="Logout"><LogOut className="w-4 h-4" /></button>
                            </div>
                        </div>
                    ) : (
                        <span className="hidden sm:block text-xs text-gray-400 font-medium tracking-wide">Personalized Nutrition</span>
                    )}
                </div>
            </nav>
            {/* Mobile bottom nav */}
            {user && (
                <nav className="fixed bottom-0 left-0 right-0 z-50 sm:hidden bg-white/90 backdrop-blur-lg border-t border-gray-200 shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
                    <div className="flex items-center justify-around py-2 px-4">
                        <button onClick={onHome} className={`flex flex-col items-center gap-0.5 px-4 py-1.5 rounded-xl transition-all cursor-pointer ${screen === 'landing' ? 'text-[#2E7D32]' : 'text-gray-400'}`}>
                            <Home className="w-5 h-5" />
                            <span className="text-[10px] font-semibold">Home</span>
                        </button>
                        <button onClick={onDashboard} className={`flex flex-col items-center gap-0.5 px-4 py-1.5 rounded-xl transition-all cursor-pointer ${screen === 'dashboard' ? 'text-[#2E7D32]' : 'text-gray-400'}`}>
                            <BarChart3 className="w-5 h-5" />
                            <span className="text-[10px] font-semibold">Dashboard</span>
                        </button>
                        <button onClick={onLogout} className="flex flex-col items-center gap-0.5 px-4 py-1.5 rounded-xl text-gray-400 hover:text-red-500 transition-all cursor-pointer">
                            <LogOut className="w-5 h-5" />
                            <span className="text-[10px] font-semibold">Logout</span>
                        </button>
                    </div>
                </nav>
            )}
        </>
    );
}

// ─── FAQ Accordion ───
function FaqAccordion() {
    const [openIdx, setOpenIdx] = useState(null);
    const faqs = [
        { q: 'Is NutriSync safe to use?', a: 'Yes. NutriSync uses the Mifflin-St Jeor equation, the gold standard in nutrition science. Our plans are designed to be safe and balanced. However, we always recommend consulting with your preferred health specialist before starting any new nutrition plan.' },
        { q: 'How accurate are the calorie calculations?', a: 'The Mifflin-St Jeor formula has been validated by over 30 years of clinical research and is considered the most accurate predictive equation for estimating basal metabolic rate (BMR) by the Academy of Nutrition and Dietetics.' },
        { q: 'Can I use NutriSync if I have dietary restrictions?', a: 'Absolutely! NutriSync offers three dietary modes: Standard, Vegetarian, and Vegan. Each plan is carefully tailored to ensure you get all the nutrients you need while respecting your dietary preferences.' },
        { q: 'Is my personal data safe?', a: 'Your privacy is our priority. All data is stored locally on your device and never sent to external servers. We do not collect, share, or sell any personal information. You are always in full control of your data.' },
        { q: 'Does it cost anything?', a: 'NutriSync is completely free — no subscriptions, no hidden fees, no premium tiers. We believe access to quality nutrition guidance should be available to everyone, regardless of budget.' },
    ];
    return (
        <div className="space-y-3">
            {faqs.map((faq, i) => (
                <div key={i} className={`bg-white border rounded-2xl overflow-hidden transition-all duration-300 ${openIdx === i ? 'border-[#2E7D32]/30 shadow-md' : 'border-gray-100 hover:border-gray-200'}`}>
                    <button onClick={() => setOpenIdx(openIdx === i ? null : i)} className="w-full flex items-center justify-between p-5 text-left cursor-pointer">
                        <span className="text-sm font-bold text-gray-900 pr-4">{faq.q}</span>
                        <ChevronDown className={`w-4 h-4 text-gray-400 flex-shrink-0 transition-transform duration-300 ${openIdx === i ? 'rotate-180 text-[#2E7D32]' : ''}`} />
                    </button>
                    <div className={`overflow-hidden transition-all duration-300 ${openIdx === i ? 'max-h-40 pb-5' : 'max-h-0'}`}>
                        <p className="text-sm text-gray-500 leading-relaxed px-5">{faq.a}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}

// ─── Landing Page ───
function LandingPage({ onStart }) {
    const steps = [
        { icon: ClipboardList, title: 'Take the Survey', desc: 'Answer a few quick questions about your body, goals, and preferences.' },
        { icon: Cpu, title: 'We Process', desc: 'Our algorithm calculates your ideal calorie and macro targets.' },
        { icon: Utensils, title: 'Get Your Plan', desc: 'Receive a personalized 7-day meal plan instantly.' },
    ];

    return (
        <div className="min-h-screen bg-white">
            {/* Hero */}
            <section className="relative pt-28 pb-20 sm:pt-36 sm:pb-28 overflow-hidden">
                {/* Background decoration */}
                <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-white to-blue-50" />
                <div className="absolute top-20 right-0 w-72 h-72 bg-[#2E7D32]/5 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#1565C0]/5 rounded-full blur-3xl" />

                <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#2E7D32]/10 text-[#2E7D32] text-sm font-semibold mb-6">
                        <Activity className="w-4 h-4" />
                        Science-backed nutrition
                    </div>

                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-4">
                        Your Personalized<br />
                        <span className="bg-gradient-to-r from-[#2E7D32] to-[#1565C0] bg-clip-text text-transparent">
                            Nutrition Plan
                        </span>
                    </h1>

                    <p className="text-lg sm:text-xl text-gray-500 font-medium mb-3 max-w-xl mx-auto">
                        Eat smart, live better — no excuses.
                    </p>
                    <p className="text-base text-gray-400 mb-10 max-w-lg mx-auto">
                        Get a calorie-optimized meal plan tailored to your body, goals, and dietary preferences — in under 2 minutes.
                    </p>

                    <button
                        id="get-my-plan-btn"
                        onClick={onStart}
                        className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-[#2E7D32] to-[#4CAF50] text-white font-bold text-lg shadow-lg shadow-green-200 hover:shadow-xl hover:shadow-green-300 hover:scale-[1.03] active:scale-[0.98] transition-all duration-200 cursor-pointer"
                    >
                        Get My Plan
                        <ArrowRight className="w-5 h-5" />
                    </button>
                </div>
            </section>

            {/* Stats Banner */}
            <section className="relative -mt-6 z-10 px-4 sm:px-6">
                <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl border border-gray-100 p-6 sm:p-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                        {[
                            { value: '2,500+', label: 'Plans Generated', color: 'text-[#2E7D32]' },
                            { value: '30+', label: 'Years of Research', color: 'text-[#1565C0]' },
                            { value: '3', label: 'Dietary Modes', color: 'text-amber-500' },
                            { value: '98%', label: 'Satisfaction Rate', color: 'text-purple-500' },
                        ].map((stat) => (
                            <div key={stat.label}>
                                <p className={`text-2xl sm:text-3xl font-extrabold ${stat.color}`}>{stat.value}</p>
                                <p className="text-xs text-gray-400 font-medium mt-1">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How it works */}
            <section className="py-16 sm:py-24 bg-white">
                <div className="max-w-5xl mx-auto px-4 sm:px-6">
                    <h2 className="text-center text-2xl sm:text-3xl font-bold text-gray-900 mb-2">How It Works</h2>
                    <p className="text-center text-gray-400 mb-12">Three simple steps to your personalized plan</p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {steps.map((step, i) => (
                            <div
                                key={i}
                                className="relative group bg-white border border-gray-100 rounded-3xl p-8 text-center hover:shadow-xl hover:border-gray-200 transition-all duration-300"
                            >
                                <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-gradient-to-br from-[#2E7D32] to-[#1565C0] text-white text-sm font-bold flex items-center justify-center shadow-md">
                                    {i + 1}
                                </div>
                                <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                    <step.icon className="w-8 h-8 text-[#2E7D32]" />
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-2">{step.title}</h3>
                                <p className="text-sm text-gray-400 leading-relaxed">{step.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="py-16 sm:py-24 bg-gray-50">
                <div className="max-w-5xl mx-auto px-4 sm:px-6">
                    <h2 className="text-center text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Why Choose NutriSync?</h2>
                    <p className="text-center text-gray-400 mb-12">What makes us the better option</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        {[
                            { icon: Heart, title: 'Free Forever', desc: 'No subscriptions, no hidden fees. Your health shouldn\'t have a paywall.', gradient: 'from-red-500 to-pink-500' },
                            { icon: Zap, title: 'No Download', desc: 'Works in any browser, on any device. Instant access, zero setup.', gradient: 'from-amber-500 to-orange-500' },
                            { icon: Shield, title: 'Privacy First', desc: 'All data stays on your device. We never collect or share your information.', gradient: 'from-[#1565C0] to-blue-400' },
                            { icon: Activity, title: 'Science-Based', desc: 'Built on the Mifflin-St Jeor equation — trusted by nutritionists worldwide.', gradient: 'from-[#2E7D32] to-[#4CAF50]' },
                        ].map((item) => (
                            <div key={item.title} className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center mb-4 shadow-md`}>
                                    <item.icon className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="font-bold text-gray-900 mb-1.5">{item.title}</h3>
                                <p className="text-xs text-gray-400 leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Trusted by Specialists */}
            <section className="py-16 sm:py-24 bg-gradient-to-br from-green-50 via-white to-blue-50">
                <div className="max-w-5xl mx-auto px-4 sm:px-6">
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1565C0]/10 text-[#1565C0] text-sm font-semibold mb-4">
                            <Shield className="w-4 h-4" />
                            Endorsed by Professionals
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Trusted by Health Specialists</h2>
                        <p className="text-gray-400 max-w-lg mx-auto">Our methodology is based on the Mifflin-St Jeor equation, the gold standard used by nutritionists worldwide.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                        {[
                            {
                                name: 'Dra. Laura Méndez',
                                role: 'Nutritionist, MSc.',
                                text: '"The Mifflin-St Jeor formula is the most accurate for estimating caloric needs. NutriSync applies it correctly and responsibly."',
                                initials: 'LM',
                            },
                            {
                                name: 'Dr. Carlos Ibarra',
                                role: 'Sports Medicine',
                                text: '"The macro distribution by goal is well-aligned with current sports nutrition guidelines. A solid tool for healthy planning."',
                                initials: 'CI',
                            },
                            {
                                name: 'Dra. Ana Sofía Reyes',
                                role: 'Clinical Dietitian',
                                text: '"I recommend it as a starting point for patients. The meal plans are balanced and the dietary options are thoughtful."',
                                initials: 'AR',
                            },
                        ].map((spec) => (
                            <div key={spec.name} className="bg-white rounded-3xl border border-gray-100 p-6 sm:p-8 shadow-sm hover:shadow-lg transition-all duration-300">
                                <p className="text-sm text-gray-500 leading-relaxed mb-6 italic">{spec.text}</p>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#2E7D32] to-[#1565C0] flex items-center justify-center flex-shrink-0">
                                        <span className="text-xs font-bold text-white">{spec.initials}</span>
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-gray-900">{spec.name}</p>
                                        <p className="text-xs text-gray-400">{spec.role}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Disclaimer */}
                    <div className="max-w-2xl mx-auto bg-white/80 backdrop-blur border border-[#1565C0]/15 rounded-2xl p-5 sm:p-6">
                        <div className="flex gap-3">
                            <div className="w-8 h-8 rounded-lg bg-[#1565C0]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                                <Shield className="w-4 h-4 text-[#1565C0]" />
                            </div>
                            <div>
                                <p className="text-sm font-bold text-gray-800 mb-1">Important Notice</p>
                                <p className="text-xs text-gray-500 leading-relaxed">
                                    NutriSync is a functional and safe tool when followed responsibly. However, every body is different.
                                    For best results and greater certainty, <strong className="text-gray-700">we recommend consulting with your preferred health specialist</strong> before
                                    starting any nutrition plan, especially if you have pre-existing medical conditions or specific dietary needs.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="py-16 sm:py-24 bg-white">
                <div className="max-w-3xl mx-auto px-4 sm:px-6">
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 text-amber-600 text-sm font-semibold mb-4">
                            <HelpCircle className="w-4 h-4" />
                            Got Questions?
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Frequently Asked Questions</h2>
                        <p className="text-gray-400">Everything you need to know about NutriSync</p>
                    </div>
                    <FaqAccordion />
                </div>
            </section>

            {/* Professional Footer */}
            <footer className="bg-gray-900 text-white pt-16 pb-8">
                <div className="max-w-5xl mx-auto px-4 sm:px-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
                        <div className="sm:col-span-2 lg:col-span-1">
                            <div className="flex items-center gap-2 mb-3">
                                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#2E7D32] to-[#4CAF50] flex items-center justify-center">
                                    <Leaf className="w-4 h-4 text-white" />
                                </div>
                                <span className="text-lg font-bold">NutriSync</span>
                            </div>
                            <p className="text-sm text-gray-400 leading-relaxed">Personalized nutrition plans powered by science. Eat smart, live better — no excuses.</p>
                        </div>
                        <div>
                            <h4 className="text-sm font-bold mb-4 text-gray-200">Product</h4>
                            <ul className="space-y-2 text-sm text-gray-400">
                                <li className="hover:text-white cursor-pointer transition">How It Works</li>
                                <li className="hover:text-white cursor-pointer transition">Meal Plans</li>
                                <li className="hover:text-white cursor-pointer transition">Calorie Calculator</li>
                                <li className="hover:text-white cursor-pointer transition">Dashboard</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-sm font-bold mb-4 text-gray-200">Resources</h4>
                            <ul className="space-y-2 text-sm text-gray-400">
                                <li className="hover:text-white cursor-pointer transition">FAQ</li>
                                <li className="hover:text-white cursor-pointer transition">Nutrition Guide</li>
                                <li className="hover:text-white cursor-pointer transition">Research</li>
                                <li className="hover:text-white cursor-pointer transition">Contact</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-sm font-bold mb-4 text-gray-200">Legal</h4>
                            <ul className="space-y-2 text-sm text-gray-400">
                                <li className="hover:text-white cursor-pointer transition">Privacy Policy</li>
                                <li className="hover:text-white cursor-pointer transition">Terms of Service</li>
                                <li className="hover:text-white cursor-pointer transition">Disclaimer</li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-gray-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <p className="text-xs text-gray-500">© 2026 NutriSync. All rights reserved.</p>
                        <p className="text-xs text-gray-500">Built with ❤️ for healthier lives</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}

// ─── Auth Screen ───
function AuthScreen({ onAuth }) {
    const [isLogin, setIsLogin] = useState(true);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPw, setShowPw] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        if (isLogin) {
            const res = loginUser(email, password);
            if (res.error) return setError(res.error);
            onAuth(res.user);
        } else {
            if (!name.trim()) return setError('Name is required');
            if (!email.includes('@')) return setError('Valid email is required');
            if (password.length < 6) return setError('Password must be at least 6 characters');
            const res = registerUser(name.trim(), email.trim(), password);
            if (res.error) return setError(res.error);
            onAuth(res.user);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 pt-28 pb-12 px-4 sm:px-6">
            <div className="max-w-md mx-auto">
                <div className="text-center mb-8">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-[#2E7D32] to-[#4CAF50] flex items-center justify-center shadow-lg">
                        <Shield className="w-8 h-8 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
                    <p className="text-sm text-gray-400 mt-1">{isLogin ? 'Log in to access your plans' : 'Start your nutrition journey'}</p>
                </div>
                <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 sm:p-8 space-y-4">
                    {!isLogin && (
                        <div>
                            <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">Full Name</label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="John Doe" className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#2E7D32]/30 focus:border-[#2E7D32] transition text-gray-800 font-medium" />
                            </div>
                        </div>
                    )}
                    <div>
                        <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">Email</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@email.com" className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#2E7D32]/30 focus:border-[#2E7D32] transition text-gray-800 font-medium" />
                        </div>
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input type={showPw ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="w-full pl-10 pr-10 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#2E7D32]/30 focus:border-[#2E7D32] transition text-gray-800 font-medium" />
                            <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer">
                                {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                        </div>
                    </div>
                    {error && <p className="text-sm text-red-500 bg-red-50 p-3 rounded-xl">{error}</p>}
                    <button type="submit" className="w-full py-3 rounded-xl bg-gradient-to-r from-[#2E7D32] to-[#4CAF50] text-white font-bold shadow-md hover:shadow-lg hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer">
                        {isLogin ? 'Log In' : 'Create Account'}
                    </button>
                    <p className="text-center text-sm text-gray-400">
                        {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
                        <button type="button" onClick={() => { setIsLogin(!isLogin); setError(''); }} className="text-[#2E7D32] font-semibold hover:underline cursor-pointer">
                            {isLogin ? 'Sign Up' : 'Log In'}
                        </button>
                    </p>
                </form>
            </div>
        </div>
    );
}

// ─── Survey Form ───
function SurveyForm({ onSubmit }) {
    const [step, setStep] = useState(0);
    const [form, setForm] = useState({
        age: '', weight: '', height: '', sex: 'male',
        goal: 'maintain',
        activity: 'moderate', meals: '3',
        diet: 'none',
    });

    const update = (key, val) => setForm((f) => ({ ...f, [key]: val }));
    const canNext = () => {
        if (step === 0) return form.age && form.weight && form.height;
        return true;
    };

    const totalSteps = 4;

    const handleSubmit = () => {
        onSubmit({
            ...form,
            age: Number(form.age),
            weight: Number(form.weight),
            height: Number(form.height),
            meals: Number(form.meals),
        });
    };

    // Radio-style selector component
    const Option = ({ selected, onClick, icon: Icon, label, sublabel }) => (
        <button
            type="button"
            onClick={onClick}
            className={`flex items-center gap-3 w-full p-4 rounded-2xl border-2 text-left transition-all duration-200 cursor-pointer ${selected
                ? 'border-[#2E7D32] bg-[#2E7D32]/5 shadow-sm'
                : 'border-gray-100 bg-white hover:border-gray-200 hover:bg-gray-50'
                }`}
        >
            {Icon && (
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${selected ? 'bg-[#2E7D32] text-white' : 'bg-gray-100 text-gray-400'}`}>
                    <Icon className="w-5 h-5" />
                </div>
            )}
            <div className="flex-1">
                <p className={`font-semibold text-sm ${selected ? 'text-[#2E7D32]' : 'text-gray-700'}`}>{label}</p>
                {sublabel && <p className="text-xs text-gray-400 mt-0.5">{sublabel}</p>}
            </div>
            {selected && <Check className="w-5 h-5 text-[#2E7D32] flex-shrink-0" />}
        </button>
    );

    const stepContent = [
        // Step 0: Body metrics
        <div key="s0" className="space-y-5">
            <h3 className="text-xl font-bold text-gray-900 mb-1">About You</h3>
            <p className="text-sm text-gray-400 mb-6">Enter your basic information so we can calculate your needs.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">Age</label>
                    <input
                        id="input-age"
                        type="number" min="10" max="120" placeholder="e.g. 28"
                        value={form.age} onChange={(e) => update('age', e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#2E7D32]/30 focus:border-[#2E7D32] transition text-gray-800 font-medium"
                    />
                </div>
                <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">Weight (kg)</label>
                    <input
                        id="input-weight"
                        type="number" min="20" max="300" placeholder="e.g. 75"
                        value={form.weight} onChange={(e) => update('weight', e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#2E7D32]/30 focus:border-[#2E7D32] transition text-gray-800 font-medium"
                    />
                </div>
                <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">Height (cm)</label>
                    <input
                        id="input-height"
                        type="number" min="100" max="250" placeholder="e.g. 175"
                        value={form.height} onChange={(e) => update('height', e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#2E7D32]/30 focus:border-[#2E7D32] transition text-gray-800 font-medium"
                    />
                </div>
                <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">Biological Sex</label>
                    <div className="flex gap-3 mt-1">
                        {['male', 'female'].map((s) => (
                            <button
                                key={s}
                                type="button"
                                onClick={() => update('sex', s)}
                                className={`flex-1 py-3 rounded-xl font-semibold text-sm border-2 transition-all cursor-pointer ${form.sex === s
                                    ? 'border-[#2E7D32] bg-[#2E7D32]/5 text-[#2E7D32]'
                                    : 'border-gray-200 bg-gray-50 text-gray-500 hover:bg-gray-100'
                                    }`}
                            >
                                {s.charAt(0).toUpperCase() + s.slice(1)}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>,

        // Step 1: Goal
        <div key="s1" className="space-y-4">
            <h3 className="text-xl font-bold text-gray-900 mb-1">Your Goal</h3>
            <p className="text-sm text-gray-400 mb-6">What would you like to achieve?</p>
            <Option selected={form.goal === 'lose'} onClick={() => update('goal', 'lose')} icon={Flame} label="Lose Weight" sublabel="Create a caloric deficit to burn fat" />
            <Option selected={form.goal === 'gain'} onClick={() => update('goal', 'gain')} icon={Dumbbell} label="Gain Muscle" sublabel="Caloric surplus with high protein for growth" />
            <Option selected={form.goal === 'maintain'} onClick={() => update('goal', 'maintain')} icon={Scale} label="Maintain Weight" sublabel="Balance calories for healthy maintenance" />
        </div>,

        // Step 2: Activity & Meals
        <div key="s2" className="space-y-6">
            <div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">Activity Level</h3>
                <p className="text-sm text-gray-400 mb-4">How active are you on a daily basis?</p>
                <div className="space-y-3">
                    <Option selected={form.activity === 'sedentary'} onClick={() => update('activity', 'sedentary')} icon={Coffee} label="Sedentary" sublabel="Little or no exercise, desk job" />
                    <Option selected={form.activity === 'moderate'} onClick={() => update('activity', 'moderate')} icon={Activity} label="Moderately Active" sublabel="Exercise 3–5 days per week" />
                    <Option selected={form.activity === 'active'} onClick={() => update('activity', 'active')} icon={Zap} label="Very Active" sublabel="Intense exercise 6–7 days per week" />
                </div>
            </div>
            <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">Meals per Day</label>
                <div className="flex gap-3">
                    {['2', '3', '4', '5'].map((m) => (
                        <button
                            key={m}
                            type="button"
                            onClick={() => update('meals', m)}
                            className={`flex-1 py-3 rounded-xl font-bold text-sm border-2 transition-all cursor-pointer ${form.meals === m
                                ? 'border-[#2E7D32] bg-[#2E7D32]/5 text-[#2E7D32]'
                                : 'border-gray-200 bg-gray-50 text-gray-500 hover:bg-gray-100'
                                }`}
                        >
                            {m}
                        </button>
                    ))}
                </div>
            </div>
        </div>,

        // Step 3: Dietary preferences
        <div key="s3" className="space-y-4">
            <h3 className="text-xl font-bold text-gray-900 mb-1">Dietary Preference</h3>
            <p className="text-sm text-gray-400 mb-6">Select your eating style so we can tailor your meal plan.</p>
            <Option selected={form.diet === 'none'} onClick={() => update('diet', 'none')} icon={Beef} label="No Restrictions" sublabel="Standard balanced diet" />
            <Option selected={form.diet === 'vegetarian'} onClick={() => update('diet', 'vegetarian')} icon={Apple} label="Vegetarian" sublabel="No meat or fish, dairy & eggs OK" />
            <Option selected={form.diet === 'vegan'} onClick={() => update('diet', 'vegan')} icon={Leaf} label="Vegan" sublabel="100% plant-based, no animal products" />
        </div>,
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 pt-24 pb-12 px-4 sm:px-6">
            <div className="max-w-lg mx-auto">
                {/* Progress bar */}
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Step {step + 1} of {totalSteps}</span>
                        <span className="text-xs font-semibold text-[#2E7D32]">{Math.round(((step + 1) / totalSteps) * 100)}%</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-[#2E7D32] to-[#4CAF50] rounded-full transition-all duration-500 ease-out"
                            style={{ width: `${((step + 1) / totalSteps) * 100}%` }}
                        />
                    </div>
                </div>

                {/* Card */}
                <div className="bg-white rounded-3xl shadow-xl shadow-gray-100 border border-gray-100 p-6 sm:p-8">
                    {stepContent[step]}

                    {/* Navigation */}
                    <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100">
                        {step > 0 ? (
                            <button
                                type="button"
                                onClick={() => setStep((s) => s - 1)}
                                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-gray-500 hover:bg-gray-50 transition cursor-pointer"
                            >
                                <ArrowLeft className="w-4 h-4" /> Back
                            </button>
                        ) : <div />}

                        {step < totalSteps - 1 ? (
                            <button
                                type="button"
                                disabled={!canNext()}
                                onClick={() => setStep((s) => s + 1)}
                                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#2E7D32] to-[#4CAF50] text-white text-sm font-bold shadow-md shadow-green-100 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                            >
                                Continue <ChevronRight className="w-4 h-4" />
                            </button>
                        ) : (
                            <button
                                type="button"
                                onClick={handleSubmit}
                                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#1565C0] to-[#1E88E5] text-white text-sm font-bold shadow-md shadow-blue-100 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                            >
                                Get My Plan <Utensils className="w-4 h-4" />
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

// ─── Results Page ───
function ResultsPage({ data, onRestart, onSave }) {
    const calories = calculateCalories(data);
    const macros = calculateMacros(calories, data.goal);
    const goalLabel = { lose: 'Weight Loss', gain: 'Muscle Gain', maintain: 'Maintenance' }[data.goal];
    const mealPlan = MEAL_PLANS[data.diet] || MEAL_PLANS.none;
    const tips = TIPS_BY_GOAL[data.goal] || TIPS_BY_GOAL.maintain;
    const mealIcons = { breakfast: Sun, lunch: Utensils, dinner: Moon, snack: Cookie };

    const [expandedDay, setExpandedDay] = useState(0);
    const handleSave = () => onSave && onSave({ userData: data, calories, macros, mealPlan, tips, goalLabel });

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 pt-24 pb-16 px-4 sm:px-6">
            <div className="max-w-3xl mx-auto">
                {/* Header */}
                <div className="text-center mb-10">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#2E7D32]/10 text-[#2E7D32] text-sm font-semibold mb-4">
                        <Target className="w-4 h-4" />
                        {goalLabel} Plan
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-2">Your Nutrition Plan</h2>
                    <p className="text-gray-400">Calculated using the Mifflin-St Jeor equation for precision</p>
                </div>

                {/* Calorie + Macro Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-8">
                    {/* Calorie card */}
                    <div className="sm:col-span-4 bg-gradient-to-r from-[#2E7D32] to-[#1565C0] rounded-3xl p-6 text-white text-center shadow-xl">
                        <p className="text-sm font-semibold opacity-80 mb-1 uppercase tracking-wider">Daily Calorie Target</p>
                        <p className="text-5xl font-black">{calories.toLocaleString()}</p>
                        <p className="text-sm opacity-70 mt-1">kcal / day</p>
                    </div>

                    {/* Macro cards */}
                    {[
                        { label: 'Protein', data: macros.protein, color: 'from-emerald-500 to-emerald-600', icon: Beef, unit: 'g' },
                        { label: 'Carbs', data: macros.carbs, color: 'from-amber-500 to-orange-500', icon: Apple, unit: 'g' },
                        { label: 'Fats', data: macros.fats, color: 'from-blue-500 to-indigo-500', icon: Droplets, unit: 'g' },
                    ].map((m) => (
                        <div key={m.label} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex items-center gap-3 mb-3">
                                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${m.color} flex items-center justify-center`}>
                                    <m.icon className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <p className="text-xs font-semibold text-gray-400 uppercase">{m.label}</p>
                                    <p className="text-lg font-bold text-gray-900">{m.data.grams}{m.unit}</p>
                                </div>
                            </div>
                            {/* Mini bar */}
                            <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                <div className={`h-full bg-gradient-to-r ${m.color} rounded-full`} style={{ width: `${m.data.pct}%` }} />
                            </div>
                            <p className="text-xs text-gray-400 mt-1.5 text-right">{m.data.pct}% of calories</p>
                        </div>
                    ))}
                </div>

                {/* 7-Day Meal Plan */}
                <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 sm:p-8 mb-8">
                    <h3 className="text-xl font-bold text-gray-900 mb-1">7-Day Meal Plan</h3>
                    <p className="text-sm text-gray-400 mb-6">Tailored to your {data.diet === 'none' ? 'standard' : data.diet} dietary preference</p>

                    <div className="space-y-3">
                        {mealPlan.map((day, i) => (
                            <div key={day.day} className="border border-gray-100 rounded-2xl overflow-hidden">
                                <button
                                    type="button"
                                    onClick={() => setExpandedDay(expandedDay === i ? -1 : i)}
                                    className="w-full flex items-center justify-between px-5 py-4 hover:bg-gray-50 transition cursor-pointer"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold ${expandedDay === i ? 'bg-[#2E7D32] text-white' : 'bg-gray-100 text-gray-500'
                                            }`}>
                                            {i + 1}
                                        </div>
                                        <span className="font-semibold text-gray-800">{day.day}</span>
                                    </div>
                                    <ChevronRight className={`w-5 h-5 text-gray-300 transition-transform duration-200 ${expandedDay === i ? 'rotate-90' : ''}`} />
                                </button>

                                {expandedDay === i && (
                                    <div className="px-5 pb-5 pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3 border-t border-gray-50">
                                        {['breakfast', 'lunch', 'dinner', 'snack'].map((meal) => {
                                            const MealIcon = mealIcons[meal];
                                            return (
                                                <div key={meal} className="flex items-start gap-3 p-3 rounded-xl bg-gray-50">
                                                    <MealIcon className="w-4 h-4 text-[#2E7D32] mt-0.5 flex-shrink-0" />
                                                    <div>
                                                        <p className="text-xs font-semibold text-gray-400 uppercase">{meal}</p>
                                                        <p className="text-sm text-gray-700 leading-snug">{day[meal]}</p>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Tips */}
                <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 sm:p-8 mb-8">
                    <h3 className="text-xl font-bold text-gray-900 mb-1">Personalized Tips</h3>
                    <p className="text-sm text-gray-400 mb-6">Expert advice for your {goalLabel.toLowerCase()} journey</p>
                    <div className="space-y-4">
                        {tips.map((tip, i) => (
                            <div key={i} className="flex items-start gap-3 p-4 rounded-2xl bg-gradient-to-r from-green-50 to-blue-50 border border-green-100/50">
                                <div className="w-7 h-7 rounded-lg bg-[#2E7D32] flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <Heart className="w-4 h-4 text-white" />
                                </div>
                                <p className="text-sm text-gray-700 leading-relaxed">{tip}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                    {onSave && (
                        <button onClick={handleSave} className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-[#1565C0] to-[#1E88E5] text-white font-bold text-sm shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer">
                            <Save className="w-4 h-4" /> Save My Plan
                        </button>
                    )}
                    <button id="start-over-btn" onClick={onRestart} className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-white border-2 border-gray-200 text-gray-600 font-bold text-sm hover:border-[#2E7D32] hover:text-[#2E7D32] hover:shadow-lg transition-all duration-200 cursor-pointer">
                        <RotateCcw className="w-4 h-4" /> Start Over
                    </button>
                </div>
            </div>
        </div>
    );
}

/* ──────────────────────────────────────────────
   DASHBOARD PAGE
   ────────────────────────────────────────────── */

function DashboardPage({ user, onNewPlan }) {
    const [plans, setPlans] = useState(() => getUserPlans(user.id));
    const [activeIdx, setActiveIdx] = useState(0);
    const MEALS = ['breakfast', 'lunch', 'dinner', 'snack'];
    const mealIcons = { breakfast: Sun, lunch: Utensils, dinner: Moon, snack: Cookie };
    const mealLabels = { breakfast: 'Desayuno', lunch: 'Almuerzo', dinner: 'Cena', snack: 'Snack' };

    const save = (updated) => { setPlans(updated); saveUserPlans(user.id, updated); };

    const toggleMeal = (dayIdx, meal) => {
        const updated = plans.map((p, i) => {
            if (i !== activeIdx) return p;
            const dayKey = p.mealPlan[dayIdx].day;
            return { ...p, tracking: { ...p.tracking, [dayKey]: { ...p.tracking[dayKey], [meal]: !p.tracking[dayKey]?.[meal] } } };
        });
        save(updated);
    };

    const deletePlan = (idx) => {
        const updated = plans.filter((_, i) => i !== idx);
        save(updated);
        if (activeIdx >= updated.length) setActiveIdx(Math.max(0, updated.length - 1));
    };

    const getAdherence = (plan) => {
        if (!plan?.tracking) return 0;
        let total = 0, done = 0;
        plan.mealPlan.forEach((day) => MEALS.forEach((m) => { total++; if (plan.tracking[day.day]?.[m]) done++; }));
        return total ? Math.round((done / total) * 100) : 0;
    };

    const getDayProgress = (plan, dayKey) => {
        const done = MEALS.filter((m) => plan.tracking[dayKey]?.[m]).length;
        return { done, total: MEALS.length, pct: Math.round((done / MEALS.length) * 100) };
    };

    if (!plans.length) return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 pt-28 pb-24 px-4 flex items-center justify-center">
            <div className="text-center animate-slide-in">
                <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gray-100 flex items-center justify-center"><ClipboardList className="w-10 h-10 text-gray-300" /></div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">No Plans Yet</h2>
                <p className="text-gray-400 mb-6">Complete the survey to create your first nutrition plan.</p>
                <button onClick={onNewPlan} className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#2E7D32] to-[#4CAF50] text-white font-bold shadow-md hover:shadow-lg transition-all cursor-pointer">Create My Plan</button>
            </div>
        </div>
    );

    const plan = plans[activeIdx];
    const adherence = getAdherence(plan);
    const missedDays = plan.mealPlan.filter((day) => {
        const p = getDayProgress(plan, day.day);
        return p.done > 0 && p.done < p.total;
    });

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 pt-24 pb-24 px-4 sm:px-6">
            <div className="max-w-4xl mx-auto">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
                        <p className="text-sm text-gray-400">Welcome back, {user.name}</p>
                    </div>
                    <button onClick={onNewPlan} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#2E7D32] to-[#4CAF50] text-white text-sm font-bold shadow-md hover:shadow-lg transition-all cursor-pointer">
                        <ClipboardList className="w-4 h-4" /> New Plan
                    </button>
                </div>

                {/* Missed meals alert */}
                {missedDays.length > 0 && adherence < 75 && (
                    <div className="mb-6 animate-slide-in">
                        <div className={`flex items-start gap-3 p-4 rounded-2xl border ${adherence < 30 ? 'bg-red-50 border-red-200 animate-pulse-warn' : adherence < 50 ? 'bg-amber-50 border-amber-200' : 'bg-blue-50 border-blue-200'}`}>
                            <AlertTriangle className={`w-5 h-5 flex-shrink-0 mt-0.5 ${adherence < 30 ? 'text-red-500' : adherence < 50 ? 'text-amber-500' : 'text-blue-500'}`} />
                            <div>
                                <p className={`text-sm font-bold ${adherence < 30 ? 'text-red-700' : adherence < 50 ? 'text-amber-700' : 'text-blue-700'}`}>
                                    {adherence < 30 ? '⚠️ You\'re falling behind!' : adherence < 50 ? '🔔 Some meals need your attention' : '💪 Almost there, keep going!'}
                                </p>
                                <p className={`text-xs mt-1 ${adherence < 30 ? 'text-red-500' : adherence < 50 ? 'text-amber-500' : 'text-blue-500'}`}>
                                    {missedDays.length} day{missedDays.length > 1 ? 's' : ''} with incomplete meals — {missedDays.map((d) => d.day).join(', ')}
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Plan History */}
                    <div className="lg:col-span-1 space-y-4">
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2"><History className="w-4 h-4 text-[#2E7D32]" /> Plan History</h3>
                            <div className="space-y-2 max-h-[300px] overflow-y-auto">
                                {plans.map((p, i) => (
                                    <div key={p.id} onClick={() => setActiveIdx(i)} className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all ${activeIdx === i ? 'bg-[#2E7D32]/5 border border-[#2E7D32]/20' : 'hover:bg-gray-50 border border-transparent'}`}>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-semibold text-gray-800 truncate">{p.goalLabel} Plan</p>
                                            <p className="text-xs text-gray-400">{new Date(p.createdAt).toLocaleDateString()}</p>
                                        </div>
                                        <div className="flex items-center gap-2 flex-shrink-0">
                                            <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${getAdherence(p) >= 50 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}>{getAdherence(p)}%</span>
                                            <button onClick={(e) => { e.stopPropagation(); deletePlan(i); }} className="text-gray-300 hover:text-red-500 transition cursor-pointer"><Trash2 className="w-3.5 h-3.5" /></button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Day-by-day progress dots */}
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                            <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2"><Calendar className="w-4 h-4 text-amber-500" /> Day Overview</h3>
                            <div className="space-y-2">
                                {plan.mealPlan.map((day) => {
                                    const p = getDayProgress(plan, day.day);
                                    const color = p.pct === 100 ? 'bg-[#2E7D32]' : p.pct >= 50 ? 'bg-amber-400' : p.pct > 0 ? 'bg-red-400' : 'bg-gray-200';
                                    const textColor = p.pct === 100 ? 'text-[#2E7D32]' : p.pct >= 50 ? 'text-amber-600' : p.pct > 0 ? 'text-red-500' : 'text-gray-400';
                                    return (
                                        <div key={day.day} className="flex items-center gap-3">
                                            <div className={`w-3 h-3 rounded-full flex-shrink-0 transition-all duration-300 ${color}`} />
                                            <span className="text-xs font-medium text-gray-600 w-20 truncate">{day.day}</span>
                                            <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                                <div className={`h-full rounded-full transition-all duration-500 ${p.pct === 100 ? 'bg-[#2E7D32]' : p.pct >= 50 ? 'bg-amber-400' : p.pct > 0 ? 'bg-red-400' : 'bg-gray-200'}`} style={{ width: `${p.pct}%` }} />
                                            </div>
                                            <span className={`text-xs font-bold w-10 text-right ${textColor}`}>{p.done}/{p.total}</span>
                                        </div>
                                    );
                                })}
                            </div>
                            <div className="mt-3 pt-3 border-t border-gray-100 flex items-center gap-4 text-[10px] text-gray-400">
                                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#2E7D32] inline-block" /> Complete</span>
                                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-400 inline-block" /> Partial</span>
                                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-400 inline-block" /> Started</span>
                                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-gray-200 inline-block" /> Pending</span>
                            </div>
                        </div>
                    </div>

                    {/* Active plan */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="grid grid-cols-3 gap-3">
                            <div className="bg-white rounded-2xl border border-gray-100 p-4 text-center">
                                <Flame className="w-5 h-5 text-[#2E7D32] mx-auto mb-1" />
                                <p className="text-xl font-bold text-gray-900">{plan.calories}</p>
                                <p className="text-xs text-gray-400">kcal/day</p>
                            </div>
                            <div className={`bg-white rounded-2xl border p-4 text-center transition-all ${adherence < 30 ? 'border-red-200 bg-red-50/30' : adherence < 50 ? 'border-amber-200 bg-amber-50/30' : 'border-gray-100'}`}>
                                <BarChart3 className={`w-5 h-5 mx-auto mb-1 ${adherence < 30 ? 'text-red-500' : adherence < 50 ? 'text-amber-500' : 'text-[#1565C0]'}`} />
                                <p className={`text-xl font-bold ${adherence < 30 ? 'text-red-600' : adherence < 50 ? 'text-amber-600' : 'text-gray-900'}`}>{adherence}%</p>
                                <p className="text-xs text-gray-400">adherence</p>
                            </div>
                            <div className="bg-white rounded-2xl border border-gray-100 p-4 text-center">
                                <Calendar className="w-5 h-5 text-amber-500 mx-auto mb-1" />
                                <p className="text-xl font-bold text-gray-900">{plan.mealPlan.length}</p>
                                <p className="text-xs text-gray-400">days</p>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl border border-gray-100 p-5">
                            <div className="flex items-center justify-between mb-2">
                                <p className="text-sm font-bold text-gray-700">Weekly Progress</p>
                                <p className={`text-sm font-bold ${adherence < 30 ? 'text-red-500' : adherence < 50 ? 'text-amber-500' : 'text-[#2E7D32]'}`}>{adherence}%</p>
                            </div>
                            <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                                <div className={`h-full rounded-full transition-all duration-500 ${adherence < 30 ? 'bg-gradient-to-r from-red-400 to-red-500' : adherence < 50 ? 'bg-gradient-to-r from-amber-400 to-amber-500' : 'bg-gradient-to-r from-[#2E7D32] to-[#4CAF50]'}`} style={{ width: `${adherence}%` }} />
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl border border-gray-100 p-5">
                            <h3 className="font-bold text-gray-900 mb-4">Daily Meal Tracking</h3>
                            <div className="space-y-3">
                                {plan.mealPlan.map((day, dayIdx) => {
                                    const dp = getDayProgress(plan, day.day);
                                    const dayColor = dp.pct === 100 ? 'border-green-200 bg-green-50/30' : dp.pct > 0 && dp.pct < 50 ? 'border-red-200 bg-red-50/20' : dp.pct >= 50 ? 'border-amber-200 bg-amber-50/20' : 'border-gray-100';
                                    return (
                                        <div key={day.day} className={`border rounded-xl p-4 transition-all duration-300 ${dayColor}`}>
                                            <div className="flex items-center justify-between mb-3">
                                                <div className="flex items-center gap-2">
                                                    <span className="font-semibold text-gray-800 text-sm">{day.day}</span>
                                                    {dp.pct === 100 && <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-bold animate-slide-in">✓ Complete!</span>}
                                                    {dp.pct > 0 && dp.pct < 50 && <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full font-bold animate-pulse-warn">⚠ Catch up!</span>}
                                                </div>
                                                <span className={`text-xs font-medium ${dp.pct === 100 ? 'text-green-600' : dp.pct > 0 ? 'text-amber-500' : 'text-gray-400'}`}>{dp.done}/{dp.total} meals</span>
                                            </div>
                                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                                                {MEALS.map((meal) => {
                                                    const done = plan.tracking[day.day]?.[meal];
                                                    const MIcon = mealIcons[meal];
                                                    return (
                                                        <button key={meal} onClick={() => toggleMeal(dayIdx, meal)} className={`flex items-center gap-2 p-2.5 rounded-lg text-left text-xs font-medium transition-all duration-200 cursor-pointer ${done ? 'bg-[#2E7D32]/10 text-[#2E7D32] border border-[#2E7D32]/20 shadow-sm' : 'bg-gray-50 text-gray-500 border border-transparent hover:bg-gray-100 hover:border-gray-200'}`}>
                                                            {done ? <CheckCircle className="w-4 h-4 flex-shrink-0" /> : <MIcon className="w-4 h-4 flex-shrink-0" />}
                                                            <span className="capitalize truncate">{meal}</span>
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

/* ──────────────────────────────────────────────
   MAIN APP
   ────────────────────────────────────────────── */

export default function App() {
    const [screen, setScreen] = useState('landing');
    const [user, setUser] = useState(() => getSession());
    const [userData, setUserData] = useState(null);

    const go = (s) => { setScreen(s); window.scrollTo({ top: 0, behavior: 'smooth' }); };

    const handleStart = () => go(user ? 'survey' : 'auth');

    const handleAuth = (u) => {
        setUser(u);
        go(getUserPlans(u.id).length ? 'dashboard' : 'survey');
    };

    const handleSurveySubmit = (data) => { setUserData(data); go('results'); };

    const handleSave = (planData) => {
        const plans = getUserPlans(user.id);
        const newPlan = { id: Date.now().toString(36), createdAt: new Date().toISOString(), ...planData, tracking: {} };
        planData.mealPlan.forEach((day) => { newPlan.tracking[day.day] = {}; });
        plans.unshift(newPlan);
        saveUserPlans(user.id, plans);
        go('dashboard');
    };

    const handleRestart = () => { setUserData(null); go('landing'); };
    const handleLogout = () => { clearSession(); setUser(null); go('landing'); };
    const handleNewPlan = () => go('survey');
    const handleDashboard = () => go('dashboard');
    const handleHome = () => go('landing');

    return (
        <>
            <Navbar user={user} onLogout={handleLogout} onDashboard={handleDashboard} onHome={handleHome} screen={screen} />
            {screen === 'landing' && <LandingPage onStart={handleStart} />}
            {screen === 'auth' && <AuthScreen onAuth={handleAuth} />}
            {screen === 'survey' && <SurveyForm onSubmit={handleSurveySubmit} />}
            {screen === 'results' && <ResultsPage data={userData} onRestart={handleRestart} onSave={user ? handleSave : null} />}
            {screen === 'dashboard' && user && <DashboardPage user={user} onNewPlan={handleNewPlan} />}
        </>
    );
}
