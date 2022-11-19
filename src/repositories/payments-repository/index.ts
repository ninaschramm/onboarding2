import { prisma } from "@/config";
import { Payment, Ticket, TicketStatus, TicketType } from "@prisma/client";
import { Prisma } from "@prisma/client";

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

async function processPaymentForTicket(cardData: Prisma.PaymentUncheckedCreateInput) {
  const result: Payment = await prisma.payment.create({
    data: cardData
  });

  const ticketStatus: TicketStatus = "PAID";

  await prisma.ticket.update({
    where: {
      id: cardData.ticketId
    },
    data: {
      status: ticketStatus
    },
  });

  return result;
}

async function getTicketValue(ticketTypeId: number) {
  const result: TicketType = await prisma.ticketType.findFirst({
    where: {
      id: ticketTypeId,         
    },    
  });

  return result.price;
}

const paymentsRepository = {
  getPaymentsForTicket,
  checkTicket,
  processPaymentForTicket,
  getTicketValue
};

export default paymentsRepository;
