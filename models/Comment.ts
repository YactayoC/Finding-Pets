import mongoose, { Schema, model, Model } from 'mongoose';

import type { TComment } from 'types';

const commentSchema = new Schema(
  {
    comment: [
      {
        type: String,
      },
    ],

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

const Publication: Model<TComment> = mongoose.models.Comment || model('Comment', commentSchema);
export default Publication;
