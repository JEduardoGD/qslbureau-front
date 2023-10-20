export interface Ship {
    id: number | undefined;
    datetime: Date | undefined;
    slotId: number | undefined;
    shippingMethodId: number | undefined;
    zoneId: number | undefined;
    address: string | undefined;
    trackingCode: string | undefined;
}