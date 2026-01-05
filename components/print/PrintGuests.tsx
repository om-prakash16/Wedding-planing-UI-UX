"use client";

import { useGuests } from "@/hooks/useGuests";

export function PrintGuests() {
    const { guests } = useGuests();
    // Sort by name
    const sortedGuests = [...guests].sort((a, b) => a.name.localeCompare(b.name));

    return (
        <div className="print-section break-before-page pt-8">
            <h2 className="font-serif text-2xl font-bold bg-wedding-slate/5 border-b-2 border-wedding-slate/20 p-2 mb-4">
                Guest List
            </h2>

            <table className="w-full text-sm text-left">
                <thead>
                    <tr className="border-b-2 border-black">
                        <th className="py-2 w-[5%]">#</th>
                        <th className="py-2 w-[30%]">Name</th>
                        <th className="py-2 w-[15%]">Side</th>
                        <th className="py-2 w-[20%]">Contact</th>
                        <th className="py-2 w-[10%]">RSVP</th>
                        <th className="py-2 w-[10%]">Food</th>
                        <th className="py-2">Notes</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedGuests.map((guest, idx) => (
                        <tr key={guest.id} className="border-b border-gray-200">
                            <td className="py-2 text-gray-400">{idx + 1}</td>
                            <td className="py-2 font-medium">{guest.name}</td>
                            <td className="py-2">
                                <span className={`px-2 py-0.5 text-[10px] uppercase border rounded ${guest.side === 'Bride' ? 'text-wedding-blush-dark border-wedding-blush' : 'text-blue-600 border-blue-200'}`}>
                                    {guest.side}
                                </span>
                            </td>
                            <td className="py-2">{guest.phone}</td>
                            <td className="py-2 font-medium">{guest.rsvp}</td>
                            <td className="py-2">{guest.food}</td>
                            <td className="py-2 text-xs italic text-gray-500 truncate max-w-[150px]">{guest.notes}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
