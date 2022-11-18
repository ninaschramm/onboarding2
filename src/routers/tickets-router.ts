import { Router } from "express";
import { } from "@/controllers";
import { authenticateToken } from "@/middlewares";
import { getAllTicketTypes, getTicketsByUserId } from "@/controllers/tickets-controller";

const ticketsRouter = Router();

ticketsRouter
  .all("/*", authenticateToken)
  .get("/types", getAllTicketTypes)
  .get("/", getTicketsByUserId);

export { ticketsRouter };
