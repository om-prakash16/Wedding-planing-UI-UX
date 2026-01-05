"use client";

import { useOutfits, Outfit } from "@/hooks/useOutfits";

const RenderOutfitSection = ({ title, data }: { title: string, data: Outfit[] }) => (
    <div className="mb-6 break-inside-avoid">
        <h3 className="font-serif text-lg font-bold text-black border-b border-black/20 pb-1 mb-3 uppercase tracking-wider">{title}</h3>
        {data.length > 0 ? (
            <div className="grid grid-cols-2 gap-6">
                {data.map(outfit => (
                    <div key={outfit.id} className="border border-gray-200 rounded p-3">
                        <div className="flex justify-between items-start mb-2">
                            <h4 className="font-bold text-base">{outfit.ceremony}</h4>
                            <span className="text-xs uppercase bg-gray-100 px-2 py-0.5 rounded">{outfit.type}</span>
                        </div>
                        <p className="text-sm font-medium mb-1">{outfit.name}</p>
                        <p className="text-xs italic text-gray-600 mb-2">{outfit.notes}</p>

                        <div className="text-xs border-t border-gray-100 pt-2 space-y-1">
                            <p className="font-bold text-gray-400 uppercase text-[10px]">Jewelry</p>
                            {Object.entries(outfit.jewelry).map(([key, val]) => (
                                val && <div key={key} className="flex justify-between">
                                    <span className="capitalize text-gray-500">{key}:</span>
                                    <span>{val}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        ) : (
            <p className="text-sm italic text-gray-400">No outfits planned.</p>
        )}
    </div>
);

export function PrintOutfits() {
    const { outfits } = useOutfits();
    // Filter by person
    const brideOutfits = outfits.filter(o => o.person === "Bride");
    const groomOutfits = outfits.filter(o => o.person === "Groom");

    return (
        <div className="print-section break-before-page pt-8">
            <h2 className="font-serif text-2xl font-bold bg-wedding-slate/5 border-b-2 border-wedding-slate/20 p-2 mb-4">
                Outfits & Styling
            </h2>

            <RenderOutfitSection title="Bride" data={brideOutfits} />
            <RenderOutfitSection title="Groom" data={groomOutfits} />

            <div className="mt-8 border-t-2 border-dashed border-gray-300 pt-4">
                <h4 className="font-serif text-sm text-gray-400 uppercase tracking-widest mb-2">Notes</h4>
                <div className="h-32"></div>
            </div>
        </div>
    );
}
