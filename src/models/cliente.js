import {Schema, model } from 'mongoose'

const clientSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        match: /.+\@.+\..+/
    },
    password: {
        type: String,   
        required: true,
        trim: true,
        minlength: 6,
        maxlength: 100
    },
    phone: {
        type: String,
        required: true,
        trim: true,
        maxlength: 15
    },
    age: {
        type: Number,
        required: true,
        min: 0,
        max: 120
    }
}, {
    timestamps: true,
    require: true
});

export default model('Cliente', clientSchema, 'Clientes'); 