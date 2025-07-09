import Reserva from '../models/reserva.js'

const reservaController = {}

reservaController.getReservas = async (req, res) => {
    try {
        const reservas = await Reserva.find().populate('clientId', 'name email');
        res.status(200).json(reservas);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving reservations', error });
    }
}

reservaController.getReservaById = async (req, res) => {
    const { id } = req.params;
    try {
        const reserva = await Reserva.findById(id).populate('clientId', 'name email');
        if (!reserva) {
            return res.status(404).json({ message: 'Reservation not found' });
        }
        res.status(200).json(reserva);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving reservation', error });
    }
}

reservaController.createReserva = async (req, res) => {
    const newReserva = new Reserva(req.body);
    try {
        const savedReserva = await newReserva.save();
        res.status(201).json(savedReserva);
    } catch (error) {
        res.status(400).json({ message: 'Error creating reservation', error });
    }
}

reservaController.updateReserva = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedReserva = await Reserva.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedReserva) {
            return res.status(404).json({ message: 'Reservation not found' });
        }
        res.status(200).json(updatedReserva);
    } catch (error) {
        res.status(400).json({ message: 'Error updating reservation', error });
    }
}

reservaController.deleteReserva = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedReserva = await Reserva.findByIdAndDelete(id);
        if (!deletedReserva) {
            return res.status(404).json({ message: 'Reservation not found' });
        }
        res.status(200).json({ message: 'Reservation deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting reservation', error });
    }
}

export default reservaController;