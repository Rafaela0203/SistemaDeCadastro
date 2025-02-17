import React, { useEffect, useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    Typography
} from '@mui/material';
import { ICustomer } from "@/commons/interfaces.ts";

interface CustomerModalProps {
    open: boolean;
    onClose: () => void;
    customerData?: ICustomer | null; // Optional customer data for editing
    onSave: (customer: ICustomer) => void; // Callback to save the customer
}

const CustomerModal: React.FC<CustomerModalProps> = ({ open, onClose, customerData, onSave }) => {
    const [customer, setCustomer] = useState<ICustomer>({ name: '', cpf: '', phone: '' });
    const [nameError, setNameError] = useState<string | null>(null);
    const [cpfError, setCpfError] = useState<string | null>(null);
    const [phoneError, setPhoneError] = useState<string | null>(null);

    useEffect(() => {
        if (customerData) {
            setCustomer(customerData);
        } else {
            setCustomer({ name: '', cpf: '', phone: '' }); // Reset for new customer
        }
    }, [customerData, open]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        // Allow only numbers for cpf and phone
        if (name === 'cpf' || name === 'phone') {
            const numericValue = value.replace(/\D/g, ''); // Remove non-numeric characters
            setCustomer({ ...customer, [name]: numericValue });
        } else {
            setCustomer({ ...customer, [name]: value });
        }

        // Clear error messages when the user starts typing
        if (name === 'name') setNameError(null);
        if (name === 'cpf') setCpfError(null);
        if (name === 'phone') setPhoneError(null);
    };

    const validateCpf = (cpf: string) => {
        return cpf.length === 11; // Example: Check if CPF has 11 digits
    };

    const validatePhone = (phone: string) => {
        return phone.length >= 10 && phone.length <= 11; // Example: Check if phone has 10 or 11 digits
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let hasError = false;

        if (!customer.name) {
            setNameError('Nome é obrigatório');
            hasError = true;
        }
        if (!validateCpf(customer.cpf)) {
            setCpfError('CPF deve ter 11 dígitos');
            hasError = true;
        }
        if (!validatePhone(customer.phone)) {
            setPhoneError('Telefone deve ter 10 ou 11 dígitos');
            hasError = true;
        }

        if (hasError) return;

        setNameError(null);
        setCpfError(null);
        setPhoneError(null);
        onSave(customer); // Call the save function with the customer data
        onClose(); // Close the modal after submission
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{customerData ? 'Editar cliente' : 'Cadastrar cliente'}</DialogTitle>
            <DialogContent>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Nome"
                        name="name"
                        value={customer.name}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        required
                        error={!!nameError}
                        helperText={nameError}
                    />
                    <TextField
                        label="CPF"
                        name="cpf"
                        value={customer.cpf}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        required
                        error={!!cpfError}
                        helperText={cpfError}
                    />
                    <TextField
                        label="Telefone"
                        name="phone"
                        value={customer.phone}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        required
                        error={!!phoneError}
                        helperText={phoneError}
                    />
                    <DialogActions>
                        <Button onClick={onClose} color="error">Cancelar</Button>
                        <Button type="submit" variant="contained" color="primary">
                            {customerData ? 'Editar Cliente' : 'Cadastrar Cliente'}
                        </Button>
                    </DialogActions>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default CustomerModal;