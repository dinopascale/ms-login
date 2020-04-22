import {Db, FilterQuery, MongoClient, ObjectId} from "mongodb";

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
            const client = await MongoClient.connect('mongodb://localhost:27017', { useUnifiedTopology: true })
            this.db = client.db('ms-playground');
            this.isConnected = true;
            return this.db;
        } catch (e) {
            throw new Error(e);
        }
    }
}

export class MongoDbClient {
    constructor(public db: Db) {
        if (db === undefined) {
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

    public async find<T>(collection: string, filter: FilterQuery<T>): Promise<T[]> {
        return this.db.collection<T>(collection).find(filter).toArray()
    }

    public async findById<T>(collection: string, id: string): Promise<T> {
        const query = {_id: new ObjectId(id)}
        const result = await this.db.collection<T>(collection).find(query as FilterQuery<T>).limit(1).toArray()
        return result[0]
    }

    public async insert<T = any>(collection: string, model: T): Promise<T> {
        const {insertedId} = await this.db.collection(collection).insertOne(model);
        return this.findById<T>(collection, insertedId)
    }
}
