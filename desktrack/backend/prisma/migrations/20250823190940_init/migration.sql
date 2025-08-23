-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "devices" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "ip" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "activities" (
    "descricao" TEXT NOT NULL,
    "dispositivo" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "data_hora" TEXT NOT NULL,
    "id" TEXT NOT NULL PRIMARY KEY
);
