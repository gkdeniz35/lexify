"use client"
import { useState } from "react"

type Message = { role: "user" | "assistant"; content: string }

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Merhaba! 👋 Ben Lexify AI Öğretmeni.\n\n• İngilizce cümle yaz, düzelteyim ✍️\n• Kelime sor, açıklayayım 📚\n• Gramer soruları sor 💡\n\nNasıl yardımcı olabilirim?" }
  ])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)

  const sendMessage = async () => {
    if (!input.trim() || loading) return
    const userMsg: Message = { role: "user", content: input }
    const newMessages = [...messages, userMsg]
    setMessages(newMessages)
    setInput("")
    setLoading(true)

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages: newMessages,
        system: `Sen Lexify platformunun İngilizce öğretmenisin. Kullanıcıların İngilizce öğrenmesine yardımcı oluyorsun.
        - Cümle hatalarını düzelt ve açıkla
        - Kelime anlamlarını Türkçe ver
        - Gramer kurallarını basitçe anlat
        - Türkçe konuş, örnekleri İngilizce ver
        - Kısa ve anlaşılır ol`
      }),
    })
    const data = await res.json()
    setMessages(prev => [...prev, { role: "assistant", content: data.message }])
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col">
      {/* NAVBAR */}
      <nav className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between">
        <a href="/"><img src="/lexify-logo.svg" alt="Lexify" className="h-10" /></a>
        <h2 className="font-bold text-gray-700">🤖 AI Öğretmen</h2>
        <a href="/" className="text-gray-400 hover:text-gray-600 text-sm">← Ana Sayfa</a>
      </nav>

      {/* CHAT */}
      <div className="flex-1 max-w-3xl w-full mx-auto px-8 py-6 flex flex-col" style={{height: "calc(100vh - 140px)"}}>
        <div className="flex-1 overflow-y-auto space-y-4 mb-4">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-lg px-5 py-4 rounded-2xl text-sm whitespace-pre-line ${
                msg.role === "user" 
                  ? "bg-purple-600 text-white" 
                  : "bg-white border border-gray-200 text-gray-800 shadow-sm"
              }`}>
                {msg.content}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-white border border-gray-200 px-5 py-4 rounded-2xl text-sm text-gray-400 shadow-sm">
                ✍️ Yazıyor...
              </div>
            </div>
          )}
        </div>

        {/* INPUT */}
        <div className="flex gap-3">
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && sendMessage()}
            placeholder="Cümle yaz, kelime sor, gramer sorusu sor..."
            className="flex-1 p-4 bg-white border border-gray-200 rounded-2xl text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:border-purple-400 shadow-sm"
          />
          <button 
            onClick={sendMessage} 
            disabled={loading}
            className="bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white px-6 rounded-2xl transition-colors font-bold"
          >
            →
          </button>
        </div>
      </div>
    </div>
  )
}