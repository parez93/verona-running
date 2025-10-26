export function formatDateLong(datetime: string | Date): string {
    console.log(datetime)
    return new Intl.DateTimeFormat("it-IT", {
        weekday: "long",
        day: "numeric",
        month: "long",
    }).format(new Date(datetime));
}

export function formatTimeShort(datetime: string | Date): string {
    return new Date(datetime).toLocaleTimeString("it-IT", {
        hour: "2-digit",
        minute: "2-digit",
    });
}

export function timeRemaining(targetDate: string | Date): [string, string, string] {
    const now = new Date().getTime();
    const end = new Date(targetDate).getTime();

    let diff = end - now;

    if (diff < 0) diff = 0; // se la data è passata

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    const pad = (n: number) => n.toString().padStart(2, "0");

    return [`${pad(days)}g`, `${pad(hours)}h`, `${pad(minutes)}m`];
}
