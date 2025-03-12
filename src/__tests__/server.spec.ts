import {Server} from "../server.ts";
import request from "supertest";
import express from "express";

jest.mock("../infra/logger.ts", () => {
    return {
        Logger: jest.fn().mockImplementation(() => ({
            info: jest.fn(),
            debug: jest.fn(),
        })),
    };
});

describe(Server.name, () => {
    let server: Server;
    let app: express.Application;

    beforeAll(() => {
       server = new Server();
       app = server['expressInstance'];
    });

    it('should start the server and respond to a request', async () => {
        const response = await request(app).get('/');
        expect(response.status).toBe(404);
    });
});