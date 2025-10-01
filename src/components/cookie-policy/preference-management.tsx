import React from 'react';

const PreferenceManagement = () => {
    const browserLinks = [
        { name: 'Google Chrome', href: 'https://support.google.com/chrome/answer/95647?hl=it&p=cpn_cookies' },
        { name: 'Mozilla Firefox', href: 'https://support.mozilla.org/it/kb/Attivare%20e%20disattivare%20i%20cookie' },
        { name: 'Apple Safari', href: 'https://support.apple.com/it-it/guide/safari/manage-cookies-and-website-data-sfri11471/' },
        { name: 'Microsoft Internet Explorer', href: 'http://windows.microsoft.com/it-it/windows-vista/block-or-allow-cookies' },
        { name: 'Microsoft Edge', href: 'https://support.microsoft.com/it-it/help/4027947' },
        { name: 'Brave', href: 'https://support.brave.com/hc/articles/360022806212-How-do-I-use-Shields-while-browsing' },
        { name: 'Opera', href: 'https://help.opera.com/latest/web-preferences/#cookies' },
    ];

    return (
        <div className="pb-[25px]">
            <h2 className="text-[17px] text-[#262626] font-bold mb-4">
                Come gestire le preferenze e prestare o revocare il consenso su questo Sito Web
            </h2>
            <p className="mb-4">
                Qualora l’utilizzo dei Tracker sia basato sul consenso, l’Utente può fornire o revocare tale consenso impostando o aggiornando le proprie preferenze tramite il relativo pannello delle scelte in materia di privacy disponibile su questo Sito Web.
            </p>

            <h3 className="text-[13px] text-[#262626] font-bold mb-2">
                Come controllare o eliminare Cookie e tecnologie simili tramite le impostazioni del tuo dispositivo
            </h3>
            <p className="mb-4">
                Gli Utenti possono utilizzare le impostazioni del proprio browser per:
            </p>
            <ul className="list-disc ml-5 mb-4">
                <li className="mb-2">Vedere quali Cookie o altre tecnologie simili sono stati impostati sul dispositivo;</li>
                <li className="mb-2">Bloccare Cookie o tecnologie simili;</li>
                <li className="mb-2">Cancellare i Cookie o tecnologie simili dal browser.</li>
            </ul>
            <p className="mb-4">
                Le impostazioni del browser, tuttavia, non consentono un controllo granulare del consenso per categoria.
            </p>
            <p className="mb-4">
                Gli Utenti possono, per esempio, trovare informazioni su come gestire i Cookie in alcuni dei browser più diffusi ai seguenti indirizzi:
            </p>
            <ul className="list-disc ml-5 mb-4">
                {browserLinks.map((link) => (
                    <li key={link.name} className="mb-2">
                        <a href={link.href} className="text-link underline">
                            {link.name}
                        </a>
                    </li>
                ))}
            </ul>
            <p className="mb-4">
                Gli Utenti possono inoltre gestire alcuni Strumenti di Tracciamento per applicazioni mobili disattivandoli tramite le apposite impostazioni del dispositivo, quali le impostazioni di pubblicità per dispositivi mobili o le impostazioni relative al tracciamento in generale (gli Utenti possono consultare le impostazioni del dispositivo per individuare quella pertinente).
            </p>

            <h3 className="text-[13px] text-[#262626] font-bold mb-2">
                Conseguenze legate al rifiuto dell'utilizzo di Strumenti di Tracciamento
            </h3>
            <p className="mb-4">
                Gli Utenti sono liberi di decidere se permettere o meno l'utilizzo di Strumenti di Tracciamento. Tuttavia, si noti che gli Strumenti di Tracciamento consentono a questo Sito Web di fornire agli Utenti un'esperienza migliore e funzionalità avanzate (in linea con le finalità delineate nel presente documento). Pertanto, qualora l'Utente decida di bloccare l'utilizzo di Strumenti di Tracciamento, il Titolare potrebbe non essere in grado di fornire le relative funzionalità.
            </p>
        </div>
    );
};

export default PreferenceManagement;
