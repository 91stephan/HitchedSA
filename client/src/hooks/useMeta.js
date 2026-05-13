import { useEffect } from 'react'

const DEFAULT_TITLE = 'HitchedSA — South African Wedding Planner'
const DEFAULT_DESC  = 'Plan your perfect South African wedding for free. Venue search, budget tracker, guest list, supplier directory, checklist, seating planner and more — built for SA couples.'

function setMeta(name, content) {
  let el = document.querySelector(`meta[name="${name}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute('name', name)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function setOg(property, content) {
  let el = document.querySelector(`meta[property="${property}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute('property', property)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

export function useMeta({ title, description = DEFAULT_DESC, url = '' }) {
  useEffect(() => {
    const fullTitle = title ? `${title} | HitchedSA` : DEFAULT_TITLE
    document.title = fullTitle
    setMeta('description', description)
    setOg('og:title', fullTitle)
    setOg('og:description', description)
    setOg('og:type', 'website')
    if (url) setOg('og:url', `https://hitchedsa.co.za${url}`)
    return () => {
      document.title = DEFAULT_TITLE
      setMeta('description', DEFAULT_DESC)
    }
  }, [title, description, url])
}
