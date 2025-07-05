'use client';

import React, { useState, useEffect } from 'react'; 
import Image from 'next/image';
import { motion } from "framer-motion";
import { FaTrophy, FaGithub } from 'react-icons/fa';
import { KineticGlassPanel } from '@/components/KineticGlassPanel';
import { AnimatedTitle, AnimatedSubtitle, useSmoothScroll } from '@/components/shared';


const getRankColor = (rank) => {
    if (rank === 1) return 'text-yellow-400 glow-gold';
    if (rank === 2) return 'text-slate-300 glow-silver';
    if (rank === 3) return 'text-amber-600 glow-bronze';
    return 'text-gray-400';
};

const LeaderboardRow = ({ entry, index }) => {
    const rankColor = getRankColor(entry.rank);
    const rowVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
    };

    return (
        <motion.div variants={rowVariants}
            className={`grid grid-cols-12 items-center gap-4 px-4 py-3 rounded-lg transition-all duration-300 hover:bg-white/10 ${index > 0 ? 'border-t border-white/10' : ''}`}>
            <div className="col-span-2 sm:col-span-1 flex items-center justify-start gap-3">
                <span className={`text-xl sm:text-2xl font-bold ${rankColor}`}>{entry.rank}</span>
                {entry.rank <= 3 && <FaTrophy className={`hidden sm:inline-block ${rankColor}`} />}
            </div>
            <div className="col-span-6 sm:col-span-5 flex items-center gap-4">
                <Image src={entry.avatar} alt={entry.name} width={40} height={40} className="rounded-full border-2 border-white/20" />
                <span className="font-medium text-white truncate">{entry.name}</span>
            </div>
            <div className="hidden sm:block sm:col-span-4 text-gray-300 truncate">{entry.project}</div>
            <div className="col-span-4 sm:col-span-2 flex items-center justify-end gap-4 text-white font-mono">
                <span>{entry.score}</span>
                <a href={entry.github} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition-colors"><FaGithub size={20} /></a>
            </div>
        </motion.div>
    );
};

export default function HallOfFamePage() {
    useSmoothScroll();

    const [leaderboardData, setLeaderboardData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchLeaderboard = async () => {
            try {
                const response = await fetch('/api/leaderboard');
                if (!response.ok) {
                    throw new Error('Failed to fetch leaderboard data');
                }
                const data = await response.json();
                setLeaderboardData(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchLeaderboard();
    }, []);

    const containerVariants = {
        hidden: {},
        visible: { transition: { staggerChildren: 0.07 } },
    };

    return (
        <div className="min-h-screen overflow-x-hidden antialiased text-gray-200">
            <main className="container mx-auto px-4 py-24 sm:py-32 space-y-24 sm:space-y-32 relative z-10">
                <section className="text-center flex flex-col items-center">
                    <AnimatedTitle title="Hall of Fame" />
                    <AnimatedSubtitle text="Celebrating the exceptional projects and problem-solvers from our past cohorts. This is where legends are forged." />
                </section>

                <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.8, delay: 1.5, ease: [0.22, 1, 0.36, 1] }}>
                    <KineticGlassPanel className="max-w-5xl mx-auto p-4 sm:p-6">
                        <div className="grid grid-cols-12 items-center gap-4 px-4 py-2 mb-2 text-sm font-bold text-muted-foreground uppercase tracking-wider border-b border-white/10">
                            <div className="col-span-2 sm:col-span-1">#</div>
                            <div className="col-span-6 sm:col-span-5">Student</div>
                            <div className="hidden sm:block sm:col-span-4">Capstone Project</div>
                            <div className="col-span-4 sm:col-span-2 text-right">Score</div>
                        </div>
                        
                        {isLoading && <div className="text-center py-8 text-gray-400">Loading Hall of Fame...</div>}
                        {error && <div className="text-center py-8 text-red-500">Error: {error}</div>}
                        {!isLoading && !error && (
                             <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}>
                                {leaderboardData.map((entry, index) => (
                                    <LeaderboardRow key={entry.rank} entry={entry} index={index} />
                                ))}
                            </motion.div>
                        )}
                    </KineticGlassPanel>
                </motion.div>
            </main>
        </div>
    );
}
//////بيسشبيس بسشيبسش بشس بي سش
// قائمة الافكار
// تطبيق لتنظيم وقت الشاشة للأطفال.

// Personla Portfolio
// أداة اختيار ألوان متناسقة.
// تطبيق رسم على المتصفح.

// لعبة تكوين جمل صحيحة.

///بسبيس بسشبيسش ب بشسب 

// ✅ المرحلة الأولى: إنشاء مهمة جديدة
// 📍 أول ما يضغط المستخدم "مهمة جديدة"
// تظهر له أنواع المهام:

// رحلة 🚗
////dsfsadf/sdfjsfkdjslfd//fkdsajfl/
// so i need 
// زيارة 📍

// حمولة 🚚

// طارئة 🚨
// (زي اللي عاملينه دلوقتي بالضبط)

// ✅ المرحلة الثانية: اختيار “حمولة” (هي الأضخم ونعالجها الآن)
// 👇 أول ما يختار "حمولة"، تظهر له:
// 1. نوع الحمولة:
// 🧊 حمولة مبردة

// 📦 حمولة جافة

// 🧮 اختيار "تكعيب الحمولة" (الطول × العرض × الارتفاع)

// ⚖️ اختيار الوزن الإجمالي

// ⬅️ تأثير ذلك؟ النظام يقوم تلقائيًا بجلب المركبات اللي تنطبق عليها الشروط من قاعدة البيانات.

// ✅ المرحلة الثالثة: ترشيح المركبة الذكية (Smart Vehicle Suggestion)
// ❓ النظام يفلتر المركبات حسب:
// معيار	التفاصيل
// ✅ النوع	تيرلا – جامبو – نصف نقل – فان
// 📦 الحمولة القصوى	لازم تكفي وزن وتكعيب الحمولة
// 🧊 التبريد	لو الحمولة مبردة لازم تكون المركبة مبردة
// 🔧 الحالة	في الخدمة – قيد الصيانة – منتظرة مهمة – تعمل حاليًا
// 📍 الموقع	تكون قريبة من نقطة الانطلاق

// ✅ المرحلة الرابعة: الحالات الذكية للمركبة
// كل مركبة تظهر في بطاقة تفاعلية ذكية بها:

// الحالة	وصف بصري	إضافات
// 🟢 قيد العمل	دائرة تمتلئ تدريجيًا حسب تقدم المهمة	بداخلها: سرعة المركبة والاتجاه ونقطة GPS محدثة
// 🔵 منتظرة مهمة	تظهر في قائمة الترشيح مباشرًا	
// 🟡 في الصيانة	تظهر برسالة “غير مؤهلة حاليًا” مع تاريخ جاهزيتها	
// ⚪ خارج الخدمة	تظهر باللون الرمادي ولا يمكن تحديدها	

// ✅ المرحلة الخامسة: إحصائيات بصرية ذكية (Dashboard صغير)
// تحت قائمة الترشيح للمركبات تظهر مثلاً:

// 🚚 عدد المركبات المتاحة الآن: 12

// 🟢 قيد العمل: 5

// 🟡 في الصيانة: 3

// 🔵 منتظرة مهمة: 4
// (مع شريط ألوان صغير ودوائر توضيحية – مثل mini charts)

