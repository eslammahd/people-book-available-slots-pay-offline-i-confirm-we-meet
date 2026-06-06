import Link from 'next/link'

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-brand-700 to-brand-900 text-white">
        <div className="max-w-5xl mx-auto px-6 py-24 md:py-36">
          <div className="max-w-2xl">
            <span className="inline-block bg-brand-500/30 text-brand-100 text-sm font-medium px-3 py-1 rounded-full mb-6">
              Professional Therapy Services
            </span>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
              A safe space to
              <span className="text-brand-300"> heal and grow</span>
            </h1>
            <p className="text-lg text-brand-100 mb-10 leading-relaxed">
              Book a confidential, one-on-one therapy session with Dr. Saad.
              Choose a time that works for you and pay at your convenience via Vodafone Cash.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/book"
                className="inline-flex items-center justify-center bg-white text-brand-700 hover:bg-brand-50 font-semibold px-8 py-4 rounded-xl text-lg transition-colors shadow-lg"
              >
                Book Now
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <a
                href="#how-it-works"
                className="inline-flex items-center justify-center border border-brand-400 text-brand-100 hover:bg-brand-600/50 font-medium px-8 py-4 rounded-xl text-lg transition-colors"
              >
                How it works
              </a>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-20 -right-20 w-96 h-96 bg-brand-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-brand-400/10 rounded-full blur-2xl" />
        </div>
      </section>

      {/* Trust signals */}
      <section className="bg-white border-b border-slate-100">
        <div className="max-w-5xl mx-auto px-6 py-10 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-3xl font-bold text-brand-700 mb-1">100%</div>
            <div className="text-slate-500 text-sm">Confidential sessions</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-brand-700 mb-1">60 min</div>
            <div className="text-slate-500 text-sm">Per therapy session</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-brand-700 mb-1">Flexible</div>
            <div className="text-slate-500 text-sm">Offline payment via Vodafone Cash</div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="max-w-5xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-center text-slate-800 mb-4">How it works</h2>
        <p className="text-center text-slate-500 mb-14">Three simple steps to your first session</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              step: '01',
              title: 'Choose a slot',
              desc: 'Browse available therapy slots and pick a date and time that suits your schedule.',
              icon: '🗓️',
            },
            {
              step: '02',
              title: 'Submit your details',
              desc: 'Enter your name, email, and phone number. No account needed — it takes under a minute.',
              icon: '📝',
            },
            {
              step: '03',
              title: 'Pay & confirm',
              desc: 'Send payment via Vodafone Cash. Dr. Saad will confirm your booking and you are all set.',
              icon: '✅',
            },
          ].map((item) => (
            <div key={item.step} className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
              <div className="text-3xl mb-4">{item.icon}</div>
              <div className="text-xs font-bold text-brand-500 uppercase tracking-widest mb-2">
                Step {item.step}
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-3">{item.title}</h3>
              <p className="text-slate-500 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
        <div className="mt-14 text-center">
          <Link
            href="/book"
            className="inline-flex items-center justify-center bg-brand-600 hover:bg-brand-700 text-white font-semibold px-10 py-4 rounded-xl text-lg transition-colors shadow-md"
          >
            Book Now
          </Link>
        </div>
      </section>

      {/* About */}
      <section className="bg-brand-50 border-t border-brand-100">
        <div className="max-w-5xl mx-auto px-6 py-20">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-20 h-20 bg-brand-200 rounded-full flex items-center justify-center text-3xl mx-auto mb-6">
              🧠
            </div>
            <h2 className="text-3xl font-bold text-slate-800 mb-4">Dr. Saad</h2>
            <p className="text-slate-600 leading-relaxed">
              A licensed therapist committed to helping individuals navigate life's challenges.
              Sessions are held in a warm, non-judgmental environment where you can speak freely
              and work toward meaningful change.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
