export type Staff = {
  id: string;
  name: string;
  credentials: string;
  role: string;
  gender: "M" | "F" | "Other";
  race: string;
  site: string;
  phone: string;
  email: string;
  lastDocument: string;
  lastLogin: string;
  numberOfCases: number;
}