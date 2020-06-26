import { Client, Server, Db, SubscriptionsManager } from '../../';
export declare class Environment {
    port: number;
    subscriptionsManager: SubscriptionsManager;
    server: Server;
    client: Client;
    db: Db;
    constructor(port?: number);
    connect(): Promise<void>;
    disconnect(): Promise<void>;
}
