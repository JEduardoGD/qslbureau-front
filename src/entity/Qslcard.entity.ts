export interface Qslcard {
    qslId: number | undefined;
    to: string | undefined;
    via: string | undefined;
    slotNumber: number | undefined;
    qslsInSlot: number | undefined;
    dateTimeCapture: Date | undefined;
    localId: number | undefined;
    idCapturer: number;
    qslToRecordFound: boolean;
    qslViaRecordFound: boolean;
}