import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { getAllTicketTypes, getTicketsByUserId, postNewTicket } from "@/controllers/tickets-controller";

const ticketsRouter = Router();

ticketsRouter
  .all("/*", authenticateToken)
  .get("/types", getAllTicketTypes)
  .get("/", getTicketsByUserId)
  .post("/", postNewTicket);

export { ticketsRouter };
