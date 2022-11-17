import { prisma } from "@/config";

async function getAllTicketTypes() {
  return prisma.ticketType.findMany();
}

const ticketsRepository = {
  getAllTicketTypes
};

export default ticketsRepository;
