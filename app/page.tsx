import Link from 'next/link'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-teal-50 to-white">
      <nav className="px-6 py-4 flex justify-between items-center max-w-5xl mx-auto">
        <span className="text-teal-700 font-bold text-lg">Dr. Saad Therapy</span>
        <Link href="/book" className="bg-teal-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-teal-700 transition">
          Book Now
        </Link>
      </nav>
      <section className="max-w-3xl mx-auto px-6 pt-20 pb-16 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
          Begin Your Journey to <span className="text-teal-600">Better Mental Health</span>
        </h1>
        <p className="text-lg text-gray-600 mb-10 max-w-xl mx-auto">
          Book a therapy session with Dr. Saad in minutes. Choose a time that works for you and pay conveniently via Vodafone Cash.
        </p>
        <Link href="/book" className="inline-block bg-teal-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-teal-700 transition shadow-lg">
          Book Now
        </Link>
      </section>
      <section className="max-w-4xl mx-auto px-6 pb-20">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-10">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[{step:'1',title:'Pick a Slot',desc:'Browse available therapy slots and choose a time that suits you.'},{step:'2',title:'Enter Your Details',desc:'Provide your name, email, and phone to confirm your booking.'},{step:'3',title:'Pay & Meet',desc:'Pay via Vodafone Cash after booking. Dr. Saad will confirm and meet you.'}].map((item) => (
            <div key={item.step} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center">
              <div className="w-12 h-12 bg-teal-100 text-teal-700 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">{item.step}</div>
              <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-gray-500 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
