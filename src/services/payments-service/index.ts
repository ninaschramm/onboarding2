import { notFoundError, unauthorizedError } from "@/errors";
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
  if (!result) {
    throw notFoundError();
  }

  return result;
}

async function processPaymentForTicket(ticketId: number, userId: number, card: {
    issuer: string,
    number: number,
    name: string,
    expirationDate: Date,
    cvv: number} ): 
    Promise<Payment> {
  const ticket: Ticket = await paymentsRepository.checkTicket(ticketId);
  if (!ticket) {
    throw notFoundError();
  }

  const value = await paymentsRepository.getTicketValue(ticket.ticketTypeId);

  const enrollmentId = await ticketsRepository.getEnrollmentId(userId);
  if (ticket.enrollmentId !== enrollmentId) {
    throw unauthorizedError();
  }

  const { issuer: cardIssuer, number } = card;
  const cardLastDigits = number.toString().slice(-4);

  const cardData = {
    ticketId,
    value,
    cardIssuer,
    cardLastDigits,
  };

  const result = await paymentsRepository.processPaymentForTicket(cardData);
  return result;
}

const paymentsService = {
  getPaymentsForTicket,
  processPaymentForTicket
};
  
export default paymentsService;
