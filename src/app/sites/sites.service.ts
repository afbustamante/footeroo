import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Site } from './site';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { SiteForm } from './site-form';

@Injectable({
  providedIn: 'root'
})
export class SitesService {

  constructor(
    private http: HttpClient
  ) { }

  findSites(): Observable<Site[]> {
    return this.http.get<Site[]>(`${environment.coreApiUrl}/sites`);
  }

  createSite(site: SiteForm): Observable<HttpResponse<any>> {
    return this.http.post(`${environment.coreApiUrl}/sites`, site, { observe : 'response'});
  }
}
