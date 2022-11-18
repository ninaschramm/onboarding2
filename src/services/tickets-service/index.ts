import { notFoundError, invalidBodyError } from "@/errors";
import ticketsRepository from "@/repositories/tickets-repository";
import { TicketStatus, TicketType } from "@prisma/client";

async function getAllTicketTypes(): Promise<TicketTypeResult[]> {
  const result = await ticketsRepository.getAllTicketTypes();

  if (!result) {
    throw notFoundError();
  }

  return result;
}

async function getTicketsByUserId(userId: number) {
  const result = await ticketsRepository.getTicketByUserId(userId);

  if (!result) {
    throw notFoundError();
  }

  return result;
}

async function postNewTicket(userId: number, body: {ticketTypeId: number}) {
  const { ticketTypeId } = body;

  if (!ticketTypeId) {
    throw invalidBodyError();
  }

  const enrollmentId = await ticketsRepository.getEnrollmentId(userId);

  if (!enrollmentId) {
    throw notFoundError();
  }

  const ticketStatus: TicketStatus = "RESERVED";

  const data = {
    ticketTypeId,
    enrollmentId,
    status: ticketStatus 
  };

  const result = await ticketsRepository.postNewTicket(data);
  return result;
}

type TicketTypeResult = Partial<TicketType>

const ticketsService = {
  getAllTicketTypes,
  getTicketsByUserId,
  postNewTicket
};
  
export default ticketsService;
