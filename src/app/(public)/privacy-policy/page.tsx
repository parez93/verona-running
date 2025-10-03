import React from 'react';
import {Bookmark, ChevronDown, ExternalLink, Key, Server, User} from 'lucide-react';
import Link from "next/link";

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


const PrivacyPolicy = () => {
    return (
        <div className="bg-white font-sans text-foreground">
            <div className="p-2">
                <div className="max-w-[1263px] mx-auto my-[30px] rounded-[3px] text-[#595858] text-[13px]">
                    <div className="px-[30px] py-[25px]">
                        <div className="pb-[25px]">
                            <h1 className="text-[19px] text-[#262626] mb-[5px]">
                                Privacy Policy di <strong className="font-bold">Verona Running</strong>
                            </h1>
                            <p className="mb-4">Questo Sito Web raccoglie alcuni Dati Personali dei propri Utenti.</p>
                            <p className="mb-4">
                                Gli Utenti possono essere soggetti a livelli di protezione diversi. Alcuni Utenti godono
                                pertanto di superiore protezione. L'Utente può contattare il Titolare per ulteriori
                                informazioni sui livelli di protezione.
                            </p>
                            <p>
                                Questo documento può essere stampato utilizzando il comando di stampa presente nelle
                                impostazioni di qualsiasi browser.
                            </p>
                        </div>

                        <div className="pb-5">
                            <div className="pb-[21px] border-b border-[#e5e5e5]">
                                <h2 className="text-[17px] text-[#262626] font-bold text-center">Riassunto della
                                    policy</h2>
                            </div>
                        </div>

                        <div className="py-5">
                            <h2 id="purposes_data" className="text-[17px] text-[#262626] font-bold mb-[21px]">
                                Dati Personali trattati per le seguenti finalità e utilizzando i seguenti servizi:
                            </h2>
                            <ul className="list-none space-y-[21px]">
                                <li className="relative pl-[40px]">
                                    <Server className="absolute left-0 top-1 h-6 w-6 text-[#333333]"/>
                                    <h3 className="text-[13px] text-[#262626] font-bold mb-2">Hosting ed infrastruttura
                                        backend
                                    </h3>
                                    <ul className="list-none">
                                        <li><h3 className="text-[13px] pt-[10px]">Vercel</h3></li>
                                        <li><h3 className="text-[13px] pt-[10px]">Supabase</h3></li>
                                    </ul>
                                </li>

                                <li className="relative pl-[40px]">
                                    <Key className="absolute left-0 top-1 h-6 w-6 text-[#333333]"/>
                                    <h3 className="text-[13px] text-[#262626] font-bold mb-2">Registrazione ed
                                        autenticazione fornite direttamente da questa Applicazione
                                    </h3>
                                    <ul className="list-none space-y-2">
                                        <li>
                                            <h3 className="text-[13px] text-[#615e5e] font-bold pt-[10px]">Registrazione
                                                ed autenticazione fornite direttamente da questa Applicazione
                                            </h3>
                                            <p>Dati Personali: Dati di utilizzo; email; password; Strumenti di
                                                Tracciamento</p>
                                        </li>
                                        <li><h3 className="text-[13px] pt-[10px]">Supabase Auth</h3></li>
                                    </ul>
                                </li>

                                <li className="relative pl-[40px]">
                                    <ExternalLink className="absolute left-0 top-1 h-6 w-6 text-[#333333]"/>
                                    <h3 className="text-[13px] text-[#262626] font-bold mb-2">Visualizzazione di
                                        contenuti da piattaforme esterne
                                    </h3>
                                    <ul className="list-none">
                                        <li><h3 className="text-[13px] pt-[10px]">Google Fonts</h3></li>
                                    </ul>
                                </li>

                                {/*
                                <li className="relative pl-[40px]">
                                    <Mail className="absolute left-0 top-1 h-6 w-6 text-[#333333]"/>
                                    <h3 className="text-[13px] text-[#262626] font-bold mb-2">Contattare l'Utente</h3>
                                    <ul className="list-none space-y-2">
                                        <li>
                                            <h3 className="text-[13px] text-[#615e5e] font-bold pt-[10px]">Mailing list
                                                o newsletter</h3>
                                            <p>Dati Personali: cognome; email; nome</p>
                                        </li>
                                        <li>
                                            <h3 className="text-[13px] text-[#615e5e] font-bold pt-[10px]">Modulo di
                                                contatto</h3>
                                            <p>Dati Personali: email</p>
                                        </li>
                                    </ul>
                                </li>
                                <li className="relative pl-[40px]">
                                    <MessageCircle className="absolute left-0 top-1 h-6 w-6 text-[#333333]"/>
                                    <h3 className="text-[13px] text-[#262626] font-bold mb-2">Gestione contatti e invio
                                        di messaggi</h3>
                                    <ul className="list-none">
                                        <li><h3 className="text-[13px] pt-[10px]">Eventbrite e INBOX</h3></li>
                                    </ul>
                                </li>
                                <li className="relative pl-[40px]">
                                    <FileText className="absolute left-0 top-1 h-6 w-6 text-[#333333]"/>
                                    <h3 className="text-[13px] text-[#262626] font-bold">Gestione della raccolta dati e
                                        dei sondaggi online</h3>
                                    <ul className="list-none">
                                        <li><h3 className="text-[13px] pt-[10px]">Formaloo</h3></li>
                                    </ul>
                                </li>
                                <li className="relative pl-[40px]">
                                    <BarChart2 className="absolute left-0 top-1 h-6 w-6 text-[#333333]"/>
                                    <h3 className="text-[13px] text-[#262626] font-bold mb-2">Statistica</h3>
                                    <ul className="list-none space-y-2">
                                        <li>
                                            <h3 className="text-[13px] pt-[10px]">Matomo</h3>
                                            <p>Dati Personali: Dati di utilizzo; Strumento di Tracciamento</p>
                                        </li>
                                        <li><h3 className="text-[13px] pt-[10px]">Tree-Nation – Net Zero Website
                                            label</h3></li>
                                    </ul>
                                </li>*/}
                            </ul>
                        </div>

                        <div className="py-5 border-t border-[#e5e5e5]">
                            <h2 id="contact_information"
                                className="text-[17px] text-[#262626] font-bold mb-[21px]">Informazioni di contatto</h2>
                            <div className="relative pl-[40px]">
                                <User className="absolute left-0 top-1 h-6 w-6 text-[#333333]"/>
                                <h3 className="text-[13px] text-[#262626] font-bold mb-2">Titolare del Trattamento dei
                                    Dati</h3>
                                <p>Federico Parezzan<br/><i className="not-italic">Verona Running</i><br/>Via Lazzaretto
                                    59F<br/>37133 Verona (VR)</p>
                                <p className="mt-4"><strong className="font-bold">Indirizzo email del
                                    Titolare:</strong> veronarunning@gmail.com</p>
                            </div>
                        </div>

                        <div className="py-5 border-t border-[#e5e5e5]">
                            <h2 className="text-[17px] text-[#262626] font-bold text-center">Policy completa</h2>
                        </div>

                        <div className="space-y-[21px] py-5">
                            <div>
                                <h2 className="text-[17px] text-[#262626] font-bold mb-4">Titolare del Trattamento dei
                                    Dati</h2>
                                <p>Federico Parezzan<br/><i className="not-italic">Verona Running</i><br/>Via Lazzaretto
                                    59F<br/>37133 Verona (VR)</p>
                                <p className="mt-4"><strong className="font-bold">Indirizzo email del
                                    Titolare:</strong> veronarunning@gmail.com</p>
                            </div>

                            <div>
                                <h2 className="text-[17px] text-[#262626] font-bold mb-4">Tipologie di Dati
                                    raccolti</h2>
                                <p className="mb-4">Fra i Dati Personali raccolti da questo Sito Web, in modo autonomo o
                                    tramite terze parti, ci sono: email; password; nome; cognome; data di nascita;
                                    Strumento di Tracciamento; Dati di utilizzo.</p>
                                <p className="mb-4">Dettagli completi su ciascuna tipologia di Dati Personali raccolti
                                    sono forniti nelle sezioni dedicate di questa privacy policy o mediante specifici
                                    testi informativi visualizzati prima della raccolta dei Dati stessi.<br/>I Dati
                                    Personali possono essere liberamente forniti dall'Utente o, nel caso di Dati di
                                    Utilizzo, raccolti automaticamente durante l'uso di questo Sito Web.<br/>Se non
                                    diversamente specificato, tutti i Dati richiesti da questo Sito Web sono
                                    obbligatori. Se l’Utente rifiuta di comunicarli, potrebbe essere impossibile per
                                    questo Sito Web fornire il Servizio. Nei casi in cui questo Sito Web indichi alcuni
                                    Dati come facoltativi, gli Utenti sono liberi di astenersi dal comunicare tali Dati,
                                    senza che ciò abbia alcuna conseguenza sulla disponibilità del Servizio o sulla sua
                                    operatività.<br/>Gli Utenti che dovessero avere dubbi su quali Dati siano
                                    obbligatori sono incoraggiati a contattare il Titolare.<br/>L’eventuale utilizzo di
                                    Cookie - o di altri strumenti di tracciamento - da parte di questo Sito Web o dei
                                    titolari dei servizi terzi utilizzati da questo Sito Web ha la finalità di fornire
                                    il Servizio richiesto dall'Utente, oltre alle ulteriori finalità descritte nel
                                    presente documento e nella Cookie Policy.</p>
                                <p className="mb-4">L'Utente si assume la responsabilità dei Dati Personali di terzi
                                    ottenuti, pubblicati o condivisi mediante questo Sito Web.</p>
                            </div>

                            <div>
                                <h2 className="text-[17px] text-[#262626] font-bold mb-4">Modalità e luogo del
                                    trattamento dei Dati raccolti</h2>
                                <h3 className="text-[13px] text-[#262626] font-bold mb-2">Modalità di trattamento</h3>
                                <p className="mb-4">Il Titolare adotta le opportune misure di sicurezza volte ad
                                    impedire l’accesso, la divulgazione, la modifica o la distruzione non autorizzate
                                    dei Dati Personali.<br/>Il trattamento viene effettuato mediante strumenti
                                    informatici e/o telematici, con modalità organizzative e con logiche strettamente
                                    correlate alle finalità indicate. Oltre al Titolare, in alcuni casi, potrebbero
                                    avere accesso ai Dati altri soggetti coinvolti nell’organizzazione di questo Sito
                                    Web (personale amministrativo, commerciale, marketing, legali, amministratori di
                                    sistema) ovvero soggetti esterni (come fornitori di servizi tecnici terzi, corrieri
                                    postali, hosting provider, società informatiche, agenzie di comunicazione) nominati
                                    anche, se necessario, Responsabili del Trattamento da parte del Titolare. L’elenco
                                    aggiornato dei Responsabili potrà sempre essere richiesto al Titolare del
                                    Trattamento.</p>
                                <h3 className="text-[13px] text-[#262626] font-bold mb-2">Luogo</h3>
                                <p className="mb-4">I Dati sono trattati presso le sedi operative del Titolare ed in
                                    ogni altro luogo in cui le parti coinvolte nel trattamento siano localizzate. Per
                                    ulteriori informazioni, contatta il Titolare.<br/>I Dati Personali dell’Utente
                                    potrebbero essere trasferiti in un paese diverso da quello in cui l’Utente si trova.
                                    Per ottenere ulteriori informazioni sul luogo del trattamento l’Utente può fare
                                    riferimento alla sezione relativa ai dettagli sul trattamento dei Dati Personali.
                                </p>
                                <h3 className="text-[13px] text-[#262626] font-bold mb-2">Periodo di conservazione</h3>
                                <p className="mb-4">Se non diversamente indicato in questo documento, i Dati Personali
                                    sono trattati e conservati per il tempo richiesto dalla finalità per la quale sono
                                    stati raccolti e potrebbero essere conservati per un periodo più lungo a causa di
                                    eventuali obbligazioni legali o sulla base del consenso degli Utenti.</p>
                            </div>

                            <div>
                                <h2 className="text-[17px] text-[#262626] font-bold mb-4">Finalità del Trattamento dei
                                    Dati raccolti</h2>
                                <p className="mb-4">I Dati dell’Utente sono raccolti per consentire al Titolare di
                                    fornire il Servizio, adempiere agli obblighi di legge, rispondere a richieste o
                                    azioni esecutive, tutelare i propri diritti ed interessi (o quelli di Utenti o di
                                    terze parti), individuare eventuali attività dolose o fraudolente, nonché per le
                                    seguenti finalità: Registrazione ed autenticazione fornite direttamente da questa
                                    Applicazione, Hosting ed infrastruttura backend, Visualizzazione di contenuti da
                                    piattaforme esterne.</p>
                                <p className="mb-4">Per ottenere informazioni dettagliate sulle finalità del trattamento
                                    e sui Dati Personali trattati per ciascuna finalità, l’Utente può fare riferimento
                                    alla sezione “Dettagli sul trattamento dei Dati Personali”.</p>
                            </div>

                            <div>
                                <h2 className="text-[17px] text-[#262626] font-bold mb-4">Dettagli sul trattamento dei
                                    Dati Personali</h2>
                                <p className="mb-4">I Dati Personali sono raccolti per le seguenti finalità ed
                                    utilizzando i seguenti servizi:</p>
                                <ul className="list-none space-y-[21px]">
                                    <li>
                                        <DetailItem title="Hosting ed infrastruttura backend" icon={Server}
                                                    initiallyOpen={true}>
                                            <p className="mb-4">Questo tipo di servizio ha lo scopo di ospitare Dati e
                                                file che consentono a questa Applicazione di funzionare e di essere
                                                distribuito o di fornire un'infrastruttura pronta all'uso per eseguire
                                                funzionalità specifiche o parti di questa Applicazione.</p>
                                            <h4 className="font-bold text-[#262626] mb-2 mt-4">Vercel</h4>
                                            <p className="mb-4">Vercel è un servizio di hosting e backend fornito da
                                                Vercel Inc.
                                                <br/>Dati Personali trattati: Dati di utilizzo, varie tipologie di Dati
                                                secondo quanto specificato dalla privacy policy del servizio.<br/><a
                                                    href="https://vercel.com/legal/privacy-policy"
                                                    className="text-blue-600 no-underline hover:underline">Note
                                                    legali</a></p>
                                            <h4 className="font-bold text-[#262626] mb-2 mt-4">Supabase</h4>
                                            <p className="mb-4">Supabase è un servizio di hosting e backend fornito da Supabase, Inc.
                                                <br/>Dati Personali trattati: Dati di utilizzo, Strumenti di Tracciamento, varie tipologie di Dati
                                                secondo quanto specificato dalla privacy policy del servizio.<br/><a
                                                    href="https://supabase.com/privacy"
                                                    className="text-blue-600 no-underline hover:underline">Note
                                                    legali</a></p>
                                        </DetailItem>
                                    </li>
                                    <li>
                                        <DetailItem
                                            title="Registrazione ed autenticazione fornite direttamente da questa Applicazione"
                                            icon={Key} initiallyOpen={true}>
                                            <p className="mb-4">Con la registrazione o l’autenticazione l’Utente
                                                consente a questa Applicazione di identificarlo e di dargli accesso a
                                                servizi dedicati. I Dati Personali sono raccolti e conservati
                                                esclusivamente a scopo di registrazione o di identificazione. I Dati
                                                raccolti sono solo quelli necessari a fornire il servizio richiesto
                                                dall’Utente.</p>
                                            <h4 className="font-bold text-[#262626] mb-2 mt-4">Registrazione
                                                diretta</h4>
                                            <p className="mb-4">L’Utente si registra compilando il modulo di
                                                registrazione e fornendo direttamente a questa Applicazione i propri
                                                Dati Personali.
                                                <br/>Dati Personali trattati: Dati di utilizzo, email, password,
                                                Strumenti di Tracciamento<br/></p>
                                            <h4 className="font-bold text-[#262626] mb-2 mt-4">Supabase Auth
                                            </h4>
                                            <p className="mb-4">Supabase Auth è un servizio di registrazione ed
                                                autenticazione fornito da Supabase, Inc. Per semplificare il processo di
                                                registrazione ed autenticazione, Supabase Auth può utilizzare fornitori
                                                di identità di terze parti e salvare le informazioni sulla propria
                                                piattaforma.
                                                <br/>Dati Personali trattati: accesso al conto, Dati di utilizzo,
                                                Strumenti di Tracciamento<br/>
                                                <a
                                                    href="https://supabase.com/privacy"
                                                    className="text-blue-600 no-underline hover:underline">Note
                                                    legali</a></p>
                                        </DetailItem>
                                    </li>

                                    <li>
                                        <DetailItem title="Visualizzazione di contenuti da piattaforme esterne"
                                                    icon={ExternalLink} initiallyOpen={true}>
                                            <p className="mb-4">Questo tipo di servizi permette di visualizzare
                                                contenuti ospitati su piattaforme esterne direttamente dalle pagine di
                                                questa Applicazione e di interagire con essi. Tali servizi sono spesso
                                                definiti widget, ovvero piccoli elementi inseriti in un sito web o in
                                                un'applicazione. Forniscono informazioni specifiche o svolgono una
                                                funzione particolare e spesso consentono l'interazione con l'utente.
                                                Questo tipo di servizio potrebbe comunque raccogliere dati sul traffico
                                                web relativo alle pagine dove il servizio è installato, anche quando gli
                                                utenti non lo utilizzano.
                                            </p>
                                            <h4 className="font-bold text-[#262626] mb-2 mt-4">Google Fonts</h4>
                                            <p className="mb-4">Google Fonts è un servizio di visualizzazione di stili
                                                di carattere gestito da Google LLC che permette a questa Applicazione di
                                                integrare tali contenuti all’interno delle proprie pagine.
                                                <br/>Dati Personali trattati: Dati di utilizzo, Strumenti di
                                                Tracciamento<br/><a href="https://business.safety.google/privacy/"
                                                                    className="text-blue-600 no-underline hover:underline">Note
                                                    legali</a></p>
                                        </DetailItem>
                                    </li>
                                    {/*
                                    <li>
                                        <DetailItem title="Contattare l'Utente" icon={Mail} initiallyOpen={true}>
                                            <h4 className="font-bold text-[#262626] mb-2">Mailing list o newsletter (questo Sito Web)</h4>
                                            <p className="mb-4">Con la registrazione alla mailing list o alla newsletter, l’indirizzo email dell’Utente viene automaticamente inserito in una lista di contatti a cui potranno essere trasmessi messaggi email contenenti informazioni, anche di natura commerciale e promozionale, relative a questo Sito Web. L'indirizzo ...</p>
                                            <p className="mb-4">Dati Personali trattati: cognome; email; nome.</p>
                                            <h4 className="font-bold text-[#262626] mb-2 mt-4">Modulo di contatto (questo Sito Web)</h4>
                                            <p className="mb-4">L’Utente, compilando con i propri Dati il modulo di contatto, acconsente al loro utilizzo per rispondere alle richieste di informazioni, di preventivo, o di qualunque altra natura indicata dall’intestazione del modulo.</p>
                                            <p>Dati Personali trattati: email.</p>
                                        </DetailItem>
                                    </li>
                                    <li>
                                        <DetailItem title="Gestione contatti e invio di messaggi" icon={MessageCircle} initiallyOpen={true}>
                                            <p className="mb-4">Questo tipo di servizi consente di gestire un database di contatti email, contatti telefonici o contatti di qualunque altro tipo, utilizzati per comunicare con l’Utente.<br/>Questi servizi potrebbero inoltre consentire di raccogliere dati relativi alla data e all’ora di visualizzazione dei messaggi da parte dell’Utente, così come all’interazione dell'Utente con essi, come le informazioni sui click sui collegamenti inseriti nei messaggi.</p>
                                            <h4 className="font-bold text-[#262626] mb-2 mt-4">Eventbrite </h4>
                                            <p className="mb-4">Eventbrite è un servizio di gestione indirizzi e invio di messaggi email fornito da Eventbrite, Inc.<br/>Dati Personali trattati: nome, cognome, email.<br/><a href="https://www.eventbrite.it/l/LegalTerms/" className="text-blue-600 no-underline hover:underline">Note legali</a></p>
                                            <h4 className="font-bold text-[#262626] mb-2 mt-4">INBOX </h4>
                                            <p className="mb-4">INBOX è un servizio di gestione indirizzi e invio di messaggi email fornito da INBOX Internet Services Co. Ltd.<br/>Dati Personali trattati: nome, cognome, email.<br/>Luogo del trattamento: Francia – <a href="https://useinbox.com/legal/" className="text-blue-600 no-underline hover:underline">Note legali</a></p>
                                        </DetailItem>
                                    </li>
                                    <li>
                                        <DetailItem title="Gestione della raccolta dati e dei sondaggi online" icon={FileText} initiallyOpen={true}>
                                            <p className="mb-4">Questo tipo di servizio permette a questo Sito Web di gestire la creazione, l'implementazione, l'amministrazione, la distribuzione e l'analisi di moduli e di sondaggi online al fine di raccogliere, salvare e riutilizzare i Dati degli Utenti che rispondono.<br/>I Dati Personali raccolti dipendono dalle informazioni richieste e fornite dagli Utenti nel modulo online corrispondente.</p>
                                            <p className="mb-4">Questi servizi possono essere integrati con un'ampia gamma di servizi di terze parti per consentire al Titolare di compiere azioni successive con i Dati trattati - ad esempio, gestione dei contatti, invio di messaggi, statistiche, pubblicità ed elaborazione dei pagamenti.</p>
                                            <h4 className="font-bold text-[#262626] mb-2 mt-4">Formaloo </h4>
                                            <p>Formaloo (Formaloo OÜ)<br/>Formaloo è un generatore di moduli e una piattaforma di raccolta dati fornita da Formaloo OÜ.<br/>Dati Personali trattati: varie tipologie di Dati secondo quanto specificato dalla privacy policy del servizio.<br/>Luogo del trattamento: UE – <a href="https://www.formaloo.com/en/privacy-policy" className="text-blue-600 no-underline hover:underline">Privacy Policy</a>.</p>
                                        </DetailItem>
                                    </li>
                                    <li>
                                        <DetailItem title="Statistica" icon={BarChart2} initiallyOpen={true}>
                                            <p className="mb-4">I servizi contenuti nella presente sezione permettono al Titolare del Trattamento di monitorare e analizzare i dati di traffico e servono a tener traccia del comportamento dell’Utente.</p>
                                            <h4 className="font-bold text-[#262626] mb-2 mt-4">Matomo (questo Sito Web)</h4>
                                            <p className="mb-4">Matomo è un software di statistica utilizzato da questo Sito Web per analizzare i dati in maniera diretta e senza l’ausilio di terzi.</p>
                                            <p>Dati Personali trattati: Dati di utilizzo; Strumento di Tracciamento.</p>
                                            <h4 className="font-bold text-[#262626] mb-2 mt-4">Tree-Nation – Net Zero Website label </h4>
                                            <p className="mb-4">Our Net Zero Website label automatically compensates all the CO2 emissions your website generates. You just need to add the little piece of code we will provide you in the footer of your company’s website. We will then calculate your website's emissions based on the number of visits it receives and ...<br/><a href="https://tree-nation.com/legal/cookies-policy" className="text-blue-600 no-underline hover:underline">Cookies Policy</a></p>
                                        </DetailItem>
                                    </li>*/}
                                </ul>
                            </div>

                            <div>
                                <h2 className="text-[17px] text-[#262626] font-bold mb-4">Cookie Policy</h2>
                                <p>Questo Sito Web fa utilizzo di Strumenti di Tracciamento. Per saperne di più, gli
                                    Utenti possono consultare la <Link href="/cookie-policy"
                                                                       className="text-blue-600 no-underline hover:underline">Cookie
                                        Policy</Link>.</p>
                            </div>

                            <div>
                                <h2 className="text-[17px] text-[#262626] font-bold mb-4">Ulteriori informazioni per gli
                                    utenti nell'Unione Europea</h2>
                                <p className="mb-4">Questa sezione si applica a tutti gli utenti dell'Unione Europea, in
                                    conformità al Regolamento generale sulla protezione dei dati (il "GDPR") e, per tali
                                    Utenti, sostituisce qualsiasi altra informazione eventualmente divergente o in
                                    conflitto contenuta nell'informativa sulla privacy. Ulteriori dettagli...</p>
                                <h3 className="text-[13px] text-[#262626] font-bold mb-2">Base giuridica del
                                    trattamento</h3>
                                <p className="mb-4">Il Titolare tratta Dati Personali relativi all’Utente in caso
                                    sussista una delle seguenti condizioni:</p>
                                <ul className="list-disc pl-5 space-y-2 mb-4">
                                    <li>l’Utente ha prestato il consenso per una o più finalità specifiche.</li>
                                    <li>il trattamento è necessario all'esecuzione di un contratto con l’Utente e/o
                                        all'esecuzione di misure precontrattuali;
                                    </li>
                                    <li>il trattamento è necessario per adempiere un obbligo legale al quale è soggetto
                                        il Titolare;
                                    </li>
                                    <li>il trattamento è necessario per l'esecuzione di un compito di interesse pubblico
                                        o per l'esercizio di pubblici poteri di cui è investito il Titolare;
                                    </li>
                                    <li>il trattamento è necessario per il perseguimento del legittimo interesse del
                                        Titolare o di terzi.
                                    </li>
                                </ul>
                                <p>È comunque sempre possibile richiedere al Titolare di chiarire la concreta base
                                    giuridica di ciascun trattamento ed in particolare di specificare se il trattamento
                                    sia basato sulla legge, previsto da un contratto o necessario per concludere un
                                    contratto.</p>
                            </div>

                            <div>
                                <h2 className="text-[17px] text-[#262626] font-bold mb-4">Ulteriori informazioni sul
                                    tempo di conservazione</h2>
                                <p className="mb-4">Se non diversamente indicato in questo documento, i Dati Personali
                                    sono trattati e conservati per il tempo richiesto dalla finalità per la quale sono
                                    stati raccolti e potrebbero essere conservati per un periodo più lungo a causa di
                                    eventuali obbligazioni legali o sulla base del consenso degli Utenti.</p>
                                <p className="mb-4">Pertanto:</p>
                                <ul className="list-disc pl-5 space-y-2 mb-4">
                                    <li>I Dati Personali raccolti per scopi collegati all’esecuzione di un contratto tra
                                        il Titolare e l’Utente saranno trattenuti sino a quando sia completata
                                        l’esecuzione di tale contratto.
                                    </li>
                                    <li>I Dati Personali raccolti per finalità riconducibili all’interesse legittimo del
                                        Titolare saranno trattenuti sino al soddisfacimento di tale interesse. L’Utente
                                        può ottenere ulteriori informazioni in merito all’interesse legittimo perseguito
                                        dal Titolare nelle relative sezioni di questo documento o contattando il
                                        Titolare.
                                    </li>
                                </ul>
                                <p className="mb-4">Quando il trattamento è basato sul consenso dell’Utente, il Titolare
                                    può conservare i Dati Personali più a lungo sino a quando detto consenso non venga
                                    revocato. Inoltre, il Titolare potrebbe essere obbligato a conservare i Dati
                                    Personali per un periodo più lungo per adempiere ad un obbligo di legge o per ordine
                                    di un’autorità.<br/><br/>Al termine del periodo di conservazione i Dati Personali
                                    saranno cancellati. Pertanto, allo spirare di tale termine il diritto di accesso,
                                    cancellazione, rettificazione ed il diritto alla portabilità dei Dati non potranno
                                    più essere esercitati.</p>
                            </div>

                            <div>
                                <h2 className="text-[17px] text-[#262626] font-bold mb-4">Diritti dell’Utente sulla base
                                    del Regolamento Generale sulla Protezione dei Dati (GDPR)</h2>
                                <p className="mb-4">Gli Utenti possono esercitare determinati diritti con riferimento ai
                                    Dati trattati dal Titolare.</p>
                                <p className="mb-4">In particolare, nei limiti previsti dalla legge, l’Utente ha il
                                    diritto di:</p>
                                <ul className="list-disc pl-5 space-y-2 mb-4">
                                    <li><b>revocare il consenso in ogni momento.</b> L’Utente può revocare il consenso
                                        al trattamento dei propri Dati Personali precedentemente espresso.
                                    </li>
                                    <li><b>opporsi al trattamento dei propri Dati.</b> L’Utente può opporsi al
                                        trattamento dei
                                        propri Dati quando esso avviene in virtù di una base giuridica diversa dal
                                        consenso.
                                    </li>
                                    <li><b>accedere ai propri Dati.</b> L’Utente ha diritto ad ottenere informazioni sui
                                        Dati
                                        trattati dal Titolare, su determinati aspetti del trattamento ed a ricevere una
                                        copia dei Dati trattati.
                                    </li>
                                    <li><b>verificare e chiedere la rettificazione.</b> L’Utente può verificare la
                                        correttezza
                                        dei propri Dati e richiederne l’aggiornamento o la correzione.
                                    </li>
                                    <li><b>ottenere la limitazione del trattamento.</b> L’Utente può richiedere la
                                        limitazione
                                        del trattamento dei propri Dati. In tal caso il Titolare non tratterà i Dati per
                                        alcun altro scopo se non la loro conservazione.
                                    </li>
                                    <li><b>ottenere la cancellazione o rimozione dei propri Dati Personali.</b> L’Utente
                                        può
                                        richiedere la cancellazione dei propri Dati da parte del Titolare.
                                    </li>
                                    <li><b>ricevere i propri Dati o farli trasferire ad altro titolare.</b> L’Utente ha
                                        diritto
                                        di ricevere i propri Dati in formato strutturato, di uso comune e leggibile da
                                        dispositivo automatico e, ove tecnicamente fattibile, di ottenerne il
                                        trasferimento senza ostacoli ad un altro titolare.
                                    </li>
                                    <li><b>proporre reclamo.</b> L’Utente può proporre un reclamo all’autorità di
                                        controllo
                                        della protezione dei dati personali competente o agire in sede giudiziale.
                                    </li>
                                </ul>
                                <p className="mb-4">Gli Utenti hanno diritto di ottenere informazioni in merito alla
                                    base giuridica per il trasferimento di Dati all'estero incluso verso qualsiasi
                                    organizzazione internazionale regolata dal diritto internazionale o costituita da
                                    due o più paesi, come ad esempio l’ONU, nonché in merito alle misure di sicurezza
                                    adottate dal Titolare per proteggere i loro Dati.</p>
                            </div>

                            <div>
                                <h2 className="text-[17px] text-[#262626] font-bold mb-4">Dettagli sul diritto di
                                    opposizione
                                </h2>
                                <p className="mb-4"><b>Quando i Dati Personali sono trattati nell’interesse pubblico,
                                    nell’esercizio di pubblici poteri di cui è investito il Titolare oppure per
                                    perseguire un interesse legittimo del Titolare, gli Utenti hanno diritto ad opporsi
                                    al trattamento per motivi connessi alla loro situazione particolare.
                                    Si fa presente agli Utenti che, ove i loro Dati fossero trattati con finalità di
                                    marketing diretto, possono opporsi al trattamento in qualsiasi momento,
                                    gratuitamente e senza fornire alcuna motivazione. Qualora gli Utenti si oppongano al
                                    trattamento per finalità di marketing diretto, i Dati Personali non sono più oggetto
                                    di trattamento per tali finalità. Per scoprire se il Titolare tratti Dati con
                                    finalità di marketing diretto gli Utenti possono fare riferimento alle rispettive
                                    sezioni di questo documento.</b>
                                </p>
                            </div>

                            <div>
                                <h2 className="text-[17px] text-[#262626] font-bold mb-4">Come esercitare i diritti
                                </h2>
                                <p className="mb-4">Eventuali richieste di esercizio dei diritti dell'Utente possono
                                    essere indirizzate al Titolare attraverso i recapiti forniti in questo documento. La
                                    richiesta è gratuita e il Titolare risponderà nel più breve tempo possibile, in ogni
                                    caso entro un mese, fornendo all’Utente tutte le informazioni previste dalla legge.
                                    Eventuali rettifiche, cancellazioni o limitazioni del trattamento saranno comunicate
                                    dal Titolare a ciascuno dei destinatari, se esistenti, a cui sono stati trasmessi i
                                    Dati Personali, salvo che ciò si riveli impossibile o implichi uno sforzo
                                    sproporzionato. Il Titolare comunica all'Utente tali destinatari qualora egli lo
                                    richieda.
                                </p>
                            </div>

                            <div>
                                <h2 className="text-[17px] text-[#262626] font-bold mb-4">Ulteriori informazioni sul
                                    trattamento
                                </h2>
                                <h3 className="text-[13px] text-[#262626] font-bold mb-2">Difesa in giudizio</h3>
                                <p className="mb-4">I Dati Personali dell’Utente possono essere utilizzati da parte del
                                    Titolare in giudizio o nelle fasi preparatorie alla sua eventuale instaurazione per
                                    la difesa da abusi nell'utilizzo di questa Applicazione o dei Servizi connessi da
                                    parte dell’Utente.
                                    L’Utente dichiara di essere consapevole che il Titolare potrebbe essere obbligato a
                                    rivelare i Dati per ordine delle autorità pubbliche.</p>
                                <h3 className="text-[13px] text-[#262626] font-bold mb-2">Informative specifiche</h3>
                                <p className="mb-4">Su richiesta dell’Utente, in aggiunta alle informazioni contenute in
                                    questa privacy policy, questa Applicazione potrebbe fornire all'Utente delle
                                    informative aggiuntive e contestuali riguardanti Servizi specifici, o la raccolta ed
                                    il trattamento di Dati Personali.
                                </p>
                                <h3 className="text-[13px] text-[#262626] font-bold mb-2">Log di sistema e manutenzione
                                </h3>
                                <p className="mb-4">Per necessità legate al funzionamento ed alla manutenzione, questa
                                    Applicazione e gli eventuali servizi terzi da essa utilizzati potrebbero raccogliere
                                    log di sistema, ossia file che registrano le interazioni e che possono contenere
                                    anche Dati Personali, quali l’indirizzo IP Utente.
                                </p>
                                <h3 className="text-[13px] text-[#262626] font-bold mb-2">Informazioni non contenute in
                                    questa policy
                                </h3>
                                <p className="mb-4">Ulteriori informazioni in relazione al trattamento dei Dati
                                    Personali potranno essere richieste in qualsiasi momento al Titolare del Trattamento
                                    utilizzando gli estremi di contatto.
                                </p>
                                <h3 className="text-[13px] text-[#262626] font-bold mb-2">Modifiche a questa privacy
                                    policy
                                </h3>
                                <p className="mb-4">Il Titolare del Trattamento si riserva il diritto di apportare
                                    modifiche alla presente privacy policy in qualunque momento notificandolo agli
                                    Utenti su questa pagina e, se possibile, su questa Applicazione nonché, qualora
                                    tecnicamente e legalmente fattibile, inviando una notifica agli Utenti attraverso
                                    uno degli estremi di contatto di cui è in possesso. Si prega dunque di consultare
                                    con frequenza questa pagina, facendo riferimento alla data di ultima modifica
                                    indicata in fondo.
                                    <p>
                                        Qualora le modifiche interessino trattamenti la cui base giuridica è il
                                        consenso, il
                                        Titolare provvederà a raccogliere nuovamente il consenso dell’Utente, se
                                        necessario.
                                    </p>
                                </p>
                            </div>


                            <div className="pt-[21px]">
                                <ul className="list-none space-y-[21px]">
                                    <li>
                                        <DetailItem title="Definizioni e riferimenti legali" icon={Bookmark}
                                                    initiallyOpen={false}>
                                            <h3 className="text-[13px] text-[#262626] font-bold mb-2">Dati Personali (o
                                                Dati)</h3>
                                            <p className="mb-4">Costituisce dato personale qualunque informazione che,
                                                direttamente o indirettamente, anche in collegamento con qualsiasi altra
                                                informazione, ivi compreso un numero di identificazione personale, renda
                                                identificata o identificabile una persona fisica.
                                            </p>
                                            <h3 className="text-[13px] text-[#262626] font-bold mb-2">Dati di
                                                Utilizzo</h3>
                                            <p className="mb-4">Sono le informazioni raccolte automaticamente attraverso
                                                questa Applicazione (anche da applicazioni di parti terze integrate in
                                                questa Applicazione), tra cui: gli indirizzi IP o i nomi a dominio dei
                                                computer utilizzati dall’Utente che si connette con questa Applicazione,
                                                gli indirizzi in notazione URI (Uniform Resource Identifier), l’orario
                                                della richiesta, il metodo utilizzato nell’inoltrare la richiesta al
                                                server, la dimensione del file ottenuto in risposta, il codice numerico
                                                indicante lo stato della risposta dal server (buon fine, errore, ecc.)
                                                il paese di provenienza, le caratteristiche del browser e del sistema
                                                operativo utilizzati dal visitatore, le varie connotazioni temporali
                                                della visita (ad esempio il tempo di permanenza su ciascuna pagina) e i
                                                dettagli relativi all’itinerario seguito all’interno dell’Applicazione,
                                                con particolare riferimento alla sequenza delle pagine consultate, ai
                                                parametri relativi al sistema operativo e all’ambiente informatico
                                                dell’Utente.
                                            </p>
                                            <h3 className="text-[13px] text-[#262626] font-bold mb-2">Utente</h3>
                                            <p className="mb-4">L'individuo che utilizza questa Applicazione che, salvo
                                                ove diversamente specificato, coincide con l'Interessato.
                                            </p>
                                            <h3 className="text-[13px] text-[#262626] font-bold mb-2">Interessato</h3>
                                            <p className="mb-4">La persona fisica cui si riferiscono i Dati Personali.
                                            </p>
                                            <h3 className="text-[13px] text-[#262626] font-bold mb-2">Responsabile del
                                                Trattamento (o Responsabile)</h3>
                                            <p className="mb-4">La persona fisica, giuridica, la pubblica
                                                amministrazione e qualsiasi altro ente che tratta dati personali per
                                                conto del Titolare, secondo quanto esposto nella presente privacy
                                                policy.
                                            </p>
                                            <h3 className="text-[13px] text-[#262626] font-bold mb-2">Titolare del
                                                Trattamento (o Titolare)</h3>
                                            <p className="mb-4">La persona fisica o giuridica, l'autorità pubblica, il
                                                servizio o altro organismo che, singolarmente o insieme ad altri,
                                                determina le finalità e i mezzi del trattamento di dati personali e gli
                                                strumenti adottati, ivi comprese le misure di sicurezza relative al
                                                funzionamento ed alla fruizione di questa Applicazione. Il Titolare del
                                                Trattamento, salvo quanto diversamente specificato, è il titolare di
                                                questa Applicazione.
                                            </p>
                                            <h3 className="text-[13px] text-[#262626] font-bold mb-2">Questa
                                                Applicazione</h3>
                                            <p className="mb-4">Lo strumento hardware o software mediante il quale sono
                                                raccolti e trattati i Dati Personali degli Utenti.
                                            </p>
                                            <h3 className="text-[13px] text-[#262626] font-bold mb-2">Servizio</h3>
                                            <p className="mb-4">Il Servizio fornito da questa Applicazione così come
                                                definito nei relativi termini (se presenti) su questo sito/applicazione.
                                            </p>
                                            <h3 className="text-[13px] text-[#262626] font-bold mb-2">Unione Europea (o
                                                UE)</h3>
                                            <p className="mb-4">Salvo ove diversamente specificato, ogni riferimento
                                                all’Unione Europea contenuto in questo documento si intende esteso a
                                                tutti gli attuali stati membri dell’Unione Europea e dello Spazio
                                                Economico Europeo.
                                            </p>
                                            <h3 className="text-[13px] text-[#262626] font-bold mb-2">Cookie</h3>
                                            <p className="mb-4">I Cookie sono Strumenti di Tracciamento che consistono
                                                in piccole porzioni di dati conservate all'interno del browser
                                                dell'Utente.
                                            </p>
                                            <h3 className="text-[13px] text-[#262626] font-bold mb-2">Strumento di
                                                Tracciamento</h3>
                                            <p className="mb-4">Per Strumento di Tracciamento s’intende qualsiasi
                                                tecnologia - es. Cookie, identificativi univoci, web beacons, script
                                                integrati, e-tag e fingerprinting - che consenta di tracciare gli
                                                Utenti, per esempio raccogliendo o salvando informazioni sul dispositivo
                                                dell’Utente.
                                            </p>

                                            <div className="my-6 border-t border-gray-300"></div>

                                            <h3 className="text-[13px] text-[#262626] font-bold mb-2">Riferimenti
                                                legali</h3>
                                            <p className="mb-4">Ove non diversamente specificato, questa informativa
                                                privacy riguarda esclusivamente questa Applicazione.
                                            </p>
                                        </DetailItem>
                                    </li>
                                </ul>
                            </div>
                        </div>


                        <div className="py-5 border-t border-[#e5e5e5] text-[12px] text-[#595858]">
                            <p className="mb-4">Ultima modifica: 1 ottobre 2025</p>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
