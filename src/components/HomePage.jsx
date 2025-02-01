import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import React, { useContext } from "react";
import { QuizContext } from "../context/QuizContext";
const HomePage = () => {
  const {
    topic,
    title
  } = useContext(QuizContext);
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-slate-900 to-slate-800 p-8">
      {/* Title Section */}
      <motion.h1
        className="text-5xl font-extrabold text-center text-white mb-8 drop-shadow-lg"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Genetics and Evolution 🧬
      </motion.h1>

      {/* Subtitle with Topic */}
      <motion.p
        className="text-xl text-center text-slate-400 mb-6"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        Test your knowledge of genetics and evolution with this exciting quiz! 🧠
      </motion.p>
      <motion.p
        className="text-lg text-center text-slate-300 mb-6"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        Topic: {topic}
      </motion.p>

      {/* Start Button */}
      {/* <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.6, duration: 0.5, type: "spring", stiffness: 200 }}
      >
        <Link
          to="/quiz"
          className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-full font-semibold text-xl shadow-lg hover:bg-gradient-to-r hover:from-teal-500 hover:to-emerald-500 transition transform hover:scale-105"
        >
          Start Your Journey 🚀
        </Link>
      </motion.div> */}

      {/* Additional Section (Optional) */}
      <motion.div
        className="mt-8 w-full max-w-xl bg-slate-900/50 p-6 rounded-xl border border-slate-800"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.8 }}
      >
        <h2 className="text-3xl font-bold text-center text-white mb-4">Prepare for the Challenge!</h2>
        <p className="text-center text-slate-400 mb-4">
          Genetics and Evolution are fundamental topics that shape our understanding of life on Earth. Are you ready to prove your expertise?
        </p>
        <div className="flex justify-center">
          <Link
            to="/quiz"
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
          >
            Take the Quiz
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default HomePage;
