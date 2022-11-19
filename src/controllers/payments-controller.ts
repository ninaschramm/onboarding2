import { AuthenticatedRequest } from "@/middlewares";
import paymentsService from "@/services/payments-service";
import { Payment } from "@prisma/client";
import { Response } from "express";
import httpStatus from "http-status";

export async function getPaymentsForTicket(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const { ticketId } = req.query as Record<string, string>;
    
  if (!ticketId) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }

  try {
    const result: Payment = await paymentsService.getPaymentsForTicket(parseInt(ticketId), userId);
    return res.status(httpStatus.OK).send(result);
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    else {
      return res.sendStatus(httpStatus.UNAUTHORIZED);
    }
  }
}

export async function processPaymentForTicket(req: AuthenticatedRequest, res: Response) {
  const { ticketId, cardData } = req.body;
  const { userId } = req;

  if (!ticketId || cardData === null || cardData === undefined ) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }

  try {
    const result: Payment = await paymentsService.processPaymentForTicket(parseInt(ticketId), userId, cardData);
    return res.status(httpStatus.OK).send(result);
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    else {
      return res.sendStatus(httpStatus.UNAUTHORIZED);
    }
  }
}
