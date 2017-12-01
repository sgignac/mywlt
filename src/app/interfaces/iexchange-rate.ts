export interface IExchangeRate {
    base:string;
    disclaimer:string;
    license: string;
    rates?: {
      CAD?: number
    };
    timestamp: number;
}
