'use client'

import { useEffect, useState, useRef } from 'react'

export default function GoogleTranslate() {
  const [isAmharic, setIsAmharic] = useState(false)
  const [ready, setReady] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    // Poll until Google Translate has injected the .goog-te-combo select
    let attempts = 0
    intervalRef.current = setInterval(() => {
      attempts++
      const combo = document.querySelector('.goog-te-combo') as HTMLSelectElement | null
      if (combo) {
        clearInterval(intervalRef.current!)
        setReady(true)
        // Check if already in Amharic
        const ck = document.cookie.match(/googtrans=\/en\/(\w+)/)
        if (ck?.[1] === 'am') {
          setIsAmharic(true)
          combo.value = 'am'
        }
      }
      // Stop after 20 seconds
      if (attempts > 40) clearInterval(intervalRef.current!)
    }, 500)

    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [])

  const doTranslate = (targetLang: string) => {
    const combo = document.querySelector('.goog-te-combo') as HTMLSelectElement | null
    if (!combo) return false
    combo.value = targetLang
    combo.dispatchEvent(new Event('change', { bubbles: true }))
    return true
  }

  const toggle = () => {
    const next = isAmharic ? '' : 'am'
    const success = doTranslate(next)
    if (success) {
      setIsAmharic(!isAmharic)
    } else {
      // If combo not ready yet, show user feedback by trying after reload via cookie
      document.cookie = `googtrans=${next ? '/en/am' : '/en/en'}; path=/`
      window.location.reload()
    }
  }

  return (
    <>
      {/* Google Translate widget container — must remain in DOM, not display:none */}
      <div
        id="google_translate_element"
        style={{
          position: 'fixed',
          left: '-9999px',
          bottom: '0',
          width: '1px',
          height: '1px',
          overflow: 'hidden',
          pointerEvents: 'none',
          zIndex: -1,
        }}
      />

      {/* Floating language toggle button */}
      <button
        id="gt-toggle-btn"
        onClick={toggle}
        title={isAmharic ? 'Switch to English' : 'ወደ አማርኛ ቀይር — Switch to Amharic'}
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 99999,
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          backgroundColor: '#0d4a28',
          color: 'white',
          border: '2px solid #c8a415',
          borderRadius: '9999px',
          padding: '10px 18px',
          fontSize: '13px',
          fontWeight: 700,
          cursor: 'pointer',
          boxShadow: '0 4px 20px rgba(13,74,40,0.5)',
          transition: 'all 0.2s ease',
          fontFamily: 'system-ui, sans-serif',
          letterSpacing: '0.02em',
          userSelect: 'none',
          outline: 'none',
        }}
        onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#1a6b3c'; e.currentTarget.style.transform = 'scale(1.05)' }}
        onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#0d4a28'; e.currentTarget.style.transform = 'scale(1)' }}
      >
        {/* Language icon */}
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="m5 8 6 6"/><path d="m4 14 6-6 2-3"/>
          <path d="M2 5h12"/><path d="M7 2h1"/>
          <path d="m22 22-5-10-5 10"/><path d="M14 18h6"/>
        </svg>
        <span
          style={{
            fontFamily: isAmharic ? 'system-ui, sans-serif' : 'Noto Sans Ethiopic, system-ui, sans-serif',
            fontSize: isAmharic ? '13px' : '14px',
          }}
        >
          {isAmharic ? 'English' : 'አማርኛ'}
        </span>
        <span style={{ fontSize: '16px' }}>{isAmharic ? '🌐' : '🇪🇹'}</span>
        {!ready && (
          <span style={{ width: '14px', height: '14px', border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#c8a415', borderRadius: '50%', animation: 'spin 0.8s linear infinite', display: 'inline-block' }} />
        )}
      </button>
    </>
  )
}
