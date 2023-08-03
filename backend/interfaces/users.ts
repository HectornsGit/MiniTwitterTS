export interface iUser {
  email: string;
  password: string;
  username: string;
}

export interface iRegisteredUser extends iUser {
  id: number;
  bio?: string;
  avatar?: string;
  registration_date: Date;
  activated: boolean;
}
