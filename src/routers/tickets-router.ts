import { Router } from "express";
import { } from "@/controllers";
import { authenticateToken } from "@/middlewares";
import { getAllTicketTypes } from "@/controllers/tickets-controller";

const ticketsRouter = Router();

ticketsRouter
  .all("/*", authenticateToken)
  .get("/types", getAllTicketTypes);

export { ticketsRouter };
