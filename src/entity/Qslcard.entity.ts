export interface Qslcard {
    qslId: number | undefined;
    toCallsign: string | undefined;
    slotNumber: number | undefined;
    qslsInSlot: number | undefined;
    dateTimeCapture: Date | undefined;
    localId: number | undefined;
    idCapturer: number;
}