import {Bookmark, ChevronDown} from 'lucide-react';
import React from "react";

const definitionsData = [
    {
        term: 'Dati Personali (o Dati)',
        definition: 'Costituisce dato personale qualunque informazione che, direttamente o indirettamente, anche in collegamento con qualsiasi altra informazione, ivi compreso un numero di identificazione personale, renda identificata o identificabile una persona fisica.',
    },
    {
        term: 'Dati di Utilizzo',
        definition: 'Sono le informazioni raccolte automaticamente attraverso questo Sito Web (anche da applicazioni di parti terze integrate in questo Sito Web), tra cui: gli indirizzi IP o i nomi a dominio dei computer utilizzati dall’Utente che si connette con questo Sito Web, gli indirizzi in notazione URI (Uniform Resource Identifier), l’orario della richiesta, il metodo utilizzato nell’inoltrare la richiesta al server, la dimensione del file ottenuto in risposta, il codice numerico indicante lo stato della risposta dal server (buon fine, errore, ecc.) il paese di provenienza, le caratteristiche del browser e del sistema operativo utilizzati dal visitatore, le varie connotazioni temporali della visita (ad esempio il tempo di permanenza su ciascuna pagina) e i dettagli relativi all’itinerario seguito all’interno dell’Applicazione, con particolare riferimento alla sequenza delle pagine consultate, ai parametri relativi al sistema operativo e all’ambiente informatico dell’Utente.',
    },
    {
        term: 'Utente',
        definition: 'L\'individuo che utilizza questo Sito Web che, salvo ove diversamente specificato, coincide con l\'Interessato.',
    },
    {
        term: 'Interessato',
        definition: 'La persona fisica cui si riferiscono i Dati Personali.',
    },
    {
        term: 'Responsabile del Trattamento (o Responsabile)',
        definition: 'La persona fisica, giuridica, la pubblica amministrazione e qualsiasi altro ente che tratta dati personali per conto del Titolare, secondo quanto esposto nella presente privacy policy.',
    },
    {
        term: 'Titolare del Trattamento (o Titolare)',
        definition: 'La persona fisica o giuridica, l\'autorità pubblica, il servizio o altro organismo che, singolarmente o insieme ad altri, determina le finalità e i mezzi del trattamento di dati personali e gli strumenti adottati, ivi comprese le misure di sicurezza relative al funzionamento ed alla fruizione di questo Sito Web. Il Titolare del Trattamento, salvo quanto diversamente specificato, è il titolare di questo Sito Web.',
    },
    {
        term: 'Questo Sito Web (o questa Applicazione)',
        definition: 'Lo strumento hardware o software mediante il quale sono raccolti e trattati i Dati Personali degli Utenti.',
    },
    {
        term: 'Servizio',
        definition: 'Il Servizio fornito da questo Sito Web così come definito nei relativi termini (se presenti) su questo sito/applicazione.',
    },
    {
        term: 'Unione Europea (o UE)',
        definition: 'Salvo ove diversamente specificato, ogni riferimento all’Unione Europea contenuto in questo documento si intende esteso a tutti gli attuali stati membri dell’Unione Europea e dello Spazio Economico Europeo.',
    },
    {
        term: 'Cookie',
        definition: 'I Cookie sono Strumenti di Tracciamento che consistono in piccole porzioni di dati conservate all\'interno del browser dell\'Utente.',
    },
    {
        term: 'Strumento di Tracciamento',
        definition: 'Per Strumento di Tracciamento s’intende qualsiasi tecnologia - es. Cookie, identificativi univoci, web beacons, script integrati, e-tag e fingerprinting - che consenta di tracciare gli Utenti, per esempio raccogliendo o salvando informazioni sul dispositivo dell’Utente.',
    },
];

const referenceData = {
    term: 'Riferimenti legali',
    definition: 'Ove non diversamente specificato, questa informativa privacy riguarda esclusivamente questo Sito Web.',
};

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


const DefinitionsLegalReferences = () => {
    return (
        <div className="pt-[21px]">
            <ul className="list-none space-y-[21px]">
                <li>
                    <DetailItem title="Definizioni e riferimenti legali" icon={Bookmark}
                                initiallyOpen={true}>
                        <h3 className="text-[13px] text-[#262626] font-bold mb-2">Dati Personali (o
                            Dati)</h3>
                        <p className="mb-4">Costituisce dato personale qualunque informazione che, direttamente o
                            indirettamente, anche in collegamento con qualsiasi altra informazione, ivi compreso un
                            numero di identificazione personale, renda identificata o identificabile una persona fisica.
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
                        <h3 className="text-[13px] text-[#262626] font-bold mb-2">Questo Sito Web (o questa Applicazione)
                        </h3>
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



        /*    <div className="my-8 bg-accent p-6 border border-border rounded-lg">
                    <h3 className="flex items-center text-base font-bold text-primary mb-6">
                        <Bookmark className="w-4 h-4 mr-3 text-primary flex-shrink-0" fill="currentColor" strokeWidth={0} />
                        Definizioni e riferimenti legali
                    </h3>
                    <div className="space-y-4">
                        {definitionsData.map((item) => (
                            <div key={item.term}>
                                <h4 className="text-sm font-bold text-primary mb-2">{item.term}</h4>
                                <p className="text-sm text-foreground leading-normal">{item.definition}</p>
                            </div>
                        ))}
                    </div>
                    <hr className="my-4 border-border" />
                    <div>
                        <h4 className="text-sm font-bold text-primary mb-2">{referenceData.term}</h4>
                        <p className="text-sm text-foreground leading-normal">{referenceData.definition}</p>
                    </div>
                </div>*/
    );
};

export default DefinitionsLegalReferences;
