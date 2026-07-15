'use client'

import { useEffect, useState } from 'react'
import { Languages } from 'lucide-react'

declare global {
  interface Window {
    googleTranslateElementInit?: () => void
    google?: any
    dessieTranslateTo?: (lang: string) => void
  }
}

export default function GoogleTranslate() {
  const [ready, setReady] = useState(false)
  const [currentLang, setCurrentLang] = useState<'en' | 'am'>('en')

  useEffect(() => {
    if (document.getElementById('google-translate-script')) {
      setReady(true)
      return
    }

    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: 'en',
          includedLanguages: 'am,en',
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
          autoDisplay: false,
        },
        'google_translate_element'
      )
      // Mark ready after a short delay so the combo is injected
      setTimeout(() => setReady(true), 800)
    }

    const script = document.createElement('script')
    script.id = 'google-translate-script'
    script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit'
    script.async = true
    document.body.appendChild(script)
  }, [])

  // Expose a global helper so page.tsx button can call it
  useEffect(() => {
    window.dessieTranslateTo = (lang: string) => {
      const sel = document.querySelector('.goog-te-combo') as HTMLSelectElement | null
      if (!sel) return
      sel.value = lang
      sel.dispatchEvent(new Event('change'))
      setCurrentLang(lang === 'am' ? 'am' : 'en')
    }
  }, [])

  const toggle = () => {
    const next = currentLang === 'en' ? 'am' : 'en'
    const sel = document.querySelector('.goog-te-combo') as HTMLSelectElement | null
    if (sel) {
      sel.value = next === 'am' ? 'am' : ''
      sel.dispatchEvent(new Event('change'))
      setCurrentLang(next)
    } else {
      // Google hasn't loaded yet — try again in 1s
      setTimeout(() => {
        const s = document.querySelector('.goog-te-combo') as HTMLSelectElement | null
        if (s) {
          s.value = next === 'am' ? 'am' : ''
          s.dispatchEvent(new Event('change'))
          setCurrentLang(next)
        }
      }, 1000)
    }
  }

  return (
    <>
      {/* Hidden widget — Google injects the actual select here */}
      <div id="google_translate_element" style={{ position: 'absolute', top: -9999, left: -9999, width: 1, height: 1, overflow: 'hidden' }} />

      {/* Our visible toggle button — rendered as a fixed pill so it always works */}
      <button
        id="gt-toggle-btn"
        onClick={toggle}
        title={currentLang === 'en' ? 'Switch to Amharic / አማርኛ' : 'Switch to English'}
        className="fixed bottom-6 right-6 z-[9999] flex items-center gap-2 bg-[#0d4a28] hover:bg-[#1a6b3c] text-white text-xs font-bold px-4 py-2.5 rounded-full shadow-xl transition-all hover:scale-105 border-2 border-[#c8a415]"
        style={{ fontFamily: 'system-ui, sans-serif' }}
      >
        <Languages className="w-4 h-4 shrink-0" />
        <span>{currentLang === 'en' ? 'አማርኛ' : 'English'}</span>
        <span className="text-[#c8a415] font-black ml-0.5">{currentLang === 'en' ? '🇪🇹' : '🌐'}</span>
      </button>
    </>
  )
}
