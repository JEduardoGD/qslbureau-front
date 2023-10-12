export interface Slot {
    shipId: number | undefined;
    slotId: number | undefined;
    localId: number | undefined;
    callsignto: string | undefined;
    slotNumber: number | undefined;
    country: string | undefined;
    createdAt: Date | undefined;
    closedAt: Date | undefined;
    statusId: number | undefined;
    qslsInSlot: number | undefined;
    confirmCode: string | undefined;
}