"use client"

import { useState, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { MessageCircle, Heart, Share, Repeat2, Send, CornerDownRight } from "lucide-react"
import { createPost, createReply, likePost, likeReply } from "./actions"

interface User {
  name: string | null;
  image: string | null;
}

interface Reply {
  id: string;
  content: string;
  likes: number;
  createdAt: Date;
  author: User;
}

interface Post {
  id: string;
  content: string;
  likes: number;
  createdAt: Date;
  author: User;
  replies: Reply[];
}

export function XFeed({ initialPosts, currentUserName }: { initialPosts: Post[], currentUserName: string }) {
  const [posts, setPosts] = useState<Post[]>(initialPosts)
  const [newPostContent, setNewPostContent] = useState("")
  const [replyingTo, setReplyingTo] = useState<string | null>(null)
  const [replyContent, setReplyContent] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Función para obtener las iniciales
  const getInitials = (name: string | null) => name ? name.charAt(0).toUpperCase() : "U";
  
  // Función para generar un handle (usuario)
  const getHandle = (name: string | null) => name ? `@${name.toLowerCase().replace(/\s+/g, '')}` : "@usuario";

  const handleCreatePost = async () => {
    if (!newPostContent.trim()) return;
    setIsSubmitting(true);
    await createPost(newPostContent);
    setNewPostContent("");
    setIsSubmitting(false);
    // Ideally we would fetch again, but Next.js router.refresh() or revalidatePath will handle the server reload.
    // For instant UI feeling, we can just let Server Actions revalidate the page.
  }

  const handleCreateReply = async (postId: string) => {
    if (!replyContent.trim()) return;
    setIsSubmitting(true);
    await createReply(postId, replyContent);
    setReplyContent("");
    setReplyingTo(null);
    setIsSubmitting(false);
  }

  const handleLikePost = async (postId: string) => {
    // Optimistic UI update
    setPosts(posts.map(p => p.id === postId ? { ...p, likes: (p.likes || 0) + 1 } : p))
    await likePost(postId);
  }

  const handleLikeReply = async (postId: string, replyId: string) => {
    setPosts(posts.map(p => p.id === postId ? {
      ...p,
      replies: (p.replies || []).map(r => r.id === replyId ? { ...r, likes: (r.likes || 0) + 1 } : r)
    } : p))
    await likeReply(replyId);
  }

  const handleReplyToComment = (postId: string, authorName: string | null) => {
    setReplyingTo(postId);
    setReplyContent(`@${authorName?.replace(/\s+/g, '') || 'usuario'} `);
    // Timeout to allow the input to render before focusing
    setTimeout(() => {
      document.getElementById(`reply-input-${postId}`)?.focus();
    }, 50);
  }

  return (
    <div className="max-w-2xl mx-auto border-x min-h-screen bg-white">
      
      {/* Composer Superior */}
      <div className="p-4 border-b flex gap-4">
        <div className="w-12 h-12 rounded-full bg-zinc-200 flex-shrink-0 flex items-center justify-center font-bold text-zinc-500 text-xl overflow-hidden">
          {getInitials(currentUserName)}
        </div>
        <div className="flex-1 space-y-3">
          <Textarea 
            placeholder="¿Qué está pasando en el mercado?" 
            className="w-full resize-none border-none focus-visible:ring-0 text-xl p-0 min-h-[60px]"
            value={newPostContent}
            onChange={(e) => setNewPostContent(e.target.value)}
          />
          <div className="flex justify-end pt-2 border-t">
            <Button 
              className="rounded-full px-6 font-bold" 
              onClick={handleCreatePost}
              disabled={isSubmitting || !newPostContent.trim()}
            >
              Publicar
            </Button>
          </div>
        </div>
      </div>

      {/* Feed (Timeline) */}
      <div className="divide-y">
        {posts.map(post => (
          <div key={post.id} className="p-4 hover:bg-zinc-50 transition-colors cursor-pointer relative group">
            <div className="flex gap-4">
              {/* Avatar */}
              <div className="w-12 h-12 rounded-full bg-primary/10 flex-shrink-0 flex items-center justify-center font-bold text-primary overflow-hidden">
                {post.author?.image ? <img src={post.author.image} alt="Avatar" /> : getInitials(post.author?.name)}
              </div>
              
              {/* Contenido del Post */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-bold text-zinc-900 hover:underline">{post.author?.name || "Usuario Anónimo"}</span>
                  <span className="text-zinc-500">{getHandle(post.author?.name)}</span>
                  <span className="text-zinc-500">·</span>
                  <span className="text-zinc-500 hover:underline">{post.createdAt ? new Date(post.createdAt).toLocaleDateString() : ""}</span>
                </div>
                
                {/* Text content with preserved newlines */}
                <div className="text-zinc-900 text-[15px] leading-relaxed whitespace-pre-wrap mb-3">
                  {post.content}
                </div>
                
                {/* Interacciones */}
                <div className="flex items-center justify-between text-zinc-500 max-w-md">
                  <button 
                    onClick={() => setReplyingTo(replyingTo === post.id ? null : post.id)}
                    className="flex items-center gap-2 hover:text-blue-500 group/btn"
                  >
                    <div className="p-2 rounded-full group-hover/btn:bg-blue-100 transition-colors">
                      <MessageCircle className="w-5 h-5" />
                    </div>
                    <span className="text-sm">{post.replies?.length || 0}</span>
                  </button>
                  <button className="flex items-center gap-2 hover:text-green-500 group/btn">
                    <div className="p-2 rounded-full group-hover/btn:bg-green-100 transition-colors">
                      <Repeat2 className="w-5 h-5" />
                    </div>
                  </button>
                  <button 
                    onClick={() => handleLikePost(post.id)}
                    className="flex items-center gap-2 hover:text-pink-500 group/btn"
                  >
                    <div className="p-2 rounded-full group-hover/btn:bg-pink-100 transition-colors">
                      <Heart className="w-5 h-5" />
                    </div>
                    <span className="text-sm">{post.likes || 0}</span>
                  </button>
                  <button className="flex items-center gap-2 hover:text-blue-500 group/btn">
                    <div className="p-2 rounded-full group-hover/btn:bg-blue-100 transition-colors">
                      <Share className="w-5 h-5" />
                    </div>
                  </button>
                </div>
              </div>
            </div>

            {/* Hilo de Respuestas (Socratic Thread) */}
            {((post.replies?.length || 0) > 0 || replyingTo === post.id) && (
              <div className="mt-4 pl-4 border-l-2 border-zinc-200 ml-6 space-y-4 pt-2">
                
                {(post.replies || []).map(reply => (
                  <div key={reply.id} className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-secondary flex-shrink-0 flex items-center justify-center font-bold text-xs">
                       {getInitials(reply.author?.name)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-zinc-900">{reply.author?.name || "Anónimo"}</span>
                        <span className="text-xs text-zinc-500">{getHandle(reply.author?.name)}</span>
                      </div>
                      <div className="text-zinc-800 text-sm whitespace-pre-wrap mt-0.5">
                        {reply.content}
                      </div>
                      <div className="flex items-center gap-4 mt-2 text-zinc-500">
                        <button 
                          onClick={() => handleLikeReply(post.id, reply.id)}
                          className="flex items-center gap-1.5 hover:text-pink-500 transition-colors text-xs"
                        >
                          <Heart className="w-3.5 h-3.5" />
                          <span>{reply.likes || 0}</span>
                        </button>
                        <button 
                          onClick={() => handleReplyToComment(post.id, reply.author?.name || null)}
                          className="flex items-center gap-1.5 hover:text-blue-500 transition-colors text-xs"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span>Responder</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Caja para Responder */}
                {replyingTo === post.id && (
                  <div className="flex gap-3 mt-4 pt-4 border-t border-zinc-100">
                    <div className="w-8 h-8 rounded-full bg-zinc-200 flex-shrink-0 flex items-center justify-center font-bold text-zinc-500 text-xs">
                      {getInitials(currentUserName)}
                    </div>
                    <div className="flex-1 flex gap-2">
                      <Input 
                        id={`reply-input-${post.id}`}
                        placeholder="Postea tu respuesta..." 
                        value={replyContent}
                        onChange={(e) => setReplyContent(e.target.value)}
                        className="h-10 text-sm bg-zinc-50"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleCreateReply(post.id);
                          }
                        }}
                      />
                      <Button 
                        size="icon" 
                        onClick={() => handleCreateReply(post.id)}
                        disabled={isSubmitting || !replyContent.trim()}
                        className="rounded-full shrink-0"
                      >
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
        
        {posts.length === 0 && (
          <div className="p-12 text-center text-zinc-500">
            Aún no hay discusiones. ¡Sé el primero en iniciar un debate!
          </div>
        )}
      </div>
    </div>
  )
}
