import { WebpayPlus, Options, IntegrationApiKeys, Environment, IntegrationCommerceCodes } from 'transbank-sdk';

interface TransactionResponse {
    token: string;
    url: string;
}

const createTransaction = async (
    buyOrder: string,
    sessionId: string,
    amount: number,
    returnUrl: string
): Promise<TransactionResponse> => {
    const tx = new WebpayPlus.Transaction(new Options(IntegrationCommerceCodes.WEBPAY_PLUS, IntegrationApiKeys.WEBPAY, Environment.Integration));

    try {
        const response = await tx.create(buyOrder, sessionId, amount, returnUrl);
        return response;
    } catch (error) {
        console.error('ERROR creating transaction:', error);
        throw error;
    }
};

const commitTransaction = async (token: string): Promise<any> => {
    const tx = new WebpayPlus.Transaction(new Options(IntegrationCommerceCodes.WEBPAY_PLUS, IntegrationApiKeys.WEBPAY, Environment.Integration));

    try {
        const response = await tx.commit(token);
        return response;
    } catch (error) {
        console.error('ERROR committing transaction:', error);
        throw error;
    }
};

export default {
    createTransaction,
    commitTransaction
};