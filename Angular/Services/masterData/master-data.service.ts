import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BankDTO, CityDTO, DepartmentDTO, economicActivityType, EconomicDTO } from '../../dto/MasterDTO';

@Injectable({
  providedIn: 'root'
})
export class MasterDataService {

  masterDataUrl: string = `${environment.serviceBaseUrl}/master-data/api/v1`

  constructor(
    private readonly http: HttpClient
  ) { }

  getDepartments(): Observable<DepartmentDTO>{
    return this.http.get<DepartmentDTO>(`${this.masterDataUrl}/departments`);
  }

  getCities(departmentId: number): Observable<CityDTO>{
    return this.http.get<CityDTO>(`${this.masterDataUrl}/cities`, {
      params: {
        departmentId
      }
    });
  }

  getBanks(): Observable<BankDTO>{
    return this.http.get<BankDTO>(`${this.masterDataUrl}/banks`);
  }

  getSpecificEconomicActivity(type: economicActivityType): Observable<EconomicDTO>{
    return this.http.get<EconomicDTO>(`${this.masterDataUrl}/specific-economic-activity`, {
      params: {
        economicActivityTypeEnums: type
      }
    });
  }
}
