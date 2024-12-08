import mongoose from 'mongoose';

const hospitalSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      reuired: true,
    },
    addressLine1: {
      type: String,
      reuired: true,
    },
    addressLine2: {
      type: String,
    },
    city: {
      type: String,
      reuired: true,
    },
    pincode: {
      type: String,
      reuired: true,
    },
    specilizedIn: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true }
);

export const Hospital = mongoose.model('Hospital', hospitalSchema);
