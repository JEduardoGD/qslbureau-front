/*
[
    {
        "asociado": "Federacion Mexicana de Radio Experimentadores",
        "direccion": "Box 907, 06000 Mexico D.F.",
        "nota": null,
        "pais": "MEXICO",
        "cerrado": false,
        "prefijos": [
            {
                "inicial": "XA",
                "final": "XI"
            },
            {
                "inicial": "4A",
                "final": "4C"
            },
            {
                "inicial": "6D",
                "final": "6J"
            }
        ]
    }
]
*/
export interface Buro {
    asociado: string;
    direccion: string;
    nota: string;
    pais: string;
    cerrado: boolean;
    prefijos: Prefijo[];
}
export interface Prefijo {
    regex: string;
}