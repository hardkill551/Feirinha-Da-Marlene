import prisma from "database";
import app from "index";
import supertest from "supertest";

const api = supertest(app)

beforeAll(async()=>{
    await prisma.fruit.deleteMany()
})


describe("POST /fruits",()=>{
    it("should return 201 when inserting a fruit",async()=>{
        const { status } = await api.post("/fruits").send({name:"Banana", price:1})
        expect(status).toBe(201)
    })
    it("should return 409 when inserting a fruit that is already registered",async()=>{
        const { status } = await api.post("/fruits").send({name:"Banana", price:1})
        expect(status).toBe(409)
    })
    it("should return 422 when inserting a fruit with data missing",async()=>{
        const { status } = await api.post("/fruits").send({name:"Maça"})
        expect(status).toBe(422)
    })
})

describe("GET /fruits",()=>{
    it("shoud return 404 when trying to get a fruit that doesn't exists",async()=>{
        const { status } = await api.get("/fruits/1")
        expect(status).toBe(404)
    })
    it("should return 400 when id param is not valid",async()=>{
        const { status } = await api.get("/fruits/saf")
        expect(status).toBe(400)
    })
    it("should return a fruit given an id",async()=>{
        const fruit = await prisma.fruit.create({
            data:{
                name:"Mel",
                price:90
            }
        })
        const { status, body } = await api.get(`/fruits/${fruit.id}`)
        expect(status).toBe(200)
        expect(body).toEqual({
                id:expect.any(Number),
                name:"Mel",
                price:90
        })
    })
    it("should return all fruits",async()=>{
        const { status, body } = await api.get("/fruits")
        expect(status).toBe(200)
        expect(body).toEqual(expect.arrayContaining([expect.objectContaining({
                id:expect.any(Number),
                name:expect.any(String),
                price:expect.any(Number)
            
        })]))
    })
})