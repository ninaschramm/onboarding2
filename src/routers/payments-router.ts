import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { getPaymentsForTicket } from "@/controllers/payments-controller";

const paymentsRouter = Router();

paymentsRouter
  .all("/*", authenticateToken)
  .get("", getPaymentsForTicket);

export { paymentsRouter };
