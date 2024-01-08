import { Schema, model, models } from 'mongoose';

export interface ActiveVeliabilitiesType {
  title: string;
  valueInvested: number;
  priceBuy: number;
  priceSell: number;
}
export interface TransactionsType {
  title: string;
  value: number;
}

export interface UserType {
  name: string;
  email: string;
  dateBirth: string;
  cellPhone: string;
  country: string;
  password: string;
  traffic?: number;
  active: ActiveVeliabilitiesType[];
  veliabilities: ActiveVeliabilitiesType[];
  transactions: TransactionsType[]; // balnce
}

const usersSchema = new Schema<UserType>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  dateBirth: { type: String, required: true },
  cellPhone: { type: String, required: true },
  country: { type: String, required: true },
  password: { type: String, required: true },
  traffic: { type: Number, required: false },
  active: [{ value: { type: Number, required: false } }],
  veliabilities: [{ value: { type: Number, required: false } }],
  transactions: [
    {
      title: { type: String, required: false },
      value: { type: Number, required: false },
    },
  ],
});

const usersModel = models.Users || model<UserType>('Users', usersSchema);

export default usersModel;
