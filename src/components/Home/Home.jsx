import { Box, Button, Checkbox, Divider, FormControlLabel, IconButton, Paper, Snackbar, TextField, Tooltip, Typography } from "@mui/material";
import React, { useState } from "react";
import MuiAlert from '@mui/material/Alert';
import { sendTelegram } from "./sendTelegram";

import InstagramIcon from '@mui/icons-material/Instagram';
import TelegramIcon from '@mui/icons-material/Telegram';
import TikTokIcon from '@mui/icons-material/MusicNote'; // TikTok doesn't have a direct icon, so we'll use MusicNote as an example.
import ViberIcon from "../icon/ViberIcon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTelegram, faViber } from "@fortawesome/free-brands-svg-icons";


const Alert = React.forwardRef((props, ref) => (
    <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
));


const Home = () => {

    const [open, setOpen] = useState(false);
    const [error, setError] = useState(false);

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

        if (!data.phone_number) {
            setError(true);
            return;
        }

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
        <Box
            sx={{
                width: { xs: '100%', sm: '70%', md: '50%', lg: '30%' },  // Responsive width based on screen size
                margin: { xs: '0і', sm: '5% auto'},
                // padding: 1,
                borderRadius: 2
            }}
        >
            <Paper sx={{ textAlign: 'center', padding: 4 }}>
                <Typography variant="h5" sx={{ marginBottom: 2, fontWeight: 'bold' }}>
                    Отримати консультацію
                </Typography>
                <Divider sx={{ mb: 2 }} />
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
                    {error && (
                        <Alert severity={'error'} sx={{ width: '95%' }}>
                            Залиште будь ласка номер телефона
                        </Alert>
                    )}
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        sx={{ width: '100%' }}
                    >
                        Надіслати
                    </Button>

                    <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        gap={2} // Gap between icons
                    >
                        {/* Instagram */}
                        <Tooltip title="Телеграм група" placement="top">
                            <IconButton
                                href="https://t.me/UAadvokatt"
                                target="_blank"
                                aria-label="Telegram"
                                color="primary"
                            >
                                <FontAwesomeIcon icon={faTelegram} size="lg" />
                            </IconButton>
                        </Tooltip>

                        <Tooltip title="Вайбер чат" placement="top">
                            <IconButton
                                href="https://invite.viber.com/?g2=AQAC7N%2FxCyPqnVNZqJo6pP%2FprY%2Byfp4nK9xlLxEZbqstnWG4moT9pdC%2BTzQhvDpW"
                                target="_blank"
                                aria-label="Viber"
                                sx={{
                                    color: 'purple'
                                }}
                            >
                                <FontAwesomeIcon icon={faViber} size="lg" />
                            </IconButton>
                        </Tooltip>
                    </Box>
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