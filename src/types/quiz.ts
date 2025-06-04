export interface Question {
  id: number
  question: string
  options: string[]
  correctAnswer: number
  category?: string
  explanation?: string
}

export interface QuizState {
  currentQuestionIndex: number
  score: number
  answers: number[]
  isCompleted: boolean
  isStarted: boolean
  timeRemaining: number
  streak: number
  bestStreak: number
}
