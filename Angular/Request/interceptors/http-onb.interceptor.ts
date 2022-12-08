import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';

import { catchError, mergeMap, Observable, ObservableInput, retry } from 'rxjs';
import { CookieKeys } from '../services/localStorage/localStorageTypes';
import { CookieService } from 'ngx-cookie-service';
import { TokenService } from '../services/token/token.service';
import { NO_ACCESS_TOKEN } from '../http-context/http.context';
import { LoadingDataService } from '../services/loadingData/loading-data.service';
import { attempsConfig, InterceptorErrorObj, shouldRetryRequest } from './interceptor.config';

@Injectable()
export class HttpOnbInterceptor implements HttpInterceptor {

  errorStatusCodes: any = {
    'default': () => {
      this.loadingDataService.showErrorConnection = true;
    }
  }

  constructor(
    private readonly cookieService: CookieService,
    private readonly tokenService: TokenService,
    private readonly loadingDataService:LoadingDataService
  ) {}


  checkErrorStatusCode = (code:string = 'default') => {
    return this.errorStatusCodes[code] || this.errorStatusCodes['default'];
  }


  checkError(error: InterceptorErrorObj): ObservableInput<any> {
    this.loadingDataService.isLoading = false;
    error.status !== 401 && this.checkErrorStatusCode(error.code)();
    if (error.status === 401)
      this.tokenService.refreshToken();
    throw new Error(error.message);
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    if(request.context.get(NO_ACCESS_TOKEN)) {
      return next.handle(request)
        .pipe(
          mergeMap(shouldRetryRequest),
          retry(attempsConfig),
          catchError(err => this.checkError(err))
        );
    }

    const req = this.cookieService.check(CookieKeys.TOKEN)
      ? request.clone({
          setHeaders: {
            "Authorization": `${ this.cookieService.get(CookieKeys.TOKEN) }`
          }
        })
      : request;


    return next.handle(req)
      .pipe(
        mergeMap(shouldRetryRequest),
        retry(attempsConfig),
        catchError(err => this.checkError(err))
      );
  }
}
