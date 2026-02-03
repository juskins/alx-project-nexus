import mongoose, { Document, model, Schema } from "mongoose";


export interface IApplication extends Document {
   job: mongoose.Types.ObjectId;
   applicant: mongoose.Types.ObjectId;
   coverLetter?: string;
   resume?: string;
   status: 'pending' | 'reviewed' | 'accepted' | 'rejected';
   createdAt: Date;
   updatedAt: Date;
}

const applicationSchema = new Schema<IApplication>({
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

export default model<IApplication>('Application', applicationSchema);