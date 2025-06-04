import { Question } from '../types/quiz'

export const quizData: Question[] = [
  {
    id: 1,
    question: "What is the capital of France?",
    options: ["London", "Berlin", "Paris", "Madrid"],
    correctAnswer: 2,
    category: "Geography",
    explanation: "Paris has been the capital of France since 987 AD."
  },
  {
    id: 2,
    question: "Which planet is known as the Red Planet?",
    options: ["Venus", "Mars", "Jupiter", "Saturn"],
    correctAnswer: 1,
    category: "Science",
    explanation: "Mars appears red due to iron oxide (rust) on its surface."
  },
  {
    id: 3,
    question: "Who painted the Mona Lisa?",
    options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Michelangelo"],
    correctAnswer: 2,
    category: "Art",
    explanation: "Leonardo da Vinci painted the Mona Lisa between 1503 and 1519."
  },
  {
    id: 4,
    question: "What is the largest ocean on Earth?",
    options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
    correctAnswer: 3,
    category: "Geography",
    explanation: "The Pacific Ocean covers about 63 million square miles."
  },
  {
    id: 5,
    question: "In which year did World War II end?",
    options: ["1943", "1944", "1945", "1946"],
    correctAnswer: 2,
    category: "History",
    explanation: "World War II ended in 1945 with the surrender of Japan."
  },
  {
    id: 6,
    question: "What is the chemical symbol for gold?",
    options: ["Go", "Gd", "Au", "Ag"],
    correctAnswer: 2,
    category: "Science",
    explanation: "Au comes from the Latin word 'aurum' meaning gold."
  },
  {
    id: 7,
    question: "Which programming language is known as the 'language of the web'?",
    options: ["Python", "Java", "JavaScript", "C++"],
    correctAnswer: 2,
    category: "Technology",
    explanation: "JavaScript is essential for interactive web development."
  },
  {
    id: 8,
    question: "What is the smallest prime number?",
    options: ["0", "1", "2", "3"],
    correctAnswer: 2,
    category: "Mathematics",
    explanation: "2 is the smallest and only even prime number."
  },
  {
    id: 9,
    question: "Which country is home to the kangaroo?",
    options: ["New Zealand", "Australia", "South Africa", "Brazil"],
    correctAnswer: 1,
    category: "Geography",
    explanation: "Kangaroos are native to Australia and are marsupials."
  },
  {
    id: 10,
    question: "What is the speed of light in vacuum?",
    options: ["299,792 km/s", "299,792 m/s", "299,792,458 m/s", "299,792,458 km/s"],
    correctAnswer: 2,
    category: "Science",
    explanation: "The speed of light in vacuum is exactly 299,792,458 meters per second."
  }
]
