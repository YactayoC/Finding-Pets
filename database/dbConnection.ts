import type { Connection } from 'mongoose';

type MongooseType = typeof import('mongoose');

export type dbConnectionCache = {
  conn: Connection | MongooseType | null;
  promise: Promise<Connection | MongooseType> | null;
};
