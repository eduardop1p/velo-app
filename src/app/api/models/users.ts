import { Schema, model, models } from 'mongoose';

export interface ActiveType {
  title: string;
  valueInvested: number;
  priceBuy: number;
  priceSell: number;
}
export interface VeliabilitiesType {
  title: string;
  value: number;
}
export interface TransactionsType {
  title: string;
  value: number;
  status: 'success' | 'pending' | 'error';
}

export interface UserType {
  name: string;
  email: string;
  dateBirth: string;
  cellPhone: string;
  country: string;
  password: string;
  active: ActiveType[];
  veliabilities: VeliabilitiesType[];
  transactions: TransactionsType[]; // balance
}

const usersSchema = new Schema<UserType>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  dateBirth: { type: String, required: true },
  cellPhone: { type: String, required: true },
  country: { type: String, required: true },
  password: { type: String, required: true },
  active: [
    {
      title: { type: String, required: false },
      valueInvested: { type: Number, required: false },
      priceBuy: { type: Number, required: false },
      priceSell: { type: Number, required: false },
    },
  ],
  veliabilities: [
    {
      title: { type: String, required: false },
      value: { type: Number, required: false },
    },
  ],
  transactions: [
    {
      title: { type: String, required: false },
      value: { type: Number, required: false },
      status: { type: String, required: false },
    },
  ],
});

const usersModel = models.Users || model<UserType>('Users', usersSchema);

export default usersModel;
