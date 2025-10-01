"use client";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { FileText } from "lucide-react";

const ThirdPartyTools = () => {
    const accordionItemClasses = "border border-border rounded-[3px] bg-white shadow-[rgba(0,0,0,0.1)_0px_1px_0px_0px]";
    const accordionTriggerClasses = "text-[13px] font-normal text-left text-primary hover:no-underline py-3 pr-[25px] pl-[15px]";
    const accordionContentClasses = "p-[10px] text-[13px] text-[#595858]";

    return (
        <section>
            {/* Esperienza Section */}
            <h3 className="mt-6 text-[13px] font-bold text-[#262626]">
                Esperienza
            </h3>
            <p className="text-[13px] text-[#595858] mt-2 mb-0">
                Questo Sito Web utilizza Strumenti di Tracciamento per migliorare la qualità della user experience e consentire le interazioni con contenuti, network e piattaforme esterni.
            </p>
            <h4 className="mt-[19px] text-[13px] font-bold text-[#505762]">
                Strumenti di Tracciamento gestiti da terze parti
            </h4>
            <Accordion type="single" collapsible className="w-full mt-[21px]">
                <AccordionItem value="formaloo" className={accordionItemClasses}>
                    <AccordionTrigger className={accordionTriggerClasses}>
                        <div className="flex items-center gap-x-4">
                            <FileText className="h-5 w-5 shrink-0 text-gray-600" />
                            <span className="flex-1">Formaloo</span>
                        </div>
                    </AccordionTrigger>
                    <AccordionContent className={accordionContentClasses}>
                        <div className="space-y-4 pt-2">
                            <p>Questo tipo di servizio permette a questo Sito Web di gestire la creazione, l'implementazione, l'amministrazione, la distribuzione e l'analisi di moduli e di sondaggi online al fine di raccogliere, salvare e riutilizzare i Dati degli Utenti che rispondono.</p>
                            <p>I Dati Personali raccolti dipendono dalle informazioni richieste e fornite dagli Utenti nel modulo online corrispondente.</p>
                            <p>Questi servizi possono essere integrati con un'ampia gamma di servizi di terze parti per consentire al Titolare di compiere azioni successive con i Dati trattati - ad esempio, gestione dei contatti, invio di messaggi, statistiche, pubblicità ed elaborazione dei pagamenti.</p>
                            <div>
                                <p>Formaloo (Formaloo OÜ)</p>
                                <p>Formaloo è un generatore di moduli e una piattaforma di raccolta dati fornita da Formaloo OÜ.</p>
                                <p>Dati Personali trattati: varie tipologie di Dati secondo quanto specificato dalla privacy policy del servizio.</p>
                            </div>
                            <p>Luogo del trattamento: UE – <a href="https://www.formaloo.com/en/privacy-policy" className="text-[#0066cc] underline">Privacy Policy</a>.</p>
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>

            {/* Misurazione Section */}
            <h3 className="mt-6 text-[13px] font-bold text-[#262626]">
                Misurazione
            </h3>
            <p className="text-[13px] text-[#595858] mt-2 mb-0">
                Questo Sito Web utilizza Strumenti di Tracciamento per misurare il traffico e analizzare il comportamento degli Utenti per migliorare il Servizio.
            </p>
            <h4 className="mt-[19px] text-[13px] font-bold text-[#505762]">
                Strumenti di Tracciamento gestiti direttamente dal Titolare
            </h4>
            <Accordion type="single" collapsible className="w-full mt-[21px]">
                <AccordionItem value="matomo" className={accordionItemClasses}>
                    <AccordionTrigger className={accordionTriggerClasses}>
                        <div className="flex items-center gap-x-4">
                            <FileText className="h-5 w-5 shrink-0 text-gray-600" />
                            <span className="flex-1">Matomo (questo Sito Web)</span>
                        </div>
                    </AccordionTrigger>
                    <AccordionContent className={accordionContentClasses}>
                        <div className="space-y-4 pt-2">
                            <p>Matomo è un software di statistica utilizzato da questo Sito Web per analizzare i dati in maniera diretta e senza l’ausilio di terzi.</p>
                            <p>Dati Personali trattati: Dati di utilizzo e Strumento di Tracciamento.</p>
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

            <h4 className="mt-[19px] text-[13px] font-bold text-[#505762]">
                Strumenti di Tracciamento gestiti da terze parti
            </h4>
            <Accordion type="single" collapsible className="w-full mt-[21px]">
                <AccordionItem value="tree-nation" className={accordionItemClasses}>
                    <AccordionTrigger className={accordionTriggerClasses}>
                        <div className="flex items-center gap-x-4">
                            <FileText className="h-5 w-5 shrink-0 text-gray-600" />
                            <span className="flex-1">Tree-Nation – Net Zero Website label</span>
                        </div>
                    </AccordionTrigger>
                    <AccordionContent className={accordionContentClasses}>
                        <div className="space-y-4 pt-2">
                            <p>Our Net Zero Website label automatically compensates all the CO2 emissions your website generates. You just need to add the little piece of code we will provide you in the footer of your company’s website. We will then calculate your website's emissions based on the number of visits it receives and we will plant the trees needed to offset them.</p>
                            <p><a href="https://tree-nation.com/legal/cookies-policy" className="text-[#0066cc] underline">Cookies Policy</a></p>
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </section>
    );
};

export default ThirdPartyTools;
