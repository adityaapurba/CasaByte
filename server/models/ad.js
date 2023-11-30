import {model, Schema, ObjectId} from "mongoose";

const schema = new Schema({
    photos:[{}],
    price: {type: Number, maxLength:20},
    address: {type: String, maxLength:255, required:true},
    city: {type: String, maxLength:255, required:true, lowercase:true},
    country: {type: String, maxLength:255, required:true},
    bedrooms: Number,
    bathrooms: Number,
    landsize: String,
    carpark: Number,
    title: {type: String, maxLength:255, required:true},
    slug: {type: String, lowercase:true, unique:true },
    description: {},
    postedBy: {type: ObjectId, ref:"User"},
    sold: {type: Boolean, default: false},
    lat: {type:String, default:"48.864716"},
    lng: {type:String, default:"2.349014"},
    type: {type: String, default:"Other"},
    action: {type: String, default:"Sell"},
    views: {type: Number, default:0},
    search: {type: String, deault:""},
},{timestamps: true});

export default model("Ad", schema);