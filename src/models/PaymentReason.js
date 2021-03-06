const mongoose = require('mongoose');


// Define our model
const paymentReasonSchema = new mongoose.Schema({
   _id: { type: String, default: () => String(new mongoose.Types.ObjectId()) },
   name: { type: String, required: true },
   isDeleted: { type: Boolean, required: true, default: () => false },

   createDate: { type: Date, required: true, default: () => new Date() },
   createdBy: { type: String, required: true },
   updateDate: { type: Date, required: true, default: () => new Date() },
   updatedBy: { type: String, required: true }
}, {
   collection: 'PaymentReasons',
   versionKey: false
});
paymentReasonSchema.index({ name: 1 }, { unique: true });

paymentReasonSchema.set('toObject', {
   transform: (doc, ret, options) => {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
   }
});

paymentReasonSchema.pre('save', async function (next) {
   this.updateDate = new Date();
   next();
});

// Create the model class
module.exports = mongoose.model('PaymentReason', paymentReasonSchema);
