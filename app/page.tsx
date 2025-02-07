"use client"

import { Terminal, PenSquare, FileCode2, Blocks, Send, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { NavBar } from "./components/nav-bar"
import { TechGrid } from "./components/tech-grid"
import { useState } from "react"
import { Workspace } from "./components/workspace"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"

export default function Page() {
  const [chatStarted, setChatStarted] = useState(false)
  const [initialMessage, setInitialMessage] = useState("")
  const [apiKey, setApiKey] = useState("")

  const handleSendMessage = () => {
    if (initialMessage.trim()) {
      setChatStarted(true)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  if (chatStarted) {
    return <Workspace initialMessage={initialMessage} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-zinc-900 text-white">
      <NavBar />

      <main className="container mx-auto px-4 pt-20 pb-32">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h1 className="text-5xl font-bold tracking-tight">¿Necesitas ayuda con Linux?</h1>
          <p className="text-zinc-400 text-lg">
            Pregúntale a Franky sobre comandos Linux, administración de sistemas o desarrollo
          </p>

          <div className="mt-8 relative">
            <Textarea
              placeholder="¿En qué te puede ayudar Franky hoy? Pregunta sobre comandos Linux, configuración de servidores o desarrollo..."
              className="bg-zinc-900/50 border-zinc-800 h-32 resize-none text-lg pr-12"
              value={initialMessage}
              onChange={(e) => setInitialMessage(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <Button className="absolute bottom-2 right-2" onClick={handleSendMessage} disabled={!initialMessage.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex gap-2 justify-center mt-6">
            <Select defaultValue="groq">
              <SelectTrigger className="w-[180px] bg-zinc-900/50 border-zinc-800">
                <SelectValue placeholder="Seleccionar modelo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="groq">Groq</SelectItem>
                <SelectItem value="gpt4">GPT-4</SelectItem>
                <SelectItem value="gpt35">GPT-3.5</SelectItem>
              </SelectContent>
            </Select>

            <Select defaultValue="llama2">
              <SelectTrigger className="w-[180px] bg-zinc-900/50 border-zinc-800">
                <SelectValue placeholder="Seleccionar LLM" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="llama2">LLama-2</SelectItem>
                <SelectItem value="mistral">Mistral</SelectItem>
                <SelectItem value="mixtral">Mixtral</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex gap-2">
              <div className="relative">
                <Input
                  type="password"
                  placeholder="Introducir API KEY"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  className="w-[240px] bg-zinc-900/50 border-zinc-800"
                />
                {apiKey && (
                  <Button
                    size="icon"
                    className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6 bg-green-700 hover:bg-green-800"
                  >
                    <Check className="h-4 w-4" />
                  </Button>
                )}
              </div>
              <Button
                className="bg-green-600 hover:bg-green-700 px-4 h-10"
                onClick={() => {
                  if (apiKey) {
                    // Aquí iría la lógica de confirmación
                  }
                }}
              >
                <Check className="h-5 w-5 text-green-200" />
              </Button>
              <Button className="bg-green-600 hover:bg-green-700">GET API</Button>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 justify-center mt-6">
            <Button variant="outline" className="bg-zinc-900/50 border-zinc-800">
              <Terminal className="mr-2 h-4 w-4" />
              Aprender comandos básicos
            </Button>
            <Button variant="outline" className="bg-zinc-900/50 border-zinc-800">
              <PenSquare className="mr-2 h-4 w-4" />
              Escribir un script shell
            </Button>
            <Button variant="outline" className="bg-zinc-900/50 border-zinc-800">
              <FileCode2 className="mr-2 h-4 w-4" />
              Configurar servicios
            </Button>
            <Button variant="outline" className="bg-zinc-900/50 border-zinc-800">
              <Blocks className="mr-2 h-4 w-4" />
              Desplegar aplicaciones
            </Button>
          </div>

          <div className="mt-16">
            <p className="text-zinc-500 mb-6">o explora distribuciones populares de Linux</p>
            <TechGrid />
          </div>
        </div>
      </main>
    </div>
  )
}

