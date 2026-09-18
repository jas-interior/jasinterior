'use client'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Save } from 'lucide-react'
import toast from 'react-hot-toast'

export default function AdminSettings() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [settings, setSettings] = useState<Record<string, string>>({})

  useEffect(() => {
    const loadData = async () => {
      const supabase = createClient()
      const { data } = await supabase.from('site_settings').select('*')
      if (data) {
        const obj: Record<string, string> = {}
        data.forEach(item => { obj[item.key] = item.value || '' })
        setSettings(obj)
      }
      setLoading(false)
    }
    loadData()
  }, [])

  const handleChange = (key: string, value: string) => {
    setSettings(prev => ({ ...prev, [key]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    const toastId = toast.loading('Saving settings...')

    try {
      const supabase = createClient()
      
      // Upsert each setting
      const promises = Object.entries(settings).map(([key, value]) => 
        supabase.from('site_settings').upsert({ key, value }, { onConflict: 'key' })
      )
      
      await Promise.all(promises)
      toast.success('Settings updated successfully', { id: toastId })
    } catch (err: any) {
      toast.error('Failed to save settings', { id: toastId })
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <div className="p-8">Loading settings...</div>

  return (
    <div className="max-w-4xl mx-auto pb-20">
      <h1 className="text-2xl font-bold text-[#111111] mb-8">Site Settings</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white border border-[#eaeaea] p-6 rounded-2xl space-y-4">
          <h2 className="text-lg font-semibold text-[#111111] mb-4">General Info</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-[#555] mb-1">Brand Name</label>
              <input type="text" value={settings['brand_name'] || ''} onChange={e => handleChange('brand_name', e.target.value)} className="input-gold" />
            </div>
            <div>
              <label className="block text-xs text-[#555] mb-1">Tagline</label>
              <input type="text" value={settings['tagline'] || ''} onChange={e => handleChange('tagline', e.target.value)} className="input-gold" />
            </div>
          </div>
        </div>

        <div className="bg-white border border-[#eaeaea] p-6 rounded-2xl space-y-4">
          <h2 className="text-lg font-semibold text-[#111111] mb-4">Contact Details</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-[#555] mb-1">Support Phone Number</label>
              <input type="text" value={settings['support_number'] || ''} onChange={e => handleChange('support_number', e.target.value)} className="input-gold" />
            </div>
            <div>
              <label className="block text-xs text-[#555] mb-1">WhatsApp Number (with country code)</label>
              <input type="text" value={settings['whatsapp_number'] || ''} onChange={e => handleChange('whatsapp_number', e.target.value)} className="input-gold" placeholder="e.g. 918866531993" />
            </div>
            <div>
              <label className="block text-xs text-[#555] mb-1">Contact Shahwaj</label>
              <input type="text" value={settings['contact_shahwaj'] || ''} onChange={e => handleChange('contact_shahwaj', e.target.value)} className="input-gold" />
            </div>
            <div>
              <label className="block text-xs text-[#555] mb-1">Contact Akash</label>
              <input type="text" value={settings['contact_akash'] || ''} onChange={e => handleChange('contact_akash', e.target.value)} className="input-gold" />
            </div>
          </div>
          <div>
            <label className="block text-xs text-[#555] mb-1">Full Address</label>
            <textarea rows={2} value={settings['address'] || ''} onChange={e => handleChange('address', e.target.value)} className="input-gold resize-none" />
          </div>
        </div>

        <button type="submit" disabled={saving} className="w-full flex items-center justify-center gap-2 py-4 rounded-xl btn-gold font-semibold text-lg">
          <Save size={20} /> {saving ? 'Saving...' : 'Save Settings'}
        </button>
      </form>
    </div>
  )
}
