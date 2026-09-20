'use client'
import { useState } from 'react'
import toast from 'react-hot-toast'

export default function ContactForm() {
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    name: '',
    mobile: '',
    email: '',
    subject: '',
    message: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.mobile) {
      toast.error('Name and mobile number are required')
      return
    }
    if (!/^[6-9]\d{9}$/.test(form.mobile)) {
      toast.error('Enter a valid 10-digit mobile number')
      return
    }

    setLoading(true)
    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          mobile: form.mobile,
          email: form.email,
          message: `SUBJECT: ${form.subject}\n\n${form.message}`,
          inquiry_type: 'general',
          category: 'Contact Form'
        }),
      })
      const data = await res.json()
      if (data.success) {
        toast.success('Message sent successfully!')
        setForm({ name: '', mobile: '', email: '', subject: '', message: '' })
      } else {
        toast.error(data.error || 'Failed to send message')
      }
    } catch {
      toast.error('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-xs text-[#555555] font-medium mb-1.5">Full Name</label>
          <input 
            type="text" 
            name="name"
            value={form.name}
            onChange={handleChange}
            className="input-gold" 
            placeholder="John Doe" 
            required
          />
        </div>
        <div>
          <label className="block text-xs text-[#555555] font-medium mb-1.5">Mobile Number</label>
          <input 
            type="tel" 
            name="mobile"
            value={form.mobile}
            onChange={handleChange}
            className="input-gold" 
            placeholder="10-digit number" 
            required
          />
        </div>
      </div>
      <div>
        <label className="block text-xs text-[#555555] font-medium mb-1.5">Email Address</label>
        <input 
          type="email" 
          name="email"
          value={form.email}
          onChange={handleChange}
          className="input-gold" 
          placeholder="john@example.com" 
        />
      </div>
      <div>
        <label className="block text-xs text-[#555555] font-medium mb-1.5">Subject</label>
        <input 
          type="text" 
          name="subject"
          value={form.subject}
          onChange={handleChange}
          className="input-gold" 
          placeholder="How can we help?" 
        />
      </div>
      <div>
        <label className="block text-xs text-[#555555] font-medium mb-1.5">Message</label>
        <textarea 
          rows={5} 
          name="message"
          value={form.message}
          onChange={handleChange}
          className="input-gold resize-none" 
          placeholder="Your message here..." 
        />
      </div>
      <button 
        type="submit" 
        disabled={loading}
        className="w-full py-4 rounded-xl btn-gold font-semibold disabled:opacity-70"
      >
        {loading ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  )
}
