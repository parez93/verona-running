import React from 'react';
import {Bookmark, ChevronDown, ExternalLink, Key, Server, User} from 'lucide-react';
import Link from "next/link";
import {ROUTES} from "@/constants/routes";

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
                                Termini e Condizioni di <strong className="font-bold">Verona Running</strong>
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
                                <h2 className="text-[17px] text-[#262626] font-bold text-center">1 - Introduzione
                                </h2>
                            </div>
                        </div>

                        <div className="">
                            <p><strong>Le manifestazioni Verona Running</strong> sono eventi generalmente di 5 km
                                organizzati e gestiti da volontari che si svolgono ogni settimana a Verona e a cui
                                possono partecipare gratuitamente persone di ogni abilità e competenza per camminare,
                                fare jogging, correre o fare volontariato.</p>


                            <p className="mt-4">Gli eventi Verona Running sono rivolti alla collettività e gestiti dalla
                                comunità, con
                                enfasi sulla partecipazione piuttosto che sui risultati, e la nostra missione è
                                promuovere uno stile di vita più sano e attivo.</p>


                            <p className="mt-4">I presenti termini e condizioni si riferiscono specificamente
                                alla <strong>registrazione
                                    online</strong> per la partecipazione agli Eventi Verona Running. Con la fornitura
                                dei
                                Suoi dati di registrazione sulla relativa pagina online, acconsente a prendere parte
                                agli Eventi Verona Running e accetta i presenti termini e condizioni.</p>


                            <p className="mt-4">I presenti termini e condizioni potrebbero aver subito qualche
                                variazione sin dalla Sua
                                ultima consultazione. Per ottenere un elenco delle modifiche affiancato dalle date di
                                revisione, La invitiamo a contattarci online.</p>


                            <p className="mt-4">Una registrazione ininterrotta a Verona Running conferma il Suo consenso
                                a tutte le
                                eventuali modifiche apportate.</p>


                            <p className="mt-4">Se viene apportata una modifica significativa a questi termini e
                                condizioni, verrai
                                avvisato via e-mail.</p>
                        </div>

                        <div className="pb-5 mt-4">
                            <div className="pb-[21px] border-b border-[#e5e5e5]">
                                <h2 className="text-[17px] text-[#262626] font-bold text-center">2 - Definizioni e
                                    interpretazioni
                                </h2>
                            </div>
                        </div>
                        <div>
                            <p>Nelle condizioni ivi esposte, si applicheranno le seguenti definizioni:</p>
                            <ul className="list-disc space-y-2 ml-4">
                                <li>
                                    Il termine “Eventi 5k” fa riferimento a eventi Verona Running settimanali rivolti a
                                    partecipanti di almeno 18 anni di età.
                                </li>
                                <li>
                                    Il termine “Contenuto” fa riferimento a qualunque materiale pubblicato su qualsiasi
                                    sito web, applicazione e pagina social ufficiale di Verona Running, compresi a
                                    titolo esemplificativo ma non esaustivo, dati relativi alla partecipazione, testi,
                                    immagini, animazioni, video e loghi.
                                </li>
                                <li>
                                    Il termine “Team dell'evento” fa riferimento ai volontari che organizzano e
                                    gestiscono i singoli eventi Verona Running.
                                </li>
                                <li>
                                    I termini “Noi/nostro” fanno riferimento a Verona Running.
                                </li>
                                <li>
                                    I termini “Partecipare/partecipante/partecipazione” fanno riferimento alle
                                    camminate, corse e attività di volontariato presso Verona Running.
                                </li>
                                <li>
                                    Il termine “Informativa sulla privacy” fa riferimento all'Informativa sulla privacy
                                    di Verona Running
                                </li>
                                <li>
                                    Il termine “Profilo Verona Running” fa riferimento all'account personale degli
                                    iscritti fornito da Verona Running al momento della registrazione.
                                </li>
                                <li>
                                    I termini “Lei/Suo” fanno riferimento alla persona che effettua la registrazione a
                                    Verona Running.
                                </li>
                            </ul>
                        </div>


                        <div className="pb-5 mt-4">
                            <div className="pb-[21px] border-b border-[#e5e5e5]">
                                <h2 className="text-[17px] text-[#262626] font-bold text-center">3 – Modalità di
                                    registrazione
                                </h2>
                            </div>
                        </div>
                        <div>
                            <p>La registrazione deve essere completata online e corredata delle seguenti
                                informazioni:</p>
                            <ul className="list-disc space-y-2 ml-4">
                                <li>
                                    Nome completo usato solitamente
                                </li>
                                <li>Indirizzo e-mail valido
                                </li>
                            </ul>
                        </div>
                        <div className="mt-4">
                            <p>Vietiamo la registrazione di nomi che includano un linguaggio scortese,
                                offensivo,
                                politico e/o inappropriato, che possano incitare e/o fare riferimento a qualsiasi tipo
                                di violenza e/o di odio verso terzi, che contengano connotazioni sessuali e/o screditino
                                Verona Running e la nostra decisione è irrevocabile.</p>

                            <p className="mt-4">Verona Running si riserva la facoltà di eliminare risultati, disattivare
                                e/o cancellare
                                profili Verona Running o di intraprendere altre azioni da noi ritenute opportune.
                            </p>

                            <p className="mt-4">Al momento della registrazione con Verona Running, riceverà:</p>
                            <ul className="list-disc space-y-2 ml-4">
                                <li>
                                    Accesso a un profilo Verona Running personale che Le consentirà di visualizzare la
                                    Sua
                                    cronologia di partecipazione e altri dati personali
                                </li>

                                <li>Accesso a eventi gratuiti settimanali a cui potrà partecipare
                                    previa registrazione (a meno che non vengano annullati dal Team
                                    dell'evento in linea con le politiche di Verona Running)
                                </li>
                                <li>Regole e indicazioni chiare per coloro che desiderano partecipare a Verona Running
                                    nel ruolo
                                    di podisti, corridori o volontari
                                </li>
                                <li>Esame periodico delle regole e delle indicazioni di Verona Running e chiara
                                    comunicazione di
                                    sostanziali aggiornamenti e/o di nuove regole e indicazioni
                                </li>
                            </ul>
                        </div>

                        <div className="pb-5 mt-4">
                            <div className="pb-[21px] border-b border-[#e5e5e5]">
                                <h2 className="text-[17px] text-[#262626] font-bold text-center">4 – Privacy
                                </h2>
                            </div>
                        </div>
                        <div>
                            <p>La invitiamo a leggere attentamente l'<Link href={ROUTES.privacypolicy()}>Informativa
                                sulla privacy</Link> di Verona
                                Running al fine di comprendere le modalità di trattamento dei Suoi dati personali.
                                Mediante la registrazione a Verona Running, accetta che Verona Running potrebbe
                                utilizzare i dati forniti per tutti i motivi definiti nella politica.</p>
                        </div>


                        <div className="pb-5 mt-4">
                            <div className="pb-[21px] border-b border-[#e5e5e5]">
                                <h2 className="text-[17px] text-[#262626] font-bold text-center">5 - Aspetti informatici
                                    e utilizzo accettabile del sito web
                                </h2>
                            </div>
                        </div>
                        <div>
                            <p>Verona Running fornisce contenuti online agli individui iscritti, ai partecipanti degli
                                eventi, inclusi ma non limitati a:
                                Siti web dedicati a eventi specifici che contengono risultati recenti, cronologia e
                                notizie relative agli eventi.</p>

                            <p className="mt-4">Compieremo ogni ragionevole sforzo per tenere aggiornate le informazioni
                                contenute sui nostri Siti web, tuttavia, non rilasciamo alcuna dichiarazione,
                                affermazione o garanzia, espressa o implicita, circa l'accuratezza, la completezza o
                                l'aggiornamento del contenuto del nostro sito.</p>

                            <p className="mt-4">Non è concesso ottenere o tentare di ottenere un accesso non autorizzato
                                ai nostri servizi. Qualsiasi attacco o abuso dei nostri Servizi sarà considerato un atto
                                criminale ai sensi della legge Computer Misuse Act del 1990 e/o di qualsiasi normativa
                                locale e/o nazionale pertinente.</p>

                            <p className="mt-4">Prende atto e riconosce che tutti i siti web e i contenuti di Verona
                                Running sono protetti
                                da leggi e trattati sui diritti d'autore in vigore globalmente e che tali diritti sono
                                riservati. In qualità di autori di tutti i contenuti, unitamente ad altri collaboratori,
                                dobbiamo essere sempre riconosciuti come tali.</p>

                            <p className="mt-4">Accetta e conferma che nessun contenuto potrà essere utilizzato per
                                scopi diversi dalle
                                legittime finalità per cui è stato creato senza espressa autorizzazione da parte di
                                Verona
                                Running. Ciò include la trasmissione, lo scraping e l'uso di contenuti, servizi e flussi
                                di
                                dati.</p>

                            <p className="mt-4">I contenuti non possono essere utilizzati per i seguenti scopi, ma non
                                limitatamente:</p>
                            <ul className="list-disc space-y-2 ml-4">
                                <li>
                                    scopi commerciali e/o di lucro
                                </li>

                                <li>in violazione di qualunque norma e/o regolamento applicabile
                                </li>
                                <li>con la finalità di arrecare danno o tentare di ledere altri individui
                                </li>
                                <li>l'invio, il caricamento e/o la trasmissione di qualsiasi materiale che possa
                                    contenere una
                                    codifica con effetto dannoso su coloro che lo ricevono
                                </li>
                            </ul>

                            <p className="mt-4">Spetta a Lei configurare le tecnologie dell'informazione, i programmi
                                informatici e le
                                piattaforme tecnologiche per accedere con successo ai nostri siti web. Poiché non
                                possiamo
                                garantire che i nostri siti web saranno sicuri e/o privi di virus e/o codifiche con un
                                effetto potenzialmente dannoso, spetta a Lei utilizzare software antivirus aggiornati e
                                accertarsi che eventuali password richieste siano private e sicure.</p>

                            <p className="mt-4">È Sua responsabilità salvaguardare la password utilizzata per accedere
                                al Servizio e per
                                svolgere qualsiasi attività o azione che richieda la Sua password, a prescindere se
                                usata
                                con il nostro Servizio o con servizi di terzi.</p>

                            <p className="mt-4">Se riteniamo che un individuo (individui) e/o un'organizzazione abbia
                                violato una qualsiasi
                                di queste regole, segnaleremo tale violazione alle autorità giudiziarie competenti e
                                collaboreremo con tali autorità in qualsiasi maniera ritenuta necessaria e
                                opportuna.</p>
                        </div>

                        <div className="pb-5 mt-4">
                            <div className="pb-[21px] border-b border-[#e5e5e5]">
                                <h2 className="text-[17px] text-[#262626] font-bold text-center">6 - Condotta
                                </h2>
                            </div>
                        </div>
                        <div>
                            <p>La esortiamo a essere sempre consapevole delle Sue azioni e dell'impatto che potrebbero
                                avere su altri, tenendo presente che i nostri eventi sono frequentati da famiglie,
                                bambini e adulti vulnerabili. Laddove riteniamo che un comportamento non sia appropriato
                                a un evento del genere, ci riserviamo il diritto di adottare tutte le misure necessarie
                                per garantire la salvaguardia di tutti i presenti.</p>


                            <p className="mt-4">Con la registrazione e/o partecipazione a Verona Running, accetta di
                                aderire anche alle
                                nostre regole e linee guida.</p>

                            <p className="mt-4">Se decide di fare volontariato per Verona Running, deve rispettare
                                eventuali regole e linee
                                guida aggiuntive, oltre a ottemperare a qualsiasi legge locale.</p>

                            <p className="mt-4">Qualora Verona Running venga a conoscenza (e venga comprovato in modo
                                ritenuto
                                soddisfacente) di una Sua partecipazione a Verona Running secondo modalità non conformi
                                alle
                                regole e/o alle linee guida di Verona Running e/o di azioni azioni/attività da Lei
                                svolte in
                                qualsiasi località che mettono a rischio o discreditano Verona Running, Verona Running
                                intraprenderà qualsiasi azione ritenuta ragionevole e opportuna, che potrebbe includere,
                                tra
                                le altre, la cancellazione del Suo profilo Verona Running e il divieto ad assistere e/o
                                partecipare a uno o a tutti gli eventi Verona Running.</p>
                        </div>

                        <div className="pb-5 mt-4">
                            <div className="pb-[21px] border-b border-[#e5e5e5]">
                                <h2 className="text-[17px] text-[#262626] font-bold text-center">7 - Responsabilità
                                </h2>
                            </div>
                        </div>
                        <div className="pb-5">
                            <p>Verona Running e coloro che agiscono per nostro conto non accettano alcuna responsabilità per
                                eventuali perdite, danni o spese di qualsivoglia natura, compresi a titolo esemplificativo
                                ma non esaustivo, perdita di beni o danni materiali o reclami di terze parti derivanti in
                                qualunque modo dalla Sua partecipazione.</p>

                            <p className="mt-4">Verona Running accoglie persone di ogni abilità, tuttavia, nel momento in cui Lei acconsente al
                                presente regolamento, accetta di farlo interamente a Suo rischio; riconosce, inoltre, che
                                spetta a Lei assicurarsi di essere in salute e in grado di prendere parte agli eventi
                                Verona Running e che lo stesso vale per coloro di cui è responsabile.</p>

                            <p className="mt-4">La esortiamo, ove opportuno, a ottenere un parere medico prima di partecipare a qualsiasi
                                evento Verona Running.</p>
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
