export default function Home() {
  return (
    <div className="min-h-screen bg-white text-gray-900">

      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 bg-white bg-opacity-90 backdrop-blur border-b border-gray-100 px-8 py-4 flex items-center justify-between z-50">
        <img src="/lexify-logo.svg" alt="Lexify" className="h-10" />
        <div className="flex gap-6">
          <a href="/words" className="text-gray-500 hover:text-purple-600 font-medium text-sm transition-colors">Kelimeler</a>
          <a href="/quiz" className="text-gray-500 hover:text-purple-600 font-medium text-sm transition-colors">Quiz</a>
          <a href="/sentences" className="text-gray-500 hover:text-purple-600 font-medium text-sm transition-colors">Cümle Yapıları</a>
          <a href="/chat" className="text-gray-500 hover:text-purple-600 font-medium text-sm transition-colors">AI Asistan</a>
        </div>
        <a href="/quiz" className="bg-purple-600 hover:bg-purple-700 text-white text-sm font-bold px-5 py-2 rounded-xl transition-all">
          Hemen Başla →
        </a>
      </nav>

      {/* HERO */}
      <div className="pt-32 pb-24 px-8 text-center max-w-5xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-purple-50 text-purple-600 text-xs font-bold px-4 py-2 rounded-full mb-8 border border-purple-100">
          🎓 CEFR A2 → C1 · 900+ Kelime · AI Destekli
        </div>
        <h2 className="text-7xl font-black mb-6 leading-tight tracking-tight">
          İngilizce Öğrenmek<br/>
          <span className="bg-gradient-to-r from-purple-600 via-violet-500 to-cyan-500 bg-clip-text text-transparent">
            Hiç Bu Kadar Kolay
          </span><br/>
          Olmamıştı.
        </h2>
        <p className="text-gray-500 text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
          900+ kelime, interaktif quizler, gramer konuları ve Groq AI destekli öğrenme asistanı ile İngilizceni bir üst seviyeye taşı.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <a href="/words" className="bg-purple-600 hover:bg-purple-700 text-white font-bold px-8 py-4 rounded-2xl transition-all shadow-lg shadow-purple-200 text-lg">
            Kelimelere Bak →
          </a>
          <a href="/quiz" className="bg-gray-900 hover:bg-gray-800 text-white font-bold px-8 py-4 rounded-2xl transition-all text-lg">
            Quiz Çöz 🎮
          </a>
        </div>

        {/* FLOATING BADGES */}
        <div className="flex justify-center gap-3 mt-8 flex-wrap">
          {["📚 A2 Başlangıç", "🎯 B1 Orta", "💜 B2 Üst Orta", "🏆 C1 İleri"].map(badge => (
            <span key={badge} className="bg-gray-50 border border-gray-200 text-gray-600 text-xs font-medium px-4 py-2 rounded-full">
              {badge}
            </span>
          ))}
        </div>
      </div>

      {/* STATS */}
      <div className="bg-gray-50 border-y border-gray-100 py-12 px-8">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { num: "900+", label: "Toplam Kelime", emoji: "📚" },
            { num: "4", label: "CEFR Seviyesi", emoji: "🎯" },
            { num: "15", label: "Gramer Konusu", emoji: "✍️" },
            { num: "AI", label: "Destekli Asistan", emoji: "🤖" },
          ].map((s) => (
            <div key={s.label}>
              <div className="text-3xl mb-2">{s.emoji}</div>
              <div className="text-4xl font-black text-purple-600 mb-1">{s.num}</div>
              <div className="text-gray-500 text-sm">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* FEATURES */}
      <div className="max-w-5xl mx-auto px-8 py-24">
        <div className="text-center mb-16">
          <h3 className="text-4xl font-black mb-4">Her Şey Tek Bir Yerde</h3>
          <p className="text-gray-500 text-lg">İngilizce öğrenmek için ihtiyacın olan her şey burada.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <a href="/words" className="group bg-gradient-to-br from-purple-50 to-violet-50 border border-purple-100 rounded-3xl p-8 hover:shadow-xl hover:shadow-purple-100 transition-all">
            <div className="text-5xl mb-4">📚</div>
            <h4 className="text-2xl font-bold mb-2 group-hover:text-purple-600 transition-colors">Kelime Hazinesi</h4>
            <p className="text-gray-500 mb-4">A2'den C1'e kadar 900+ kelimeyi Türkçe anlamları ve örnek cümlelerle öğren. Seviyene göre filtrele.</p>
            <span className="text-purple-600 font-bold text-sm">Kelimelere Bak →</span>
          </a>
          <a href="/quiz" className="group bg-gradient-to-br from-cyan-50 to-blue-50 border border-cyan-100 rounded-3xl p-8 hover:shadow-xl hover:shadow-cyan-100 transition-all">
            <div className="text-5xl mb-4">🎮</div>
            <h4 className="text-2xl font-bold mb-2 group-hover:text-cyan-600 transition-colors">Interaktif Quiz</h4>
            <p className="text-gray-500 mb-4">Her girişte farklı 20 soru ile kendini test et. Seviye seç, skorunu takip et, gelişimini gör.</p>
            <span className="text-cyan-600 font-bold text-sm">Quiz Çöz →</span>
          </a>
          <a href="/sentences" className="group bg-gradient-to-br from-green-50 to-emerald-50 border border-green-100 rounded-3xl p-8 hover:shadow-xl hover:shadow-green-100 transition-all">
            <div className="text-5xl mb-4">✍️</div>
            <h4 className="text-2xl font-bold mb-2 group-hover:text-green-600 transition-colors">Cümle Yapıları</h4>
            <p className="text-gray-500 mb-4">15 farklı gramer konusunu öğren. Simple Present'tan Future Perfect'e kadar her yapıyı AI ile pratik yap.</p>
            <span className="text-green-600 font-bold text-sm">Gramer Öğren →</span>
          </a>
          <a href="/chat" className="group bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-100 rounded-3xl p-8 hover:shadow-xl hover:shadow-amber-100 transition-all">
            <div className="text-5xl mb-4">🤖</div>
            <h4 className="text-2xl font-bold mb-2 group-hover:text-amber-600 transition-colors">AI Öğretmen</h4>
            <p className="text-gray-500 mb-4">Groq AI destekli asistanına cümle yaz, anında düzeltme al. Kelime sor, gramer soruları sor.</p>
            <span className="text-amber-600 font-bold text-sm">AI ile Konuş →</span>
          </a>
        </div>
      </div>

      {/* CEFR SEVİYELERİ */}
      <div className="bg-gray-50 border-y border-gray-100 py-24 px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-black mb-4">Seviyene Göre Öğren</h3>
            <p className="text-gray-500 text-lg">Başlangıçtan ileri seviyeye kadar her adımda yanındayız.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { level: "A2", title: "Başlangıç", desc: "Temel kelimeler ve günlük ifadeler", color: "from-green-400 to-emerald-500", words: "~200 kelime" },
              { level: "B1", title: "Orta Altı", desc: "Yaygın konular ve iletişim", color: "from-cyan-400 to-blue-500", words: "~250 kelime" },
              { level: "B2", title: "Orta Üstü", desc: "Karmaşık konular ve tartışma", color: "from-purple-400 to-violet-500", words: "~250 kelime" },
              { level: "C1", title: "İleri", desc: "Akademik ve profesyonel dil", color: "from-amber-400 to-orange-500", words: "~200 kelime" },
            ].map((l) => (
              <a href="/words" key={l.level} className="bg-white border border-gray-200 rounded-2xl p-6 text-center hover:shadow-lg transition-all group">
                <div className={`bg-gradient-to-br ${l.color} text-white text-2xl font-black px-4 py-3 rounded-xl inline-block mb-4`}>{l.level}</div>
                <div className="font-bold text-gray-800 mb-1">{l.title}</div>
                <div className="text-gray-400 text-xs mb-2">{l.desc}</div>
                <div className="text-purple-600 text-xs font-bold">{l.words}</div>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="py-24 px-8 text-center">
        <div className="max-w-2xl mx-auto">
          <h3 className="text-5xl font-black mb-6">Hemen Başla 🚀</h3>
          <p className="text-gray-500 text-lg mb-10">Ücretsiz, kayıt gerektirmez. Hemen öğrenmeye başla.</p>
          <div className="flex gap-4 justify-center">
            <a href="/words" className="bg-purple-600 hover:bg-purple-700 text-white font-bold px-10 py-5 rounded-2xl transition-all shadow-lg shadow-purple-200 text-lg">
              Kelimeleri Keşfet →
            </a>
            <a href="/quiz" className="bg-gray-900 hover:bg-gray-800 text-white font-bold px-10 py-5 rounded-2xl transition-all text-lg">
              Quiz Çöz 🎮
            </a>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="border-t border-gray-100 py-8 px-8">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-cyan-500 bg-clip-text text-transparent">LEXIFY</h1>
          <p className="text-gray-400 text-sm">İngilizce Kelime Öğrenme Platformu · A2 · B1 · B2 · C1</p>
          <div className="flex gap-4">
            <a href="/words" className="text-gray-400 hover:text-gray-600 text-sm">Kelimeler</a>
            <a href="/quiz" className="text-gray-400 hover:text-gray-600 text-sm">Quiz</a>
            <a href="/sentences" className="text-gray-400 hover:text-gray-600 text-sm">Gramer</a>
          </div>
        </div>
      </footer>

    </div>
  )
}