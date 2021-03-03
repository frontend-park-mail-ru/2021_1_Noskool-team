export interface RegObj {
    fields: Record<
        string,
        {
            value: string;
            isValid: boolean;
        }
    >;
    isValid: boolean;
}
