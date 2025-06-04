import React, { useState, useEffect } from 'react'
import { Trophy, Brain, Sparkles, ChevronRight, RotateCcw, CheckCircle, XCircle, Timer, Award } from 'lucide-react'
import QuizCard from './components/QuizCard'
import ResultScreen from './components/ResultScreen'
import StartScreen from './components/StartScreen'
import { quizData } from './data/quizData'
import { QuizState, Question } from './types/quiz'

function App() {
  const [quizState, setQuizState] = useState<QuizState>({
    currentQuestionIndex: 0,
    score: 0,
    answers: [],
    isCompleted: false,
    isStarted: false,
    timeRemaining: 30,
    streak: 0,
    bestStreak: 0
  })

  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const [isAnswerLocked, setIsAnswerLocked] = useState(false)

  const currentQuestion: Question = quizData[quizState.currentQuestionIndex]

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (quizState.isStarted && !quizState.isCompleted && !isAnswerLocked && quizState.timeRemaining > 0) {
      timer = setInterval(() => {
        setQuizState(prev => ({
          ...prev,
          timeRemaining: prev.timeRemaining - 1
        }))
      }, 1000)
    } else if (quizState.timeRemaining === 0 && !isAnswerLocked) {
      handleTimeUp()
    }
    return () => clearInterval(timer)
  }, [quizState.isStarted, quizState.isCompleted, isAnswerLocked, quizState.timeRemaining])

  const handleTimeUp = () => {
    setIsAnswerLocked(true)
    setShowFeedback(true)
    setQuizState(prev => ({
      ...prev,
      answers: [...prev.answers, -1],
      streak: 0
    }))
    setTimeout(() => handleNextQuestion(), 2000)
  }

  const handleStartQuiz = () => {
    setQuizState({
      ...quizState,
      isStarted: true,
      timeRemaining: 30
    })
  }

  const handleAnswerSelect = (answerIndex: number) => {
    if (isAnswerLocked) return
    setSelectedAnswer(answerIndex)
  }

  const handleAnswerSubmit = () => {
    if (selectedAnswer === null || isAnswerLocked) return
    
    setIsAnswerLocked(true)
    setShowFeedback(true)
    
    const isCorrect = selectedAnswer === currentQuestion.correctAnswer
    const newStreak = isCorrect ? quizState.streak + 1 : 0
    const newBestStreak = Math.max(newStreak, quizState.bestStreak)
    
    setQuizState(prev => ({
      ...prev,
      score: isCorrect ? prev.score + 1 : prev.score,
      answers: [...prev.answers, selectedAnswer],
      streak: newStreak,
      bestStreak: newBestStreak
    }))

    setTimeout(() => handleNextQuestion(), 2000)
  }

  const handleNextQuestion = () => {
    if (quizState.currentQuestionIndex < quizData.length - 1) {
      setQuizState(prev => ({
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex + 1,
        timeRemaining: 30
      }))
      setSelectedAnswer(null)
      setShowFeedback(false)
      setIsAnswerLocked(false)
    } else {
      setQuizState(prev => ({
        ...prev,
        isCompleted: true
      }))
    }
  }

  const handleRestart = () => {
    setQuizState({
      currentQuestionIndex: 0,
      score: 0,
      answers: [],
      isCompleted: false,
      isStarted: false,
      timeRemaining: 30,
      streak: 0,
      bestStreak: quizState.bestStreak
    })
    setSelectedAnswer(null)
    setShowFeedback(false)
    setIsAnswerLocked(false)
  }

  if (!quizState.isStarted) {
    return <StartScreen onStart={handleStartQuiz} />
  }

  if (quizState.isCompleted) {
    return (
      <ResultScreen
        score={quizState.score}
        totalQuestions={quizData.length}
        answers={quizState.answers}
        questions={quizData}
        onRestart={handleRestart}
        bestStreak={quizState.bestStreak}
      />
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-40 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Brain className="w-10 h-10 text-yellow-400 animate-pulse" />
            <h1 className="text-4xl font-bold text-white">Quiz Master</h1>
            <Sparkles className="w-10 h-10 text-yellow-400 animate-pulse" />
          </div>
          
          {/* Progress and Stats */}
          <div className="max-w-2xl mx-auto mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-white/80">Question {quizState.currentQuestionIndex + 1} of {quizData.length}</span>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-yellow-400" />
                  <span className="text-white font-semibold">{quizState.score}</span>
                </div>
                {quizState.streak > 0 && (
                  <div className="flex items-center gap-2 animate-bounce">
                    <Award className="w-5 h-5 text-orange-400" />
                    <span className="text-orange-400 font-bold">{quizState.streak} streak!</span>
                  </div>
                )}
              </div>
            </div>
            <div className="w-full bg-white/20 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-yellow-400 to-orange-400 h-3 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${((quizState.currentQuestionIndex + 1) / quizData.length) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Quiz Card */}
        <QuizCard
          question={currentQuestion}
          selectedAnswer={selectedAnswer}
          onAnswerSelect={handleAnswerSelect}
          onSubmit={handleAnswerSubmit}
          showFeedback={showFeedback}
          isAnswerLocked={isAnswerLocked}
          timeRemaining={quizState.timeRemaining}
          questionNumber={quizState.currentQuestionIndex + 1}
        />
      </div>
    </div>
  )
}

export default App
