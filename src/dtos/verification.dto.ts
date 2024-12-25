export type CreateVerificationInput = {
    userId: string;
    code: number;
};

export type Verification = {
    id: string;
    userId: string;
    code: number;
    updated_at: Date;
    created_at: Date;
    deleted_at: Date;
}