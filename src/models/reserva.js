import {Schema, model} from 'mongoose'

const reservaSchema = new Schema({
    clientId: {
        type: Schema.Types.ObjectId,
        ref: 'Cliente',
        required: true
    },
    vehicle: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100
    },
    service: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100
    },
    status: {
        type: String,
        enum: ['pendiente', 'confirmada', 'cancelada'],
        default: 'pendiente'
    }
}, {
    timestamps: true,
    require: true
})

export default model('Reserva', reservaSchema, 'Reservas');