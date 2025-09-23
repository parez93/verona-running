import {Event} from "@/api/event/event";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";

export default function EventPast({events}: { events: Event[] }) {
    return (
        <div className="overflow-x-auto rounded-lg border bg-card">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Titolo</TableHead>
                        <TableHead>Data</TableHead>
                        <TableHead>Ora</TableHead>
                        <TableHead>Luogo</TableHead>
                        <TableHead>Percorso</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {events.map((ev) => (
                        <TableRow key={ev.id}>
                            <TableCell className="font-medium">{ev.title}</TableCell>
                            <TableCell>{new Date(ev.datetime).toLocaleDateString("it-IT")}</TableCell>
                            <TableCell>{new Date(ev.datetime).toLocaleTimeString("it-IT", {
                                hour: "2-digit",
                                minute: "2-digit"
                            })}</TableCell>
                            <TableCell className="max-w-[280px] truncate">
                                <a href={ev.location_url} target="_blank"
                                   rel="noopener noreferrer"
                                   className="hover:underline">
                                    {ev.location_label}
                                </a>
                            </TableCell>
                            <TableCell className="max-w-[280px] truncate">
                                <a href={ev.route_url} target="_blank" rel="noopener noreferrer"
                                   className="hover:underline">
                                    {ev.route_url}
                                </a>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
