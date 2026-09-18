import MainLayout from '@/components/layout/MainLayout'

export const metadata = { title: 'Refund & Cancellation | JAS INTERIOR' }

export default function RefundCancellationPage() {
  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="section-title mb-8">Refund & Cancellation Policy</h1>
        <div className="prose-gold space-y-6 text-[#555555]">
          <h2 className="text-xl text-[#111111] font-semibold mt-8 mb-4">1. Order Cancellation</h2>
          <p>Because JAS INTERIOR specializes in <strong>custom, made-to-order furniture</strong>, the following cancellation rules apply:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Within 24 Hours:</strong> You may cancel your order within 24 hours of placement for a full refund.</li>
            <li><strong>After 24 Hours:</strong> Once production has begun (which usually starts 24 hours after order confirmation), cancellations are generally <strong>not permitted</strong>. The materials for your specific custom piece have already been cut and prepared.</li>
            <li>If an exception is made to cancel an order after production has started, a cancellation fee of up to 40% of the order value may be deducted to cover material and labor costs.</li>
          </ul>

          <h2 className="text-xl text-[#111111] font-semibold mt-8 mb-4">2. Refunds and Returns</h2>
          <p>We do not accept returns or provide refunds for custom-made furniture simply due to a change of mind.</p>
          <p>If the furniture delivered to you has a manufacturing defect or was damaged during transit by our delivery partners, please contact us immediately (within 24 hours of delivery) with photographic evidence. We will repair the defect or replace the item at our discretion.</p>

          <h2 className="text-xl text-[#111111] font-semibold mt-8 mb-4">3. Refund Processing</h2>
          <p>For eligible cancellations (within 24 hours) or approved refunds, the amount will be processed back to your original method of payment (e.g., via Razorpay) within 5 to 7 business days.</p>
        </div>
      </div>
    </MainLayout>
  )
}
