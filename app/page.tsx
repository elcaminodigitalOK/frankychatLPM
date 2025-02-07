// app/page.tsx
"use client"

import { Terminal, PenSquare, FileCode2, Blocks, Send, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/app/components/ui/textarea"
import { NavBar } from "./components/nav-bar"
import { TechGrid } from "./components/tech-grid"
import { useState } from "react"
import { Workspace } from "./components/workspace"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select"
import { Input } from "@/app/components/ui/input"
import { useRouter } from "next/router"

const platforms = [
  'OpenRouter Integration',
  'Gemini Integration',
  'Autogenerate Ollama models from what is downloaded',
  'DeepSeek API Integration',
  'Mistral API Integration',
  'Open AI Like API Integration',
  'xAI Grok Beta Integration',
  'LM Studio Integration',
  'HuggingFace Integration',
  'Cohere Integration',
  'Together Integration',
  'Perplexity Integration'
]

export default function Page() {
  const [chatStarted, setChatStarted] = useState(false)
  const [initialMessage, setInitialMessage] = useState("")
  const [apiKey, setApiKey] = useState("")
  const [isApiKeyValid, setIsApiKeyValid] = useState(false)
  const [selectedPlatform, setSelectedPlatform] = useState("")
  const router = useRouter()

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

  const handlePlatformSelect = (platform: string) => {
    setSelectedPlatform(platform)
  }

  const handleApiKeyConfirm = () => {
    // Aquí debes agregar la lógica para validar la API key
    // Por ahora, simularemos la validación
    if (apiKey.trim()) {
      setIsApiKeyValid(true)
    } else {
      alert("Por favor, introduce una API key válida.")
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
          <h1 className={`text-5xl font-bold tracking-tight ${isApiKeyValid ? 'text-green-500' : 'text-white'}`}>
            {isApiKeyValid ? '¡API Key válida!' : '¿Necesitas ayuda con Linux?'}
          </h1>
          <p className="text-zinc-400 text-lg">
            Pregúntale a Franky sobre comandos Linux, administración de sistemas o desarrollo
          </p>

          {!isApiKeyValid && (
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
          )}

          {!isApiKeyValid && (
            <div className="flex gap-2 justify-center mt-6">
              <Select defaultValue="" onValueChange={handlePlatformSelect}>
                <SelectTrigger className="w-[180px] bg-zinc-900/50 border-zinc-800">
                  <SelectValue placeholder="Seleccionar plataforma" />
                </SelectTrigger>
                <SelectContent>
                  {platforms.map((platform) => (
                    <SelectItem key={platform} value={platform}>
                      {platform}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

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
                    onClick={handleApiKeyConfirm}
                  >
                    <Check className="h-4 w-4" />
                  </Button>
                )}
              </div>

              <Button
                className="bg-green-600 hover:bg-green-700 px-4 h-10"
                onClick={handleApiKeyConfirm}
              >
                <Check className="h-5 w-5 text-green-200" />
              </Button>
              <Button className="bg-green-600 hover:bg-green-700" onClick={() => {
                if (apiKey.trim()) {
                  // Aquí iría la lógica de confirmación
                  setIsApiKeyValid(true)
                } else {
                  alert("Por favor, introduce una API key válida.")
                }
              }}>
                GET API
              </Button>
            </div>
          )}

          {isApiKeyValid && (
            <div className="mt-16">
              <Button
                className="bg-green-600 hover:bg-green-700 px-6 py-3 text-xl"
                onClick={() => router.push('/chat')}
              >
                Iniciar Chat
              </Button>
            </div>
          )}

          <div className="mt-16">
            <p className="text-zinc-500 mb-6">o explora distribuciones populares de Linux</p>
            <TechGrid />
          </div>
        </div>
      </main>
    </div>
  )
}