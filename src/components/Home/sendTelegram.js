export const sendTelegram = async (data) => {
    const botToken = '7819166540:AAHNhT32qSEsyTqk6EpigerZo_XhCMZVZb0';
    const chatId = '448713902';
    const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

    // Format the data into the desired message
    const formattedMessage = `
    Нове сповіщення
    Дата: ${new Date().toLocaleString()} 
    Ім'я: ${data.phone_number || 'Не вказано'}
    ФІО: ${data.client_fullname || 'Не вказано'}
    Опис: ${data.description || 'Немає опису'}
    Терміново: ${data.urgent ? 'Так' : 'Ні'}
    `;

    const messageData = {
        chat_id: chatId,
        text: formattedMessage
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(messageData)
        });

        if (response.ok) {
            const result = await response.json();
            console.log('Message sent:', result);
            return result;
        } else {
            console.error('Error sending message:', response.statusText);
        }
    } catch (error) {
        console.error('Error:', error);
    }
};
