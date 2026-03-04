import { Badge } from '@/components/ui/badge'

export default function Navbar() {
  return (
    <nav className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-50 px-4">
      <div className="max-w-2xl mx-auto h-16 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-black text-white text-xs">SQL</div>
          <span className="font-bold text-xl tracking-tighter">SQLD <span className="text-blue-600">DRILL</span></span>
        </a>
        <div className="flex gap-4 items-center">
          <Badge variant="outline" className="text-blue-600 border-blue-200">무한질주</Badge>
          <span className="text-xs text-slate-300">오답노트(준비중)</span>
        </div>
      </div>
    </nav>
  )
}