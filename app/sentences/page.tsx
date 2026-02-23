"use client"
import { useState } from "react"
import { supabase } from "./supabase"

const topics = [
  { 
    id: "present", title: "Geniş Zaman", emoji: "🕐", desc: "Simple Present Tense",
    formula: "Subject + V1 (s/es)",
    tips: ["He/She/It ile fiilin sonuna -s/-es eklenir", "Her zaman yapılan rutinler için kullanılır", "Genel gerçekler için kullanılır"],
    examples: [
      { en: "She works at a hospital every day.", tr: "O her gün hastanede çalışır." },
      { en: "The sun rises in the east.", tr: "Güneş doğudan doğar." },
      { en: "They don't eat meat.", tr: "Onlar et yemez." },
    ]
  },
  { 
    id: "present_continuous", title: "Şimdiki Zaman", emoji: "▶️", desc: "Present Continuous",
    formula: "Subject + am/is/are + V-ing",
    tips: ["Şu an yapılan eylemler için kullanılır", "Yakın gelecek planlar için de kullanılır", "am/is/are yardımcı fiili kullanılır"],
    examples: [
      { en: "She is studying English right now.", tr: "O şu an İngilizce çalışıyor." },
      { en: "They are playing football in the garden.", tr: "Bahçede futbol oynuyorlar." },
      { en: "I am meeting my friend tomorrow.", tr: "Yarın arkadaşımla buluşuyorum." },
    ]
  },
  { 
    id: "past", title: "Geçmiş Zaman", emoji: "⏮️", desc: "Simple Past Tense",
    formula: "Subject + V2 (ed)",
    tips: ["Düzenli fiiller -ed alır", "Düzensiz fiiller ezberlenmelidir", "Geçmişte tamamlanan eylemler için kullanılır"],
    examples: [
      { en: "I visited my grandmother last weekend.", tr: "Geçen hafta sonu anneanemi ziyaret ettim." },
      { en: "She didn't come to the party.", tr: "O partiye gelmedi." },
      { en: "They bought a new car yesterday.", tr: "Dün yeni bir araba aldılar." },
    ]
  },
  { 
    id: "past_continuous", title: "Geçmiş Sürekli", emoji: "⏸️", desc: "Past Continuous",
    formula: "Subject + was/were + V-ing",
    tips: ["Geçmişte devam eden eylemler için kullanılır", "While ile iki eylem birleştirilir", "was/were yardımcı fiili kullanılır"],
    examples: [
      { en: "I was reading when she called.", tr: "O aradığında kitap okuyordum." },
      { en: "They were working all night.", tr: "Bütün gece çalışıyorlardı." },
      { en: "While he was sleeping, I cooked dinner.", tr: "O uyurken yemek pişirdim." },
    ]
  },
  { 
    id: "present_perfect", title: "Geçmiş-Şimdi", emoji: "🔗", desc: "Present Perfect",
    formula: "Subject + have/has + V3",
    tips: ["Geçmişte başlayıp şimdiye uzanan eylemler", "Ever, never, already, yet ile kullanılır", "Have/has yardımcı fiili kullanılır"],
    examples: [
      { en: "I have never visited London.", tr: "Hiç Londra'ya gitmedim." },
      { en: "She has already finished her homework.", tr: "O ödevini çoktan bitirdi." },
      { en: "Have you ever eaten sushi?", tr: "Hiç suşi yedin mi?" },
    ]
  },
  { 
    id: "future", title: "Gelecek Zaman", emoji: "⏭️", desc: "Simple Future",
    formula: "Subject + will + V1",
    tips: ["Will anlık kararlar için kullanılır", "Tüm öznelerle aynı kalır", "Tahminler için kullanılır"],
    examples: [
      { en: "I will call you tomorrow morning.", tr: "Yarın sabah seni arayacağım." },
      { en: "She will achieve her goals someday.", tr: "O bir gün hedeflerine ulaşacak." },
      { en: "It will probably rain tonight.", tr: "Bu gece muhtemelen yağmur yağacak." },
    ]
  },
  { 
    id: "going_to", title: "Going To", emoji: "🎯", desc: "Be Going To",
    formula: "Subject + am/is/are + going to + V1",
    tips: ["Önceden planlanmış eylemler için kullanılır", "Kanıta dayalı tahminler için kullanılır", "Will'den daha kesin bir niyet ifade eder"],
    examples: [
      { en: "I am going to start a new course next month.", tr: "Gelecek ay yeni bir kursa başlayacağım." },
      { en: "Look at those clouds — it is going to rain.", tr: "Şu bulutlara bak — yağmur yağacak." },
      { en: "She is going to negotiate a new contract.", tr: "Yeni bir sözleşme müzakere edecek." },
    ]
  },
  { 
    id: "future_continuous", title: "Gelecek Sürekli", emoji: "🔜", desc: "Future Continuous",
    formula: "Subject + will be + V-ing",
    tips: ["Gelecekte belirli bir anda devam edecek eylemler", "At this time tomorrow gibi ifadelerle kullanılır", "Will be + fiil-ing yapısı kullanılır"],
    examples: [
      { en: "I will be working at 9pm tonight.", tr: "Bu gece saat 9'da çalışıyor olacağım." },
      { en: "She will be studying when you arrive.", tr: "Sen geldiğinde o ders çalışıyor olacak." },
      { en: "They will be collaborating on the project.", tr: "Proje üzerinde iş birliği yapıyor olacaklar." },
    ]
  },
  { 
    id: "future_perfect", title: "Gelecek Tamamlanmış", emoji: "✅", desc: "Future Perfect",
    formula: "Subject + will have + V3",
    tips: ["Gelecekte belirli bir zamana kadar tamamlanacak eylemler", "By + zaman ifadesiyle kullanılır", "Will have + V3 yapısı kullanılır"],
    examples: [
      { en: "I will have finished the project by Monday.", tr: "Pazartesiye kadar projeyi bitirmiş olacağım." },
      { en: "She will have achieved her goal by then.", tr: "O zamana kadar hedefine ulaşmış olacak." },
      { en: "They will have collaborated for months.", tr: "Aylardır iş birliği yapmış olacaklar." },
    ]
  },
  { 
    id: "future_perfect_continuous", title: "Gelecek Tam Sürekli", emoji: "⏳", desc: "Future Perfect Continuous",
    formula: "Subject + will have been + V-ing",
    tips: ["Gelecekte bir noktaya kadar devam edecek eylemler", "For + süre ifadesiyle kullanılır", "En karmaşık future yapısıdır"],
    examples: [
      { en: "By June, I will have been studying English for 2 years.", tr: "Haziran'a kadar 2 yıldır İngilizce çalışıyor olacağım." },
      { en: "She will have been working here for 10 years next month.", tr: "Gelecek ay 10 yıldır burada çalışıyor olacak." },
      { en: "They will have been collaborating for months by then.", tr: "O zamana kadar aylardır iş birliği yapıyor olacaklar." },
    ]
  },
  { 
    id: "conditional", title: "Koşul Cümleleri", emoji: "🤔", desc: "If Clauses",
    formula: "If + condition, result",
    tips: ["Type 1: Gerçekleşebilir durumlar (If + present, will)", "Type 2: Hayali durumlar (If + past, would)", "Type 3: Geçmiş hayaller (If + past perfect, would have)"],
    examples: [
      { en: "If it rains, I will stay at home.", tr: "Yağmur yağarsa evde kalacağım." },
      { en: "If I were resilient, I would overcome any obstacle.", tr: "Dayanıklı olsaydım her engeli aşardım." },
      { en: "If she had studied, she would have passed.", tr: "Çalışsaydı geçerdi." },
    ]
  },
  { 
    id: "passive", title: "Edilgen Yapı", emoji: "🔄", desc: "Passive Voice",
    formula: "Subject + be + V3",
    tips: ["Yapan kişi önemli değilse kullanılır", "By ile yapan kişi belirtilebilir", "Tüm zamanlarla kullanılabilir"],
    examples: [
      { en: "The book was written by a famous author.", tr: "Kitap ünlü bir yazar tarafından yazıldı." },
      { en: "English is spoken all over the world.", tr: "İngilizce tüm dünyada konuşulur." },
      { en: "The project will be finished next week.", tr: "Proje gelecek hafta bitirilecek." },
    ]
  },
  { 
    id: "reported", title: "Dolaylı Anlatım", emoji: "💬", desc: "Reported Speech",
    formula: "Subject + said (that) + clause",
    tips: ["Zaman kipi bir geriye kayar", "Say ve tell farkına dikkat et", "Zamir değişimlerine dikkat et"],
    examples: [
      { en: "She said that she was tired.", tr: "Yorgun olduğunu söyledi." },
      { en: "He told me that he would collaborate.", tr: "İş birliği yapacağını söyledi." },
      { en: "They said they had finished the work.", tr: "İşi bitirdiklerini söylediler." },
    ]
  },
  { 
    id: "comparison", title: "Karşılaştırma", emoji: "⚖️", desc: "Comparatives & Superlatives",
    formula: "adj + er / more + adj / the + adj + est",
    tips: ["Kısa sıfatlar -er/-est alır", "Uzun sıfatlar more/most alır", "Than karşılaştırmada kullanılır"],
    examples: [
      { en: "She is more ambitious than her colleagues.", tr: "O meslektaşlarından daha hırslı." },
      { en: "He is the most eloquent speaker in the class.", tr: "O sınıftaki en belagatlı konuşmacı." },
      { en: "Today is hotter than yesterday.", tr: "Bugün dünden daha sıcak." },
    ]
  },
  { 
    id: "modal", title: "Modal Fiiller", emoji: "💭", desc: "Can, Could, Should, Must...",
    formula: "Subject + modal + V1",
    tips: ["Can: yetenek/izin", "Should: tavsiye", "Must/Have to: zorunluluk", "Might/May: olasılık"],
    examples: [
      { en: "You should collaborate with your team.", tr: "Ekibinle iş birliği yapmalısın." },
      { en: "She can negotiate very effectively.", tr: "O çok etkili bir şekilde müzakere edebilir." },
      { en: "You must adapt to new situations.", tr: "Yeni durumlara uyum sağlamalısın." },
    ]
  },
  { 
    id: "question", title: "Soru Cümleleri", emoji: "❓", desc: "Question Forms",
    formula: "Aux + Subject + V1?",
    tips: ["Do/Does geniş zaman sorularında", "Did geçmiş zaman sorularında", "Wh- soruları cümle başına gelir"],
    examples: [
      { en: "Where do you usually have lunch?", tr: "Genellikle öğle yemeğini nerede yersin?" },
      { en: "Did she achieve her goals this year?", tr: "Bu yıl hedeflerine ulaştı mı?" },
      { en: "What are you going to accomplish today?", tr: "Bugün ne başaracaksın?" },
    ]
  },
]

