import {provide} from "inversify-binding-decorators";
import TYPES from "../inversify-config/types";
import {Db, MongoClient} from "mongodb";
import {inject} from "inversify";
import {Logger} from "winston";
import {AuthService} from "./auth";

// helper class for connection
class MongoDbConnection {
    private static isConnected: boolean = false;
    private static db: Db;

    public static async getConnection() {
        if (this.isConnected) {
            return this.db
        }
        try {
            return this.connect();
        } catch (e) {
            throw new Error(e);
        }
    }

    private static async connect() {
        try {
            const client = await MongoClient.connect('mongodb://localhost:27017')
            this.db = client.db('ms-playground');
            this.isConnected = true;
            return this.db;
        } catch (e) {
            throw new Error(e);
        }
    }
}

@provide(TYPES.MongoService)
export class MongoDbClient {
    constructor(private mongoInstance: Db) {
        if (mongoInstance === undefined) {
            throw new Error('Cannot be called directly');
        }
    }

    static async build() {
        try {
            const db = await MongoDbConnection.getConnection()
            return new MongoDbClient(db)
        } catch (e) {
            throw new Error(e);
        }
    }
}
