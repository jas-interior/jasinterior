import MainLayout from '@/components/layout/MainLayout'

export const metadata = { title: 'Terms & Conditions | JAS INTERIOR' }

export default function TermsConditionsPage() {
  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="section-title mb-8">Terms & Conditions</h1>
        <div className="prose-gold space-y-6 text-[#555555]">
          <h2 className="text-xl text-[#111111] font-semibold mt-8 mb-4">1. Acceptance of Terms</h2>
          <p>By accessing and using the JAS INTERIOR website, you accept and agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our website or services.</p>

          <h2 className="text-xl text-[#111111] font-semibold mt-8 mb-4">2. Product Descriptions and Customization</h2>
          <p>We make every effort to display our furniture accurately. However, because our furniture is custom-made, slight variations in wood grain, fabric texture, and finish color may occur. These variations are normal and are not considered defects.</p>
          <p>When you provide custom dimensions or design requirements, you are responsible for ensuring that the furniture will fit through your doors, hallways, and into your desired room.</p>

          <h2 className="text-xl text-[#111111] font-semibold mt-8 mb-4">3. Pricing</h2>
          <p>Prices on our website are subject to change without notice. If a product shows "Price on Request", it means the price will be determined based on your specific customization requirements.</p>
          <p><strong>Delivery charges are not included in product prices and will be billed separately.</strong></p>

          <h2 className="text-xl text-[#111111] font-semibold mt-8 mb-4">4. Payment Terms</h2>
          <p>For standard orders placed through the website, full payment is required via our secure payment gateway (Razorpay). For highly customized offline orders discussed via WhatsApp or phone, a minimum advance payment of 50% is required before production begins, with the balance due before or at the time of delivery.</p>

          <h2 className="text-xl text-[#111111] font-semibold mt-8 mb-4">5. Intellectual Property</h2>
          <p>All content on this website, including logos (JAS INTERIOR), images, text, and designs, is the property of JAS INTERIOR and is protected by copyright laws.</p>
        </div>
      </div>
    </MainLayout>
  )
}
