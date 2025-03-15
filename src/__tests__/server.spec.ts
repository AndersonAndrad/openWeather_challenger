import {Server as HttpServer} from 'http';
import request from 'supertest';
import express from 'express';
import {Server} from "../index";

jest.mock('../infra/logger.ts', () => {
    return {
        Logger: jest.fn().mockImplementation(() => ({
            info: jest.fn(),
            debug: jest.fn(),
        })),
    };
});

jest.mock('../routes.ts', () => {
    return {
        Routes: jest.fn().mockImplementation(() => ({
            initializeRoutes: jest.fn(),
            attachAppRoutes: jest.fn(),
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

    it('should be defined', () => {
        expect(server).toBeDefined();
    });

    it('should start the server and respond to a request', async () => {
        const response = await request(app).get('/');
        expect(response.status).toBe(404);
    });

    it('should initialize the server and call listen', () => {
        const listenSpy = jest.spyOn(app, 'listen').mockImplementation((port, callback) => {
            callback?.();
            return {
                close: jest.fn(),
            } as unknown as HttpServer;
        });

        server.initializeServer();
        expect(listenSpy).toHaveBeenCalled();
        listenSpy.mockRestore();
    });

    it('should initialize routes', () => {
        expect(server['routes'].attachAppRoutes).toHaveBeenCalledWith(app);
    });

    it('should initialize the server with default port', () => {
        delete process.env.APP_PORT;

        const listenSpy = jest.spyOn(app, 'listen').mockImplementation((port, callback) => {
            callback?.();
            return {
                close: jest.fn(),
            } as unknown as HttpServer;
        });

        server.initializeServer();
        expect(listenSpy).toHaveBeenCalledWith('3000', expect.any(Function));
        listenSpy.mockRestore();
    });

    it('should initialize the server with custom port', () => {
        process.env.APP_PORT = '5000';
        const listenSpy = jest.spyOn(app, 'listen').mockImplementation((port, callback) => {
            callback?.();
            return {
                close: jest.fn(),
            } as unknown as HttpServer;
        });

        server.initializeServer();
        expect(listenSpy).toHaveBeenCalledWith('5000', expect.any(Function));
        listenSpy.mockRestore();
    });
});
