import MainLayout from '@/components/layout/MainLayout'

export const metadata = { title: 'Shipping & Delivery Policy | JAS INTERIOR' }

export default function ShippingDeliveryPage() {
  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="section-title mb-8">Shipping & Delivery Policy</h1>
        <div className="prose-gold space-y-6 text-[#555555]">
          <h2 className="text-xl text-[#111111] font-semibold mt-8 mb-4">1. Service Area</h2>
          <p>JAS INTERIOR manufactures and delivers premium custom furniture exclusively within the state of <strong>Gujarat, India</strong>. We do not currently ship orders outside of Gujarat.</p>

          <h2 className="text-xl text-[#111111] font-semibold mt-8 mb-4">2. Delivery Charges</h2>
          <p><strong>Delivery charges are always extra and are not included in the product price shown on the website.</strong> Because furniture is bulky and requires specialized transport, delivery costs vary significantly based on your exact location in Gujarat and the size/weight of your order.</p>
          <p>After you place an order, our team will contact you to confirm the exact delivery charge. You can pay this charge directly at the time of delivery or as advised by our support team.</p>

          <h2 className="text-xl text-[#111111] font-semibold mt-8 mb-4">3. Production & Delivery Timelines</h2>
          <p>Since we manufacture custom and made-to-order furniture, our standard timelines are:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Production Time:</strong> 10 to 21 business days, depending on the complexity of the custom design and materials required.</li>
            <li><strong>Delivery Time:</strong> 2 to 5 business days after production is completed.</li>
          </ul>
          <p>Our team will keep you updated on the manufacturing progress and coordinate a suitable delivery date with you once the furniture is ready.</p>

          <h2 className="text-xl text-[#111111] font-semibold mt-8 mb-4">4. Installation</h2>
          <p>If your furniture requires assembly (e.g., large beds or wardrobes), our delivery personnel or specialized installation team will handle the assembly at your location. Installation services may incur additional charges, which will be discussed with you prior to delivery.</p>
        </div>
      </div>
    </MainLayout>
  )
}
