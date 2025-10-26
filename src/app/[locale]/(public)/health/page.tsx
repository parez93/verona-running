import {apiRoutes} from "@/lib/api/apiRoutes";
import {api} from "@/lib/api/apiClient";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import {Badge} from "@/components/ui/badge"
import {Activity, CheckCircle2, Server, XCircle} from "lucide-react"

export default async function HealthPage() {
/*
    // Esempio server-side per fetching dati. Ricordati che la funzione deve essere async e 'user server' in cima al file
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
    const events:Event[] =  await api.get(`${baseUrl}${apiRoutes.events.upcoming}`)

    // Esempio client-side per fetching dati. Ricordati che la funzione NON deve essere async e 'use client' in cima al file
    const { list: listEvents, upcoming: listEventsUpcoming } = useEvents()
    const { data: events } = listEventsUpcoming()
*/

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
    const health:{ status: string, timestamp: string } =  await api.get(`${baseUrl}${apiRoutes.system.health}`)

    const services = [
        {
            name: "API Server",
            status: health.status === 'ok' ? "online" : 'offline',
            icon: <Server className="h-5 w-5" />
        },
    ]

    const allOnline = services.every(s => s.status === "online")


    return (
        <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
            {/* Header */}
            <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-10">
                <div className="container mx-auto px-4 py-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Activity className="h-8 w-8 text-primary" />
                            <div>
                                <h1 className="text-3xl sm:text-4xl font-bold">Health Check</h1>
                                <p className="text-muted-foreground mt-1">Stato del sistema</p>
                            </div>
                        </div>
                        <Badge className={`${allOnline ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'} text-white`}>
              <span className="flex items-center gap-2">
                {allOnline ? <CheckCircle2 className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
                  {allOnline ? "Tutto operativo" : "Problemi rilevati"}
              </span>
                        </Badge>
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-4 py-8 sm:py-12">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl">Servizi</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {services.map((service, index) => (
                                <div
                                    key={index}
                                    className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 rounded-lg bg-primary/10 text-primary">
                                            {service.icon}
                                        </div>
                                        <span className="font-medium">{service.name}</span>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        {service.status === "online" ? (
                                            <>
                                                <CheckCircle2 className="h-5 w-5 text-green-500" />
                                                <span className="text-sm font-medium text-green-500">Risponde</span>
                                            </>
                                        ) : (
                                            <>
                                                <XCircle className="h-5 w-5 text-red-500" />
                                                <span className="text-sm font-medium text-red-500">Non risponde</span>
                                            </>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </main>
        </div>

    );
}
