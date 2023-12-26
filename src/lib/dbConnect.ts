//dbConnect.js
import _mongoose, { connect } from 'mongoose';

declare global {
  // eslint-disable-next-line
  var mongoose: {
    promise: ReturnType<typeof connect> | null;
    conn: typeof _mongoose | null;
  };
}

const MONGODB_URL = process.env.MONGODB_URL;

_mongoose.set('strictQuery', false);

if (!MONGODB_URL) {
  throw new Error(
    'Please define the MONGODB_URL environment variable inside .env.local'
  );
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (!MONGODB_URL) return;

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts: _mongoose.ConnectOptions = {
      bufferCommands: false,
      dbName: 'veloDB',
    };

    cached.promise = connect(MONGODB_URL, opts).then(mongoose => {
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
    // console.log('conetado a base de dados');
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default dbConnect;
