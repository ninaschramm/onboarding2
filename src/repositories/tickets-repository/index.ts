import { prisma } from "@/config";
import { Prisma } from "@prisma/client";

async function getAllTicketTypes() {
  return prisma.ticketType.findMany();
}

async function getEnrollmentId(userId: number) {
  const { id: enrollmentId } = await prisma.enrollment.findFirst({
    where: {
      userId
    },
  });

  return enrollmentId;
}

async function getTicketByUserId(userId: number) {
  const enrollmentId = await getEnrollmentId(userId);
    
  return prisma.ticket.findFirst({
    where: {
      enrollmentId
    },
    include: {
      TicketType: true
    }
  });
}

async function postNewTicket(data: Prisma.TicketUncheckedCreateInput) {
  const result = await prisma.ticket.create({
    data
  });

  const { id } = result;

  return prisma.ticket.findFirst({
    where: {
      id
    },
    include: {
      TicketType: true
    }
  });
}

const ticketsRepository = {
  getAllTicketTypes,
  getTicketByUserId,
  getEnrollmentId,
  postNewTicket
};

export default ticketsRepository;
