"use client";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import {ChevronDown, Database, ExternalLink, FileText, Key, Server} from "lucide-react";
import React from "react";

type DetailItemProps = {
    title: string;
    icon: React.ElementType;
    children: React.ReactNode;
    initiallyOpen?: boolean;
};

const DetailItem: React.FC<DetailItemProps> = ({title, icon: Icon, children, initiallyOpen = false}) => (
    <details className="group border border-[#e5e5e5] rounded-[3px] overflow-hidden" open={initiallyOpen}>
        <summary className="list-none flex items-center justify-between p-4 cursor-pointer bg-white">
            <div className="flex items-center gap-3">
                <Icon className="h-6 w-6 text-[#333333]"/>
                <h3 className="font-bold text-[#262626] text-[13px]">{title}</h3>
            </div>
            <ChevronDown className="h-5 w-5 text-[#333333] transition-transform duration-200 group-open:rotate-180"/>
        </summary>
        <div className="px-4 pt-4 pb-4 border-t border-[#e5e5e5] bg-white text-[13px] text-[#595858] leading-relaxed">
            {children}
        </div>
    </details>
);


const TrackingToolsUsage = () => {
    return (
        <section className="pb-[25px]">
            <h2 className="text-[17px] text-[#262626] font-bold mb-4">
                Come questo Sito Web utilizza gli Strumenti di Tracciamento
            </h2>

            {/* Necessari */}
            <h3 className="text-[13px] text-[#262626] font-bold mb-2">Necessari</h3>
            <p className="mb-4 text-muted-foreground text-[13px] leading-relaxed">
                Questo Sito Web utilizza Cookie comunemente detti “tecnici” o altri
                Strumenti di Tracciamento analoghi per svolgere attività strettamente
                necessarie a garantire il funzionamento o la fornitura del Servizio.
            </p>
            <h4 className="font-bold text-[#262626] mb-2 mt-4">
                Strumenti di Tracciamento gestiti da terze parti
            </h4>
            <div className="mt-4"></div>
            <DetailItem title="Supabase"
                        icon={Database} initiallyOpen={false}>
                <p>Supabase è un servizio di hosting e backend fornito da Supabase, Inc.
                    <br/>Dati Personali trattati: Dati di utilizzo, Strumenti di
                    Tracciamento, varie tipologie di Dati secondo quanto specificato dalla privacy policy del
                    servizio<br/>
                    Durata degli Strumenti di Tracciamento:<br/>
                    sb-access-token: durata della sessione<br/>
                    sb-refresh-token: durata della sessione
                    <br/>
                    <a href="https://supabase.com/privacy"
                       className="text-blue-600 no-underline hover:underline">Note
                        legali</a></p>
            </DetailItem>


            {/* Esperienza */}
            <h3 className="text-[13px] text-[#262626] font-bold mb-2 mt-4">Esperienza</h3>
            <p className="mb-4 text-muted-foreground text-[13px] leading-relaxed">
                Questo Sito Web utilizza Strumenti di Tracciamento per migliorare la
                qualità della user experience e consentire le interazioni con contenuti,
                network e piattaforme esterni.
            </p>
            <h4 className="font-bold text-[#262626] mb-2 mt-4">
                Strumenti di Tracciamento gestiti da terze parti
            </h4>
            <DetailItem title="Google Fonts"
                        icon={ExternalLink} initiallyOpen={false}>
                <p>Google Fonts è un servizio di visualizzazione di stili
                    di carattere gestito da Google LLC che permette a questa Applicazione di
                    integrare tali contenuti all’interno delle proprie pagine.
                    <br/>Dati Personali trattati: Dati di utilizzo, Strumenti di
                    Tracciamento<br/><a href="https://business.safety.google/privacy/"
                                        className="text-blue-600 no-underline hover:underline">Note
                        legali</a></p>
            </DetailItem>

            {/* Funzionalità */}
            <h3 className="text-[13px] text-[#262626] font-bold mb-2 mt-4">Funzionalità</h3>
            <p className="mb-4 text-muted-foreground text-[13px] leading-relaxed">
                Questa Sito Web utilizza Strumenti di Tracciamento per consentire semplici interazioni e attivare
                funzionalità che permettono agli Utenti di accedere a determinate risorse del Servizio e semplificano la
                comunicazione con il Titolare.
            </p>
            <h4 className="font-bold text-[#262626] mb-2 mt-4">
                Strumenti di Tracciamento gestiti da terze parti
            </h4>
            <div className="mt-4"></div>
            <DetailItem title="Supabase Auth"
                        icon={Key} initiallyOpen={false}>
                <p>Supabase Auth è un servizio di registrazione ed autenticazione fornito da Supabase, Inc. Per
                    semplificare il processo di registrazione ed autenticazione, Supabase Auth può utilizzare fornitori
                    di identità di terze parti e salvare le informazioni sulla propria piattaforma.
                    <br/>Dati Personali trattati: accesso al conto, Dati di utilizzo, Strumenti di
                    Tracciamento<br/>
                    Durata degli Strumenti di Tracciamento:<br/>
                    sb-access-token: durata della sessione<br/>
                    sb-refresh-token: durata della sessione
                    <br/>
                    <a href="https://supabase.com/privacy"
                       className="text-blue-600 no-underline hover:underline">Note
                        legali</a></p>
            </DetailItem>


            {/*

             Misurazione
            <h3 className="text-base font-bold text-primary mt-6 mb-3">
                Misurazione
            </h3>
            <p className="mb-4 text-muted-foreground text-[13px] leading-relaxed">
                Questo Sito Web utilizza Strumenti di Tracciamento per misurare il
                traffico e analizzare il comportamento degli Utenti per migliorare il
                Servizio.
            </p>

             Misurazione - Direttamente dal Titolare
            <h4 className="text-[13px] text-[#505762] mt-[19px]">
                Strumenti di Tracciamento gestiti direttamente dal Titolare
            </h4>
            <Accordion type="single" collapsible className="w-full mt-[21px]">
                <AccordionItem
                    value="matomo"
                    className="border-b-0 bg-card rounded-[3px] shadow-[0_1px_0_rgba(0,0,0,0.1)]"
                >
                    <AccordionTrigger className="font-bold text-primary text-[13px] text-left no-underline hover:no-underline pt-[12px] pb-[13px] pr-[25px] pl-[45px] relative">
                        <FileText className="absolute left-[15px] top-1/2 -translate-y-1/2 h-6 w-6 text-muted-foreground" />
                        Matomo (questo Sito Web)
                    </AccordionTrigger>
                    <AccordionContent className="pt-2 p-4">
                        <div className="space-y-4 text-muted-foreground text-[13px] leading-relaxed">
                            <p>
                                Matomo è un software di statistica utilizzato da questo Sito Web
                                per analizzare i dati in maniera diretta e senza l’ausilio di
                                terzi.
                            </p>
                            <p>
                                Dati Personali trattati: Dati di utilizzo e Strumento di
                                Tracciamento.
                            </p>
                            <div>
                                <p>Durata degli Strumenti di Tracciamento:</p>
                                <ul className="list-disc list-inside mt-2 space-y-1">
                                    <li>_pk_cvar*: 30 minuti</li>
                                    <li>_pk_id*: 2 anni</li>
                                    <li>_pk_ref*: 7 mesi</li>
                                    <li>_pk_ses*: 30 minuti</li>
                                    <li>_pk_testcookie*: durata della sessione</li>
                                </ul>
                            </div>
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>

             Misurazione - Terze Parti
            <h4 className="text-[13px] text-[#505762] mt-[19px]">
                Strumenti di Tracciamento gestiti da terze parti
            </h4>
            <Accordion type="single" collapsible className="w-full mt-[21px]">
                <AccordionItem
                    value="tree-nation"
                    className="border-b-0 bg-card rounded-[3px] shadow-[0_1px_0_rgba(0,0,0,0.1)]"
                >
                    <AccordionTrigger className="font-bold text-primary text-[13px] text-left no-underline hover:no-underline pt-[12px] pb-[13px] pr-[25px] pl-[45px] relative">
                        <FileText className="absolute left-[15px] top-1/2 -translate-y-1/2 h-6 w-6 text-muted-foreground" />
                        Tree-Nation – Net Zero Website label
                    </AccordionTrigger>
                    <AccordionContent className="pt-2 p-4">
                        <div className="space-y-4 text-muted-foreground text-[13px] leading-relaxed">
                            <p>
                                Our Net Zero Website label automatically compensates all the CO2
                                emissions your website generates. You just need to add the
                                little piece of code we will provide you in the footer of your
                                company’s website. We will then calculate your website's
                                emissions based on the number of visits it receives and we will
                                plant the trees needed to offset them.
                            </p>
                            <p>
                                <a
                                    href="https://tree-nation.com/legal/cookies-policy"
                                    className="text-link underline"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Cookies Policy
                                </a>
                            </p>
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>

*/}
        </section>
    );
};

export default TrackingToolsUsage;
