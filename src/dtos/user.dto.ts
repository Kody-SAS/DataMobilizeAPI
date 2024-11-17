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
};
