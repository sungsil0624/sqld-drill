// app/page.tsx (클라이언트 컴포넌트로 변경하거나 컴포넌트 분리)
'use client'
import { useState, useEffect } from 'react'
import Navbar from '@/components/Navbar'
import QuizContainer from '@/components/QuizContainer'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Play, BookOpen, Target } from 'lucide-react'
import { db } from '@/lib/db'

export default function Page() {
  const [started, setStarted] = useState(false)
  const [questions, setQuestions] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      const data = await db.getQuestions()
      // 질문 데이터 셔플 (랜덤 정렬)
      const shuffled = [...data].sort(() => Math.random() - 0.5)
      setQuestions(shuffled)
      setLoading(false)
    }
    loadData()
  }, [])

  if (!started) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Navbar />
        <main className="max-w-2xl mx-auto px-4 py-20 text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl font-black tracking-tighter text-slate-900">
              SQLD <span className="text-blue-600">DRILL</span>
            </h1>
            <p className="text-lg text-slate-600 font-medium">
              가장 빠르고 확실한 기출 반복 숙달 도구
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
            <FeatureCard icon={<Target className="text-blue-600" />} title="타겟팅" desc="핵심 기출 위주" />
            <FeatureCard icon={<Play className="text-green-600" />} title="무한 반복" desc="익숙해질 때까지" />
            <FeatureCard icon={<BookOpen className="text-orange-600" />} title="상세 해설" desc="오답 완벽 이해" />
          </div>

          <Button 
            size="lg" 
            className="w-full h-16 text-xl font-bold bg-blue-600 hover:bg-blue-700 shadow-xl shadow-blue-200 transition-all hover:-translate-y-1"
            onClick={() => setStarted(true)}
            disabled={loading}
          >
            {loading ? "데이터 로딩 중..." : "드릴 시작하기"}
          </Button>
          
          <p className="text-sm text-slate-400">현재 {questions.length}개의 정교한 문제가 준비되어 있습니다.</p>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />
      <main className="flex-1 py-10">
        <QuizContainer questions={questions} />
      </main>
    </div>
  )
}

function FeatureCard({ icon, title, desc }: { icon: any, title: string, desc: string }) {
  return (
    <Card className="p-4 bg-white/50 backdrop-blur-sm border-none shadow-sm space-y-1">
      <div className="mb-2">{icon}</div>
      <h3 className="font-bold text-slate-800 text-sm">{title}</h3>
      <p className="text-xs text-slate-500 leading-tight">{desc}</p>
    </Card>
  )
}