import { LocationInterface } from "./propertyInterfaces";

export interface LockProps {
  _id: string;
  i1: number;
  i2: number;
  i3: number;
  i4: number;
  i5: number;
  i6: number;
  i7: number;
  i8: number;
  i9: number;
  o1: number;
  o2: number;
  o3: number;
  timeInterval: number;
  e: string;
  property: string;
  propertyFull: LockProps;
}

export interface LockProps {
  _id: string;
  title: string;
  location: LocationInterface;
}
