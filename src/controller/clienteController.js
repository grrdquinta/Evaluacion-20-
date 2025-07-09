import Cliente from '../models/cliente.js';
import bcrypt from 'bcryptjs';

const clienteController = {}

clienteController.getClients = async (req, res) => {
    try {
        const clients = await Cliente.find();
        res.status(200).json(clients);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving clients', error });
    }
};

clienteController.getClientById = async (req, res) => {
    const { id } = req.params;
    try {
        const client = await Cliente.findById(id);
        if (!client) {
            return res.status(404).json({ message: 'Client not found' });
        }
        res.status(200).json(client);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving client', error });
    }
}

clienteController.createClient = async (req, res) => {
    const { name, email, phone, password, age } = req.body;
    try {
        // Verificar si ya existe un cliente con el mismo email
        const existingClientByEmail = await Cliente.findOne({ email });
        if (existingClientByEmail) {
            return res.status(400).json({ 
                message: 'Ya existe un cliente con este email',
                field: 'email'
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newClient = new Cliente({ name, email, phone, password: hashedPassword, age });
        const savedClient = await newClient.save();
        res.status(201).json(savedClient);
    } catch (error) {
        res.status(400).json({ message: 'Error creating client', error });
    }
}

clienteController.updateClient = async (req, res) => {
    const { id } = req.params;
    const { name, email, phone, password, age } = req.body;
    try {
        // Verificar si ya existe otro cliente con el mismo email
        if (email) {
            const existingClientByEmail = await Cliente.findOne({ 
                email, 
                _id: { $ne: id } // Excluir el cliente actual
            });
            if (existingClientByEmail) {
                return res.status(400).json({ 
                    message: 'Ya existe otro cliente con este email',
                    field: 'email'
                });
            }
        }

        const hashedPassword = password ? await bcrypt.hash(password, 10) : undefined;
        const updateData = { name, email, phone, age };
        if (hashedPassword) {
            updateData.password = hashedPassword;
        }
        const updatedClient = await Cliente.findByIdAndUpdate(id, updateData, { new: true });
        if (!updatedClient) {
            return res.status(404).json({ message: 'Client not found' });
        }
        res.status(200).json(updatedClient);
    } catch (error) {
        res.status(400).json({ message: 'Error updating client', error });
    }
}

clienteController.deleteClient = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedClient = await Cliente.findByIdAndDelete(id);
        if (!deletedClient) {
            return res.status(404).json({ message: 'Client not found' });
        }
        res.status(200).json({ message: 'Client deleted successfully' });
    } catch (error) {  
        res.status(500).json({ message: 'Error deleting client', error });
    }
}

export default clienteController;