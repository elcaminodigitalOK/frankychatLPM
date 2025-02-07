// app/chat/page.tsx
"use client"

import { Terminal, PenSquare, FileCode2, Blocks, Send, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/app/components/ui/textarea"
import { NavBar } from "@/nav-bar"
import { TechGrid } from "@/tech-grid"
import { useState } from "react"
import { Workspace } from "@/app/components/workspace"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select"
import { Input } from "@/app/components/ui/input"
import { useRouter } from "next/router"

export default function ChatPage() {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hola! Soy Franky, tu experto en Linux. ¿En qué puedo ayudarte hoy?" }
  ])
  const [input, setInput] = useState("")

  const handleSend = () => {
    if (input.trim()) {
      const newMessage = { role: "user", content: input }
      setMessages([...messages, newMessage])
      // Aquí iría la lógica para enviar el mensaje a la IA y obtener la respuesta
      // Por ahora, simularemos la respuesta
      const response = { role: "assistant", content: "¡Claro! Estoy aquí para ayudarte con tu consulta sobre Linux." }
      setMessages([...messages, newMessage, response])
      setInput("")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-zinc-900 text-white">
      <NavBar />

      <main className="container mx-auto px-4 pt-20 pb-32">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h1 className="text-5xl font-bold tracking-tight text-green-500">
            Chat de Franky
          </h1>
          <div className="mt-8">
            <div className="bg-zinc-900/50 border-zinc-800 p-4 rounded">
              <div className="flex flex-col gap-2">
                {messages.map((msg, index) => (
                  <div key={index} className={`${msg.role === "assistant" ? "bg-zinc-800/50" : "bg-zinc-900/50"} p-2 rounded`}>
                    <p>{msg.content}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <Textarea
                  placeholder="Escribe tu mensaje aquí..."
                  className="bg-zinc-900/50 border-zinc-800 h-32 resize-none text-lg pr-12"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault()
                      handleSend()
                    }
                  }}
                />
                <Button className="absolute bottom-2 right-2" onClick={handleSend} disabled={!input.trim()}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}