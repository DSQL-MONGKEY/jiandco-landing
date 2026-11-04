import { useEffect } from 'react'

type Props = {
  title: string
  description: string
  path: string
  image?: string
  type?: 'website' | 'product'
  noindex?: boolean
  jsonLd?: Record<string, unknown>
}

function setMeta(name: string, content: string, property = false) {
  const selector = property
    ? `meta[property="${name}"]`
    : `meta[name="${name}"]`
  let element = document.head.querySelector(selector)
  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(property ? 'property' : 'name', name)
    document.head.appendChild(element)
  }
  element.setAttribute('content', content)
}

export default function Seo({
  title,
  description,
  path,
  image,
  type = 'website',
  noindex = false,
  jsonLd,
}: Props) {
  useEffect(() => {
    document.title = title
    const origin = window.location.origin
    const canonical = `${origin}${path}`

    setMeta('description', description)
    setMeta('og:title', title, true)
    setMeta('og:description', description, true)
    setMeta('og:type', type, true)
    setMeta('og:url', canonical, true)
    setMeta('twitter:card', 'summary_large_image')
    setMeta('twitter:title', title)
    setMeta('twitter:description', description)
    setMeta('robots', noindex ? 'noindex,nofollow' : 'index,follow')

    if (image) {
      const absoluteImage = image.startsWith('http') ? image : `${origin}${image}`
      setMeta('og:image', absoluteImage, true)
      setMeta('twitter:image', absoluteImage)
    }

    let link = document.head.querySelector<HTMLLinkElement>(
      'link[rel="canonical"]',
    )
    if (!link) {
      link = document.createElement('link')
      link.rel = 'canonical'
      document.head.appendChild(link)
    }
    link.href = canonical

    const scriptId = 'page-jsonld'
    document.getElementById(scriptId)?.remove()
    if (jsonLd) {
      const script = document.createElement('script')
      script.id = scriptId
      script.type = 'application/ld+json'
      script.textContent = JSON.stringify(jsonLd)
      document.head.appendChild(script)
    }

    return () => {
      document.getElementById(scriptId)?.remove()
    }
  }, [title, description, path, image, type, noindex, jsonLd])

  return null
}
