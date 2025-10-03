import React from 'react';

const DataControllerInfo = () => {
    return (
        <section>
            <h3 className="text-[13px] text-[#262626] font-bold mb-2">
                Titolare del Trattamento dei Dati
            </h3>
            <p className="mb-4 text-sm leading-normal text-foreground">
                Federico Parezzan
                <br />
                <i>Verona Running</i>
                <br />
                Via Lazzaretto 59F
                <br />
                37133 Verona (VR)
            </p>
            <p className="mb-4 text-sm leading-normal text-foreground">
                <strong className="font-bold">Indirizzo email del Titolare:</strong>{' '}
                <a href="mailto:veronarunning@gmail.com" className="text-link underline">
                    veronarunning@gmail.com
                </a>
            </p>
            <p className="mb-4 text-sm leading-normal text-foreground">
                Data l'oggettiva complessità di identificazione delle tecnologie di tracciamento, gli Utenti sono invitati a contattare il Titolare qualora volessero ricevere ulteriori informazioni in merito all'utilizzo di tali tecnologie su questo Sito Web.
            </p>
        </section>
    );
};

export default DataControllerInfo;
