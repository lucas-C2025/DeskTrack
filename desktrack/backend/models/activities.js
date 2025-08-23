import prisma from '../base_dados.js';
 
async function create({ descricao, dispositivo,tipo,data_hora }) {
  const createdActivities = await prisma.activities.create({
    data: { descricao, dispositivo,tipo,data_hora },
  });
 
  return createdActivities;
}
 
async function read(where) {
  if (where?.dispositivo) {
    where.dispositivo = {
      contains: where.dispositivo,
    };
  }
 
  const activities = await prisma.activities.findMany({ where });
 
  if (activities.length === 1 && where) {
    return activities[0];
  }
 
  return activities;
}
 
async function readById(id) {
  const activities = await prisma.activities.findUnique({
    where: {
      id,
    },
  });
 
  return activities;
}
 
async function update({ descricao, dispositivo,tipo,data_hora,id }) {
  const updatedActivity = await prisma.activities.update({
    where: {
      id,
    },
    data: { descricao, dispositivo,tipo,data_hora },
  });
 
  return updatedActivity;
}
 
async function remove(id) {
  await prisma.activities.delete({
    where: {
      id,
    },
  });
}
 
export default { create, read, readById, update, remove };
 