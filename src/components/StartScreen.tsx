import React from 'react'
import { Brain, Sparkles, Trophy, Target, Zap, BookOpen } from 'lucide-react'

interface StartScreenProps {
  onStart: () => void
}

const StartScreen: React.FC<StartScreenProps> = ({ onStart }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-40 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-16 flex items-center justify-center min-h-screen">
        <div className="max-w-2xl w-full">
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl p-12 text-center transform transition-all duration-500 hover:scale-[1.02]">
            {/* Logo and Title */}
            <div className="flex items-center justify-center gap-3 mb-8 animate-fadeIn">
              <Brain className="w-16 h-16 text-yellow-400 animate-pulse" />
              <h1 className="text-5xl font-bold text-white">Quiz Master</h1>
              <Sparkles className="w-16 h-16 text-yellow-400 animate-pulse" />
            </div>

            {/* Description */}
            <p className="text-xl text-white/80 mb-12 animate-fadeIn animation-delay-200">
              Test your knowledge with our interactive quiz featuring dynamic animations and instant feedback!
            </p>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="bg-white/10 rounded-xl p-6 transform transition-all duration-300 hover:scale-105 animate-fadeIn animation-delay-400">
                <Trophy className="w-12 h-12 text-yellow-400 mx-auto mb-3" />
                <h3 className="text-white font-semibold mb-2">Track Your Score</h3>
                <p className="text-white/70 text-sm">Earn points for correct answers</p>
              </div>
              <div className="bg-white/10 rounded-xl p-6 transform transition-all duration-300 hover:scale-105 animate-fadeIn animation-delay-600">
                <Target className="w-12 h-12 text-green-400 mx-auto mb-3" />
                <h3 className="text-white font-semibold mb-2">Build Streaks</h3>
                <p className="text-white/70 text-sm">Chain correct answers together</p>
              </div>
              <div className="bg-white/10 rounded-xl p-6 transform transition-all duration-300 hover:scale-105 animate-fadeIn animation-delay-800">
                <Zap className="w-12 h-12 text-orange-400 mx-auto mb-3" />
                <h3 className="text-white font-semibold mb-2">Beat the Clock</h3>
                <p className="text-white/70 text-sm">30 seconds per question</p>
              </div>
            </div>

            {/* Start Button */}
            <button
              onClick={onStart}
              className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 font-bold text-xl px-12 py-5 rounded-full transform transition-all duration-300 hover:scale-105 hover:shadow-2xl animate-fadeIn animation-delay-1000"
            >
              <BookOpen className="w-6 h-6 group-hover:rotate-12 transition-transform" />
              Start Quiz
              <Sparkles className="w-6 h-6 group-hover:-rotate-12 transition-transform" />
              <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-20 transition-opacity"></div>
            </button>

            {/* Instructions */}
            <div className="mt-12 text-white/60 text-sm animate-fadeIn animation-delay-1200">
              <p>Answer 10 questions • 30 seconds each • Instant feedback</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StartScreen
