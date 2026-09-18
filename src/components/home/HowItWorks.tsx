const steps = [
  { num: '01', title: 'Choose a Product', desc: 'Browse our collection or start with a custom requirement.' },
  { num: '02', title: 'Customize Your Requirement', desc: 'Share your preferred size, design, colour, material and any special needs.' },
  { num: '03', title: 'Confirm Order', desc: 'Review your order details and confirm with our support team.' },
  { num: '04', title: 'Production', desc: 'Our skilled craftsmen manufacture your furniture with precision.' },
  { num: '05', title: 'Delivery', desc: 'Your furniture is carefully delivered to your location in Gujarat.' },
]

export default function HowItWorks() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 mb-3">
            <div className="w-8 h-px bg-[#c8941a]" /><span className="text-xs text-[#c8941a] font-semibold uppercase tracking-widest">Process</span><div className="w-8 h-px bg-[#c8941a]" />
          </div>
          <h2 className="section-title">How It Works</h2>
        </div>
        <div className="relative">
          <div className="absolute top-8 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c8941a]/30 to-transparent hidden lg:block" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {steps.map((step) => (
              <div key={step.num} className="relative flex flex-col items-center text-center">
                <div className="relative z-10 w-16 h-16 rounded-full bg-white border border-[#c8941a]/40 flex items-center justify-center mb-4 shadow-lg">
                  <span className="text-lg font-bold" style={{ background:'linear-gradient(135deg,#c8941a,#e9a825)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>{step.num}</span>
                </div>
                <h4 className="font-serif font-semibold text-[#111111] mb-2" style={{fontFamily:'Playfair Display,serif'}}>{step.title}</h4>
                <p className="text-xs text-[#666666] leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
