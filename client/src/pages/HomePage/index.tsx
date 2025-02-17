import {
    Button,
    Container,
    FormControl,
    TextField,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow, Box,
} from "@mui/material";
import CustomerService from "@/services/CustomerService.ts";
import { useEffect, useState } from "react";
import { ICustomer } from "@/commons/interfaces.ts";
import CustomerModal from "@/components/CustomerModal";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

export function HomePage() {
    const [data, setData] = useState<ICustomer[]>([]);
    const [filteredData, setFilteredData] = useState<ICustomer[]>([]); // State for filtered data
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState<ICustomer | null>(null); // For editing
    const [searchQuery, setSearchQuery] = useState<string>(''); // State for search query

    useEffect(() => {
        loadData();
    }, []);

    useEffect(() => {
        // Filter data whenever the search query changes
        const filtered = data.filter(customer =>
            customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            customer.cpf.includes(searchQuery)
        );
        setFilteredData(filtered);
    }, [searchQuery, data]);

    const loadData = async () => {
        const response = await CustomerService.findAll();
        if (response.status === 200) {
            setData(response.data);
            setFilteredData(response.data); // Initialize filtered data
        } else {
            setData([]);
            setFilteredData([]); // Reset filtered data
            alert("Erro ao carregar dados dos clientes");
        }
    };

    const handleDelete = async (id: number | undefined) => {
        const response = await CustomerService.remove(id);
        if (response.status === 204) {
            setData(prevData => prevData.filter(customer => customer.id !== id));
        } else {
            alert("Erro ao deletar cliente");
        }
        loadData();
    };

    const handleOpen = (customer?: ICustomer) => {
        setSelectedCustomer(customer || null); // Set selected customer for editing or null for new
        setModalOpen(true);
    };

    const handleClose = () => {
        setModalOpen(false);
        setSelectedCustomer(null); // Reset selected customer
        loadData();
    };

    const handleSave = async (customer: ICustomer) => {
        if (selectedCustomer) {
            // Update existing customer
            const response = await CustomerService.update(selectedCustomer.id, customer);
            if (response.status === 200) {
                alert('Cliente editado com sucesso');
            } else {
                alert('Erro ao editar dados do cliente');
            }
        } else {
            // Create new customer
            const response = await CustomerService.save(customer);
            if (response.status === 201) {
                alert('Cliente cadastrado com sucesso');
            } else {
                alert('Erro ao cadastrar cliente');
            }
        }
        handleClose(); // Close the modal after saving
    };

    return (
        <>
            <main className="text-center m-4">
                <h2>Sistema de cadastro de clientes</h2>
                <Container maxWidth="md">
                    <Box display="flex" justifyContent="center" marginY={2}>
                        <Button variant="contained" color="primary" onClick={() => handleOpen()}>
                            Cadastrar novo cliente
                        </Button>
                        <CustomerModal
                            open={modalOpen}
                            onClose={handleClose}
                            customerData={selectedCustomer} // Pass selected customer for editing
                            onSave={handleSave}
                        />
                    </Box>
                    <FormControl variant="standard" fullWidth margin="normal">

                        <TextField
                            id="search-field"
                            label="Pesquisar por Nome ou CPF"
                            type="search"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </FormControl>
                    <TableContainer component={Paper} style={{ maxHeight: 500, overflowY: 'auto' }}>
                        <Table stickyHeader  aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">Nome</TableCell>
                                    <TableCell align="center">CPF</TableCell>
                                    <TableCell align="center">Telefone</TableCell>
                                    <TableCell align="center">Editar</TableCell>
                                    <TableCell align="center">Remover</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {filteredData.map((row) => (
                                    <TableRow key={ row.id} sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                                        <TableCell align="center">{row.name}</TableCell>
                                        <TableCell align="center">{row.cpf}</TableCell>
                                        <TableCell align="center">{row.phone}</TableCell>
                                        <TableCell align="center">
                                            <Button variant="contained" color="primary" onClick={() => handleOpen(row)}>
                                                <EditIcon />
                                            </Button>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Button variant="contained" color="error" onClick={() => handleDelete(row.id)}>
                                                <DeleteIcon />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Container>
            </main>

        </>
    );
}