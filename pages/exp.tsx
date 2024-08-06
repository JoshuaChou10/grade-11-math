import { useState, useEffect } from 'react';
import '../app/globals.css'; // Import the custom CSS for the animation
import '../styles.css'
const questions = [
  // Easy
  { question: "Simplify: x² * x³", answer: "x^5" },
  { question: "Simplify: y⁵ / y²", answer: "y^3" },
  { question: "Simplify: (z³)²", answer: "z^6" },
  { question: "Simplify: a⁴ * a", answer: "a^5" },
  { question: "Simplify: b⁶ / b³", answer: "b^3" },
  { question: "Simplify: (c²)³", answer: "c^6" },
  { question: "Simplify: x⁰", answer: "1" },
  { question: "Simplify: x¹", answer: "x" },

  // Medium
  { question: "Simplify: (2x)³", answer: "8x^3" },
  { question: "Simplify: (3y²)²", answer: "9y^4" },
  { question: "Simplify: (5z⁴)²", answer: "25z^8" },
  { question: "Simplify: 2x³ * 3x²", answer: "6x^5" },
  { question: "Simplify: (4y²)³", answer: "64y^6" },
  { question: "Simplify: (2a⁵)²", answer: "4a^10" },
  { question: "Simplify: 10b⁷ / 2b⁵", answer: "5b^2" },
  { question: "Simplify: (3c³ * 4c²)", answer: "12c^5" },

  // Hard
  { question: "Simplify: (2x²y)³", answer: "8x^6y^3" },
  { question: "Simplify: (3a²b³)²", answer: "9a^4b^6" },
  { question: "Simplify: (5xy²)³", answer: "125x^3y^6" },
  { question: "Simplify: (2x³)² * (3x²)", answer: "12x^8" },
  { question: "Simplify: (4a²b)³ / (2a²b²)", answer: "8a^4b" },
  { question: "Simplify: (2x²y⁵)³ / (4x⁴y⁶)", answer: "0.5x^2y^3" },
  { question: "Simplify: (3x⁴y²)² / (9x²y³)", answer: "x^6y" },
  { question: "Simplify: (2a⁵b⁴)³ / (4a⁸b²)", answer: "2a^7b^10" },
];

function Exponents() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const [completedQuestions, setCompletedQuestions] = useState<number[]>([]);
  const [slide, setSlide] = useState(false);

  useEffect(() => {
    const savedQuestions = JSON.parse(localStorage.getItem("savedQuestions") || '[]');
    setCompletedQuestions(savedQuestions);
  }, []);

  const handleAnswerSubmit = () => {
    const correctAnswer = questions[currentQuestionIndex].answer;
    if (userAnswer.trim().toLowerCase() === correctAnswer.trim().toLowerCase()) {
      setFeedback('Correct!');
      const updatedCompletedQuestions = [...completedQuestions, currentQuestionIndex];
      setCompletedQuestions(updatedCompletedQuestions);
      localStorage.setItem("savedQuestions", JSON.stringify(updatedCompletedQuestions));
    } else {
      setFeedback(`Incorrect. The correct answer is: ${correctAnswer}`);
    }
  };

  const nextQuestion = () => {
    setFeedback('');
    setUserAnswer('');
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  const handleQuestionClick = (index:number) => {
    setSlide(true);
    setTimeout(() => {
      setFeedback('');
      setUserAnswer('');
      setCurrentQuestionIndex(index);
      setSlide(false);
    }, 500); // Duration of the slide animation
  };

  return (
    <div className="flex justify-between">
      <div className="w-3/5">
        <h2 className="text-2xl font-bold mb-4">Exponent Laws Review</h2>
        <h3 className="text-1xl mb-4">When answering use the ^ symbol for exponents eg. x^5</h3>

        <div className={`slide-container ${slide ? 'slide-out' : 'slide-in'}`}>
          {currentQuestionIndex < questions.length ? (
            <div>
              <p className="mb-2">{questions[currentQuestionIndex].question}</p>
              <input 
                type="text" 
                value={userAnswer} 
                onChange={(e) => setUserAnswer(e.target.value)} 
                placeholder="Your answer" 
                className="border p-2 mb-2 text-black"
              />
              <br></br>
              <button onClick={handleAnswerSubmit} className="bg-blue-500 text-white py-1 px-4 rounded">Submit</button>
              {feedback && (
                <>
                  <p className="mt-2">{feedback}</p>
                  {feedback === 'Correct!' && (
                    <button onClick={nextQuestion} className="bg-green-500 text-white py-1 px-4 rounded mt-2">Next Question</button>
                  )}
                </>
              )}
            </div>
          ) : (
            <p>You completed all the questions!</p>
          )}
        </div>
      </div>
      <div className="w-1/4">
        <h2 className="text-2xl font-bold mb-4">Questions</h2>
        <ul>
          {questions.map((q, index) => (
            <li 
              key={index} 
              onClick={() => handleQuestionClick(index)}
              className={`cursor-pointer mb-2 ${currentQuestionIndex === index ? 'bg-blue-500' : completedQuestions.includes(index) ? 'text-green-500' : 'text-white'}`}
            >
              {q.question}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Exponents;
