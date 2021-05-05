import { PropertyInterface } from "./propertyInterfaces";

export interface ReservationInterface {
  _id: string;
  userId: string;
  propertyId: string;
  property: PropertyInterface;
  residents: number;
  price: number;
  startDate: Date;
  endDate: Date;
  timeZone: string;
  updatedAt: Date;
  createdAt: Date;
}
