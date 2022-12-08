import { HttpResponse } from "@angular/common/http";
import { Observable, of, throwError } from "rxjs";

interface Retry {
  count: number;
  delay: number;
}

export const attempsConfig: Retry = {
  count: 2,
  delay: 3000
};

export interface InterceptorErrorObj {
  code: string;
  message: string;
  status: number;
}

export const skipUrlsError = [
  'validate-otp',
  'register',
  'login'
]

export const shouldRetryRequest = (response: any): Observable<any> => {

  if (
    response instanceof HttpResponse && (
      response.status >= 500 ||
      (response.body && response?.body.status >= 500)
    )
  ) {
    let errorObj: InterceptorErrorObj = {
      code: 'default',
      message: 'default',
      status: response.status
    }

    if(response.body?.responseCode){
      const body = response.body;
      errorObj = {
        code:  body.responseCode,
        message:  body.responseMessage,
        status:  body.status,
      }
    }

    if (response.url && skipUrlsError.some(url => response.url!.includes(url)))
      return of(response);
    return throwError(errorObj);
  }
  return of(response);
}