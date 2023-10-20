export interface InputValidation {
    shipId: number | undefined;
    idSlot: number | undefined;
    shippingMethodId: number | undefined;
    address: string | undefined;
    regionalRepresentativeId: string | undefined;
    trackingCode: string | undefined;
    error: string | undefined;
    valid: boolean | undefined;
}