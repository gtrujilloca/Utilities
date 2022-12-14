import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment';
import { Bank, BankDTO, City, CityDTO, Department, DepartmentDTO } from '../../dto/MasterDTO';

import { MasterDataService } from './master-data.service';

describe('MasterDataService', () => {
  let service: MasterDataService;
  let httpController: HttpTestingController;
  const baseURL:string = `${environment.serviceBaseUrl}/master-data/api/v1`;

  function getUserMock(data:any) {
    return {
      responseCode: 'KAU001',
      status: 200,
      responseMessage: 'Operacion exitosa',
      fieldErrors: [],
      data
    };
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
    });
    service = TestBed.inject(MasterDataService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('Should be call getDepartments', (done) => {
    const deparments: Department[] = [
      {
        id: 0,
        description: 'Caldas',
      },
      {
        id: 1,
        description: 'Antioquia',
      },
    ];
    const responseMock: DepartmentDTO = getUserMock(deparments);
    const spyDepartment = spyOn(service,'getDepartments').and.callThrough();

    service.getDepartments().subscribe(response => {
      expect(response).toEqual(responseMock);
      expect(spyDepartment).toHaveBeenCalled();
      expect(response.status).toEqual(200);
      done();
    })

    //Http config
    const url:string = `${baseURL}/departments`;
    const req = httpController.expectOne(url);
    req.flush(responseMock);
    httpController.verify();
  })

  it('Should be call getCities', (done) => {
    const cities: City[] = [
      {
        id: 0,
        description: 'Manizales',
      },
      {
        id: 1,
        description: 'Medellin',
      },
    ];
    const responseMock: CityDTO = getUserMock(cities);
    const spyCity = spyOn(service,'getCities').and.callThrough();

    service.getCities(1).subscribe(response => {
      expect(response).toEqual(responseMock);
      expect(spyCity).toHaveBeenCalled();
      expect(response.status).toEqual(200);
      done();
    })

    //Http config
    const url:string = `${baseURL}/cities?departmentId=1`;
    const req = httpController.expectOne(url);
    req.flush(responseMock);
    httpController.verify();
  })

  it('Should be call getBanks', (done) => {
    const banks: Bank[] = [
      {
        description: 'Bancolombia',
        accountsType: [
          {
            accountTypeBankId: 0,
            description: 'Ahorros',
          },
          {
            accountTypeBankId: 1,
            description: 'Corriente',
          },
        ]
      },
      {
        description: 'Davivienda',
        accountsType: [
          {
            accountTypeBankId: 0,
            description: 'Ahorros',
          },
          {
            accountTypeBankId: 1,
            description: 'Corriente',
          },
        ]
      },

    ];
    const responseMock: BankDTO = getUserMock(banks);
    const spyBank = spyOn(service,'getBanks').and.callThrough();

    service.getBanks().subscribe(response => {
      expect(response).toEqual(responseMock);
      expect(spyBank).toHaveBeenCalled();
      expect(response.status).toEqual(200);
      done();
    })

    //Http config
    const url:string = `${baseURL}/banks`;
    const req = httpController.expectOne(url);
    req.flush(responseMock);
    httpController.verify();
  })
});
