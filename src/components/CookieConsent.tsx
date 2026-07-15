'use client'

import { useState, useEffect } from 'react'
import { X, Cookie } from 'lucide-react'

const CONSENT_KEY = 'dessie_cookie_consent'

export default function CookieConsent() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem(CONSENT_KEY)
    if (!stored) setVisible(true)
  }, [])

  const accept = () => {
    localStorage.setItem(CONSENT_KEY, 'accepted')
    setVisible(false)
  }

  const reject = () => {
    localStorage.setItem(CONSENT_KEY, 'rejected')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-[99998] p-3 md:p-4"
      role="dialog"
      aria-label="Cookie consent"
    >
      <div className="max-w-4xl mx-auto bg-[#0d4a28] border-2 border-[#c8a415] rounded-2xl shadow-2xl p-4 md:p-5">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
          {/* Icon + Text */}
          <div className="flex items-start gap-3 flex-1">
            <div className="w-10 h-10 rounded-xl bg-[#c8a415] flex items-center justify-center shrink-0">
              <Cookie className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-white font-semibold text-sm mb-0.5">
                🇪🇹 Cookies & Privacy
              </p>
              <p className="text-white/80 text-xs leading-relaxed">
                We use cookies to improve your experience on the Dessie City Administration portal. By continuing, you agree to our use of essential and analytics cookies.
              </p>
              <p className="text-white/60 text-[11px] mt-0.5" style={{ fontFamily: 'var(--font-ethiopic), Noto Sans Ethiopic, system-ui' }}>
                ይህን ድረ-ገጽ በመጠቀም ኩኪዎችን ለመጠቀም ይስማሙ።
              </p>
            </div>
          </div>
          {/* Buttons */}
          <div className="flex items-center gap-2 shrink-0 w-full md:w-auto">
            <button
              onClick={accept}
              className="flex-1 md:flex-none bg-[#c8a415] hover:bg-[#b08e10] text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-all hover:scale-105"
            >
              Accept All / ሁሉንም ተቀበል
            </button>
            <button
              onClick={reject}
              className="flex-1 md:flex-none border border-white/30 text-white/80 hover:text-white hover:border-white font-medium text-xs px-4 py-2.5 rounded-xl transition-all"
            >
              Essential Only
            </button>
            <button
              onClick={reject}
              className="text-white/50 hover:text-white transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
