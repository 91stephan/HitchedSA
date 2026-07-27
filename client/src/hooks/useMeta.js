import { useEffect } from 'react'

const DEFAULT_TITLE = 'HitchedSA | South African Wedding Planner'
const DEFAULT_DESC  = 'Plan your perfect South African wedding for free. Venue search, budget tracker, guest list, checklist, seating planner and more, built for SA couples.'
const DEFAULT_IMAGE = 'https://hitchedsa.co.za/images/provinces/western-cape.jpg'

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

export function useMeta({ title, description = DEFAULT_DESC, url = '', image }) {
  useEffect(() => {
    const fullTitle = title ? `${title} | HitchedSA` : DEFAULT_TITLE
    const ogImage = image ? `https://hitchedsa.co.za${image}` : DEFAULT_IMAGE
    document.title = fullTitle
    setMeta('description', description)
    setOg('og:title', fullTitle)
    setOg('og:description', description)
    setOg('og:type', 'website')
    setOg('og:image', ogImage)
    if (url) setOg('og:url', `https://hitchedsa.co.za${url}`)
    setMeta('twitter:card', 'summary_large_image')
    setMeta('twitter:title', fullTitle)
    setMeta('twitter:description', description)
    setMeta('twitter:image', ogImage)
    return () => {
      document.title = DEFAULT_TITLE
      setMeta('description', DEFAULT_DESC)
    }
  }, [title, description, url, image])
}
