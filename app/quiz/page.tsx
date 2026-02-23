"use client"
import { useEffect, useState } from "react"
import { supabase } from "./supabase"

type Word = {
  word: string
  level: string
  definition: string
  definition_tr: string
  example: string
}

type Question = {
  word: string
  turkish: string
  correct: string
  options: string[]
  example: string
}

export default function QuizPage() {
  const [questions, setQuestions] = useState<Question[]>([])
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState<string | null>(null)
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)
  const [loading, setLoading] = useState(true)
  const [selectedLevel, setSelectedLevel] = useState("Tümü")

  const loadQuiz = async (level: string) => {
    setLoading(true)
    setCurrent(0)
    setSelected(null)
    setScore(0)
    setFinished(false)

    let query = supabase.from("words").select("word, definition, definition_tr, level, example")
    if (level !== "Tümü") query = query.eq("level", level)

    const { data } = await query
    if (!data || data.length < 4) return

    const shuffled = [...data].sort(() => Math.random() - 0.5).slice(0, 20)

    const generated: Question[] = shuffled.map((w: Word) => {
      const wrong = data
        .filter((d: Word) => d.word !== w.word)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3)
        .map((d: Word) => d.definition)

      const options = [...wrong, w.definition].sort(() => Math.random() - 0.5)

      return {
        word: w.word,
        turkish: w.definition_tr,
        correct: w.definition,
        options,
        example: w.example,
      }
    })

    setQuestions(generated)
    setLoading(false)
  }

  useEffect(() => {
    loadQuiz("Tümü")
  }, [])

  function handleAnswer(option: string) {
    if (selected) return
    setSelected(option)
    if (option === questions[current].correct) setScore(s => s + 1)
  }

  function handleNext() {
    if (current + 1 >= questions.length) {
      setFinished(true)
    } else {
      setCurrent(c => c + 1)
      setSelected(null)
    }
  }

  function handleRestart() {
    loadQuiz(selectedLevel)
  }

  if (loading) return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex items-center justify-center">
      <div className="text-center">
        <div className="text-4xl mb-4">⏳</div>
        <p className="text-gray-500">Sorular hazırlanıyor...</p>
      </div>
    </div>
  )

  if (finished) return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col items-center justify-center p-8">
      <div className="bg-white border border-gray-200 rounded-3xl p-10 text-center max-w-md w-full shadow-sm">
        <div className="text-6xl mb-4">
          {score >= 18 ? "🏆" : score >= 14 ? "🎉" : score >= 10 ? "👏" : "💪"}
        </div>
        <h1 className="text-3xl font-bold mb-2">Quiz Bitti!</h1>
        <p className="text-gray-400 mb-6">Sonucun</p>
        <div className="text-6xl font-bold mb-2 bg-gradient-to-r from-purple-500 to-cyan-400 bg-clip-text text-transparent">
          {score}/{questions.length}
        </div>
        <p className="text-gray-500 mb-2">
          {score >= 18 ? "Mükemmel! 🔥" : score >= 14 ? "Çok iyi! 👏" : score >= 10 ? "İyi iş! 💪" : "Tekrar dene! 📚"}
        </p>
        <p className="text-gray-400 text-sm mb-8">Başarı oranı: %{Math.round((score / questions.length) * 100)}</p>
        <div className="flex gap-4 justify-center">
          <button onClick={handleRestart} className="bg-purple-600 hover:bg-purple-700 text-white font-bold px-6 py-3 rounded-xl transition-colors">
            🔄 Tekrar Oyna
          </button>
          <a href="/" className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold px-6 py-3 rounded-xl transition-colors">
            Ana Sayfa
          </a>
        </div>
      </div>
    </div>
  )

  const question = questions[current]

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col items-center justify-center p-8">
      <div className="max-w-xl w-full">

        {/* ÜST BAR */}
        <div className="flex justify-between items-center mb-6">
          <a href="/" className="text-gray-400 hover:text-gray-700 text-sm">← Ana Sayfa</a>
          <div className="flex gap-2">
            {["Tümü", "A2", "B1", "B2", "C1"].map(level => (
              <button
                key={level}
                onClick={() => { setSelectedLevel(level); loadQuiz(level); }}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  selectedLevel === level ? "bg-purple-600 text-white" : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                }`}
              >
                {level}
              </button>
            ))}
          </div>
          <span className="text-purple-600 font-bold">Skor: {score}</span>
        </div>

        {/* PROGRESS */}
        <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
          <div
            className="bg-gradient-to-r from-purple-500 to-cyan-400 h-2 rounded-full transition-all"
            style={{ width: `${((current + 1) / questions.length) * 100}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-gray-400 mb-6">
          <span>Soru {current + 1} / {questions.length}</span>
          <span>%{Math.round(((current + 1) / questions.length) * 100)}</span>
        </div>

        {/* SORU */}
        <div className="bg-white border border-gray-200 rounded-3xl p-8 mb-6 text-center shadow-sm">
          <p className="text-gray-400 text-sm mb-2">Bu kelimenin İngilizce anlamı nedir?</p>
          <h2 className="text-4xl font-bold mb-2 text-gray-900">{question.word}</h2>
          <p className="text-gray-500 text-sm mb-2">🇹🇷 {question.turkish}</p>
          {question.example && (
            <p className="text-gray-400 text-xs italic">📌 Example: {question.example}</p>
          )}
        </div>

        {/* ŞIKLAR */}
        <div className="grid grid-cols-1 gap-3">
          {question.options.map((option) => {
            let style = "bg-white border border-gray-200 hover:border-purple-400 text-gray-900"
            if (selected) {
              if (option === question.correct) style = "bg-green-50 border border-green-400 text-green-800"
              else if (option === selected) style = "bg-red-50 border border-red-400 text-red-800"
              else style = "bg-gray-50 border border-gray-200 text-gray-400 opacity-50"
            }
            return (
              <button
                key={option}
                onClick={() => handleAnswer(option)}
                className={`${style} text-left rounded-2xl p-4 transition-all font-medium text-sm shadow-sm`}
              >
                {option}
              </button>
            )
          })}
        </div>

        {/* SONRAKI BUTON */}
        {selected && (
          <button
            onClick={handleNext}
            className="w-full mt-6 bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 rounded-2xl transition-colors"
          >
            {current + 1 >= questions.length ? "Sonucu Gör 🏆" : "Sonraki Soru →"}
          </button>
        )}
      </div>
    </div>
  )
}