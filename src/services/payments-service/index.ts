import { notFoundError, invalidBodyError, unauthorizedError } from "@/errors";
import paymentsRepository from "@/repositories/payments-repository";
import ticketsRepository from "@/repositories/tickets-repository";
import { Payment, Ticket } from "@prisma/client";

async function getPaymentsForTicket(ticketId: number, userId: number): Promise<Payment> {
  const ticket: Ticket = await paymentsRepository.checkTicket(ticketId);
  if (!ticket) {
    throw notFoundError();
  }

  const enrollmentId = await ticketsRepository.getEnrollmentId(userId);
  if (ticket.enrollmentId !== enrollmentId) {
    throw unauthorizedError();
  }

  const result: Payment = await paymentsRepository.getPaymentsForTicket(ticketId);
  console.log(result);  
  if (!result) {
    throw notFoundError();
  }

  return result;
}

const paymentsService = {
  getPaymentsForTicket
};
  
export default paymentsService;

getPaymentsForTicket;
