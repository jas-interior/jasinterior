'use client'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Search, X, Inbox, Star, Clock, User, Phone, MapPin, Mail, MessageSquare, Trash2 } from 'lucide-react'
import toast from 'react-hot-toast'

function formatDateShort(dateString: string) {
  const date = new Date(dateString);
  const now = new Date();
  const isToday = date.getDate() === now.getDate() && date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
  
  if (isToday) {
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
  }
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

export default function AdminInquiries() {
  const [inquiries, setInquiries] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [selectedInquiry, setSelectedInquiry] = useState<any | null>(null)

  const loadData = async () => {
    setLoading(true)
    const supabase = createClient()
    const { data } = await supabase.from('inquiries').select('*').order('created_at', { ascending: false })
    if (data) setInquiries(data)
    setLoading(false)
  }

  useEffect(() => { loadData() }, [])

  const updateStatus = async (id: string, status: string, e?: React.ChangeEvent<HTMLSelectElement>) => {
    if (e) e.stopPropagation();
    
    const supabase = createClient()
    const toastId = toast.loading('Updating...')
    const { error } = await supabase.from('inquiries').update({ status }).eq('id', id)
    if (error) toast.error(error.message, { id: toastId })
    else { 
      toast.success('Status updated', { id: toastId });
      if (selectedInquiry && selectedInquiry.id === id) {
        setSelectedInquiry({...selectedInquiry, status});
      }
      setInquiries(inquiries.map(i => i.id === id ? {...i, status} : i));
    }
  }

  const deleteInquiry = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirm('Are you sure you want to delete this inquiry?')) return;
    
    const supabase = createClient()
    const toastId = toast.loading('Deleting...')
    const { error } = await supabase.from('inquiries').delete().eq('id', id)
    if (error) toast.error(error.message, { id: toastId })
    else { 
      toast.success('Inquiry deleted', { id: toastId });
      setInquiries(inquiries.filter(i => i.id !== id));
      if (selectedInquiry?.id === id) setSelectedInquiry(null);
    }
  }

  // When opening a "new" inquiry, auto-mark it as "contacted" or "read" if we had a read state. 
  // For now, let's keep status manual to avoid accidentally changing "new" to "contacted" just by viewing.

  const filtered = inquiries.filter(i => 
    i.name.toLowerCase().includes(search.toLowerCase()) || 
    i.mobile.includes(search) ||
    (i.product_name && i.product_name.toLowerCase().includes(search.toLowerCase())) ||
    (i.message && i.message.toLowerCase().includes(search.toLowerCase()))
  )

  return (
    <div className="h-[calc(100vh-2rem)] flex flex-col">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 shrink-0">
        <h1 className="text-2xl font-bold text-[#111111] flex items-center gap-2">
          <Inbox className="text-[#c8941a]" /> Inbox ({inquiries.filter(i => i.status === 'new').length} New)
        </h1>
        <div className="relative !w-full sm:!w-72">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#555]" />
          <input type="text" placeholder="Search inquiries..." value={search} onChange={(e) => setSearch(e.target.value)} className="input-gold !pl-9 h-10 w-full" />
        </div>
      </div>

      <div className="bg-white border border-[#eaeaea] rounded-2xl overflow-hidden flex-1 flex flex-col shadow-sm relative">
        
        {/* Inbox Header */}
        <div className="bg-gray-50/80 border-b border-[#eaeaea] px-4 py-3 flex items-center text-xs font-semibold text-gray-500 uppercase tracking-wider shrink-0">
          <div className="w-10"></div>
          <div className="w-48 shrink-0">Sender</div>
          <div className="w-32 shrink-0 hidden md:block">Type</div>
          <div className="flex-1">Subject / Message</div>
          <div className="w-24 shrink-0 text-right">Date</div>
        </div>

        {/* Inbox List */}
        <div className="overflow-y-auto flex-1">
          {loading ? (
            <div className="flex justify-center py-20 text-gray-400">Loading inquiries...</div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-gray-400">
              <Inbox size={48} className="mb-4 opacity-20" />
              <p>No inquiries found.</p>
            </div>
          ) : (
            <div className="divide-y divide-[#eaeaea]">
              {filtered.map((item) => {
                const isNew = item.status === 'new';
                return (
                  <div 
                    key={item.id} 
                    onClick={() => setSelectedInquiry(item)}
                    className={`flex items-center gap-4 py-3 px-4 cursor-pointer transition-colors group ${
                      isNew ? 'bg-white hover:bg-gray-50' : 'bg-gray-50/30 hover:bg-gray-100/50'
                    }`}
                  >
                    <div className="w-10 shrink-0 flex items-center justify-center">
                      <Star size={18} className={isNew ? 'text-[#c8941a] fill-[#c8941a]' : 'text-gray-300 group-hover:text-gray-400'} />
                    </div>
                    
                    <div className="w-48 shrink-0 flex flex-col">
                      <span className={`truncate ${isNew ? 'font-bold text-gray-900' : 'font-medium text-gray-600'}`}>
                        {item.name}
                      </span>
                      <span className="text-xs text-gray-400 truncate">{item.city || item.mobile}</span>
                    </div>

                    <div className="w-32 shrink-0 hidden md:block">
                      <span className={`text-[10px] px-2 py-0.5 rounded-full border uppercase tracking-wider font-semibold ${
                        item.inquiry_type === 'custom' ? 'bg-purple-50 text-purple-600 border-purple-200' :
                        item.inquiry_type === 'product' ? 'bg-blue-50 text-blue-600 border-blue-200' :
                        item.inquiry_type === 'quote' ? 'bg-green-50 text-green-600 border-green-200' :
                        'bg-gray-100 text-gray-600 border-gray-200'
                      }`}>
                        {item.inquiry_type}
                      </span>
                    </div>

                    <div className="flex-1 min-w-0 flex items-center gap-2 text-sm">
                      <span className={`shrink-0 truncate max-w-[200px] ${isNew ? 'font-bold text-gray-900' : 'font-medium text-gray-600'}`}>
                        {item.product_name || 'General Inquiry'}
                      </span>
                      <span className="text-gray-400 shrink-0">-</span>
                      <span className="text-gray-500 truncate font-normal">
                        {item.message || (item.custom_size ? `Size: ${item.custom_size}` : 'No additional message attached.')}
                      </span>
                    </div>

                    <div className="w-32 shrink-0 flex items-center justify-end gap-3">
                      <span className={`text-xs ${isNew ? 'font-bold text-gray-900' : 'font-medium text-gray-500'}`}>
                        {formatDateShort(item.created_at)}
                      </span>
                      <button 
                        onClick={(e) => deleteInquiry(item.id, e)}
                        className="text-gray-300 hover:text-red-500 transition-colors p-1"
                        title="Delete inquiry"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>

      {/* Detail View Modal (Full View) */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-12">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSelectedInquiry(null)}></div>
          
          <div className="relative bg-white rounded-2xl w-full max-w-3xl max-h-full overflow-hidden shadow-2xl flex flex-col animate-fade-in-up">
            
            {/* Modal Header */}
            <div className="p-4 sm:p-6 border-b border-[#eaeaea] flex items-center justify-between bg-gray-50 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#c8941a]/10 flex items-center justify-center text-[#c8941a]">
                  <User size={20} />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-[#111111] leading-tight">{selectedInquiry.name}</h2>
                  <div className="flex items-center gap-2 text-xs text-gray-500 mt-0.5">
                    <Clock size={12} />
                    {new Date(selectedInquiry.created_at).toLocaleString('en-IN')}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <select 
                  value={selectedInquiry.status}
                  onChange={(e) => updateStatus(selectedInquiry.id, e.target.value, e)}
                  className={`text-xs font-bold px-3 py-1.5 rounded-lg focus:outline-none cursor-pointer border-2 transition-colors ${
                    selectedInquiry.status === 'new' ? 'bg-red-50 text-red-600 border-red-200 hover:border-red-300' :
                    selectedInquiry.status === 'contacted' ? 'bg-yellow-50 text-yellow-600 border-yellow-200 hover:border-yellow-300' :
                    selectedInquiry.status === 'quoted' ? 'bg-blue-50 text-blue-600 border-blue-200 hover:border-blue-300' :
                    'bg-green-50 text-green-600 border-green-200 hover:border-green-300'
                  }`}
                >
                  <option value="new">NEW INQUIRY</option>
                  <option value="contacted">CONTACTED</option>
                  <option value="quoted">QUOTED</option>
                  <option value="closed">CLOSED</option>
                </select>
                
                <button onClick={() => setSelectedInquiry(null)} className="p-2 text-gray-400 hover:text-gray-800 hover:bg-gray-200 rounded-full transition-colors">
                  <X size={20}/>
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-4 sm:p-6 overflow-y-auto flex-1 bg-white">
              
              {/* Contact Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
                <div className="border border-gray-100 bg-gray-50 rounded-xl p-4 flex flex-col">
                  <span className="text-[10px] uppercase font-bold text-gray-400 mb-1 flex items-center gap-1"><Phone size={12}/> Phone</span>
                  <a href={`tel:${selectedInquiry.mobile}`} className="font-semibold text-[#111111] hover:text-[#c8941a] text-sm">{selectedInquiry.mobile}</a>
                  {selectedInquiry.whatsapp_number && (
                    <a href={`https://wa.me/91${selectedInquiry.whatsapp_number}`} target="_blank" rel="noreferrer" className="text-xs text-green-600 font-medium hover:underline mt-1">
                      Chat on WhatsApp
                    </a>
                  )}
                </div>
                
                <div className="border border-gray-100 bg-gray-50 rounded-xl p-4 flex flex-col">
                  <span className="text-[10px] uppercase font-bold text-gray-400 mb-1 flex items-center gap-1"><Mail size={12}/> Email</span>
                  {selectedInquiry.email ? (
                    <a href={`mailto:${selectedInquiry.email}`} className="font-semibold text-[#111111] hover:text-[#c8941a] text-sm truncate">{selectedInquiry.email}</a>
                  ) : (
                    <span className="font-semibold text-gray-400 text-sm">Not provided</span>
                  )}
                </div>

                <div className="border border-gray-100 bg-gray-50 rounded-xl p-4 flex flex-col">
                  <span className="text-[10px] uppercase font-bold text-gray-400 mb-1 flex items-center gap-1"><MapPin size={12}/> Location</span>
                  <span className="font-semibold text-[#111111] text-sm">{selectedInquiry.city || <span className="text-gray-400">Not provided</span>}</span>
                </div>
              </div>

              {/* Requirement Details */}
              <div className="mb-8">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100 pb-2 mb-4">Inquiry Details</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
                  <div>
                    <span className="text-xs text-gray-500 block">Inquiry Type</span>
                    <span className="font-medium text-gray-900 capitalize">{selectedInquiry.inquiry_type}</span>
                  </div>
                  <div>
                    <span className="text-xs text-gray-500 block">Product/Service</span>
                    <span className="font-medium text-gray-900">{selectedInquiry.product_name || 'General Inquiry'}</span>
                  </div>
                  
                  {selectedInquiry.quantity && (
                    <div>
                      <span className="text-xs text-gray-500 block">Quantity</span>
                      <span className="font-medium text-gray-900">{selectedInquiry.quantity}</span>
                    </div>
                  )}
                  {selectedInquiry.custom_size && (
                    <div>
                      <span className="text-xs text-gray-500 block">Custom Size</span>
                      <span className="font-medium text-gray-900">{selectedInquiry.custom_size}</span>
                    </div>
                  )}
                  {selectedInquiry.preferred_colour && (
                    <div>
                      <span className="text-xs text-gray-500 block">Preferred Colour</span>
                      <span className="font-medium text-gray-900">{selectedInquiry.preferred_colour}</span>
                    </div>
                  )}
                  {selectedInquiry.material_requirement && (
                    <div>
                      <span className="text-xs text-gray-500 block">Material Preference</span>
                      <span className="font-medium text-gray-900">{selectedInquiry.material_requirement}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Message Box */}
              {selectedInquiry.message && (
                <div>
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100 pb-2 mb-4 flex items-center gap-2">
                    <MessageSquare size={14} /> Message from Customer
                  </h3>
                  <div className="bg-[#fcfbf9] border border-[#f0ebe1] p-5 rounded-xl text-gray-800 text-sm leading-relaxed whitespace-pre-wrap font-medium">
                    {selectedInquiry.message}
                  </div>
                </div>
              )}
              
            </div>
            
            {/* Modal Footer (Actions) */}
            <div className="p-4 border-t border-[#eaeaea] bg-gray-50 flex justify-end gap-3 shrink-0">
              <a 
                href={`tel:${selectedInquiry.mobile}`}
                className="px-6 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg text-sm font-bold hover:bg-gray-50 transition-colors"
              >
                Call Customer
              </a>
              <a 
                href={`https://wa.me/91${selectedInquiry.whatsapp_number || selectedInquiry.mobile}`}
                target="_blank" rel="noreferrer"
                className="px-6 py-2 bg-[#25D366] text-white rounded-lg text-sm font-bold hover:bg-[#20bd5a] transition-colors"
              >
                Reply on WhatsApp
              </a>
            </div>

          </div>
        </div>
      )}
    </div>
  )
}
