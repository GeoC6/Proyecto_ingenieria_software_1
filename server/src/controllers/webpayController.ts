import { Request, Response } from 'express'
import webpayService from '../services/webpayService'
import { transbank } from '../models/transbank'

export const createTransaction = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { amount, returnUrl, cod_cliente } = req.body

  try {
    const fechaActual = new Date().toISOString().split('T')[0]
    const codigo = new Date().valueOf().toString()

    const nuevaBoleta = await transbank.create({
      COD_CLIENTE: cod_cliente,
      TRANSACTION_DATE: fechaActual,
      AMOUNT: amount,
      STATUS: 'Pendiente',
      CODE: codigo,
    })

    const response = await webpayService.createTransaction(
      codigo,
      codigo,
      amount,
      returnUrl
    )
    res.status(200).json(response)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to create transaction' })
  }
}

export const commitTransaction = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { token } = req.body

  try {
    const response = await webpayService.commitTransaction(token)
    res.status(200).json(response)
  } catch (error) {
    res.status(500).json({ error: 'Failed to commit transaction' })
  }
}

export const responseTransaction = async (
  req: Request,
  res: Response
): Promise<void> => {
  const token = req.query.token_ws
  if (!token) {
    res.redirect('http://localhost:4200/web/response?status=error')
    return
  }

  const response = await fetch('http://localhost:3000/webpay/commit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ token }),
  })
  const data = await response.json()
  if (data.response_code == 0) { // TRANSACCIÓN CORRECTA
    await transbank.update(
      {
        STATUS: 'Confirmado',
      },
      { where: { CODE: data.buy_order } }
    )

    res.redirect(
      `http://localhost:4200/web/response?status=confirm&order=${data.buy_order}`
    )
  } else { // FALLO LA TRANSACCIÓN
    await transbank.update(
      {
        STATUS: 'Rechazado',
      },
      { where: { CODE: data.buy_order } }
    )

    res.redirect(
      `http://localhost:4200/web/response?status=error&order=${data.buy_order}`
    )
  }
  return
}
