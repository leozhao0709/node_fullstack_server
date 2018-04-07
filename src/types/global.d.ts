declare module Express {
    interface Request {
        token?: string;
    }
}

export interface StrategyOptions {
    proxy?: boolean;
}