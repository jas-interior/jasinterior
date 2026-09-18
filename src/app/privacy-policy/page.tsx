import MainLayout from '@/components/layout/MainLayout'

export const metadata = {
  title: 'Privacy Policy | JAS INTERIOR',
}

export default function PrivacyPolicyPage() {
  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="section-title mb-8">Privacy Policy</h1>
        <div className="prose-gold space-y-6 text-[#555555]">
          <p>Last updated: {new Date().toLocaleDateString()}</p>
          <h2 className="text-xl text-[#111111] font-semibold mt-8 mb-4">1. Information We Collect</h2>
          <p>At JAS INTERIOR, we collect information that you provide directly to us when you make a purchase, send an inquiry, or communicate with us via phone or WhatsApp. This includes your name, shipping address, mobile number, and email address.</p>
          
          <h2 className="text-xl text-[#111111] font-semibold mt-8 mb-4">2. How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Process and fulfill your custom furniture orders</li>
            <li>Communicate with you regarding your order status, delivery, and inquiries</li>
            <li>Provide customer support</li>
            <li>Send you updates or promotional offers (only if you have opted in)</li>
          </ul>

          <h2 className="text-xl text-[#111111] font-semibold mt-8 mb-4">3. Information Sharing</h2>
          <p>We do not sell, rent, or trade your personal information to third parties. We only share necessary details with trusted delivery partners solely for the purpose of delivering your furniture to your location in Gujarat.</p>

          <h2 className="text-xl text-[#111111] font-semibold mt-8 mb-4">4. Payment Security</h2>
          <p>All online payments are processed securely through Razorpay. We do not store your credit card or bank account details on our servers.</p>

          <h2 className="text-xl text-[#111111] font-semibold mt-8 mb-4">5. Contact Us</h2>
          <p>If you have any questions about this Privacy Policy, please contact us at 8866531993 or visit our showroom at Shop No. 1, Maa Complex, Near Uma Char Rasta, Waghodiya Road, Vadodara, Gujarat.</p>
        </div>
      </div>
    </MainLayout>
  )
}
