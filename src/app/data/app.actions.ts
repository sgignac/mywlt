import { Injectable } from "@angular/core";
import { Action } from 'redux';

@Injectable()
export class StoreActions {
    static SET_VALUE = 'SET_VALUE';
    static SET_EXCHANGE_RATE = 'SET_EXCHANGE_RATE';

    setValue(): Action {
        return {type: StoreActions.SET_VALUE}
    }

    setExchangeRate(): Action {
        return {type: StoreActions.SET_EXCHANGE_RATE}
    }

}