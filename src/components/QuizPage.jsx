import { useContext, useState } from "react";
import { QuizContext } from "../context/QuizContext";
import { motion } from "framer-motion";
import ResultPage from "./ResultPage";
import { useNavigate } from 'react-router-dom';

const QuizPage = () => {
  const {
    questions, loading, score, currentQuestion, gameOver, timeLeft,
    nextQuestion, streak, powerUps, activePowerUp, activatePowerUp
  } = useContext(QuizContext);
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-2xl text-white font-semibold"
      >
        Loading...
      </motion.div>
    </div>
  );

  if (gameOver) {
    navigate('/result');
    return null;
  }

  const question = questions[currentQuestion];
  const totalQuestions = questions.length;
  const progressPercentage = ((currentQuestion + 1) / totalQuestions) * 100;

  const handleOptionClick = (option) => {
    setSelectedOption(option.id);
    setShowAnswer(true);

    setTimeout(() => {
      setShowAnswer(false);
      setSelectedOption(null);
      nextQuestion(option.id);

    }, 400);
  };

  const PowerUpButton = ({ type, icon, label }) => (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`group p-4 rounded-xl shadow-lg backdrop-blur-sm transition-all duration-300 
        ${powerUps[type].remainingUses > 0 && !activePowerUp
          ? 'bg-blue-600/90 hover:bg-blue-700'
          : 'bg-gray-700'
        } ${activePowerUp === type ? 'ring-2 ring-yellow-400 shadow-yellow-400/20' : ''}`}
      onClick={() => activatePowerUp(type)}
      disabled={powerUps[type].remainingUses <= 0 || (activePowerUp && activePowerUp !== type)}
    >
      <div className="text-center">
        <span className="text-2xl group-hover:scale-110 transition-transform duration-300 inline-block">{icon}</span>
        <p className="text-sm mt-1 font-medium">{label}</p>
        <p className="text-xs mt-1 text-blue-200">Uses: {powerUps[type].remainingUses}</p>
      </div>
    </motion.button>
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/[0.01] bg-[size:50px_50px]" />
      <div className="relative min-h-screen max-w-7xl mx-auto px-6 py-8 flex">

        <motion.div
          className="w-32 flex flex-col gap-4 pt-24"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <PowerUpButton type="doublePoints" icon="✨" label="Double Points" />
          <PowerUpButton type="extraTime" icon="⌛" label="Extra Time" />
          <PowerUpButton type="hint" icon="💡" label="Hint" />
        </motion.div>

        {/* Main Content Area */}
        <div className="flex-1 max-w-4xl mx-auto">
          {/* Stats Bar */}
          <motion.div
            className="bg-gray-800 px-8 py-4 rounded-2xl shadow-lg border border-gray-700 flex gap-8 justify-center mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="text-center">
              <p className="text-sm text-gray-400">Score</p>
              <p className="text-2xl font-bold text-green-400">{score}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-400">Streak</p>
              <p className="text-2xl font-bold text-yellow-400">{streak} 🔥</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-400">Time</p>
              <p className="text-2xl font-bold text-red-400">{timeLeft}s</p>
            </div>
          </motion.div>

          {/* Quiz Content */}
          <motion.h1
            className="text-4xl font-bold text-yellow-400 mb-8 text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            🏆 QUIZ MASTER
          </motion.h1>

          {/* Progress Bar */}
          <div className="w-full bg-gray-800 rounded-full h-2 mb-6 overflow-hidden">
            <motion.div
              className="h-full bg-green-500 rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>

          <p className="text-gray-400 text-sm mb-6 text-center">
            Question {currentQuestion + 1} of {totalQuestions}
          </p>

          {/* Question Box */}
          <motion.div
            className="bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-700 mb-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p className="text-xl font-medium leading-relaxed">{question.description}</p>
          </motion.div>

          {/* Options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {question.options.map((option) => {
              const isSelected = selectedOption === option.id;
              const showCorrect = showAnswer && option.is_correct;
              const isWrong = showAnswer && isSelected && !option.is_correct;

              return (
                <motion.button
                  key={option.id}
                  className={`p-6 rounded-xl text-lg font-medium shadow-lg transition-all duration-300 
                    ${showCorrect
                      ? "bg-green-600"
                      : isWrong
                        ? "bg-red-600"
                        : "bg-blue-600 hover:bg-blue-700"
                    } border border-white/5`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleOptionClick(option)}
                  disabled={showAnswer}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <span className="flex items-center justify-center gap-2">
                    {powerUps.hint.active && option.is_correct && "💡"}
                    {option.description}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizPage;