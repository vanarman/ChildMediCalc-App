import { DrugType } from "./DrugType";

export interface Drug {
    id: String,
    type: DrugType,
    size: number,
    dose: number,
    minAge: number | null,
    maxAge: number | null,
    requireAge: boolean
}