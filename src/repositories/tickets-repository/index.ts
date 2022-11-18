import { prisma } from "@/config";

async function getAllTicketTypes() {
  return prisma.ticketType.findMany();
}

async function getEnrollmentId(userId: number) {
  const { id: enrollmentId } = await prisma.enrollment.findFirst({
    where: {
      userId
    },
  });

  console.log(enrollmentId);
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

const ticketsRepository = {
  getAllTicketTypes,
  getTicketByUserId,
};

export default ticketsRepository;
