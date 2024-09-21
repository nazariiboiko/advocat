import { Box, Button, Checkbox, FormControlLabel, Paper, Snackbar, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import MuiAlert from '@mui/material/Alert';
import { sendTelegram } from "./sendTelegram";

const Alert = React.forwardRef((props, ref) => (
    <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
));


const Home = () => {

    const [open, setOpen] = useState(false);
    const [error, setError] = useState({
        phone_number: false,
        client_fullname: false,
        description: false,
    });

    const [data, setData] = useState({
        phone_number: null,
        client_fullname: null,
        description: null,
        urgent: false,
    });

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;
        setData(prevData => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        sendTelegram(data);
        console.log('Submitting data:', data);

        // Reset form after submission
        setData({
            phone_number: '',
            client_fullname: '',
            description: '',
            urgent: false,
        });

        setError('');
        setOpen(true);
    };

    const handleCloseSnackbar = () => {
        setOpen(false);
    };


    return (
        <Box sx={{ width: '30%', margin: '5% auto', padding: 3, borderRadius: 2 }}>
            <Paper sx={{ textAlign: 'center', padding: 4 }}>
                <Typography variant="h5" sx={{ marginBottom: 2, fontWeight: 'bold' }}>
                    Залиш номер і отримай безкоштовну консультацію
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%', alignItems: 'center' }}>
                    <TextField
                        error={error.phone_number}
                        helperText={error.phone_number ? "Заповніть поле" : null}
                        name="phone_number"
                        value={data.phone_number}
                        onChange={handleChange}
                        type="number"
                        label="Номер телефону"
                        variant="outlined"
                        fullWidth
                    />
                    <TextField
                        name="client_fullname"
                        value={data.client_fullname}
                        onChange={handleChange}
                        label="Ф.І.О"
                        variant="outlined"
                        fullWidth

                    />
                    <TextField
                        name="description"
                        value={data.description}
                        onChange={handleChange}
                        label="Про ситуацію"
                        variant="outlined"
                        fullWidth
                        multiline
                        rows={4}

                    />
                    <FormControlLabel
                        control={<Checkbox checked={data.urgent} onChange={handleChange} name="urgent" />}
                        label="Терміново"
                        sx={{ alignSelf: 'flex-start' }}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        sx={{ width: '100%' }}
                    >
                        Надіслати
                    </Button>
                </Box>
            </Paper>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity={error ? 'error' : 'success'}>
                    {error || 'Форма успішно надіслана!'}
                </Alert>
            </Snackbar>
        </Box>

    );
};

export default Home;