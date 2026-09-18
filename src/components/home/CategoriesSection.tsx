import Link from 'next/link'
import { ArrowRight, Armchair, BedDouble, Columns, Utensils, Monitor, Bed, Coffee, Plus } from 'lucide-react'

const categories = [
  { name: 'Sofa', slug: 'sofa', icon: Armchair, desc: 'Custom comfort sofas' },
  { name: 'Bed', slug: 'bed', icon: BedDouble, desc: 'Premium bedroom beds' },
  { name: 'Wardrobe', slug: 'wardrobe', icon: Columns, desc: 'Space-saving wardrobes' },
  { name: 'Dining Table', slug: 'dining-table', icon: Utensils, desc: 'Elegant dining sets' },
  { name: 'TV Unit', slug: 'tv-unit', icon: Monitor, desc: 'Modern entertainment units' },
  { name: 'Mattress', slug: 'mattress', icon: Bed, desc: 'Premium sleep mattresses' },
  { name: 'T Table', slug: 't-table', icon: Coffee, desc: 'Stylish center tables' },
]

export default function CategoriesSection() {
  return (
    <section className="py-24 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-8 h-[1px] bg-[#c8941a]" /><span className="text-xs text-[#c8941a] font-medium uppercase tracking-[0.2em]">Our Collections</span><div className="w-8 h-[1px] bg-[#c8941a]" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-[#111111] mb-4" style={{fontFamily:'Playfair Display,serif'}}>Explore By Category</h2>
          <p className="text-[#666666] max-w-xl mx-auto font-light">Discover our extensive range of premium custom furniture, meticulously crafted to elevate your living spaces.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {categories.map((cat, i) => (
            <Link key={cat.slug} href={`/shop/${cat.slug}`} className="group relative bg-[#faf9f6] border border-[#eaeaea] p-8 flex flex-col items-center text-center transition-all duration-500 hover:bg-white hover:border-[#c8941a]/30 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)]" style={{ animationDelay: `${i * 0.05}s` }}>
              <div className="w-14 h-14 rounded-full bg-white border border-[#eaeaea] group-hover:border-[#c8941a]/30 flex items-center justify-center mb-6 group-hover:-translate-y-2 transition-all duration-500 shadow-sm group-hover:shadow-md">
                <cat.icon size={24} strokeWidth={1.5} className="text-[#111111] group-hover:text-[#c8941a] transition-colors" />
              </div>
              <h3 className="font-serif text-lg font-semibold text-[#111111] mb-2 tracking-wide" style={{fontFamily:'Playfair Display,serif'}}>{cat.name}</h3>
              <p className="text-xs text-[#666666] mb-6 font-light">{cat.desc}</p>
              
              <div className="mt-auto overflow-hidden">
                <span className="text-[10px] text-[#c8941a] uppercase tracking-widest flex items-center gap-2 transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  Explore <ArrowRight size={12} />
                </span>
              </div>
              
              {/* Premium Corner Accent */}
              <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-transparent group-hover:border-[#c8941a]/20 transition-colors duration-500" />
            </Link>
          ))}
          
          <Link href="/shop" className="group bg-[#111111] p-8 flex flex-col items-center justify-center text-center transition-all duration-500 hover:bg-[#1a1a1a]">
            <div className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:border-[#c8941a]/50 transition-all duration-500">
              <Plus size={24} strokeWidth={1} className="text-white group-hover:text-[#c8941a]" />
            </div>
            <h3 className="font-serif text-lg font-semibold text-white mb-2 tracking-wide" style={{fontFamily:'Playfair Display,serif'}}>View All</h3>
            <p className="text-xs text-[#a0a0a0] font-light">Explore complete catalog</p>
          </Link>
        </div>
      </div>
    </section>
  )
}
