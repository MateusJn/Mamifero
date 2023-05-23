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
          { nome: { contains: search, mode: 'insensitive' } },
          { descricao: { contains: search, mode: 'insensitive' } }
        ]
      }
    });
  } else {
    veados = await prisma.veado.findMany();
  }

  return veados;
});

server.post('/veados', async (request, reply) => {
  const { nome, descricao, idade, temChifre } = request.body as {
    nome: string;
    descricao: string;
    idade: number;
    temChifre: boolean;
  };

  const veado = await prisma.veado.create({
    data: {
      nome,
      descricao,
      idade,
      temChifre,
    },
  });

  return veado;
});

server.put('/veados/:id', async (request, reply) => {
  const { id } = request.params as { id: string };
  const { nome, descricao, idade, temChifre } = request.body as {
    nome: string;
    descricao: string;
    idade: number;
    temChifre: boolean;
  };

  const updatedVeado = await prisma.veado.update({
    where: { id: parseInt(id, 10) },
    data: {
      nome,
      descricao,
      idade,
      temChifre,
    },
  });

  return updatedVeado;
});

server.delete('/veados/:id', async (request, reply) => {
  const { id } = request.params as { id: string };

  await prisma.veado.delete({
    where: { id: parseInt(id, 10) },
  });

  return { message: 'Veado deletado com sucesso!' };
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
