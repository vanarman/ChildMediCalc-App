import { DrugType } from "./DrugType";

export interface Drug {
  id: string;
  type: DrugType;
  size: number;
  dose: number;
  minAge: number | null;
  maxAge: number | null;
  requireAge: boolean;
}
