export interface ShippingMethod {
    id: number | undefined;
    key: string | undefined;
    name: string | undefined;
    description: string | undefined;
    haveTracking: boolean | undefined;
    requireAddress: boolean | undefined;
}
