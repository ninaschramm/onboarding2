import { AuthenticatedRequest } from "@/middlewares";
import ticketsService from "@/services/tickets-service";
import { Response } from "express";
import httpStatus from "http-status";

export async function getAllTicketTypes(req: AuthenticatedRequest, res: Response) {
  try {
    const result = await ticketsService.getAllTicketTypes();

    return res.status(httpStatus.OK).send(result);
  } catch (error) {
    return res.sendStatus(httpStatus.NO_CONTENT);
  }
}

export async function getTicketsByUserId(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;

  try {
    const result = await ticketsService.getTicketsByUserId(userId);
    return res.status(httpStatus.OK).send(result);
  }
  catch (error) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}

export async function postNewTicket(req: AuthenticatedRequest, res: Response) {
  const { userId, body } = req;
  
  try {
    const result = await ticketsService.postNewTicket(userId, body);
    return res.status(httpStatus.CREATED).send(result);
  }
  catch (err) {
    if (err.name === "InvalidBodyError") {
      return res.status(httpStatus.BAD_REQUEST).send({
        message: err.message,
      });
    }
    else {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
  }
}
  
