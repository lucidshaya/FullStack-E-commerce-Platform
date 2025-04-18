const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide your name"],
      trim: true,
      maxlength: [50, "Name cannot exceed 50 characters"],
      minlength: [2, "Name must be at least 2 characters"]
    },
    email: {
      type: String,
      required: [true, "Please provide your email"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Please provide a valid email"
      ]
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
      minlength: [8, "Password must be at least 8 characters"],
      select: false
    },
    passwordConfirm: {
      type: String,
      required: [true, "Please confirm your password"],
      validate: {
        validator: function(el) {
          return el === this.password;
        },
        message: "Passwords do not match"
      }
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user"
    },
    active: {
      type: Boolean,
      default: true,
      select: false
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);


// // Password hashing middleware
 userSchema.pre("save", async function(next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);
   this.passwordConfirm = undefined; // Don't persist to DB
  next();
});

// // Update passwordChangedAt when password is modified
 userSchema.pre("save", function(next) {
  if (!this.isModified("password") || this.isNew) return next();

   this.passwordChangedAt = Date.now() - 1000; // Ensure token is created after
   next();
 });

// // Instance method to check password
 userSchema.methods.correctPassword = async function(
  candidatePassword,
   userPassword
 ) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

// // Instance method to check if password was changed after token was issued
  userSchema.methods.changedPasswordAfter = function(JWTTimestamp) {
   if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return JWTTimestamp < changedTimestamp;
  }
  return false;
};
  userSchema.methods.correctPassword = async function(
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

// // Query middleware to filter out inactive users by default
userSchema.pre(/^find/, function(next) {
  this.find({ active: { $ne: false } });
  next();
});

const User = mongoose.model("User", userSchema);

 module.exports = User;