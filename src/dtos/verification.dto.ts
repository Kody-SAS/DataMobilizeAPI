export type CreateVerificationInput = {
    userId: string;
    code: number;
};

export type Verification = {
    id: string;
    userId: string;
    code: number;
}