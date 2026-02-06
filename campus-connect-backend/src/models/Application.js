import mongoose, { model, Schema } from "mongoose";

const applicationSchema = new Schema({
   job: {
      type: Schema.Types.ObjectId,
      ref: 'Job',
      required: true,
   },
   applicant: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
   },
   coverLetter: String,
   resume: String,
   status: {
      type: String,
      enum: ['pending', 'reviewed', 'accepted', 'rejected'],
      default: 'pending',
   },
   createdAt: {
      type: Date,
      default: Date.now,
   },
   updatedAt: {
      type: Date,
      default: Date.now,
   },
},
   {
      timestamps: true,
   }
);

// Prevent duplicate applications
applicationSchema.index({ job: 1, applicant: 1 }, { unique: true });

export default model('Application', applicationSchema);
