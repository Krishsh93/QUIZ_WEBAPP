import React, { useContext } from "react";
import { QuizContext } from "../context/QuizContext";
import { FaTrophy, FaMedal, FaStar, FaBolt, FaClock, FaShieldAlt, FaFire, FaLightbulb } from "react-icons/fa";
import { Link } from "react-router-dom";

const ResultPage = () => {
    const {
        score,
        correctAnswers,
        incorrectAnswers,
        questions,
        streak,
        powerUps
    } = useContext(QuizContext);

    const totalQuestions = questions.length;
    const accuracy = ((correctAnswers / totalQuestions) * 100).toFixed(1);

    const getBadge = () => {
        if (accuracy >= 90) {
            return {
                icon: <FaTrophy className="w-12 h-12 text-yellow-500" />,
                text: "Quiz Master!",
                color: "bg-yellow-500/10"
            };
        }
        if (accuracy >= 75) {
            return {
                icon: <FaMedal className="w-12 h-12 text-blue-500" />,
                text: "Expert Level!",
                color: "bg-blue-500/10"
            };
        }
        return {
            icon: <FaStar className="w-12 h-12 text-gray-400" />,
            text: "Keep Improving!",
            color: "bg-gray-500/10"
        };
    };

    const badge = getBadge();

    const powerUpIcons = {
        doublePoints: <FaBolt className="w-6 h-6" />,
        extraTime: <FaClock className="w-6 h-6" />,
        hint: <FaLightbulb className="w-6 h-6" />
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-slate-900 to-slate-800 p-4">
            <div className="w-full max-w-4xl bg-slate-950/50 border-slate-800 p-8 rounded-xl">
                {/* Header Section */}
                <div className="text-center mb-8">
                    <h2 className="text-4xl font-bold text-white mb-2">Quiz Complete!</h2>
                    <p className="text-slate-400 text-lg">Here's how you performed</p>
                </div>

                {/* Main Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    {/* Score and Accuracy Section */}
                    <div className="space-y-6">
                        {/* Score Card */}
                        <div className="bg-slate-900 rounded-xl p-6 border border-slate-800">
                            <div className="text-center">
                                <p className="text-slate-400 mb-2">Final Score</p>
                                <p className="text-4xl font-bold text-white">{score}</p>
                            </div>
                        </div>

                        {/* Accuracy Circle */}
                        <div className="relative w-100 h-60 flex items-center justify-center bg-slate-900 rounded-xl border border-slate-800">
                            <div className="absolute inset-1">
                                <svg className="w-full h-full" viewBox="0 0 100 100">
                                    <circle
                                        cx="50"
                                        cy="50"
                                        r="35"
                                        fill="none"
                                        stroke="#1e293b"
                                        strokeWidth="10"
                                    />
                                    <circle
                                        cx="50"
                                        cy="50"
                                        r="35"
                                        fill="none"
                                        stroke="#22c55e"
                                        strokeWidth="10"
                                        strokeDasharray={`${accuracy * 2.199} 282.7`}
                                        transform="rotate(-90 50 50)"
                                    />
                                </svg>
                            </div>
                            <div className="text-center z-10">
                                <p className="text-3xl font-bold text-white">{accuracy}%</p>
                                <p className="text-slate-400">Accuracy</p>
                            </div>
                        </div>
                    </div>

                    {/* Detailed Stats Section */}
                    <div className="space-y-6">
                        {/* Answer Stats */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-emerald-500/10 rounded-xl p-4 text-center border border-emerald-500/20">
                                <p className="text-emerald-400 text-2xl font-bold">{correctAnswers}</p>
                                <p className="text-slate-400">Correct</p>
                            </div>
                            <div className="bg-rose-500/10 rounded-xl p-4 text-center border border-rose-500/20">
                                <p className="text-rose-400 text-2xl font-bold">{incorrectAnswers}</p>
                                <p className="text-slate-400">Incorrect</p>
                            </div>
                        </div>

                        {/* Streak Section */}
                        <div className="bg-slate-900 rounded-xl p-4 border border-slate-800">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <FaFire className="w-6 h-6 text-orange-500" />
                                    <span className="text-slate-400">Best Streak</span>
                                </div>
                                <span className="text-2xl font-bold text-white">{streak}</span>
                            </div>
                        </div>

                        {/* Power-ups Used */}
                        <div className="bg-slate-900 rounded-xl p-4 border border-slate-800">
                            <p className="text-slate-400 mb-3">Power-ups Used</p>
                            <div className="grid grid-cols-3 gap-3">
                                {Object.entries(powerUps).map(([type, { remainingUses, active }]) => (
                                    <div key={type} className="flex flex-col items-center gap-2">
                                        <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400">
                                            {powerUpIcons[type]}
                                        </div>
                                        <span className="text-sm text-slate-400">{2-remainingUses}</span>
                                        {active && <span className="text-xs text-emerald-400">Active</span>}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Achievement Badge */}
                <div className={`flex items-center justify-center gap-4 ${badge.color} p-6 rounded-xl border border-slate-800 mb-8`}>
                    {badge.icon}
                    <p className="text-xl font-semibold text-white">{badge.text}</p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 justify-center">
                    <button className="px-6 py-3 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition-colors">
                        View Answers
                    </button>
                    <Link to="/quiz">
                        <button className="px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-500 transition-colors" >
                            Play Again
                        </button></Link>
                </div>
            </div>
        </div>
    );
};

export default ResultPage;
