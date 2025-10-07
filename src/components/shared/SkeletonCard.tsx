export function SkeletonCard({ title }: { title: string }) {
    return (
        <div className="h-40 rounded-lg border bg-card text-card-foreground p-4">
            <div className="mb-2 h-4 w-40 bg-muted rounded" />
            <div className="space-y-2">
                <div className="h-3 w-full bg-muted rounded" />
                <div className="h-3 w-5/6 bg-muted rounded" />
                <div className="h-3 w-4/6 bg-muted rounded" />
            </div>
        </div>
    );
}
