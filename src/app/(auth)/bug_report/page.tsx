"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Bug, Send, AlertCircle, Image, X } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"
import {Toaster} from "@/components/ui/sonner";

export default function BugReportPage() {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [screenshot, setScreenshot] = useState<File | null>(null)
    const [previewUrl, setPreviewUrl] = useState<string | null>(null)
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        category: "",
        priority: "",
        url: ""
    })

    const handleScreenshotChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        // Validazione tipo file
        if (!file.type.startsWith('image/')) {
            toast.error("Carica solo file immagine")
            return
        }

        // Validazione dimensione (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            toast.error("L'immagine è troppo grande. Massimo 5MB")
            return
        }

        setScreenshot(file)

        // Crea preview
        const reader = new FileReader()
        reader.onloadend = () => {
            setPreviewUrl(reader.result as string)
        }
        reader.readAsDataURL(file)
    }

    const removeScreenshot = () => {
        setScreenshot(null)
        setPreviewUrl(null)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        // Validazione base
        if (!formData.title || !formData.description || !formData.category || !formData.priority) {
            toast.error("Compila tutti i campi obbligatori")
            return
        }

        setIsSubmitting(true)

        try {
            // Simula invio (qui puoi integrare con API/database)
            await new Promise(resolve => setTimeout(resolve, 1500))

            toast.success("Bug segnalato con successo!", {
                description: "Grazie per il tuo contributo. Esamineremo la segnalazione al più presto."
            })

            // Reset form
            setFormData({
                title: "",
                description: "",
                category: "",
                priority: "",
                url: ""
            })
            removeScreenshot()
        } catch (error) {
            toast.error("Errore nell'invio della segnalazione. Riprova più tardi.")
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }))
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
            {/* Header */}
                <div className="container mx-auto px-4 py-6">
                    <div className="flex items-center gap-3">
                        <div>
                            <p className="text-muted-foreground mt-1">Aiutaci a migliorare la piattaforma</p>
                        </div>
                    </div>
                </div>

            {/* Main Content */}
            <main className="container mx-auto mt-0 px-4  max-w-3xl">
                <Card className="shadow-lg">
                    <CardHeader className="space-y-1">
                        <CardTitle className="text-2xl">Descrivi il problema</CardTitle>
                        <CardDescription>
                            Fornisci quante più informazioni possibili per aiutarci a risolvere il bug rapidamente
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Titolo */}
                            <div className="space-y-2">
                                <Label htmlFor="title" className="flex items-center gap-2">
                                    Titolo <span className="text-destructive">*</span>
                                </Label>
                                <Input
                                    id="title"
                                    placeholder="Breve descrizione del problema"
                                    value={formData.title}
                                    onChange={(e) => handleChange("title", e.target.value)}
                                    required
                                    className="w-full"
                                />
                            </div>

                            {/* Descrizione */}
                            <div className="space-y-2">
                                <Label htmlFor="description" className="flex items-center gap-2">
                                    Descrizione dettagliata <span className="text-destructive">*</span>
                                </Label>

                                <Textarea
                                    id="description"
                                    placeholder="Descrivi il bug in dettaglio: cosa è successo, cosa ti aspettavi, e i passaggi per riprodurlo..."
                                    value={formData.description}
                                    onChange={(e) => {
                                        if (e.target.value.length <= 3500) {
                                            handleChange("description", e.target.value);
                                        }
                                    }}
                                    required
                                    rows={6}
                                    className="w-full resize-none"
                                />

                                <div className="flex items-center justify-between">
                                    <p className="text-xs text-muted-foreground">
                                        Include i passaggi per riprodurre il bug e qualsiasi messaggio di errore
                                    </p>
                                    <p
                                        className={`text-xs ${
                                            formData.description.length > 3400
                                                ? "text-destructive"
                                                : "text-muted-foreground"
                                        }`}
                                    >
                                        {formData.description.length}/3500
                                    </p>
                                </div>
                            </div>


                            {/* Screenshot Upload */}
                            <div className="space-y-2">
                                <Label htmlFor="screenshot" className="flex items-center gap-2">
                                    Screenshot (opzionale)
                                </Label>

                                {!previewUrl ? (
                                    <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
                                        <input
                                            id="screenshot"
                                            type="file"
                                            accept="image/*"
                                            onChange={handleScreenshotChange}
                                            className="hidden"
                                        />
                                        <label
                                            htmlFor="screenshot"
                                            className="cursor-pointer flex flex-col items-center gap-2"
                                        >
                                            <Image className="h-10 w-10 text-muted-foreground" />
                                            <div className="text-sm">
                                                <span className="font-medium text-primary">Clicca per caricare</span>
                                                <span className="text-muted-foreground"> o trascina un file</span>
                                            </div>
                                            <p className="text-xs text-muted-foreground">
                                                PNG, JPG, GIF fino a 5MB
                                            </p>
                                        </label>
                                    </div>
                                ) : (
                                    <div className="relative border border-border rounded-lg p-2">
                                        <img
                                            src={previewUrl}
                                            alt="Screenshot preview"
                                            className="w-full h-auto rounded-md"
                                        />
                                        <Button
                                            type="button"
                                            variant="destructive"
                                            size="icon"
                                            className="absolute top-4 right-4"
                                            onClick={removeScreenshot}
                                        >
                                            <X className="h-4 w-4" />
                                        </Button>
                                        <p className="text-xs text-muted-foreground mt-2">
                                            {screenshot?.name} ({(screenshot!.size / 1024).toFixed(1)} KB)
                                        </p>
                                    </div>
                                )}
                            </div>

                            {/* Categoria e Priorità - Grid responsive */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {/* Categoria */}
                                <div className="space-y-2">
                                    <Label htmlFor="category" className="flex items-center gap-2">
                                        Categoria <span className="text-destructive">*</span>
                                    </Label>
                                    <Select
                                        value={formData.category}
                                        onValueChange={(value) => handleChange("category", value)}
                                        required
                                    >
                                        <SelectTrigger id="category">
                                            <SelectValue placeholder="Seleziona categoria" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="ui">Interfaccia Utente</SelectItem>
                                            <SelectItem value="functionality">Funzionalità</SelectItem>
                                            <SelectItem value="performance">Performance</SelectItem>
                                            <SelectItem value="security">Sicurezza</SelectItem>
                                            <SelectItem value="other">Altro</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* Priorità */}
                                <div className="space-y-2">
                                    <Label htmlFor="priority" className="flex items-center gap-2">
                                        Priorità <span className="text-destructive">*</span>
                                    </Label>
                                    <Select
                                        value={formData.priority}
                                        onValueChange={(value) => handleChange("priority", value)}
                                        required
                                    >
                                        <SelectTrigger id="priority">
                                            <SelectValue placeholder="Seleziona priorità" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="low">Bassa</SelectItem>
                                            <SelectItem value="medium">Media</SelectItem>
                                            <SelectItem value="high">Alta</SelectItem>
                                            <SelectItem value="critical">Critica</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            {/* URL della pagina */}
                            <div className="space-y-2">
                                <Label htmlFor="url">URL della pagina (opzionale)</Label>
                                <Input
                                    id="url"
                                    type="url"
                                    placeholder="https://esempio.com/pagina-con-bug"
                                    value={formData.url}
                                    onChange={(e) => handleChange("url", e.target.value)}
                                    className="w-full"
                                />
                            </div>

                            {/* Info Box */}
                            <div className="bg-muted/50 border border-border rounded-lg p-4 flex gap-3">
                                <AlertCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                                <div className="text-sm space-y-1">
                                    <p className="font-medium">Suggerimenti per una buona segnalazione:</p>
                                    <ul className="list-disc list-inside text-muted-foreground space-y-1">
                                        <li>Sii specifico e dettagliato</li>
                                        <li>Includi i passaggi per riprodurre il bug</li>
                                        <li>Specifica browser e dispositivo utilizzati</li>
                                        <li>Allega screenshot se possibile</li>
                                    </ul>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <Button
                                type="submit"
                                className="w-full sm:w-auto min-w-[200px]"
                                size="lg"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <>
                                        <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                                        Invio in corso...
                                    </>
                                ) : (
                                    <>
                                        <Send className="h-4 w-4 mr-2" />
                                        Invia Segnalazione
                                    </>
                                )}
                            </Button>
                        </form>
                    </CardContent>
                </Card>

                {/* Success indicator for accessibility */}
                <div className="sr-only" role="status" aria-live="polite" aria-atomic="true">
                    {isSubmitting ? "Invio segnalazione in corso" : ""}
                </div>

                <Toaster/>
            </main>
        </div>
    )
}
