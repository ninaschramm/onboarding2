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

type TicketTypeResult = Partial<TicketType>

const ticketsService = {
  getAllTicketTypes,
};
  
export default ticketsService;
