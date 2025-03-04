import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
  enrollmentNumber: {
    type: String,
    required: true,
    unique: true
  },
  fullName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  mobileNumber: {
    type: String,
    required: true
  },
  semester: {
    type: Number,
    required: true
  }
});

const Student = mongoose.models.Student || mongoose.model('Student', studentSchema);
export default Student;