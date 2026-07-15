'use client'

import { useEffect, useState, useRef } from 'react'

export default function GoogleTranslate() {
  const [isAmharic, setIsAmharic] = useState(false)
  const [ready, setReady] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    // IMPORTANT: Clear any stale googtrans cookie on load so page stays in English by default.
    // Only translate when user explicitly clicks the button.
    document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/'
    document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=' + location.hostname
    setIsAmharic(false)

    // Poll for Google Translate combo to appear
    let attempts = 0
    intervalRef.current = setInterval(() => {
      attempts++
      const combo = document.querySelector('.goog-te-combo') as HTMLSelectElement | null
      if (combo) {
        clearInterval(intervalRef.current!)
        setReady(true)
        // Reset to English on load
        combo.value = ''
        combo.dispatchEvent(new Event('change', { bubbles: true }))
      }
      if (attempts > 40) clearInterval(intervalRef.current!)
    }, 500)

    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [])

  const toggle = () => {
    const combo = document.querySelector('.goog-te-combo') as HTMLSelectElement | null
    if (!combo) {
      setTimeout(toggle, 700)
      return
    }
    const next = isAmharic ? '' : 'am'
    combo.value = next
    combo.dispatchEvent(new Event('change', { bubbles: true }))
    setIsAmharic(!isAmharic)
  }

  return (
    <>
      {/* Widget container — must NOT be display:none for Google to work */}
      <div
        id="google_translate_element"
        style={{ position: 'fixed', left: '-9999px', bottom: 0, width: 1, height: 1, overflow: 'hidden', pointerEvents: 'none', zIndex: -1 }}
      />

      {/* Floating toggle button — bottom right */}
      <button
        id="gt-toggle-btn"
        onClick={toggle}
        title={isAmharic ? 'Switch to English' : 'ወደ አማርኛ ቀይር'}
        style={{
          position: 'fixed', bottom: 24, right: 24, zIndex: 99999,
          display: 'flex', alignItems: 'center', gap: 8,
          backgroundColor: isAmharic ? '#1a6b3c' : '#0d4a28',
          color: 'white', border: '2px solid #c8a415',
          borderRadius: 9999, padding: '10px 18px',
          fontSize: 13, fontWeight: 700, cursor: 'pointer',
          boxShadow: '0 4px 20px rgba(13,74,40,0.5)',
          transition: 'all 0.2s', fontFamily: 'system-ui',
          userSelect: 'none', outline: 'none',
        }}
        onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1.06)' }}
        onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)' }}
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="m5 8 6 6"/><path d="m4 14 6-6 2-3"/>
          <path d="M2 5h12"/><path d="M7 2h1"/>
          <path d="m22 22-5-10-5 10"/><path d="M14 18h6"/>
        </svg>
        <span style={{ fontFamily: 'Noto Sans Ethiopic, system-ui', fontSize: isAmharic ? 13 : 14 }}>
          {isAmharic ? 'English' : 'አማርኛ'}
        </span>
        <span style={{ fontSize: 16 }}>{isAmharic ? '🌐' : '🇪🇹'}</span>
        {!ready && (
          <span style={{
            width: 12, height: 12, border: '2px solid rgba(255,255,255,0.3)',
            borderTopColor: '#c8a415', borderRadius: '50%',
            animation: 'spin 0.8s linear infinite', display: 'inline-block',
          }} />
        )}
      </button>
    </>
  )
}
