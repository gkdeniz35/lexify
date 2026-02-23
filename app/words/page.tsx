"use client"
import { useEffect, useState } from "react"
import { supabase } from "./supabase"

type Word = {
  word: string
  level: string
  definition: string
  definition_tr: string
  example: string
  category: string
}

const levelStyles: Record<string, string> = {
  A2: "bg-green-500",
  B1: "bg-cyan-500",
  B2: "bg-purple-500",
  C1: "bg-amber-500",
}

const cardStyles: Record<string, string> = {
  A2: "bg-green-950 border-green-800 hover:border-green-500",
  B1: "bg-cyan-950 border-cyan-800 hover:border-cyan-500",
  B2: "bg-purple-950 border-purple-800 hover:border-purple-500",
  C1: "bg-amber-950 border-amber-800 hover:border-amber-500",
}

const categoryEmojis: Record<string, string> = {
  "Daily Life": "🏠", "Personal": "👤", "Work": "💼", "Education": "📚",
  "Health": "❤️", "Science": "🔬", "Technology": "💻", "Finance": "💰",
  "Society": "🌍", "Environment": "🌿", "Culture": "🎭", "Travel": "✈️",
  "Sport": "⚽", "Communication": "💬", "Academic": "🎓", "History": "📜",
  "Philosophy": "🤔", "Transport": "🚗"
}

export default function WordsPage() {
  const [words, setWords] = useState<Word[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedLevel, setSelectedLevel] = useState("Tümü")
  const [selectedWord, setSelectedWord] = useState<Word | null>(null)
  const [search, setSearch] = useState("")

  useEffect(() => {
    async function fetchWords() {
      const { data, error } = await supabase
        .from("words")
        .select("*")
        .order("word", { ascending: true })
      if (error) console.error(error)
      else setWords(data || [])
      setLoading(false)
    }
    fetchWords()
  }, [])

  const filtered = words
    .filter(w => selectedLevel === "Tümü" || w.level === selectedLevel)
    .filter(w => w.word.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 p-8">
      <div className="max-w-5xl mx-auto">
        <a href="/" className="text-gray-400 text-sm mb-6 block hover:text-white">← Ana Sayfa</a>
        <h1 className="text-4xl font-bold mb-2">Kelimeler</h1>
        <p className="text-gray-400 mb-6">Bir kelimeye tıkla ve detayları gör</p>

        <input
          type="text"
          placeholder="🔍 Kelime ara..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 mb-6 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
        />

        <div className="flex gap-3 mb-8 flex-wrap">
          {["Tümü", "A2", "B1", "B2", "C1"].map(level => (
            <button
              key={level}
              onClick={() => setSelectedLevel(level)}
              className={`px-4 py-2 rounded-xl font-bold text-sm transition-all ${
                selectedLevel === level
                  ? "bg-purple-600 text-white"
                  : "bg-gray-800 text-gray-400 hover:text-white"
              }`}
            >
              {level}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="text-center text-gray-400 py-20">Yükleniyor...</div>
        ) : (
          <>
            <p className="text-gray-500 text-sm mb-4">{filtered.length} kelime bulundu</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filtered.map((w) => (
                <div
                  key={w.word}
                  onClick={() => setSelectedWord(w)}
                  className={`${cardStyles[w.level]} border rounded-2xl p-6 transition-colors cursor-pointer`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h2 className="text-2xl font-bold text-white">{w.word}</h2>
                    <span className={`${levelStyles[w.level]} text-white text-xs font-bold px-3 py-1 rounded-full`}>
                      {w.level}
                    </span>
                  </div>
                  <p className="text-gray-300 text-sm mb-1">{w.definition}</p>
                  <p className="text-gray-400 text-sm">🇹🇷 {w.definition_tr}</p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {selectedWord && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4" onClick={() => setSelectedWord(null)}>
          <div className={`${cardStyles[selectedWord.level]} border rounded-3xl p-8 max-w-lg w-full`} onClick={e => e.stopPropagation()}>
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-4xl font-bold text-white mb-1">{selectedWord.word}</h2>
                <span className="text-gray-400 text-sm">{categoryEmojis[selectedWord.category] || "📖"} {selectedWord.category}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className={`${levelStyles[selectedWord.level]} text-white text-sm font-bold px-3 py-1 rounded-full`}>
                  {selectedWord.level}
                </span>
                <button onClick={() => setSelectedWord(null)} className="text-gray-500 hover:text-white text-2xl">✕</button>
              </div>
            </div>

            <div className="bg-black bg-opacity-30 rounded-2xl p-4 mb-4">
              <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Tanım</p>
              <p className="text-white">{selectedWord.definition}</p>
            </div>

            <div className="bg-black bg-opacity-30 rounded-2xl p-4 mb-4">
              <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">🇹🇷 Türkçe</p>
              <p className="text-white text-xl font-bold">{selectedWord.definition_tr}</p>
            </div>

            <div className="bg-black bg-opacity-30 rounded-2xl p-4">
              <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">Örnek Cümle</p>
              <p className="text-gray-300 italic">"{selectedWord.example}"</p>
            </div>

            <button
              onClick={() => setSelectedWord(null)}
              className={`w-full mt-6 ${levelStyles[selectedWord.level]} text-white font-bold py-3 rounded-2xl transition-colors`}
            >
              Kapat
            </button>
          </div>
        </div>
      )}
    </div>
  )
}