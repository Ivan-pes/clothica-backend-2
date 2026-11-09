import { Schema, model } from 'mongoose';
const goodSchema = new Schema({
name:{type:String, required:true},
category:{type:Schema.Types.ObjectId, ref:'category', required:true}, 
image:{type:String, required:true},
price:{
    value:{type:Number, required:true}, 
    currency:{type:String, default:'грн'}},
size:[{type:String, enum:['XXS','XS', 'S', 'M', 'L', 'XL', 'XXL']}],
description:{type:String}, 
feedbacks:[{type:Schema.Types.ObjectId, ref:'Feedback'}],
prevDescription: {type:String},
gender: {type:String, enum:['man', 'women', 'unisex']},
characteristics: [{type:String}]},
{timestamps:true,
 versionKey:false,
 collection:'goods'
});

export const GoodModel = model('good', goodSchema);
