import { IAppState } from './../interfaces/iapp-state';
import { Action } from 'redux';
import { StoreActions } from './app.actions';


/**
 * INITIAL STATE OF THE STORE
 */
export const INITIAL_STATE: IAppState = {
    wallet: [
        {code: 'IOT', value: 1, amount: 1000, invested: 1119},
        {code: 'ENJ', value: 0.03, amount: 5000, invested: 397}
    ],
    exchangeRate: 1.28754
}

export function rootReducer(lastState: IAppState, action: Action): IAppState{
    switch(action.type){
        case StoreActions.SET_VALUE: 
            return INITIAL_STATE;
            
        case StoreActions.SET_EXCHANGE_RATE:
            return INITIAL_STATE;
    }

    return lastState;
}