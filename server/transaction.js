const { WebpayPlus } = require('transbank-sdk');

async function createTransaction() {
    const buyOrder = 'ordenCompra12345'; // Cambia esto por tu orden de compra
    const sessionId = 'sesion12345';     // Cambia esto por tu ID de sesión
    const amount = 1000;                 // Cambia esto por el monto de la transacción
    const returnUrl = 'https://tu-sitio.com/retorno'; // Cambia esto por tu URL de retorno

    try {
        const transaction = new WebpayPlus.Transaction();
        const createResponse = await transaction.create(buyOrder, sessionId, amount, returnUrl);
        console.log(createResponse);
    } catch (error) {
        console.error('Error creating transaction:', error);
    }
}

// Ejecutar la función
createTransaction();