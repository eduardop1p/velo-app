import { Schema, model, models, type Document, Model } from 'mongoose';

export interface ActiveType {
  name: string;
  symbol: string;
  cryptoValue: number;
  valueInvested: number;
  priceBuy: number;
  priceSell: number;
}
export interface VeliabilitiesType {
  title: string;
  value: number;
}
export interface TransactionsType {
  name: string;
  symbol: string;
  type: 'crypto' | 'dollar';
  title: string;
  cryptoValue: number;
  dollarValue: number;
  withdrawalId: string;
  status: 'success' | 'pending' | 'error';
  date: number;
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

export interface UserDocumentType extends UserType, Document {}

const usersSchema = new Schema<UserDocumentType>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  dateBirth: { type: String, required: true },
  cellPhone: { type: String, required: true },
  country: { type: String, required: true },
  password: { type: String, required: true },
  active: [
    {
      name: { type: String, required: false },
      symbol: { type: String, required: false },
      cryptoValue: { type: Number, required: false },
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
      name: { type: String, required: false },
      symbol: { type: String, required: false },
      type: { type: String, required: false },
      title: { type: String, required: false },
      cryptoValue: { type: Number, required: false },
      dollarValue: { type: Number, required: false },
      withdrawalId: { type: String, required: false },
      status: { type: String, required: false },
      date: { type: Number, required: false },
    },
  ],
});

const usersModel: Model<UserDocumentType> = models.Users || model<UserDocumentType>('Users', usersSchema); // eslint-disable-line

export default usersModel;
