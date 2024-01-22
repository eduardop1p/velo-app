import { Schema, model, models, type Document, Model } from 'mongoose';

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
  cryptoValue: number;
  withdrawalId: string;
  status: 'success' | 'pending' | 'error';
  date: number;
}
export interface UserCryptosType {
  name: string;
  value: number;
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
  cryptos: UserCryptosType[];
}

interface UserDocumentType extends UserType, Document {}

const usersSchema = new Schema<UserDocumentType>({
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
      cryptoValue: { type: Number, required: false },
      withdrawalId: { type: String, required: false },
      status: { type: String, required: false },
      date: { type: Number, required: false },
    },
  ],
  cryptos: [
    {
      name: { type: String, required: false },
      value: { type: Number, required: false },
    },
  ],
});

const usersModel: Model<UserDocumentType> = models.Users || model<UserDocumentType>('Users', usersSchema); // eslint-disable-line

export default usersModel;
