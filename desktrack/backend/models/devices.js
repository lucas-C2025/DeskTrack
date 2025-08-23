import prisma from '../base_dados.js';
 
async function create({ nome,ip }) {
  const createdDevice = await prisma.devices.create({
    data: { nome,ip },
  });
 
  return createdDevice;
}
 
async function read(where) {
  if (where?.nome) {
    where.nome = {
      contains: where.nome,
    };
  }
 
  const devices = await prisma.devices.findMany({ where });
 
  if (devices.length === 1 && where) {
    return devices[0];
  }
 
  return devices;
}
 
async function readById(id) {
  const devices = await prisma.devices.findUnique({
    where: {
      id,
    },
  });
 
  return devices;
}
 
async function update({ id,nome,ip }) {
  const updateDevice = await prisma.devices.update({
    where: {
      id,
    },
    data: { nome,ip },
  });
 
  return updateDevice;
}
 
async function remove(id) {
  await prisma.devices.delete({
    where: {
      id,
    },
  });
}
 
export default { create, read, readById, update, remove };
 