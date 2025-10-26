"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertCircle, Image, Send, X } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"
import { Toaster } from "@/components/ui/sonner";
import { makeBugReportAct } from "@/app/[locale]/(private)/bug_report/actions";
import { useTranslations } from "next-intl";

export default function BugReportPage() {
    const t = useTranslations("bugreport"); // ✅ hook traduzioni

    const [isSubmitting, setIsSubmitting] = useState(false)
    const [screenshot, setScreenshot] = useState<File | null>(null)
    const [attachment, setAttachment] = useState<string | null>(null)
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

        if (!file.type.startsWith('image/')) {
            toast.error(t("uploadImageErrorType"))
            return
        }

        if (file.size > 800 * 1024) {
            toast.error(t("uploadImageErrorSize"))
            return
        }

        setScreenshot(file)
        const reader = new FileReader()
        reader.onloadend = () => {
            setPreviewUrl(reader.result as string)
            setAttachment(reader.result as string)
        }
        reader.readAsDataURL(file)
    }

    const removeScreenshot = () => {
        setScreenshot(null)
        setPreviewUrl(null)
        setAttachment(null)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!formData.title || !formData.description || !formData.category || !formData.priority) {
            toast.error(t("fillRequired"))
            return
        }

        setIsSubmitting(true)

        try {
            await makeBugReportAct({
                title: formData.title,
                description: formData.description,
                category: formData.category,
                priority: formData.priority,
                attachment: attachment,
                url: formData.url
            });

            toast.success(t("submitSuccess"), { description: t("submitSuccessDesc") })

            setFormData({ title: "", description: "", category: "", priority: "", url: "" })
            removeScreenshot()
        } catch (error) {
            toast.error(t("submitError"))
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
                        <p className="text-muted-foreground mt-1">{t("helpImprove")}</p>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <main className="container mx-auto mt-0 px-4 max-w-3xl">
                <Card className="shadow-lg">
                    <CardHeader className="space-y-1">
                        <CardTitle className="text-2xl">{t("describeProblem")}</CardTitle>
                        <CardDescription>{t("descriptionDetail")}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Titolo */}
                            <div className="space-y-2">
                                <Label htmlFor="title" className="flex items-center gap-2">
                                    {t("title")} <span className="text-destructive">*</span>
                                </Label>
                                <Input
                                    id="title"
                                    placeholder={t("titlePlaceholder")}
                                    value={formData.title}
                                    onChange={(e) => handleChange("title", e.target.value)}
                                    required
                                    className="w-full"
                                />
                            </div>

                            {/* Descrizione */}
                            <div className="space-y-2">
                                <Label htmlFor="description" className="flex items-center gap-2">
                                    {t("description")} <span className="text-destructive">*</span>
                                </Label>
                                <Textarea
                                    id="description"
                                    placeholder={t("descriptionPlaceholder")}
                                    value={formData.description}
                                    onChange={(e) => {
                                        if (e.target.value.length <= 3500) handleChange("description", e.target.value)
                                    }}
                                    required
                                    rows={6}
                                    className="w-full resize-none"
                                />
                                <div className="flex items-center justify-between">
                                    <p className="text-xs text-muted-foreground">{t("descriptionNote")}</p>
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
                                <Label htmlFor="screenshot" className="flex items-center gap-2">{t("screenshot")}</Label>
                                {!previewUrl ? (
                                    <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
                                        <input
                                            id="screenshot"
                                            type="file"
                                            accept="image/*"
                                            onChange={handleScreenshotChange}
                                            className="hidden"
                                        />
                                        <label htmlFor="screenshot" className="cursor-pointer flex flex-col items-center gap-2">
                                            <Image className="h-10 w-10 text-muted-foreground" />
                                            <div className="text-sm">
                                                <span className="font-medium text-primary">{t("clickUpload")}</span>
                                                <span className="text-muted-foreground"> {t("orDrag")}</span>
                                            </div>
                                            <p className="text-xs text-muted-foreground">{t("fileTypes")}</p>
                                        </label>
                                    </div>
                                ) : (
                                    <div className="relative border border-border rounded-lg p-2">
                                        <img
                                            src={previewUrl}
                                            alt={t("screenshotPreviewAlt")}
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

                            {/* Categoria e Priorità */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="category" className="flex items-center gap-2">{t("category")} <span className="text-destructive">*</span></Label>
                                    <Select value={formData.category} onValueChange={(value) => handleChange("category", value)} required>
                                        <SelectTrigger id="category">
                                            <SelectValue placeholder={t("categoryPlaceholder")} />
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
                                <div className="space-y-2">
                                    <Label htmlFor="priority" className="flex items-center gap-2">{t("priority")} <span className="text-destructive">*</span></Label>
                                    <Select value={formData.priority} onValueChange={(value) => handleChange("priority", value)} required>
                                        <SelectTrigger id="priority">
                                            <SelectValue placeholder={t("priorityPlaceholder")} />
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

                            {/* URL */}
                            <div className="space-y-2">
                                <Label htmlFor="url">{t("url")}</Label>
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
                                    <p className="font-medium">{t("tipsHeader")}</p>
                                    <ul className="list-disc list-inside text-muted-foreground space-y-1">
                                        <li>{t("tip1")}</li>
                                        <li>{t("tip2")}</li>
                                        <li>{t("tip3")}</li>
                                        <li>{t("tip4")}</li>
                                    </ul>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <Button type="submit" className="w-full sm:w-auto min-w-[200px]" size="lg" disabled={isSubmitting}>
                                {isSubmitting ? (
                                    <>
                                        <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                                        {t("submitting")}
                                    </>
                                ) : (
                                    <>
                                        <Send className="h-4 w-4 mr-2" />
                                        {t("sendReport")}
                                    </>
                                )}
                            </Button>
                        </form>
                    </CardContent>
                </Card>

                <div className="sr-only" role="status" aria-live="polite" aria-atomic="true">
                    {isSubmitting ? t("submitting") : ""}
                </div>

                <Toaster/>
            </main>
        </div>
    )
}
