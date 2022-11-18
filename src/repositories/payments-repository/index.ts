import { prisma } from "@/config";
import { Payment, Ticket } from "@prisma/client";
import ticketsRepository from "@/repositories/tickets-repository";

async function getPaymentsForTicket(ticketId: number) {
  const result: Payment = await prisma.payment.findFirst({
    where: {
      ticketId
    }
  });

  return result;
}

async function checkTicket(ticketId: number) {
  const result: Ticket = await prisma.ticket.findFirst({
    where: {
      id: ticketId,         
    },
  });

  return result;
}

const paymentsRepository = {
  getPaymentsForTicket,
  checkTicket
};

export default paymentsRepository;
