import mongoose, { Document, model, Schema } from "mongoose";


export interface IJob extends Document {
   title: string;
   description: string;
   category: string;
   department: string;
   location: string;
   address: string;
   payRate: number;
   duration: string;
   time: string;
   type: string;
   image?: string;
   postedBy: mongoose.Types.ObjectId;
   status: 'active' | 'closed' | 'draft';
   applicatants:mongoose.Types.ObjectId[];
   createdAt: Date;
   updatedAt: Date;
}

const jobSchema = new Schema<IJob>({
   title: {
      type: String,
      required: [true, 'Please add a job'],
      trim: true,
   },
   description: {
      type: String,
      required: [true, 'Please add a description'],
      trim: true,
   },
   category: {
      type:String,
      required:[true,'Please add a category'],
      enum: [
         'Event Planning',
        'Administrative',
        'Research',
        'Technology',
        'Customer Service',
        'Food Service',
        'Marketing',
        'Freelance',
      ]
   },
   department: {
      type: String,
      trim: true,
      required: [true, 'Please add a department'],
   },
   location: {
      type: String,
      required: [true, 'Please add a location'],
      trim: true,
      enum: ['main-campus', 'north-campus', 'south-campus', 'east-campus', 'west-campus'],
   },
   address: {
      type: String,
      trim: true,
   },
   payRate: {
      type: Number,
      required: [true, 'Please add a pay rate'],
   },
   duration: {
      type: String,
      required: [true, 'Please add a duration'],
      trim: true,
      enum: ['1-2 hours', '2-4 hours', '4-8 hours', 'full day', 'ongoing'],
   },
   time: {
      type: String,
      required: [true, 'Please add a time'],
      trim: true,
      default: 'any time',
      enum: ['morning', 'afternoon', 'evening', 'weekend', 'any time'],
   },
   type: {
      type: String,
      required: [true, 'Please add a type'],
      trim: true,
   },
   image: {
      type: String,
      trim: true,
   },
   postedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please add a posted by'],
   },
   applicatants: {
      type: [Schema.Types.ObjectId],
      ref: 'User',
      default: [],
   },
   status: {
      type: String,
      enum: ['active', 'closed', 'draft'],
      default: 'active',
    },
   createdAt: {
      type: Date,
      default: Date.now,
   },
   updatedAt: {
      type: Date,
      default: Date.now,
   },
},{
   timestamps: true,
})

jobSchema.index({ title: 'text', description: 'text', category: 'text', department: 'text' });
export default model<IJob>('Job', jobSchema);