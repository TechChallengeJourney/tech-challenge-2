export type BankCardFunction = "Crédito" | "Débito";
export type BankCardVariant = "Físico" | "Digital";

export interface BankCard {
    id: string;
    userId: string;
    name: string;
    cardNumber: string;
    expirationDate: string;
    functions: BankCardFunction[];
    variant: BankCardVariant;
}