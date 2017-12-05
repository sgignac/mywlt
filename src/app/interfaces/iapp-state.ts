import { IappConfig } from './iapp-config';
import { Icurrency } from "./icurrency";

export interface IAppState {

    wallet: Icurrency[];
    exchangeRate: number;
    configuration: IappConfig;
    
}
