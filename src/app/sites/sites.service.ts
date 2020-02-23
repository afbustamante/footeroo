import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Site } from './site';
import { ApiRequestService } from '../commons/api-request.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SitesService {

  private sitesApiPath = '/sites';

  constructor(private apiRequestService: ApiRequestService) { }

  findSites(): Observable<Site[]> {
    let httpParams = new HttpParams();
    httpParams = httpParams.append('pid', '1');
    return this.apiRequestService.get(environment.apiUrl + this.sitesApiPath, httpParams);
  }
}
