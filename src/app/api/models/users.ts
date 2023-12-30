import { Schema, model, models } from 'mongoose';

export interface UserType {
  name: string;
  email: string;
  dateBirth: string;
  cellPhone: string;
  country: string;
  password: string;
  balance?: string;
  invested?: string;
}

const usersSchema = new Schema<UserType>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  dateBirth: { type: String, required: true },
  cellPhone: { type: String, required: true },
  country: { type: String, required: true },
  password: { type: String, required: true },
  balance: { type: String, required: false },
  invested: { type: String, required: false },
});

const usersModel = models.Users || model<UserType>('Users', usersSchema);

export default usersModel;
