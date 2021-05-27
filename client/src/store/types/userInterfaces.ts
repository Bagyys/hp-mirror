import { ReservationInterface } from "./reservationInterfaces";

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
  activeReservations: Array<ReservationInterface>;
  pastReservations: Array<ReservationInterface>;
  canceledReservations: Array<ReservationInterface>;
  favorites: Array<string>;
  contacts: Object;
  updatedAt?: Date;
  createdAt?: Date;
}
