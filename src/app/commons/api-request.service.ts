import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { isNil } from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class ApiRequestService {

  constructor(private http: HttpClient) {
  }

  public get(url: string, urlParams?: HttpParams): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    const options: any = { headers: headers };
    if (!isNil(urlParams)) {
      options.params = urlParams;
    }

    return this.http.get(url, options);
  }

  public post(url: string, body: object, urlParams?: HttpParams, headers?: HttpHeaders ): Observable<any> {
    const options: any = {};
    if (isNil(headers)) {
      headers = new HttpHeaders();
      headers = headers.append('Content-Type', 'application/json');
    }
    options.headers = headers;
    if (!isNil(urlParams)) {
      options.params = urlParams;
    }
    return this.http.post( url, JSON.stringify(body), options);
  }

  public put(url: string, body?: object, options?: any): Observable<any> {
    if (isNil(options)) {
      let headers = new HttpHeaders();
      headers = headers.append('Content-Type', 'application/json');
      options = { headers: headers };
    }
    return this.http.put(url, JSON.stringify(body), options);
  }

  public delete(url: string): Observable<any> {
    return this.http.delete( url);
  }
}
