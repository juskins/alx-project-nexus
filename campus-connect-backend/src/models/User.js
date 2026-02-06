import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new Schema({
   name: {
      type: String,
      required: [true, 'Please add a name'],
      trim: true,
   },
   email: {
      type: String,
      required: [true, 'Please add an email'],
      unique: true,
      lowercase: true,
      match: [
         /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
         'Please add a valid email',
      ],
   },
   password: {
      type: String,
      required: [true, 'Please add a password'],
      minLength: [6, 'Password must be at least 6 characters'],
      select: false,
   },
   avatar: {
      type: String,
      default: '',
   },
   bio: {
      type: String,
      maxlength: 500,
   },
   phone: String,
   department: String,
   studentId: String,
   skills: [String],
   linkedin: String,
   website: String,
   role: {
      type: String,
      enum: ['student', 'employer', 'admin'],
      default: 'student'
   },
   isVerified: {
      type: Boolean,
      default: false,
   },
   verificationToken: String,
   resetPasswordToken: String,
   resetPasswordExpire: Date,
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
   });

// Hash password before saving
userSchema.pre('save', async function (next) {
   if (!this.isModified('password')) {
      return next();
   }
   const salt = await bcrypt.genSalt(10);
   this.password = await bcrypt.hash(this.password, salt);
   next();
});

// Compare password method
userSchema.methods.comparePassword = async function (enteredPassword) {
   return await bcrypt.compare(enteredPassword, this.password);
};

const User = model('User', userSchema);

export default User;
