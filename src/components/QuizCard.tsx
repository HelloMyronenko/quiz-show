import React from 'react'
import { CheckCircle, XCircle, Timer, ChevronRight } from 'lucide-react'
import { Question } from '../types/quiz'

interface QuizCardProps {
  question: Question
  selectedAnswer: number | null
  onAnswerSelect: (index: number) => void
  onSubmit: () => void
  showFeedback: boolean
  isAnswerLocked: boolean
  timeRemaining: number
  questionNumber: number
}

const QuizCard: React.FC<QuizCardProps> = ({
  question,
  selectedAnswer,
  onAnswerSelect,
  onSubmit,
  showFeedback,
  isAnswerLocked,
  timeRemaining,
  questionNumber
}) => {
  const getAnswerClass = (index: number) => {
    const baseClass = "w-full p-4 rounded-lg border-2 transition-all duration-300 transform hover:scale-[1.02] cursor-pointer"
    
    if (!showFeedback) {
      if (selectedAnswer === index) {
        return `${baseClass} border-blue-400 bg-blue-50 shadow-lg scale-[1.02]`
      }
      return `${baseClass} border-gray-200 bg-white hover:border-blue-300 hover:shadow-md`
    }
    
    if (index === question.correctAnswer) {
      return `${baseClass} border-green-500 bg-green-50 animate-pulse`
    }
    
    if (selectedAnswer === index && index !== question.correctAnswer) {
      return `${baseClass} border-red-500 bg-red-50 animate-shake`
    }
    
    return `${baseClass} border-gray-200 bg-gray-50 opacity-50`
  }

  const getTimerColor = () => {
    if (timeRemaining > 20) return 'text-green-500'
    if (timeRemaining > 10) return 'text-yellow-500'
    return 'text-red-500 animate-pulse'
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-2xl shadow-2xl p-8 transform transition-all duration-500 hover:shadow-3xl">
        {/* Timer */}
        <div className="flex justify-between items-center mb-6">
          <span className="text-sm font-medium text-gray-500">Question {questionNumber}</span>
          <div className={`flex items-center gap-2 ${getTimerColor()}`}>
            <Timer className="w-5 h-5" />
            <span className="font-bold text-lg">{timeRemaining}s</span>
          </div>
        </div>

        {/* Question */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">{question.question}</h2>
          {question.category && (
            <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
              {question.category}
            </span>
          )}
        </div>

        {/* Options */}
        <div className="space-y-3 mb-8">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => onAnswerSelect(index)}
              disabled={isAnswerLocked}
              className={getAnswerClass(index)}
            >
              <div className="flex items-center justify-between">
                <span className="text-left font-medium">{option}</span>
                {showFeedback && index === question.correctAnswer && (
                  <CheckCircle className="w-6 h-6 text-green-500 animate-bounce" />
                )}
                {showFeedback && selectedAnswer === index && index !== question.correctAnswer && (
                  <XCircle className="w-6 h-6 text-red-500" />
                )}
              </div>
            </button>
          ))}
        </div>

        {/* Submit Button */}
        {!isAnswerLocked && (
          <button
            onClick={onSubmit}
            disabled={selectedAnswer === null}
            className={`w-full py-4 rounded-lg font-bold text-white transition-all duration-300 flex items-center justify-center gap-2 ${
              selectedAnswer === null
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transform hover:scale-[1.02] shadow-lg'
            }`}
          >
            Submit Answer
            <ChevronRight className="w-5 h-5" />
          </button>
        )}

        {/* Feedback */}
        {showFeedback && (
          <div className={`mt-6 p-4 rounded-lg animate-slideIn ${
            selectedAnswer === question.correctAnswer
              ? 'bg-green-100 border border-green-300'
              : 'bg-red-100 border border-red-300'
          }`}>
            <p className={`font-semibold ${
              selectedAnswer === question.correctAnswer ? 'text-green-800' : 'text-red-800'
            }`}>
              {selectedAnswer === question.correctAnswer ? '🎉 Correct!' : '❌ Incorrect'}
            </p>
            {question.explanation && (
              <p className="mt-2 text-gray-700">{question.explanation}</p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default QuizCard
