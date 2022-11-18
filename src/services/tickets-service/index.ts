import { notFoundError } from "@/errors";
import ticketsRepository from "@/repositories/tickets-repository";
import { exclude } from "@/utils/prisma-utils";
import { TicketType } from "@prisma/client";

async function getAllTicketTypes(): Promise<TicketTypeResult[]> {
  const result = await ticketsRepository.getAllTicketTypes();

  if (!result) {
    throw notFoundError();
  }

  return result;
}

async function getTicketsByUserId(userId: number) {
  const result = await ticketsRepository.getTicketByUserId(userId);

  if (!result || result.length === 0 ) {
    throw notFoundError();
  }

  return result;
}

type TicketTypeResult = Partial<TicketType>

const ticketsService = {
  getAllTicketTypes,
  getTicketsByUserId
};
  
export default ticketsService;
