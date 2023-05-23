import fastify from 'fastify';
import { PrismaClient } from '@prisma/client';

const server = fastify();
const prisma = new PrismaClient();

server.get('/veados', async (request, reply) => {
  const { search } = request.query as { search?: string };
  let veados;
  
  if (search) {
    veados = await prisma.veado.findMany({
      where: {
        OR: [
          { name: { contains: search, mode: 'insensitive' } },
          { description: { contains: search, mode: 'insensitive' } }
        ]
      }
    });
  } else {
    veados = await prisma.veado.findMany();
  }

  return veados;
});

server.post('/deers', async (request, reply) => {
  const { name, description, age, hasAntlers } = request.body as {
    name: string;
    description: string;
    age: number;
    hasAntlers: boolean;
  };

  const deer = await prisma.deer.create({
    data: {
      name,
      description,
      age,
      hasAntlers,
    },
  });

  return deer;
});

server.put('/deers/:id', async (request, reply) => {
  const { id } = request.params as { id: string };
  const { name, description, age, hasAntlers } = request.body as {
    name: string;
    description: string;
    age: number;
    hasAntlers: boolean;
  };

  const updatedDeer = await prisma.deer.update({
    where: { id: parseInt(id, 10) },
    data: {
      name,
      description,
      age,
      hasAntlers,
    },
  });

  return updatedDeer;
});

server.delete('/deers/:id', async (request, reply) => {
  const { id } = request.params as { id: string };

  await prisma.deer.delete({
    where: { id: parseInt(id, 10) },
  });

  return { message: 'Deer deleted successfully' };
});

const start = async () => {
  try {
    await prisma.$connect();
    await server.listen(3000);
    console.log(`Servidor rodando em http://localhost:3000`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

start();
