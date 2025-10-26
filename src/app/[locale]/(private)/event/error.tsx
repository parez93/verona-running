"use client";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen gap-4">
            <h1 className="text-2xl font-bold text-red-600">Errore</h1>
            <p>{error.message}</p>
            <button
                onClick={() => reset()}
                className="px-4 py-2 bg-blue-500 text-white rounded-md"
            >
                Riprova
            </button>
        </div>
    );
}
