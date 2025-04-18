const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,  // Fixed typo: 'requird' to 'required'
        trim: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {  // Added standard price field
        type: Number,
        required: true,
    },
    discountPrice: {
        type: Number,
    },
    countInStock: {
        type: Number,
        required: true,
        default: 0,
    },
    sku: {
        type: String,
        unique: true,
        required: true, 
    }, 
    brand: {
        type: String, 
    },
    sizes: {
        type: [String],
        required: true,
    },
    colors: {
        type: [String],
        required: true, 
    },
    collections: {  // Fixed missing comma after previous field
        type: String,
        required: true,
    }, 
    material: {
        type: String,
    },  // Added missing comma
    gender: {
        type: String,
        enum: ["Men", "Women", "Unisex"],
    },
    images: [{
        url: {
            type: String,
            required: true,
        },
        altText: {
            type: String,
        },
    }],
    isFeatured: {
        type: Boolean,
        default: false,
    },
    rating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5,
    },
    numReviews: {
        type: Number,
        default: 0,
    },
    tags: [String],
    user: {
        type: mongoose.Schema.Types.ObjectId,  // Fixed 'Type' to 'Types'
        ref: "User",
        required: true,
    },
    metaTitle: {
        type: String,
    },
    metaDescription: {  // Added meta description
        type: String,
    },
    metaKeywords: {
        type: [String],  // Changed to array of strings
    },
    dimensions: {  // Changed to singular and improved structure
        length: { type: Number, default: 0 },
        width: { type: Number, default: 0 },
        height: { type: Number, default: 0 },
        unit: { type: String, default: "cm" }
    },
    weight: {
        value: { type: Number, default: 0 },
        unit: { type: String, default: "kg" }
    },
    category: {  // Added category field
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Add text index for search functionality
productSchema.index({
    name: 'text',
    description: 'text',
    brand: 'text',
    tags: 'text'
});

module.exports = mongoose.model("Product", productSchema);