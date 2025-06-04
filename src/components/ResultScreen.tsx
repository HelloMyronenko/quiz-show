import React from 'react'
import { Trophy, RotateCcw, CheckCircle, XCircle, Award, Star, TrendingUp } from 'lucide-react'
import { Question } from '../types/quiz'

interface ResultScreenProps {
  score: number
  totalQuestions: number
  answers: number[]
  questions: Question[]
  onRestart: () => void
  bestStreak: number
}

const ResultScreen: React.FC<ResultScreenProps> = ({
  score,
  totalQuestions,
  answers,
  questions,
  onRestart,
  bestStreak
}) => {
  const percentage = Math.round((score / totalQuestions) * 100)
  const isPerfect = score === totalQuestions
  
  const getGrade = () => {
    if (percentage >= 90) return { grade: 'A+', color: 'text-green-500' }
    if (percentage >= 80) return { grade: 'A', color: 'text-green-500' }
    if (percentage >= 70) return { grade: 'B', color: 'text-blue-500' }
    if (percentage >= 60) return { grade: 'C', color: 'text-yellow-500' }
    return { grade: 'D', color: 'text-red-500' }
  }

  const { grade, color } = getGrade()

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-40 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Results Card */}
          <div className="bg-white rounded-2xl shadow-2xl p-8 mb-8 animate-slideIn">
            <div className="text-center mb-8">
              {isPerfect && (
                <div className="mb-6 animate-bounce">
                  <Star className="w-20 h-20 text-yellow-400 mx-auto" />
                  <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 mt-2">
                    Perfect Score!
                  </h2>
                </div>
              )}
              
              <Trophy className={`w-16 h-16 mx-auto mb-4 ${isPerfect ? 'text-yellow-400' : 'text-gray-400'} ${isPerfect ? 'animate-spin-slow' : ''}`} />
              <h1 className="text-4xl font-bold text-gray-800 mb-2">Quiz Complete!</h1>
              
              {/* Score Display */}
              <div className="flex items-center justify-center gap-8 my-8">
                <div className="text-center">
                  <p className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
                    {score}/{totalQuestions}
                  </p>
                  <p className="text-gray-600 mt-2">Questions Correct</p>
                </div>
                
                <div className="text-center">
                  <p className={`text-6xl font-bold ${color}`}>{grade}</p>
                  <p className="text-gray-600 mt-2">Grade</p>
                </div>
                
                <div className="text-center">
                  <p className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-teal-500">
                    {percentage}%
                  </p>
                  <p className="text-gray-600 mt-2">Accuracy</p>
                </div>
              </div>

              {/* Best Streak */}
              {bestStreak > 0 && (
                <div className="bg-orange-50 rounded-lg p-4 mb-6 animate-fadeIn">
                  <div className="flex items-center justify-center gap-2">
                    <Award className="w-6 h-6 text-orange-500" />
                    <p className="text-orange-700 font-semibold">Best Streak: {bestStreak} correct answers in a row!</p>
                  </div>
                </div>
              )}

              {/* Progress Bar */}
              <div className="w-full bg-gray-200 rounded-full h-4 mb-8">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-purple-600 h-4 rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>

            {/* Answer Review */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <TrendingUp className="w-6 h-6" />
                Answer Review
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {questions.map((question, index) => {
                  const userAnswer = answers[index]
                  const isCorrect = userAnswer === question.correctAnswer
                  const wasTimeout = userAnswer === -1
                  
                  return (
                    <div 
                      key={index}
                      className={`p-4 rounded-lg border-2 ${
                        wasTimeout 
                          ? 'border-gray-300 bg-gray-50'
                          : isCorrect 
                            ? 'border-green-200 bg-green-50' 
                            : 'border-red-200 bg-red-50'
                      } transform transition-all duration-300 hover:scale-[1.02]`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className="font-semibold text-gray-800 mb-1">Q{index + 1}: {question.question}</p>
                          {wasTimeout ? (
                            <p className="text-gray-600 text-sm">Time's up! The correct answer was: {question.options[question.correctAnswer]}</p>
                          ) : (
                            <>
                              <p className="text-sm text-gray-600">Your answer: {question.options[userAnswer]}</p>
                              {!isCorrect && (
                                <p className="text-sm text-green-600 mt-1">
                                  Correct: {question.options[question.correctAnswer]}
                                </p>
                              )}
                            </>
                          )}
                        </div>
                        {wasTimeout ? (
                          <Timer className="w-5 h-5 text-gray-400 flex-shrink-0 ml-2" />
                        ) : isCorrect ? (
                          <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 ml-2" />
                        ) : (
                          <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 ml-2" />
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Restart Button */}
            <button
              onClick={onRestart}
              className="w-full py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-lg hover:from-blue-600 hover:to-purple-700 transform transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-2 shadow-lg"
            >
              <RotateCcw className="w-5 h-5" />
              Try Again
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResultScreen
