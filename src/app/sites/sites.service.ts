import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Site } from './site';
import { environment } from 'src/environments/environment';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SitesService {

  constructor(
    private http: HttpClient
  ) { }

  findSites(): Observable<Site[]> {
    return this.http.get<Site[]>(`${environment.apiUrl}/sites`);
  }

  createSite(site: Site): Observable<HttpResponse<any>> {
    return this.http.post(`${environment.apiUrl}/sites`, site, { observe : 'response'});
  }
}
