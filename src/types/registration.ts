export interface Form {
    fields: Record<
        string,
        {
            value: string;
            isValid: boolean;
            onSubmit: () => void;
        }
    >;
    isValid: boolean;
}
