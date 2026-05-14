"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Plus, Send, RefreshCw, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { getPostIts, createPostIt, updatePostItPosition } from "./actions"

type PostIt = {
  id: string
  authorName: string
  content: string
  color: string
  x: number
  y: number
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

export default function NetworkingPage() {
  const [posts, setPosts] = useState<PostIt[]>([])
  const [userName, setUserName] = useState("")
  const [isNameModalOpen, setIsNameModalOpen] = useState(true)
  const [isNewPostModalOpen, setIsNewPostModalOpen] = useState(false)
  
  const [newContent, setNewContent] = useState("")
  const [newColor, setNewColor] = useState(COLORS[0])
  
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

  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (userName.trim()) {
      setIsNameModalOpen(false)
    }
  }

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newContent.trim()) return

    // Posición inicial aleatoria cerca del centro
    const startX = window.innerWidth / 2 - 100 + (Math.random() * 50 - 25)
    const startY = window.innerHeight / 2 - 100 + (Math.random() * 50 - 25)

    const optimisticPost: PostIt = {
      id: "temp-" + Date.now(),
      authorName: userName,
      content: newContent,
      color: newColor,
      x: startX,
      y: startY,
      createdAt: new Date()
    }
    
    setPosts(prev => [...prev, optimisticPost])
    setIsNewPostModalOpen(false)
    setNewContent("")

    await createPostIt({
      authorName: userName,
      content: newContent,
      color: newColor,
      x: startX,
      y: startY
    })
    
    fetchPosts()
  }

  const handleDragEnd = async (id: string, info: any) => {
    // Si es un post temporal que aún no se guarda, ignorar el drag
    if (id.startsWith("temp-")) return;

    // Obtener la posición relativa a la ventana actual 
    // Usamos info.point.x, pero como el motion.div guarda su posición internamente, 
    // lo mejor es buscar el elemento en el DOM y obtener su transform.
    // Framer motion pasa info con el desplazamiento
    
    // Para simplificar, obtenemos la posición actual desde el estado, 
    // y le sumamos el desplazamiento final de este drag event.
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

  return (
    <div className="min-h-screen bg-zinc-100 overflow-hidden relative font-sans" ref={boardRef}>
      {/* Header flotante */}
      <div className="absolute top-4 left-4 right-4 z-10 flex justify-between items-center pointer-events-none">
        <div className="bg-white/80 backdrop-blur-md px-4 py-2 rounded-full shadow-sm border border-zinc-200 pointer-events-auto">
          <h1 className="font-bold text-zinc-800">Networking FinLab</h1>
        </div>
        
        {!isNameModalOpen && (
          <div className="flex gap-2 pointer-events-auto">
            <div className="bg-white/80 backdrop-blur-md px-4 py-2 rounded-full shadow-sm border border-zinc-200 flex items-center gap-2">
              <span className="text-sm text-zinc-500">Sesión como:</span>
              <span className="font-medium text-zinc-800">{userName}</span>
            </div>
            <Button 
              onClick={() => setIsNewPostModalOpen(true)}
              className="rounded-full shadow-md hover:shadow-lg transition-all"
            >
              <Plus className="h-4 w-4 mr-2" />
              Nuevo Post-it
            </Button>
          </div>
        )}
      </div>

      {/* Pizarra Libre */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 opacity-20" 
             style={{ backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)', backgroundSize: '24px 24px' }}>
        </div>
        
        {posts.map((post) => (
          <motion.div
            key={post.id}
            drag
            dragMomentum={false}
            onDragEnd={(e, info) => handleDragEnd(post.id, info)}
            initial={{ x: post.x, y: post.y, scale: 0.9, opacity: 0 }}
            animate={{ x: post.x, y: post.y, scale: 1, opacity: 1 }}
            className={`absolute w-64 p-4 rounded-md shadow-md cursor-grab active:cursor-grabbing border border-black/5 flex flex-col ${post.color}`}
            style={{ minHeight: '160px' }}
          >
            <div className="text-xs font-semibold text-black/50 mb-2 border-b border-black/10 pb-1 flex justify-between items-center">
              <span>{post.authorName}</span>
              <span className="text-[10px]">{new Date(post.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
            </div>
            <p className="text-black/80 whitespace-pre-wrap flex-1">{post.content}</p>
          </motion.div>
        ))}
      </div>

      {/* Modal para pedir el nombre */}
      <Dialog open={isNameModalOpen} onOpenChange={() => {}}>
        <DialogContent className="sm:max-w-md [&>button]:hidden">
          <DialogHeader>
            <DialogTitle>Bienvenido al área de Networking</DialogTitle>
            <DialogDescription>
              Por favor, ingresa tu nombre o un apodo para que los demás puedan identificarte en la pizarra.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleNameSubmit} className="space-y-4">
            <Input 
              placeholder="Tu nombre (Ej. Juan Pérez)" 
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              autoFocus
              className="text-lg py-6"
            />
            <Button type="submit" className="w-full" disabled={!userName.trim()}>
              Entrar a la Pizarra
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Modal para crear un Post-it */}
      <Dialog open={isNewPostModalOpen} onOpenChange={setIsNewPostModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Escribir un Post-it</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleCreatePost} className="space-y-4">
            <Textarea 
              placeholder="¿Qué quieres compartir con la clase?" 
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              className="min-h-[120px] resize-none"
              autoFocus
            />
            
            <div className="space-y-2">
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

            <Button type="submit" className="w-full" disabled={!newContent.trim()}>
              <Send className="w-4 h-4 mr-2" /> Pegar en la Pizarra
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
