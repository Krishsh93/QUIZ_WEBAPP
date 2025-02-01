import { createContext, useState, useEffect } from "react";

export const QuizContext = createContext();

const TIME_LIMIT = 30;
const BONUS_POINTS_THRESHOLD = 3;

export const QuizProvider = ({ children }) => {
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [score, setScore] = useState(0);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [timeLeft, setTimeLeft] = useState(TIME_LIMIT);
    const [correctAnswers, setCorrectAnswers] = useState(0);
    const [incorrectAnswers, setIncorrectAnswers] = useState(0);
    const [streak, setStreak] = useState(0);
    const [topic, setTopic] = useState("");
    const [title, setTitle] = useState("");

    const [powerUps, setPowerUps] = useState({
        doublePoints: { remainingUses: 2, active: false },
        extraTime: { remainingUses: 2, active: false },
        hint: { remainingUses: 2, active: false }
    });

    const [activePowerUp, setActivePowerUp] = useState(null);

    // Fetch quiz questions
    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await fetch("/Uw5CrX", {
                    method: "GET",
                    headers: { Accept: "application/json" },
                });

                if (!response.ok) throw new Error("Network response was not ok");

                const data = await response.json();
                setQuestions(data.questions);
                setTitle(data.title);
                setTopic(data.topic);
            } catch (error) {
                console.error("Error fetching quiz data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchQuestions();
    }, []);

    // Timer logic
    useEffect(() => {
        if (timeLeft > 0) {
            const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
            return () => clearTimeout(timer);
        } else {
            nextQuestion(null);
        }
    }, [timeLeft]);

    // Calculate score based on answer correctness and apply power-ups
    const calculateScore = (isCorrect) => {
        let newScore = score;
        if (isCorrect) {
            let points = 10;
            if (powerUps.doublePoints.active) points *= 2;
            if (streak >= BONUS_POINTS_THRESHOLD) points += 5;
            newScore += points;
        }
        return newScore;
    };

    const nextQuestion = (selectedOptionId) => {
        if (!questions[currentQuestion]) return;

        const currentQ = questions[currentQuestion];
        const selectedOption = currentQ.options.find(
            (option) => option.id === selectedOptionId
        );

        const isCorrect = selectedOption && selectedOption.is_correct;
        const newScore = calculateScore(isCorrect);

        setScore(newScore);
        setStreak(isCorrect ? streak + 1 : 0);

        setCorrectAnswers(isCorrect ? correctAnswers + 1 : correctAnswers);
        setIncorrectAnswers(!isCorrect ? incorrectAnswers + 1 : incorrectAnswers);

        // Reset power-ups
        setActivePowerUp(null);
        setPowerUps(prev => ({
            ...prev,
            doublePoints: { ...prev.doublePoints, active: false },
            extraTime: { ...prev.extraTime, active: false },
            hint: { ...prev.hint, active: false }
        }));

        // Move to next question or game over
        setTimeout(() => {
            if (currentQuestion + 1 < questions.length) {
                setCurrentQuestion(currentQuestion + 1);
                setTimeLeft(TIME_LIMIT);
            } else {
                setGameOver(true);
            }
        }, 1000);
    };

    const activatePowerUp = (powerUpType) => {
        if (activePowerUp || powerUps[powerUpType].remainingUses <= 0) return;

        setPowerUps(prev => ({
            ...prev,
            [powerUpType]: {
                remainingUses: prev[powerUpType].remainingUses - 1,
                active: true
            }
        }));
        setActivePowerUp(powerUpType);

        if (powerUpType === "extraTime") {
            setTimeLeft(prev => prev + 10);
        }
    };

    return (
        <QuizContext.Provider
            value={{
                questions,
                loading,
                score,
                currentQuestion,
                gameOver,
                timeLeft,
                correctAnswers,
                incorrectAnswers,
                streak,
                nextQuestion,
                powerUps,
                activePowerUp,
                activatePowerUp,
                topic,
                title
            }}
        >
            {children}
        </QuizContext.Provider>
    );
};
