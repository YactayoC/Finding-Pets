import mongoose, { Schema, model, Model } from 'mongoose';

import type { TPublication } from 'types';

const publicationSchema = new Schema(
  {
    description: {
      type: String,
      required: true,
    },

    images: [
      {
        type: String,
      },
    ],

    comments: [
      {
        comment: {
          type: String,
          required: true,
          ref: 'Comment',
        },
        user: {
          type: Schema.Types.ObjectId,
          required: true,
          ref: 'User',
        },
        date: {
          type: String,
          required: true,
        }
      },
    ],

    state: {
      type: String,
      default: 'active',
      required: true,
      enum: {
        values: ['active', 'found', 'archived'],
        message: '{VALUE} is not a valid state',
      },
    },

    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Publication: Model<TPublication> = mongoose.models.Publication || model('Publication', publicationSchema);
export default Publication;
