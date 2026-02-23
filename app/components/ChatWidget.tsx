"use client";
import { useState } from "react";

type Message = { role: "user" | "assistant"; content: string };

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "👋 Merhaba! Ben Lexify'ın AI asistanıyım.\n\nSana şunlarda yardım edebilirim:\n• İngilizce kelime anlamları\n• Cümle düzeltme\n• Gramer soruları\n• Örnek cümleler\n\nNe öğrenmek istersin? 🎓" }
  ]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    const userMessage: Message = { role: "user", content: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });
      const data = await res.json();
      setMessages(prev => [...prev, { role: "assistant", content: data.message }]);
    } catch {
      setMessages(prev => [...prev, { role: "assistant", content: "❌ Bir hata oluştu, tekrar dene." }]);
    }
    setLoading(false);
  };

  return (
    <>
      {open && (
        <div className="fixed bottom-24 right-6 w-80 bg-gray-900 text-white rounded-2xl shadow-2xl border border-gray-700 z-50 flex flex-col" style={{height: "420px"}}>
          <div className="flex items-center justify-between p-4 border-b border-gray-700">
            <div className="flex items-center gap-2">
              <span className="text-xl">🤖</span>
              <div>
                <div className="font-bold text-sm">Lexify AI</div>
                <div className="flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <span className="text-xs text-gray-400">Çevrimiçi</span>
                </div>
              </div>
            </div>
            <button onClick={() => setOpen(false)} className="text-gray-500 hover:text-white">✕</button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-xs px-3 py-2 rounded-xl text-sm whitespace-pre-line ${
                  msg.role === "user" ? "bg-purple-600 text-white" : "bg-gray-800 text-gray-100"
                }`}>
                  {msg.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-gray-800 px-3 py-2 rounded-xl text-sm text-gray-400">✍️ Yazıyor...</div>
              </div>
            )}
          </div>
          <div className="p-4 border-t border-gray-700">
            <div className="flex gap-2">
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === "Enter" && sendMessage()}
                placeholder="Mesaj yaz..."
                className="flex-1 p-2 bg-gray-800 border border-gray-700 rounded-xl outline-none text-white text-sm placeholder-gray-500 focus:border-purple-500"
              />
              <button onClick={sendMessage} disabled={loading} className="bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white px-3 rounded-xl transition-colors">→</button>
            </div>
          </div>
        </div>
      )}
      <button onClick={() => setOpen(!open)} className="fixed bottom-6 right-6 bg-purple-600 hover:bg-purple-700 text-white w-14 h-14 rounded-full shadow-lg text-2xl transition-all z-50">
        {open ? "✕" : "💬"}
      </button>
    </>
  );
}