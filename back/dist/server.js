"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// src/server.ts
var import_fastify = require("fastify");
var import_zod = require("zod");

// src/lib/prisma.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient();

// src/server.ts
var import_cors = __toESM(require("@fastify/cors"));
var app = (0, import_fastify.fastify)();
app.register(import_cors.default, {
  origin: "*"
});
app.get("/enterprises", async (request, reply) => {
  const enterprises = await prisma.enterprise.findMany();
  return { enterprises };
});
app.post("/enterprises", async (request, reply) => {
  const createEnterpriseSchema = import_zod.z.object({
    name: import_zod.z.string(),
    email: import_zod.z.string(),
    phoneNumber: import_zod.z.string(),
    address: import_zod.z.string(),
    industryType: import_zod.z.string()
  });
  const { email, name, phoneNumber, address, industryType } = createEnterpriseSchema.parse(request.body);
  const enterprise = await prisma.enterprise.create({
    data: {
      email,
      name,
      phoneNumber,
      address,
      industryType
    }
  });
  return reply.status(201).send({ enterprise });
});
app.get("/enterprises/:id", async (request, reply) => {
  const findId = import_zod.z.object({
    id: import_zod.z.coerce.number()
  });
  const { id } = findId.parse(request.params);
  const enterprise = await prisma.enterprise.findUnique({
    where: {
      id
    }
  });
  if (!enterprise) {
    return reply.status(404).send({ "message": "enterprise not found" });
  }
  return reply.status(200).send({ enterprise });
});
app.put("/enterprises/:id", async (request, reply) => {
  const findId = import_zod.z.object({
    id: import_zod.z.coerce.number()
  });
  const updateEnterpriseSchema = import_zod.z.object({
    name: import_zod.z.string(),
    email: import_zod.z.string(),
    phoneNumber: import_zod.z.string(),
    address: import_zod.z.string(),
    industryType: import_zod.z.string()
  });
  const { id } = findId.parse(request.params);
  const { address, email, name, phoneNumber, industryType } = updateEnterpriseSchema.parse(request.body);
  const enterprise = await prisma.enterprise.update({
    where: {
      id
    },
    data: {
      address,
      email,
      name,
      phoneNumber,
      industryType
    }
  });
  return reply.status(200).send({ enterprise });
});
app.delete("/enterprises/:id", async (request, reply) => {
  const findId = import_zod.z.object({
    id: import_zod.z.coerce.number()
  });
  const { id } = findId.parse(request.params);
  await prisma.enterprise.delete({
    where: {
      id
    }
  });
  return reply.status(200).send({ message: "deleted success" });
});
app.post("/sensor", async (request, reply) => {
  const createSensorSchema = import_zod.z.object({
    temperature: import_zod.z.number(),
    humidity: import_zod.z.number(),
    co2Level: import_zod.z.number(),
    coLevel: import_zod.z.number(),
    ch4Level: import_zod.z.number(),
    pm25: import_zod.z.number(),
    pm10: import_zod.z.number(),
    nh3Level: import_zod.z.number(),
    no2Level: import_zod.z.number(),
    ozoneLevel: import_zod.z.number(),
    enterpriseId: import_zod.z.number().int()
  });
  const {
    ch4Level,
    co2Level,
    coLevel,
    enterpriseId,
    humidity,
    nh3Level,
    no2Level,
    ozoneLevel,
    pm10,
    pm25,
    temperature
  } = createSensorSchema.parse(request.body);
  const sensor = await prisma.sensorData.create({
    data: {
      ch4Level,
      co2Level,
      coLevel,
      humidity,
      nh3Level,
      no2Level,
      ozoneLevel,
      pm10,
      pm25,
      temperature,
      enterprise: {
        connect: {
          id: Number(enterpriseId)
        }
      }
    }
  });
  return { sensor };
});
app.get("/sensor/:enterpriseId", async (request, reply) => {
  const enterpriseIdSchema = import_zod.z.object({
    enterpriseId: import_zod.z.coerce.number().int()
  });
  const { enterpriseId } = enterpriseIdSchema.parse(request.params);
  const sensorDatas = await prisma.sensorData.findMany({
    where: {
      enterprise: {
        id: enterpriseId
      }
    }
  });
  setInterval(async () => {
    await prisma.sensorData.update({
      where: {
        id: 1
      },
      data: {
        ch4Level: parseFloat((Math.random() * 2).toFixed(2)),
        co2Level: parseFloat((Math.random() * 2e3 + 400).toFixed(2)),
        coLevel: parseFloat((Math.random() * 50).toFixed(2)),
        nh3Level: parseFloat((Math.random() * 10).toFixed(2)),
        no2Level: parseFloat((Math.random() * 0.2).toFixed(2)),
        ozoneLevel: parseFloat((Math.random() * 0.1).toFixed(2)),
        pm10: parseFloat((Math.random() * 50).toFixed(2)),
        pm25: parseFloat((Math.random() * 25).toFixed(2))
      }
    });
  }, 1e3);
  return reply.status(200).send({ sensorDatas });
});
app.listen({ port: process.env.PORT ? Number(process.env.PORT) : 3333 }).then(() => console.log(`Server SensorResolve started in port: ${process.env.PORT ?? 3333}`));
