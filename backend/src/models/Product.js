const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    legacyId: {
      type: Number,
      default: null,
      index: true
    },
    name: {
      type: String,
      required: true,
      trim: true
    },
    category: {
      type: String,
      required: true,
      trim: true
    },
    price: {
      type: Number,
      default: 0
    },
    description: {
      type: String,
      required: true,
      trim: true
    },
    image: {
      type: String,
      required: true,
      trim: true
    },
    public_id: {
      type: String,
      trim: true,
      default: ''
    },
    imageAlt: {
      type: String,
      trim: true,
      default: ''
    }
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: {
      virtuals: true,
      transform: (_, ret) => {
        ret.id = ret._id.toString();
        delete ret._id;
        return ret;
      }
    }
  }
);

module.exports = mongoose.models.Product || mongoose.model('Product', productSchema);
