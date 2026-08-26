"use client"

import { useState } from "react"
import { useResultsSummary, useResultsTimeseries, useResultsTraits } from "@/lib/results"
import { Card } from "@/components/ui/card"
import { motion } from "framer-motion"
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend, BarChart, Bar, PieChart, Pie, Cell } from "recharts"

function formatDate(d: string | Date) {
  const dt = new Date(d)
  return `${dt.getMonth() + 1}/${dt.getDate()}`
}

export default function AnalyticsPage() {
  const [testType, setTestType] = useState<string | undefined>(undefined)
  const [range, setRange] = useState('last_90d')
  const { data: summary } = useResultsSummary(testType, range)
  const { data: ts } = useResultsTimeseries(testType, range, 'week')
  const { data: traits } = useResultsTraits(testType, 'prev')

  const series = (ts?.series || []).map((p: any) => ({ ...p, date: formatDate(p.t) }))
  const latestTraits = traits?.latest || {}
  const prevTraits = traits?.previous || {}
  const radarData = Object.keys(latestTraits).map(k => ({ trait: k, current: latestTraits[k], prev: prevTraits?.[k] ?? 0 }))

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      <div className="flex flex-wrap gap-3">
        <select className="border rounded px-3 py-2" value={testType || ''} onChange={e => setTestType(e.target.value || undefined)}>
          <option value="">All Tests</option>
          <option value="Big5">Big5</option>
          <option value="MBTI">MBTI</option>
          <option value="GAD7">GAD7</option>
        </select>
        <select className="border rounded px-3 py-2" value={range} onChange={e => setRange(e.target.value)}>
          <option value="last_30d">Last 30 days</option>
          <option value="last_90d">Last 90 days</option>
          <option value="ytd">Year to date</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[{
          label: 'Average Score', value: summary?.avgScore ?? '-',
        }, {
          label: 'Last Score', value: summary?.lastScore ?? '-',
        }, {
          label: 'Delta', value: summary?.delta ?? '-',
        }, {
          label: 'Sessions', value: summary?.count ?? 0,
        }].map((kpi, idx) => (
          <motion.div key={idx} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }}>
            <Card className="p-4">
              <div className="text-sm text-muted-foreground">{kpi.label}</div>
              <div className="text-2xl font-semibold">{typeof kpi.value === 'number' ? kpi.value.toFixed(2) : kpi.value}</div>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <Card className="p-4">
          <div className="mb-2 font-semibold">Score Over Time</div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={series}>
                <XAxis dataKey="date"/>
                <YAxis/>
                <Tooltip/>
                <Line type="monotone" dataKey="score" stroke="#4f46e5" strokeWidth={2} dot={false}/>
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-4">
          <div className="mb-2 font-semibold">Percentile Area</div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={series}>
                <XAxis dataKey="date"/>
                <YAxis/>
                <Tooltip/>
                <Area type="monotone" dataKey="percentile" stroke="#10b981" fill="#10b98133" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-4">
          <div className="mb-2 font-semibold">Traits Radar</div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="trait" />
                <PolarRadiusAxis />
                <Radar name="Current" dataKey="current" stroke="#6366f1" fill="#6366f133" />
                <Radar name="Previous" dataKey="prev" stroke="#f59e0b" fill="#f59e0b33" />
                <Legend />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-4">
          <div className="mb-2 font-semibold">Facet Bars (Top 5)</div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={Object.keys(latestTraits).slice(0,5).map(k => ({ name: k, value: latestTraits[k] }))}>
                <XAxis dataKey="name"/>
                <YAxis/>
                <Tooltip/>
                <Bar dataKey="value" fill="#8b5cf6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  )
}
