import useSWR from 'swr'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'

function authFetch(url: string) {
  const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null
  return fetch(`${API_BASE_URL}${url}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  }).then(r => r.json())
}

export function useResultsSummary(testType?: string, range: string = 'last_30d') {
  const qs = new URLSearchParams({ ...(testType ? { testType } : {}), range })
  return useSWR(`/api/results/summary?${qs.toString()}`, authFetch)
}

export function useResultsTimeseries(testType?: string, range: string = 'last_90d', interval: string = 'week') {
  const qs = new URLSearchParams({ ...(testType ? { testType } : {}), range, interval })
  return useSWR(`/api/results/timeseries?${qs.toString()}`, authFetch)
}

export function useResultsTraits(testType?: string, compare: 'prev' | undefined = undefined) {
  const qs = new URLSearchParams({ ...(testType ? { testType } : {}), ...(compare ? { compare } : {}) })
  return useSWR(`/api/results/traits?${qs.toString()}`, authFetch)
}
