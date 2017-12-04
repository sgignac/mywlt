import { IAppState } from './../interfaces/iapp-state';
import { AnyAction } from 'redux';
import { SET_EXCHANGE_RATE, SET_VALUE, SET_WALLET } from './app.actions';


/**
 * INITIAL STATE OF THE STORE
 */
export const INITIAL_STATE: IAppState = {
    wallet: [],
    exchangeRate: 0
}

export function rootReducer(lastState: IAppState, action: AnyAction): IAppState{
    switch(action.type){
        case SET_WALLET:
            return Object.assign({}, lastState, {
                wallet: action.payload.value,
                exchangeRate: lastState.exchangeRate
            })
        case SET_VALUE: 
            let cur = lastState.wallet.find(c => c.code === action.payload.code);
            let index = lastState.wallet.indexOf(cur);
            return Object.assign({}, lastState, {
                    wallet: [
                        ...lastState.wallet.splice(0, index),
                        Object.assign({}, cur, {value: action.payload.value}),
                        ...lastState.wallet.slice(index+1)
                    ],
                    exchangeRate: lastState.exchangeRate
                }
            );
            
        case SET_EXCHANGE_RATE:
            return Object.assign({}, lastState, {
                    wallet: lastState.wallet,
                    exchangeRate: action.payload
                }
            );
    }

    return lastState;
}