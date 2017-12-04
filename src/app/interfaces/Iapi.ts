import { Icurrency } from "./icurrency";

export interface Iapi {
    success: boolean,
    message: string,
    results: {
        count?: number,
        data?: Icurrency[]
    }
}
