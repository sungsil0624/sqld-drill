// components/QuizContainer.tsx
'use client'
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, CircleX, ArrowRight } from "lucide-react"
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

export default function QuizContainer({ questions }: { questions: any[] }) {
  const [currentIdx, setCurrentIdx] = useState(0)
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)

  const currentQ = questions[currentIdx]
  const formatText = (text: string) => text?.replace(/\\n/g, '\n') || ''
  const progress = questions.length > 0 ? ((currentIdx + 1) / questions.length) * 100 : 0
  const hasAnswered = selectedIdx !== null

  // 키보드 단축키 (1,2,3,4) 지원
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (hasAnswered || showResult) return
      if (['1', '2', '3', '4'].includes(e.key)) {
        handleAnswer(parseInt(e.key) - 1)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [hasAnswered, currentIdx, showResult])

  const handleAnswer = (idx: number) => {
    if (hasAnswered) return
    setSelectedIdx(idx)
  }

  const handleNext = () => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(prev => prev + 1)
      setSelectedIdx(null)
    } else {
      setShowResult(true)
    }
  }

  // 결과 화면
  if (showResult) {
    return (
      <Card className="max-w-md mx-auto border-2 shadow-2xl p-8 text-center space-y-6 animate-in zoom-in duration-300">
        <div className="space-y-4">
          <Badge className="bg-blue-600">SQLD DRILL 완료</Badge>
          <CardTitle className="text-3xl font-black text-slate-900">수고하셨습니다!</CardTitle>
          <p className="text-slate-500 font-medium pt-2">
            준비된 모든 문제를 확인했습니다.
          </p>
        </div>
        <Button size="lg" className="w-full font-bold bg-blue-600 hover:bg-blue-700 h-14 text-lg" onClick={() => window.location.reload()}>
          처음으로 돌아가기
        </Button>
      </Card>
    )
  }

  if (!questions || questions.length === 0) {
    return <div className="text-center py-20 text-slate-400">문제를 불러오는 중입니다...</div>
  }

  return (
    <div className="max-w-2xl mx-auto px-4 space-y-6">
      {/* 상단 진행 바 */}
      <div className="h-10 space-y-2">
        <div className="flex justify-between text-sm font-medium text-muted-foreground">
          <Badge variant="outline" className="text-xs text-blue-600 border-blue-100">
            {currentQ.category || "SQL 기본"}
          </Badge>
          <span>{currentIdx + 1} / {questions.length}</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <Card className="border-2 shadow-xl min-h-[500px] flex flex-col overflow-hidden bg-white">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-2 mb-3">
            <Badge className="bg-slate-800 rounded-sm">Q{currentIdx + 1}</Badge>
            <Badge variant="secondary" className="text-blue-600 bg-blue-50">SQLD</Badge>
          </div>
          <CardTitle className="text-xl leading-relaxed text-slate-800 break-keep whitespace-pre-wrap">
            {formatText(currentQ.question)}
          </CardTitle>
        </CardHeader>

        <CardContent className="flex-1 space-y-6">
          {/* SQL 코드 블록 */}
          {currentQ.code_block && (
            <div className="relative group rounded-xl overflow-hidden border border-slate-800 shadow-2xl my-6">
              {/* 우상단 SQL 라벨 */}
              <div className="absolute right-3 top-3 z-10 text-[10px] uppercase font-bold text-slate-500 font-mono tracking-widest pointer-events-none">
                SQL Standard
              </div>
              
              <SyntaxHighlighter
                language="sql"
                style={vscDarkPlus}
                customStyle={{
                  margin: 0,
                  padding: '1.5rem',
                  fontSize: '0.9rem',
                  lineHeight: '1.6',
                  backgroundColor: '#020617', // slate-950 색상
                  fontFamily: 'var(--font-mono), monospace',
                }}
                // 데이터의 줄바꿈을 그대로 인식하도록 설정
                codeTagProps={{
                  style: { whiteSpace: 'pre-wrap', wordBreak: 'break-all' }
                }}
              >
                {formatText(currentQ.code_block)}
              </SyntaxHighlighter>
            </div>
          )}

          {/* 선택지 리스트 */}
          <div className="grid grid-cols-1 gap-3">
            {currentQ.options.map((option: string, i: number) => {
              const isCorrect = i === currentQ.answer_index
              const isSelected = selectedIdx === i
              
              let buttonClass = "border-slate-200 bg-white text-slate-900" 
              
              if (hasAnswered) {
                if (isCorrect) {
                  buttonClass = "border-green-600 bg-green-50 text-green-900 ring-1 ring-green-600"
                } else if (isSelected && !isCorrect) {
                  buttonClass = "border-red-600 bg-red-50 text-red-900 ring-1 ring-red-600"
                } else {
                  buttonClass = "border-slate-100 bg-white text-slate-400 opacity-40"
                }
              } else {
                buttonClass += " hover:border-blue-400 hover:bg-blue-50 cursor-pointer"
              }

              return (
                <Button
                  key={i}
                  variant="outline"
                  disabled={hasAnswered}
                  className={`relative h-auto py-4 px-6 justify-start text-left text-base whitespace-normal transition-all duration-200 border-2 font-medium shadow-none ${buttonClass}`}
                  onClick={() => handleAnswer(i)}
                >
                  <span className={`mr-4 font-bold shrink-0 ${hasAnswered && isCorrect ? "text-green-600" : "opacity-40"}`}>
                    {i + 1}
                  </span>
                  <span className="pr-8 flex-1 whitespace-pre-wrap">{formatText(option)}</span>
                  
                  <div className="absolute right-4 top-1/2 -translate-y-1/2">
                    {hasAnswered && isCorrect && <CheckCircle2 className="h-5 w-5 text-green-600 animate-in zoom-in" />}
                    {isSelected && !isCorrect && <CircleX className="h-5 w-5 text-red-600 animate-in zoom-in" />}
                  </div>
                </Button>
              )
            })}
          </div>
        </CardContent>

        <CardFooter className="bg-slate-50 border-t p-6 block space-y-4">
          {hasAnswered ? (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
              <div className="space-y-1">
                <p className="text-sm font-bold text-slate-800">
                  {selectedIdx === currentQ.answer_index ? "✅ 정답입니다!" : "❌ 아쉽네요, 오답입니다."}
                </p>
                <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-wrap">
                  <span className="font-semibold text-blue-600">해설:</span> {formatText(currentQ.explanation)}
                </p>
              </div>
              <Button 
                onClick={handleNext} 
                className="w-full bg-blue-600 hover:bg-blue-700 h-12 text-md font-bold group"
              >
                {currentIdx < questions.length - 1 ? "다음 문제 풀기" : "결과 확인하기"}
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          ) : (
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded border bg-white shadow-sm font-sans">1</kbd> ~ 
              <kbd className="px-1.5 py-0.5 rounded border bg-white shadow-sm font-sans">4</kbd> 번 키로 정답을 선택할 수 있습니다.
            </p>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}