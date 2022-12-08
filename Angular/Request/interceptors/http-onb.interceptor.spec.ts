import { HttpErrorResponse, HttpRequest, HttpResponse, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { skipAccessToken } from '../http-context/http.context';
import { LoadingDataService } from '../services/loadingData/loading-data.service';
import { TokenService } from '../services/token/token.service';
import { HttpOnbInterceptor } from './http-onb.interceptor';
import { InterceptorErrorObj, shouldRetryRequest } from './interceptor.config';

describe('HttpOnbInterceptor', () => {

  const baseURL:string = `${environment.serviceBaseUrl}/authentication/api/v1`;
  let interceptor: HttpOnbInterceptor;
  let tokenService: TokenService;
  let loadingDataService: LoadingDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        HttpOnbInterceptor,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: HttpOnbInterceptor,
          multi: true,
        },
      ],
    })
    interceptor = TestBed.inject(HttpOnbInterceptor);
    tokenService = TestBed.inject(TokenService);
    loadingDataService = TestBed.inject(LoadingDataService);
  }

  );

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });

  it('should do normal request without header accessToken', fakeAsync(() => {
    const next: any = {
      handle() {
        return of(true)
      }
    };
    const requestMock = new HttpRequest(
      'POST',
      `${baseURL}/verify/status/otp`,
      {
        params: {
          userName: 'test@email.com',
        },
        context: skipAccessToken()
      }
    );

    const contextSpy = spyOn(requestMock.context, 'get').and.returnValue(true);

    interceptor.intercept(requestMock, next).subscribe(_ => {
      expect(contextSpy).toHaveBeenCalled();
    })
    tick(5000);
  }));


  it('should do normal request and return error', () => {
    const next: any = {
      handle() {
        return of(true)
      }
    };
    const requestMock = new HttpRequest(
      'POST',
      `${baseURL}/verify/status/otp`,
      {
        params: {
          userName: 'test@email.com',
        },
      }
    );
    const tokenSpy = spyOn(tokenService,'refreshToken');
    next.handle = () => throwError(() => new HttpErrorResponse({
      status: 401,
      error: {
        message() {
          return 'Token expired'
        }
      }

    }))

    interceptor.intercept(requestMock, next).subscribe(
      () => {},
      () => {
        expect(tokenSpy).toHaveBeenCalled();
      }
    )
  });

  it('should do normal request and return timer', () => {
    const next: any = {
      handle() {
        return of(true)
      }
    };
    const requestMock = new HttpRequest(
      'POST',
      `${baseURL}/verify/status/otp`,
      {
        params: {
          userName: 'test@email.com',
        },
      }
    );
    const tokenSpy = spyOn(tokenService,'refreshToken');
    next.handle = () => throwError(() => new HttpErrorResponse({
      status: 500,
      error: {
        message() {
          return 'Token expired'
        }
      }

    }))

    interceptor.intercept(requestMock, next).subscribe(
      () => {},
      () => {
        expect(tokenSpy).not.toHaveBeenCalled();
      }
    )
  });

  it('Test on shouldRetryRequest method', (done) => {
    let response: HttpResponse<any> = new HttpResponse({
      body: {},
      headers: undefined,
      status: 200,
      url: 'http://localhost',
      statusText: 'Everything is good',
    })

    let res = shouldRetryRequest(response)

    expect(res).toBeTruthy();

    response = new HttpResponse({
      body: {},
      headers: undefined,
      status: 500,
      url: 'http://localhost/validate-otp',
      statusText: 'Everything is wrong',
    })

    res = shouldRetryRequest(response)

    expect(res).toBeTruthy();

    response = new HttpResponse({
      body: {},
      headers: undefined,
      status: 500,
      // type: HttpEventType.Response,
      url: 'http://localhost',
      statusText: 'Everything is wrong',
    })

    res = shouldRetryRequest(response)

    res.subscribe(
      _ => {},
      error => {
        expect(error).toEqual({ code: 'default', message: 'default', status: 500 });
        done();
      }
    )

  })

  it('Should call checkErrorStatusCode', () => {
    // Arrange

    // Act
    interceptor.checkErrorStatusCode('test')();

    // Assert

    expect(loadingDataService.isLoading).toBeFalse();
    // Act
    interceptor.checkErrorStatusCode()();

    // Assert

    expect(loadingDataService.isLoading).toBeFalse();
  })

  it('Should call checkError', () => {
    // Arrange
    let error: InterceptorErrorObj = {
      code: '',
      message: 'Error loading',
      status: 400
    }
    const checkErrorStatusSpy = spyOn(interceptor, 'checkErrorStatusCode').and.callThrough();
    const refreshSpy = spyOn(tokenService, 'refreshToken');

    try {
      // Act
      interceptor.checkError(error);

    } catch (error) {
      // Assert
      expect(checkErrorStatusSpy).toHaveBeenCalled();
    }


    // Arrange
    error = {
      code: '',
      message: 'Error loading',
      status: 401
    }

    try {
      // Act
      interceptor.checkError(error);

    } catch (error) {
      expect(refreshSpy).toHaveBeenCalled();
    }

  })
});