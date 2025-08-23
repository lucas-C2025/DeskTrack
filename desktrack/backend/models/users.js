import prisma from '../base_dados.js';
 
async function create({ username,password }) {
  const createUser= await prisma.devices.create({
    data: { username,password },
  });
 
  return createUser;
}
 
async function read(where) {
  if (where?.username) {
    where.username = {
      contains: where.username,
    };
  }
 
  const users = await prisma.users.findMany({ where });
 
  if (users.length === 1 && where) {
    return users[0];
  }
 
  return users;
}
 
async function readById(id) {
  const users = await prisma.users.findUnique({
    where: {
      id,
    },
  });
 
  return users;
}
 
async function update({ id,username,password }) {
  const updateUser = await prisma.users.update({
    where: {
      id,
    },
    data: { username,password },
  });
 
  return updateUser;
}
 
async function remove(id) {
  await prisma.users.delete({
    where: {
      id,
    },
  });
}
 
export default { create, read, readById, update, remove };
 