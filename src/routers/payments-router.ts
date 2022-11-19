import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { getPaymentsForTicket, processPaymentForTicket } from "@/controllers/payments-controller";

const paymentsRouter = Router();

paymentsRouter
  .all("/*", authenticateToken)
  .get("", getPaymentsForTicket)
  .post("/process", processPaymentForTicket);

export { paymentsRouter };
