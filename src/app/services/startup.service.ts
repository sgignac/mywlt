import { Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class StartupService {

  private _startupData: any;

  constructor(private http: HttpClient) { }

  // This is the method you want to call at bootstrap
  // Important: It should return a Promise
  load(): Promise<any> {

    console.log('START HERE');

    this._startupData = null;

    return this.http
      .get('http://apiwlt.sebdevlab.com/?key=121212')
      .toPromise()
      .then((data: any) => this._startupData = data.results.data)
      .catch((err: any) => Promise.resolve());
  }

  get startupData(): any {
    return this._startupData;
  }

}
