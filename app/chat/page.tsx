"use client"
import { useState } from "react"

export default function ChatPage() {
  const [input, setInput] = useState("")
  const [result, setResult] = useState("")

  const searchWord = async () => {
    const res = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${input}`
    )
    const data = await res.json()

    if (data[0]?.meanings[0]?.definitions[0]?.definition) {
      setResult(data[0].meanings[0].definitions[0].definition)
    } else {
      setResult("Kelime bulunamadı.")
    }
  }

  return (
    <div className="p-10 text-white">
      <h1 className="text-2xl mb-4">Lexify Sözlük</h1>

      <input
        className="text-black p-2 mr-2"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Kelime yaz..."
      />

      <button
        onClick={searchWord}
        className="bg-purple-600 px-4 py-2 rounded"
      >
        Ara
      </button>

      <div className="mt-6">
        {result}
      </div>
    </div>
  )
}
