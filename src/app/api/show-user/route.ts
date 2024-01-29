import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { Document, Types } from 'mongoose';

import usersModel, { UserDocumentType } from '../models/users';
import BaseRoute from '../route';

// eslint-disable-next-line
export async function GET(req: NextRequest, res: NextResponse) {
  const authorization = req.headers.get('authorization');
  const showUser = new ShowUser(authorization);
  const errors = showUser.errors;

  try {
    showUser.verifyAuthorization();
    if (errors.length) {
      return showUser.responseError(errors[0]);
    }
    await showUser.connectDb();
    if (errors.length) {
      return showUser.responseError(errors[0]);
    }
    const user = await showUser.getUser();
    if (errors.length) {
      return showUser.responseError(errors[0]);
    }

    return NextResponse.json({ ...user });
  } catch (err) {
    return showUser.responseError({
      body: {
        msg: 'Internal server error',
        type: 'server',
      },
      status: 500,
    });
  }
}

class ShowUser extends BaseRoute {
  private user:
  | (Document<unknown, {}, UserDocumentType> & // eslint-disable-line
        UserDocumentType & {
          _id: Types.ObjectId;
        })
    | null
    | undefined = null;

  constructor(protected readonly authorization: string | null) {
    super(authorization);
  }

  private async userExist() {
    if (!this.authorization) return;

    try {
      const [, token] = this.authorization.split(' ');
      const authData = jwt.decode(token) as { id: string };

      const user = await usersModel.findById(authData.id);
      if (!user) {
        this.errors.push({
          body: {
            msg: 'User not found',
            type: 'server',
          },
          status: 400,
        });
      }

      return user;
    } catch {
      this.errorInServer();
    }
  }

  async getUser() {
    this.user = await this.userExist();
    if (this.user)
      return {
        name: this.user.name,
        email: this.user.email,
        dateBirth: this.user.dateBirth,
        cellPhone: this.user.cellPhone,
        country: this.user.country,
        active: this.user.active,
        veliabilities: this.user.veliabilities,
        transactions: this.user.transactions,
      };
  }
}
