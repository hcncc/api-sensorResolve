import { fastify } from 'fastify'
import { z } from 'zod'
import { prisma } from "./lib/prisma"
import fastifyCors from "@fastify/cors"

const app = fastify()

app.register(fastifyCors, {
    origin: '*',
})

// Enterprises
// list all
app.get("/enterprises", async (request, reply) => {
    const enterprises = await prisma.enterprise.findMany()

    return { enterprises }
})

//add one
app.post("/enterprises", async (request, reply) => {
    const createEnterpriseSchema = z.object({
        name: z.string(),
        email: z.string(),
        phoneNumber: z.string(),
        address: z.string(),
        industryType: z.string()
    })

    const { email, name, phoneNumber, address, industryType } = createEnterpriseSchema.parse(request.body)
    const enterprise = await prisma.enterprise.create({
        data: {
            email,
            name,
            phoneNumber,
            address,
            industryType
        }
    })

    return reply.status(201).send({ enterprise })
})

app.get("/enterprises/:id", async (request, reply) => {
    const findId = z.object({
        id: z.coerce.number()
    })

    const { id } = findId.parse(request.params)

    const enterprise = await prisma.enterprise.findUnique({
        where: {
            id
        }
    })

    if (!enterprise) {
        return reply.status(404).send({ "message": "enterprise not found" })
    }

    return reply.status(200).send({ enterprise })
})

app.put("/enterprises/:id", async (request, reply) => {
    const findId = z.object({
        id: z.coerce.number()
    })
    const updateEnterpriseSchema = z.object({
        name: z.string(),
        email: z.string(),
        phoneNumber: z.string(),
        address: z.string(),
        industryType: z.string()
    })

    const { id } = findId.parse(request.params)
    const { address, email, name, phoneNumber, industryType } = updateEnterpriseSchema.parse(request.body)

    const enterprise = await prisma.enterprise.update({
        where: {
            id
        },
        data:{
            address,
            email,
            name,
            phoneNumber,
            industryType
        }
    })

    return reply.status(200).send({ enterprise })
})

app.delete("/enterprises/:id", async(request, reply)=>{
    const findId = z.object({
        id: z.coerce.number()
    })

    const { id } = findId.parse(request.params)

    await prisma.enterprise.delete({
        where:{
            id
        }
    })

    return reply.status(200).send({message: "deleted success"})
})

// SensorData

app.post("/sensor", async (request, reply)=>{
    const createSensorSchema = z.object({
        temperature: z.number(),
        humidity: z.number(),
        co2Level: z.number(),
        coLevel: z.number(),
        ch4Level: z.number(),
        pm25: z.number(),
        pm10: z.number(),
        nh3Level: z.number(),
        no2Level: z.number(),
        ozoneLevel: z.number(),
        enterpriseId: z.number().int()
    })

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
     } = createSensorSchema.parse(request.body)

    const sensor = await prisma.sensorData.create({
        data:{
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
                connect:{
                    id: Number(enterpriseId)
                }
            }
        }
    })

    return { sensor }
})

app.get("/sensor/:enterpriseId", async(request, reply)=>{
    const enterpriseIdSchema = z.object({
        enterpriseId: z.coerce.number().int()
    })

    const { enterpriseId } = enterpriseIdSchema.parse(request.params)

    const sensorDatas = await prisma.sensorData.findMany({
        where:{
            enterprise:{
                id: enterpriseId
            }
        }
    })

    setInterval(async () => {
        await prisma.sensorData.update({
            where: {
                id: 1
            },
            data: {
                ch4Level: parseFloat((Math.random() * 2).toFixed(2)), 
                co2Level: parseFloat((Math.random() * 2000 + 400).toFixed(2)),
                coLevel: parseFloat((Math.random() * 50).toFixed(2)), 
                nh3Level: parseFloat((Math.random() * 10).toFixed(2)), 
                no2Level: parseFloat((Math.random() * 0.2).toFixed(2)), 
                ozoneLevel: parseFloat((Math.random() * 0.1).toFixed(2)), 
                pm10: parseFloat((Math.random() * 50).toFixed(2)), 
                pm25: parseFloat((Math.random() * 25).toFixed(2))
            }
        })
    }, 1000)
    
    
    return reply.status(200).send({ sensorDatas })
})

app.listen({ 
    port: process.env.PORT ? Number(process.env.PORT) : 3333, 
})
    .then(() => console.log(`Server SensorResolve started in port: ${process.env.PORT ?? 3333}`))

