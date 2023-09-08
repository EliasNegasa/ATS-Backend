import mongoose from 'mongoose';
const { Schema } = mongoose;

const jobSchema = new Schema(
  {
    position: {
      type: String,
      required: true,
      maxLength: [50, 'Position must not have more than 50 Characters'],
    },
    company: {
      type: String,
      required: [true, 'Company is a required field'],
      maxLength: [30, 'Position must not have more than 50 Characters'],
    },
    role: {
      type: String,
      required: true,
    },
    level: {
      type: String,
      required: true,
    },
    contract: {
      type: String,
      required: true,
      enum: {
        values: [
          'Full time',
          'Part time',
          'Contract',
          'Freelance',
          'Internship',
        ],
        message:
          'Contract can only include Full time, Part time, Contract, Freelance, Internship',
      },
    },
    location: {
      type: String,
      required: true,
    },
    languages: {
      type: [String],
      required: true,
    },
    tools: {
      type: [String],
    },
    postedDate: {
      type: Date,
      required: true,
      max: [Date.now(), 'Posted Date must not exceed current date'],
    },
    isNew: {
      type: Boolean,
      default: false,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    logo: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Job = mongoose.model('Job', jobSchema);

export default Job;
