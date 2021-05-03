export interface UserInterface {
  _id: string;
  email: string;
  password: string;
  name: string;
  isVerified: boolean;
  verifyToken: string;
  changeEmailToken: string;
  passwordResetToken: string;
  role: string;
  legalEntity: string;
  activeReservations: Array<string>;
  pastReservations: Array<string>;
  canceledReservations: Array<string>;
  favorites: Array<string>;
  contacts: Object;
  updatedAt: Date;
  createdAt: Date;
}
