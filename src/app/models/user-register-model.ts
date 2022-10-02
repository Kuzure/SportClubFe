export class RegisteryUser {
  email: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  phoneNumber: string;
  gender: number;
  degree: number; 
  is_Paid: boolean;
}
export enum Gender {
  male = 0,
  female = 1,
}
export enum Kyu {
  Kyu1 = 1,
  Kyu2 = 2,
  Kyu3 = 3,
  Kyu4 = 4,
  Kyu5 = 5,
  Kyu6 = 6,
  Dan1 = 7,
  Dan2 = 8,
  Dan3 = 9,
}
