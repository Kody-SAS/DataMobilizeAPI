export type CreateUserInput = {
  username: string;
  email: string;
  password: string;
  localisation: string;
  isVerified: boolean;
};

export type User = {
  id: string;
  username: string;
  email: string;
  password: string;
  localisation: string;
  isVerified: boolean;
  updated_at: Date;
  created_at: Date;
  deleted_at: Date;
};
