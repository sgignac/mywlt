import { IAppState } from './../interfaces/iapp-state';
import { AnyAction } from 'redux';
import { SET_EXCHANGE_RATE, SET_VALUE, SET_WALLET, SET_CONFIG_PARAM } from './app.actions';


/**
 * INITIAL STATE OF THE STORE
 */
export const INITIAL_STATE: IAppState = {
    wallet: [],
    exchangeRate: 0,
    configuration: {
        language: '',
        apikey: ''
    }
}

export function rootReducer(lastState: IAppState, action: AnyAction): IAppState{
    switch(action.type){
        case SET_WALLET:
            return Object.assign({}, lastState, {
                wallet: action.payload.value,
                exchangeRate: lastState.exchangeRate,
                configuration: lastState.configuration
            })
        case SET_VALUE: 
            let cur = lastState.wallet.find(c => c.code === action.payload.code);
            let index = lastState.wallet.indexOf(cur);
            return Object.assign({}, lastState, {
                    wallet: [
                        ...lastState.wallet.slice(0, index),
                        Object.assign({}, cur, {value: action.payload.value}),
                        ...lastState.wallet.slice(index+1)
                    ],
                    exchangeRate: lastState.exchangeRate,
                    configuration: lastState.configuration
                }
            );
            
        case SET_EXCHANGE_RATE:
            return Object.assign({}, lastState, {
                wallet: lastState.wallet,
                exchangeRate: action.payload
            });

        case SET_CONFIG_PARAM:
            let config;
            if(action.payload.param==="language"){
                config = {language: action.payload.value, apikey: lastState.configuration.apikey}
            }
            if(action.payload.param==="apikey"){
                config = {language: lastState.configuration.language, apikey: action.payload.value}
            }
            return Object.assign({}, lastState, {
                wallet: lastState.wallet,
                exchangeRate: lastState.exchangeRate,
                configuration: config
            })
    }

    return lastState;
}