import { NextRequest, NextResponse } from 'next/server';

import usersModel, { UserType } from '../models/users';

import BaseRoute from '../route';

// eslint-disable-next-line
export async function POST(req: NextRequest, res: NextResponse) {
  const body: UserType = await req.json();
  const createAccount = new CreateAccount(body);
  const errors = createAccount.errors;

  try {
    createAccount.clearUpBody();
    if (errors.length) {
      return createAccount.responseError(errors[0]);
    }
    await createAccount.connectDb();
    if (errors.length) {
      return createAccount.responseError(errors[0]);
    }
    await createAccount.userExist();
    if (errors.length) {
      return createAccount.responseError(errors[0]);
    }
    await createAccount.createUser();
    if (errors.length) {
      return createAccount.responseError(errors[0]);
    }
    return createAccount.responseSuccess({
      body: { msg: 'Account created', type: 'server' },
      status: 200,
    });
  } catch (err) {
    return createAccount.responseError({
      body: {
        msg: 'Internal server error',
        type: 'server',
      },
      status: 500,
    });
  }
}

class CreateAccount extends BaseRoute {
  constructor(private body: UserType) {
    super();
  }

  async createUser() {
    try {
      await usersModel.create({ ...this.body });
    } catch (err) {
      this.errors.push({
        body: {
          msg: 'Error creating user',
          type: 'server',
        },
        status: 400,
      });
    }
  }

  async userExist() {
    try {
      const { email } = this.body;
      const useExist = await usersModel.findOne({ email });
      if (useExist) {
        this.errors.push({
          body: {
            msg: 'There is already a user with this email',
            type: 'email',
          },
          status: 400,
        });
      }
    } catch {
      this.errorInServer();
    }
  }

  clearUpBody() {
    if (this.isEmpety(this.body.name)) {
      this.errorRequiredField('name');
      return;
    }
    if (this.isEmpety(this.body.email)) {
      this.errorRequiredField('email');
      return;
    }
    if (!this.isEmail(this.body.email)) {
      this.errorInEmail();
      return;
    }
    if (this.isEmpety(this.body.cellPhone)) {
      this.errorRequiredField('cellPhone');
      return;
    }
    if (!this.isCellNumber(this.body.cellPhone)) {
      this.errors.push({
        body: {
          msg: 'Invalid cell number',
          type: 'cellPhone',
        },
        status: 400,
      });
      return;
    }
    if (this.isEmpety(this.body.country)) {
      this.errorRequiredField('country');
      return;
    }
    if (this.isEmpety(this.body.password)) {
      this.errorRequiredField('password');
      return;
    }
    if (!this.isStrongPassword(this.body.password)) {
      this.errors.push({
        body: {
          msg: 'The password must contain at least 5 characters, including lowercase letters, uppercase letters, numbers and special characters',
          type: 'password',
        },
        status: 400,
      });
      return;
    }

    this.body = {
      name: this.body.name,
      email: this.body.email,
      country: this.body.country,
      cellPhone: this.body.cellPhone,
      dateBirth: this.body.dateBirth,
      password: this.body.password,

      active: [],
      veliabilities: [],
      transactions: [],
    };
  }

  private isCellNumber(value: string) {
    const regex = /^\s*\d+(\s+\d+)*\s*$/;
    return regex.test(value);
  }

  private isStrongPassword(value: string) {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{5,})/;
    return regex.test(value);
  }
}
