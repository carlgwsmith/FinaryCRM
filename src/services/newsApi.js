const BASE = 'https://www.alphavantage.co/query'
const KEY = import.meta.env.VITE_ALPHA_VANTAGE_KEY || 'demo'

export async function fetchFinancialNews() {
  const params = new URLSearchParams({
    function: 'NEWS_SENTIMENT',
    topics: 'finance,financial_markets,earnings',
    sort: 'LATEST',
    limit: 50,
    apikey: KEY
  })

  const res = await fetch(`${BASE}?${params}`)
  if (!res.ok) throw new Error(`News API error: ${res.status}`)

  const data = await res.json()

  if (data.Information) throw new Error('API rate limit reached — replace VITE_ALPHA_VANTAGE_KEY with a real key')
  if (!Array.isArray(data.feed)) throw new Error('Unexpected response from news API')

  return data.feed
    .filter(article => article.banner_image)
    .map(article => ({
    id: article.url,
    title: article.title,
    source: article.source,
    url: article.url,
    date: parseDate(article.time_published),
    sentiment: article.overall_sentiment_label,
    sentimentScore: parseFloat(article.overall_sentiment_score),
    imageUrl: article.banner_image
  }))

}

// time_published format: "20240101T120000"
function parseDate(str) {
  const d = new Date(`${str.slice(0,4)}-${str.slice(4,6)}-${str.slice(6,8)}T${str.slice(9,11)}:${str.slice(11,13)}:00`)
  const today = new Date()
  const yesterday = new Date(today)
  yesterday.setDate(today.getDate() - 1)

  if (d.toDateString() === today.toDateString()) return 'Today'
  if (d.toDateString() === yesterday.toDateString()) return 'Yesterday'
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}
