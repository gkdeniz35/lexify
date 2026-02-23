"use client"
import { useState, useRef } from "react"

type Message = { role: "user" | "assistant"; content: string }

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Merhaba! 👋 Ben Lexify AI Öğretmeni.\n\n• İngilizce cümle yaz, düzelteyim ✍️\n• Kelime sor, açıklayayım 📚\n• Gramer soruları sor 💡\n• Mikrofona konuş veya yanıtları dinle 🎤\n\nNasıl yardımcı olabilirim?" }
  ])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [listening, setListening] = useState(false)
  const [speaking, setSpeaking] = useState(false)
  const recognitionRef = useRef<any>(null)

  const sendMessage = async (text?: string) => {
    const msg = text || input
    if (!msg.trim() || loading) return
    const userMsg: Message = { role: "user", content: msg }
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
    const assistantMsg = { role: "assistant" as const, content: data.message }
    setMessages(prev => [...prev, assistantMsg])
    setLoading(false)
    speakText(data.message)
  }

  const startListening = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
    if (!SpeechRecognition) {
      alert("Tarayıcın ses tanımayı desteklemiyor.")
      return
    }
    const recognition = new SpeechRecognition()
    recognition.lang = "tr-TR"
    recognition.interimResults = false
    recognition.onstart = () => setListening(true)
    recognition.onend = () => setListening(false)
    recognition.onresult = (e: any) => {
      const transcript = e.results[0][0].transcript
      setInput(transcript)
      sendMessage(transcript)
    }
    recognition.onerror = () => setListening(false)
    recognitionRef.current = recognition
    recognition.start()
  }

  const stopListening = () => {
    recognitionRef.current?.stop()
    setListening(false)
  }

  const speakText = (text: string) => {
    window.speechSynthesis.cancel()
    const cleanText = text.replace(/[*•#]/g, "")
    const utterance = new SpeechSynthesisUtterance(cleanText)
    utterance.lang = "tr-TR"
    utterance.rate = 0.95
    utterance.pitch = 1
    utterance.onstart = () => setSpeaking(true)
    utterance.onend = () => setSpeaking(false)
    window.speechSynthesis.speak(utterance)
  }

  const stopSpeaking = () => {
    window.speechSynthesis.cancel()
    setSpeaking(false)
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col">
      {/* NAVBAR */}
      <nav className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between">
        <a href="/"><img src="/lexify-logo.svg" alt="Lexify" className="h-10" /></a>
        <div className="flex items-center gap-3">
          <h2 className="font-bold text-gray-700">🤖 AI Öğretmen</h2>
          {speaking && (
            <button onClick={stopSpeaking} className="bg-red-100 text-red-600 text-xs font-bold px-3 py-1 rounded-full animate-pulse">
              🔊 Duraksat
            </button>
          )}
        </div>
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
                {msg.role === "assistant" && (
                  <button
                    onClick={() => speakText(msg.content)}
                    className="block mt-2 text-xs text-gray-400 hover:text-purple-500 transition-colors"
                  >
                    🔊 Dinle
                  </button>
                )}
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
            placeholder="Cümle yaz, kelime sor veya mikrofona konuş..."
            className="flex-1 p-4 bg-white border border-gray-200 rounded-2xl text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:border-purple-400 shadow-sm"
          />
          <button
            onClick={listening ? stopListening : startListening}
            className={`px-4 rounded-2xl transition-all font-bold text-lg ${
              listening
                ? "bg-red-500 hover:bg-red-600 text-white animate-pulse"
                : "bg-gray-100 hover:bg-gray-200 text-gray-600"
            }`}
            title="Sesli konuş"
          >
            🎤
          </button>
          <button
            onClick={() => sendMessage()}
            disabled={loading}
            className="bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white px-6 rounded-2xl transition-colors font-bold"
          >
            →
          </button>
        </div>
        {listening && (
          <p className="text-center text-sm text-red-500 mt-2 animate-pulse">🎤 Dinleniyor... Konuşmayı bitirince duraksatılacak</p>
        )}
      </div>
    </div>
  )
}
```
