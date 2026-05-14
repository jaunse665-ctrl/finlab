"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Plus, Send, RefreshCw, X, Edit2, Check, Flame, Network } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { getPostIts, createPostIt, updatePostItPosition, deletePostIt, updatePostItContent, likePostIt } from "./actions"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"

type PostIt = {
  id: string
  authorName: string
  content: string
  color: string
  x: number
  y: number
  likes?: number
  createdAt: Date
}

const COLORS = [
  "bg-yellow-200", 
  "bg-green-200", 
  "bg-blue-200", 
  "bg-pink-200", 
  "bg-purple-200", 
  "bg-orange-200"
]

export default function NetworkingBoard({ initialUserName, isTeacher = false }: { initialUserName: string, isTeacher?: boolean }) {
  const [posts, setPosts] = useState<PostIt[]>([])
  const [userName] = useState(initialUserName)
  const [isNewPostModalOpen, setIsNewPostModalOpen] = useState(false)
  
  const [q1, setQ1] = useState("")
  const [q2, setQ2] = useState("")
  const [q3, setQ3] = useState("")
  const [q4, setQ4] = useState("")
  const [newColor, setNewColor] = useState(COLORS[0])
  
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editContent, setEditContent] = useState("")
  
  // Analytics State
  const [showNetwork, setShowNetwork] = useState(false)
  
  const boardRef = useRef<HTMLDivElement>(null)

  const fetchPosts = async () => {
    const fetchedPosts = await getPostIts()
    if (fetchedPosts) {
      setPosts(fetchedPosts)
    }
  }

  // Polling para "tiempo real"
  useEffect(() => {
    fetchPosts()
    const interval = setInterval(fetchPosts, 3000) // cada 3 segundos
    return () => clearInterval(interval)
  }, [])

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!q1.trim() || !q2.trim() || !q3.trim() || !q4.trim()) return

    const formattedContent = `📍 Origen:\n${q1.trim()}\n\n💥 Fracaso:\n${q2.trim()}\n\n🎯 Expectativa:\n${q3.trim()}\n\n🎨 Pasatiempo:\n${q4.trim()}`

    // Distribuir aleatoriamente por toda la pantalla (evitando bordes)
    // Sidebar width is ~250px, post-it is w-80 (320px). 
    const maxX = Math.max(350, window.innerWidth - 350);
    const maxY = Math.max(200, window.innerHeight - 250);
    const startX = 50 + (Math.random() * (maxX - 50));
    const startY = 50 + (Math.random() * (maxY - 50));

    const optimisticPost: PostIt = {
      id: "temp-" + Date.now(),
      authorName: userName,
      content: formattedContent,
      color: newColor,
      x: startX,
      y: startY,
      likes: 0,
      createdAt: new Date()
    }
    
    setPosts(prev => [...prev, optimisticPost])
    setIsNewPostModalOpen(false)
    setQ1("")
    setQ2("")
    setQ3("")
    setQ4("")

    await createPostIt({
      authorName: userName,
      content: formattedContent,
      color: newColor,
      x: startX,
      y: startY
    })
    
    fetchPosts()
  }

  const handleDragEnd = async (id: string, info: any) => {
    // Si es un post temporal que aún no se guarda, ignorar el drag
    if (id.startsWith("temp-")) return;

    const postIndex = posts.findIndex(p => p.id === id)
    if (postIndex === -1) return
    
    const currentPost = posts[postIndex]
    const newX = currentPost.x + info.offset.x
    const newY = currentPost.y + info.offset.y
    
    // Actualización optimista local
    const newPosts = [...posts]
    newPosts[postIndex] = { ...currentPost, x: newX, y: newY }
    setPosts(newPosts)

    // Guardar en la BD
    await updatePostItPosition(id, newX, newY)
  }

  const handleDeletePost = async (id: string) => {
    // Optimistic delete
    setPosts(prev => prev.filter(p => p.id !== id))
    await deletePostIt(id)
    fetchPosts()
  }

  const handleEditStart = (post: PostIt) => {
    setEditingId(post.id)
    setEditContent(post.content)
  }

  const handleEditSave = async (id: string) => {
    if (!editContent.trim()) return

    // Optimistic update
    setPosts(prev => prev.map(p => p.id === id ? { ...p, content: editContent } : p))
    setEditingId(null)
    
    await updatePostItContent(id, editContent)
    fetchPosts()
  }

  const handleLike = async (id: string) => {
    // Optimistic update with NaN protection
    setPosts(prev => prev.map(p => p.id === id ? { ...p, likes: (p.likes || 0) + 1 } : p))
    await likePostIt(id)
  }

  // AI Connection Analyzer (Simulated Semantic Matching)
  const CATEGORIAS = [
    {
      name: "Sector Financiero",
      keywords: ["banco", "bancos", "seguro", "seguros", "cooperativa", "financiera", "financiero", "finanzas", "pichincha", "pacifico", "guayaquil", "institución", "banca", "contabilidad", "auditoría", "auditoria"]
    },
    {
      name: "Programación & Data",
      keywords: ["python", "r", "programar", "programación", "codigo", "datos", "data", "excel", "sql", "machine learning", "algoritmos", "software", "desarrollo"]
    },
    {
      name: "Mercados & Trading",
      keywords: ["trading", "inversion", "inversión", "inversiones", "cripto", "bolsa", "acciones", "mercado", "gane", "gané", "perdi", "perdí", "dinero", "quiebra", "dólares", "portafolio", "rentabilidad"]
    },
    {
      name: "Riesgos & Modelos",
      keywords: ["riesgo", "riesgos", "var", "montecarlo", "credito", "crédito", "liquidez", "basilea", "modelos", "estadística", "matemáticas", "cuantitativo", "quant"]
    },
    {
      name: "Deportes & Actividad",
      keywords: ["futbol", "fútbol", "tenis", "correr", "gym", "gimnasio", "deporte", "nadar", "bicicleta", "pesas", "crossfit", "ejercicio"]
    },
    {
      name: "Arte & Estilo de Vida",
      keywords: ["musica", "música", "guitarra", "piano", "leer", "pintar", "viajar", "cine", "peliculas", "cocinar", "fotografía", "arte", "libros"]
    },
    {
      name: "Gaming & Cultura Geek",
      keywords: ["videojuegos", "gaming", "tecnología", "pc", "playstation", "xbox", "anime", "jugar", "nintendo"]
    }
  ]
  
  const toggleNetwork = () => {
    setShowNetwork(!showNetwork)
  }

  const connections = showNetwork ? (() => {
    const foundConnections: {source: PostIt, target: PostIt, keyword: string}[] = []
    for (let i = 0; i < posts.length; i++) {
      for (let j = i + 1; j < posts.length; j++) {
        const p1 = posts[i]
        const p2 = posts[j]
        
        for (const cat of CATEGORIAS) {
          const p1Matches = cat.keywords.some(kw => new RegExp(`\\b${kw}\\b`, 'i').test(p1.content))
          const p2Matches = cat.keywords.some(kw => new RegExp(`\\b${kw}\\b`, 'i').test(p2.content))
          
          if (p1Matches && p2Matches) {
            foundConnections.push({ source: p1, target: p2, keyword: cat.name })
            break; 
          }
        }
      }
    }
    return foundConnections;
  })() : [];

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="flex flex-col h-screen overflow-hidden">
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 bg-white z-20">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <div className="flex-1">
            <h1 className="text-sm font-medium">Pizarra de Networking</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center text-sm text-zinc-500">
              Sesión como: <span className="font-medium text-zinc-800 ml-1">{userName}</span>
            </div>
            <Button 
              onClick={toggleNetwork}
              size="sm"
              variant={showNetwork ? "default" : "outline"}
              className={`shadow-sm ${showNetwork ? 'bg-blue-600 text-white hover:bg-blue-700' : 'border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100'}`}
              disabled={posts.length < 2}
            >
              <Network className="h-4 w-4 mr-1" />
              {showNetwork ? 'Ocultar Red Neural' : 'Ver Red Neural'}
            </Button>
            <Button 
              onClick={() => setIsNewPostModalOpen(true)}
              size="sm"
              className="shadow-sm"
            >
              <Plus className="h-4 w-4 mr-1" />
              Nuevo Post-it
            </Button>
          </div>
        </header>

        <main className="flex-1 relative bg-zinc-100 overflow-hidden" ref={boardRef}>

          {/* Pizarra Libre (Sin zonas temáticas) */}
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 opacity-10" 
                 style={{ backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)', backgroundSize: '24px 24px' }}>
            </div>
            
            {/* Capa de Conexiones Neurales (SVG) */}
            {showNetwork && (
              <div className="absolute inset-0 z-10 pointer-events-none transition-opacity duration-1000 bg-black/40">
                <svg className="w-full h-full">
                  {connections.map((conn, idx) => {
                    // Calculamos el centro aproximado de los post-its (w-80 = 320px, h aprox = 240px)
                    const x1 = conn.source.x + 160
                    const y1 = conn.source.y + 120
                    const x2 = conn.target.x + 160
                    const y2 = conn.target.y + 120
                    
                    return (
                      <g key={idx}>
                        <motion.line
                          initial={{ pathLength: 0, opacity: 0 }}
                          animate={{ pathLength: 1, opacity: 0.8 }}
                          transition={{ duration: 1.5, delay: Math.random() * 1.5 }}
                          x1={x1} y1={y1} x2={x2} y2={y2}
                          stroke="#3b82f6" // blue-500
                          strokeWidth="3"
                          strokeDasharray="5,5"
                        />
                        <motion.text
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 1, delay: 2 }}
                          x={(x1 + x2) / 2} y={(y1 + y2) / 2 - 10}
                          fill="#eff6ff"
                          fontSize="14"
                          fontWeight="bold"
                          textAnchor="middle"
                          className="drop-shadow-md"
                        >
                          {conn.keyword.toUpperCase()}
                        </motion.text>
                      </g>
                    )
                  })}
                </svg>
              </div>
            )}
            
            {/* Rendering Posts - z-index ensures they stay clickable or visible */}
            <div className="relative z-20">
              {posts.map((post) => {
              const isOwner = post.authorName === userName
              return (
                <motion.div
                  key={post.id}
                  drag={isOwner}
                  dragMomentum={false}
                  onDragEnd={(e, info) => isOwner && handleDragEnd(post.id, info)}
                  initial={{ x: post.x, y: post.y, scale: 0.9, opacity: 0 }}
                  animate={{ x: post.x, y: post.y, scale: 1, opacity: 1 }}
                  className={`absolute w-80 p-4 rounded-md shadow-md ${isOwner ? 'cursor-grab active:cursor-grabbing' : ''} border border-black/5 flex flex-col ${post.color}`}
                  style={{ minHeight: '240px' }}
                >
                  <div className="text-xs font-semibold text-black/50 mb-3 border-b border-black/10 pb-2 flex justify-between items-center">
                    <span>{post.authorName}</span>
                    <div className="flex items-center gap-1">
                      <span className="text-[10px] mr-1">{new Date(post.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                      {isOwner && editingId !== post.id && (
                        <>
                          <button 
                            onClick={() => handleEditStart(post)}
                            className="hover:bg-black/10 rounded-full p-1 transition-colors"
                            title="Editar post-it"
                          >
                            <Edit2 className="h-3 w-3 text-black/60" />
                          </button>
                          <button 
                            onClick={() => handleDeletePost(post.id)}
                            className="hover:bg-black/10 rounded-full p-1 transition-colors"
                            title="Eliminar post-it"
                          >
                            <X className="h-3 w-3 text-black/60" />
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                  
                  {editingId === post.id ? (
                    <div className="flex flex-col flex-1 h-full">
                      <textarea
                        value={editContent}
                        onChange={(e) => setEditContent(e.target.value)}
                        className="flex-1 w-full bg-transparent border border-black/20 rounded p-1 text-sm text-black/80 resize-none focus:outline-none focus:border-black/40"
                        autoFocus
                        onPointerDownCapture={(e) => e.stopPropagation()} 
                      />
                      <div className="flex justify-end gap-2 mt-2">
                        <button 
                          onClick={() => setEditingId(null)}
                          className="text-[10px] text-black/60 hover:bg-black/10 px-2 py-1 rounded"
                          onPointerDownCapture={(e) => e.stopPropagation()} 
                        >
                          Cancelar
                        </button>
                        <button 
                          onClick={() => handleEditSave(post.id)}
                          className="bg-black/10 hover:bg-black/20 text-black/80 rounded-full p-1 transition-colors"
                          title="Guardar"
                          onPointerDownCapture={(e) => e.stopPropagation()} 
                        >
                          <Check className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <p className="text-sm text-black/80 whitespace-pre-wrap flex-1">{post.content}</p>
                  )}

                  {/* Interacción Social */}
                  {!editingId && (
                    <div className="absolute -bottom-3 -right-3">
                      <button
                        onClick={() => handleLike(post.id)}
                        className="bg-white hover:bg-orange-50 border border-black/10 shadow-sm rounded-full px-2 py-1 flex items-center gap-1 text-xs font-bold text-orange-600 transition-transform hover:scale-110"
                        title="Validar y apoyar este post-it"
                        onPointerDownCapture={(e) => e.stopPropagation()}
                      >
                        <Flame className="h-3 w-3 fill-orange-500" />
                        <span>{post.likes || 0}</span>
                      </button>
                    </div>
                  )}
                </motion.div>
              )
            })}
            </div>
          </div>

          {/* Modal para crear un Post-it */}
          <Dialog open={isNewPostModalOpen} onOpenChange={setIsNewPostModalOpen}>
            <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Tu Perfil FinLab</DialogTitle>
                <DialogDescription>
                  Llena esta tarjeta para que tus compañeros puedan conocerte. ¡Solo habrá un post-it por persona!
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleCreatePost} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-zinc-600 uppercase">¿De dónde vienes?</label>
                  <input 
                    placeholder="Ej. Economista, Trabajo en Banco Pichincha..." 
                    value={q1}
                    onChange={(e) => setQ1(e.target.value)}
                    className="w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                    autoFocus
                  />
                </div>
                
                <div className="space-y-1">
                  <label className="text-xs font-bold text-zinc-600 uppercase">Tu mayor fracaso financiero</label>
                  <input 
                    placeholder="Ej. Invertí en LUNA y lo perdí todo..." 
                    value={q2}
                    onChange={(e) => setQ2(e.target.value)}
                    className="w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-zinc-600 uppercase">¿Qué esperas de FinLab?</label>
                  <input 
                    placeholder="Ej. Aprender a programar en R y Python..." 
                    value={q3}
                    onChange={(e) => setQ3(e.target.value)}
                    className="w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-zinc-600 uppercase">Un pasatiempo o gusto</label>
                  <input 
                    placeholder="Ej. Tocar la guitarra, jugar tenis, leer..." 
                    value={q4}
                    onChange={(e) => setQ4(e.target.value)}
                    className="w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                  />
                </div>
                
                <div className="space-y-2 pt-2 border-t">
                  <label className="text-sm text-zinc-500">Color del Post-it</label>
                  <div className="flex gap-2">
                    {COLORS.map(color => (
                      <button
                        key={color}
                        type="button"
                        onClick={() => setNewColor(color)}
                        className={`w-8 h-8 rounded-full border-2 ${color} ${newColor === color ? 'border-zinc-800 scale-110' : 'border-transparent hover:scale-105'} transition-all`}
                      />
                    ))}
                  </div>
                </div>

                <Button type="submit" className="w-full" disabled={!q1.trim() || !q2.trim() || !q3.trim() || !q4.trim()}>
                  <Send className="w-4 h-4 mr-2" /> Unirme a la Red
                </Button>
              </form>
            </DialogContent>
          </Dialog>

        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
