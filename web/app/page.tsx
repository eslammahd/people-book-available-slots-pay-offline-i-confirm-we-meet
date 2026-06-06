import Link from 'next/link'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-sky-50 to-white">
      <nav className="px-6 py-4 flex justify-between items-center border-b border-sky-100">
        <span className="text-xl font-bold text-sky-700">Dr. Saad Therapy</span>
      </nav>
      <section className="max-w-4xl mx-auto px-6 py-24 text-center">
        <h1 className="text-5xl font-bold text-slate-800 mb-6 leading-tight">
          Professional Therapy,<br />
          <span className="text-sky-600">On Your Schedule</span>
        </h1>
        <p className="text-xl text-slate-500 mb-10 max-w-2xl mx-auto">
          Book a confidential therapy session with Dr. Saad. Choose your preferred time, share your details, and pay securely via Vodafone Cash.
        </p>
        <Link href="/book" className="inline-block bg-sky-600 hover:bg-sky-700 text-white font-semibold px-10 py-4 rounded-xl text-lg transition-colors shadow-lg shadow-sky-200">
          Book Now
        </Link>
      </section>
      <section className="max-w-4xl mx-auto px-6 pb-24 grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { step: '1', title: 'Choose a slot', desc: 'Browse available therapy sessions and pick a time that works for you.' },
          { step: '2', title: 'Share your details', desc: 'Enter your name, email, and phone number to confirm your booking.' },
          { step: '3', title: 'Pay offline', desc: 'Send payment via Vodafone Cash and Dr. Saad will confirm your session.' },
        ].map((item) => (
          <div key={item.step} className="bg-white rounded-2xl p-6 shadow-sm border border-sky-100">
            <div className="w-10 h-10 bg-sky-100 text-sky-700 rounded-full flex items-center justify-center font-bold text-lg mb-4">{item.step}</div>
            <h3 className="font-semibold text-slate-800 text-lg mb-2">{item.title}</h3>
            <p className="text-slate-500">{item.desc}</p>
          </div>
        ))}
      </section>
    </main>
  )
}
