import { fastify } from 'fastify'
import { z } from 'zod'
import { prisma } from "./lib/prisma"
import fastifyCors from "@fastify/cors"

const app = fastify()

app.register(fastifyCors, {
    origin: '*'
})

// Enterprises
// list all
app.get("/enterprises", async (request, reply) => {
    const enterprises = await prisma.enterprise.findMany()

    return { enterprises }
})

//add one
app.post("/enterprise", async (request, reply) => {
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

app.listen({ port: process.env.PORT ? Number(process.env.PORT) : 3333 })
    .then(() => console.log(`Server SensorResolve started in port: ${process.env.PORT ?? 3333}`))

