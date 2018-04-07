declare module Express {
    interface Request {
        token?: string;
    }
}

declare module global {
    interface StrategyOptionsWithRequest {
        proxy?: boolean;
    }
}