type Message = { role: "user" | "assistant"; content: string }
type WordItem = { word: string; definition_tr: string; example: string }

export default function SentencesPage() {
  const [selectedTopic, setSelectedTopic] = useState<typeof topics[0] | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [tab, setTab] = useState<"learn" | "practice">("learn")
  const [dbWords, setDbWords] = useState<WordItem[]>([])

  const selectTopic = async (topic: typeof topics[0]) => {
    setSelectedTopic(topic)
    setTab("learn")
    setLoading(true)

    const { data } = await supabase
      .from("words")
      .select("word, definition_tr, example")
      .limit(500)

    const randomWords = data
      ? [...data].sort(() => Math.random() - 0.5).slice(0, 6)
      : []

    setDbWords(randomWords)

    const wordList = randomWords
      .map((w: WordItem) => `• ${w.word} (${w.definition_tr})`)
      .join("\n")

    setMessages([{
      role: "assistant",
      content: `Merhaba! 👋 ${topic.title} (${topic.desc}) konusunu seçtin.\n\nVeritabanımızdan seçilen kelimelerle pratik yapabilirsin:\n\n${wordList}\n\nBu kelimelerden birini kullanarak ${topic.title} yapısıyla bir cümle yaz, düzelteyim! ✍️`
    }])
    setLoading(false)
  }

  const sendMessage = async () => {
    if (!input.trim() || loading) return
    const userMsg: Message = { role: "user", content: input }
    const newMessages = [...messages, userMsg]
    setMessages(newMessages)
    setInput("")
    setLoading(true)

    const wordNames = dbWords.map(w => w.word).join(", ")

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages: newMessages,
        system: `Sen bir İngilizce öğretmenisin. Kullanıcı şu an "${selectedTopic?.title} (${selectedTopic?.desc})" konusunu çalışıyor.
        Kullanıcının yazdığı İngilizce cümlelerdeki hataları düzelt ve açıkla.
        Mümkünse şu kelimelerden birini örnek cümlede kullan: ${wordNames}
        Türkçe konuş, örnekleri İngilizce ver. Kısa ve öz ol.`
      }),
    })
    const data = await res.json()
    setMessages(prev => [...prev, { role: "assistant", content: data.message }])
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 p-8">
      <div className="max-w-6xl mx-auto">
        <a href="/" className="text-gray-500 text-sm mb-6 block hover:text-gray-900">← Ana Sayfa</a>
        <h1 className="text-4xl font-bold mb-2">Cümle Yapıları</h1>
        <p className="text-gray-500 mb-8">Bir konu seç, öğren ve AI ile alıştırma yap</p>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          {topics.map(topic => (
            <button
              key={topic.id}
              onClick={() => selectTopic(topic)}
              className={`p-4 rounded-2xl border text-left transition-all ${
                selectedTopic?.id === topic.id
                  ? "bg-purple-600 border-purple-600 text-white"
                  : "bg-white border-gray-200 hover:border-purple-400 text-gray-800"
              }`}
            >
              <div className="text-3xl mb-2">{topic.emoji}</div>
              <div className="font-bold text-sm mb-1">{topic.title}</div>
              <div className={`text-xs ${selectedTopic?.id === topic.id ? "text-purple-200" : "text-gray-400"}`}>{topic.desc}</div>
            </button>
          ))}
        </div>

        {selectedTopic && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* SOL: KONU İÇERİĞİ */}
            <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm">
              <div className="flex gap-3 mb-6">
                <button onClick={() => setTab("learn")} className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${tab === "learn" ? "bg-purple-600 text-white" : "bg-gray-100 text-gray-500"}`}>
                  📖 Öğren
                </button>
                <button onClick={() => setTab("practice")} className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${tab === "practice" ? "bg-purple-600 text-white" : "bg-gray-100 text-gray-500"}`}>
                  ✍️ Alıştırma
                </button>
              </div>

              {tab === "learn" && (
                <div>
                  <div className="bg-purple-50 border border-purple-200 rounded-2xl p-4 mb-4">
                    <p className="text-xs text-purple-500 uppercase tracking-wider mb-1">Formül</p>
                    <p className="text-purple-700 font-bold text-lg">{selectedTopic.formula}</p>
                  </div>
                  <div className="mb-4">
                    <p className="text-xs text-gray-400 uppercase tracking-wider mb-3">💡 İpuçları</p>
                    {selectedTopic.tips.map((tip, i) => (
                      <div key={i} className="flex gap-2 mb-2">
                        <span className="text-purple-400 mt-0.5">•</span>
                        <p className="text-gray-600 text-sm">{tip}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mb-4">
                    <p className="text-xs text-gray-400 uppercase tracking-wider mb-3">📝 Örnek Cümleler</p>
                    {selectedTopic.examples.map((ex, i) => (
                      <div key={i} className="bg-gray-50 border border-gray-100 rounded-xl p-3 mb-2">
                        <p className="text-gray-800 text-sm font-medium mb-1">{ex.en}</p>
                        <p className="text-gray-400 text-xs">🇹🇷 {ex.tr}</p>
                      </div>
                    ))}
                  </div>
                  {dbWords.length > 0 && (
                    <div>
                      <p className="text-xs text-gray-400 uppercase tracking-wider mb-3">🗂️ Veritabanından Kelimeler</p>
                      <div className="grid grid-cols-2 gap-2">
                        {dbWords.map((w, i) => (
                          <button
                            key={i}
                            onClick={() => setInput(`"${w.word}" kelimesini kullanarak ${selectedTopic.title} yapısıyla bir cümle yaz ve düzelt.`)}
                            className="bg-purple-50 border border-purple-100 rounded-xl p-3 text-left hover:border-purple-400 transition-all"
                          >
                            <p className="text-purple-700 font-bold text-sm">{w.word}</p>
                            <p className="text-gray-400 text-xs">{w.definition_tr}</p>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {tab === "practice" && (
                <div>
                  <p className="text-gray-500 text-sm mb-4">Türkçe cümleyi İngilizceye çevir, AI kontrol etsin!</p>
                  {selectedTopic.examples.map((ex, i) => (
                    <div key={i} className="bg-gray-50 border border-gray-100 rounded-xl p-4 mb-3">
                      <p className="text-xs text-gray-400 mb-2">Bu cümleyi İngilizceye çevir:</p>
                      <p className="text-gray-800 text-sm font-medium mb-3">🇹🇷 {ex.tr}</p>
                      <button
                        onClick={() => setInput(`Bu Türkçe cümleyi İngilizceye çevirdim, kontrol eder misin? Türkçesi: "${ex.tr}" - Benim çevirim: `)}
                        className="text-xs bg-purple-100 hover:bg-purple-200 text-purple-700 px-3 py-1 rounded-lg transition-colors"
                      >
                        Çeviriyi AI'ya sor →
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* SAĞ: AI CHAT */}
            <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm flex flex-col" style={{height: "600px"}}>
              <h3 className="font-bold mb-4 text-gray-700">🤖 AI Öğretmen — {selectedTopic.title}</h3>
              <div className="flex-1 overflow-y-auto space-y-3 mb-4">
                {messages.map((msg, i) => (
                  <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-xs px-4 py-3 rounded-2xl text-sm whitespace-pre-line ${
                      msg.role === "user" ? "bg-purple-600 text-white" : "bg-gray-100 text-gray-800"
                    }`}>
                      {msg.content}
                    </div>
                  </div>
                ))}
                {loading && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 px-4 py-3 rounded-2xl text-sm text-gray-400">✍️ Yazıyor...</div>
                  </div>
                )}
              </div>
              <div className="flex gap-2">
                <input
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && sendMessage()}
                  placeholder="Cümle yaz veya soru sor..."
                  className="flex-1 p-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:border-purple-400"
                />
                <button onClick={sendMessage} disabled={loading} className="bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white px-4 rounded-xl transition-colors">→</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
