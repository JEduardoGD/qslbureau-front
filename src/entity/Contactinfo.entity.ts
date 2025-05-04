export interface Contactinfo {
    idContact: number;
    name: string;
    surename: string;
    callsign: string;
    address: string;
    email: string;
    whatsapp: string;
    wantemail: boolean;
    start: Date | null;
    end: Date | null;
    listOf: string | null;
}