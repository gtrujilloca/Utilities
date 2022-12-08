import { HttpContext, HttpContextToken } from '@angular/common/http';

export const NO_ACCESS_TOKEN = new HttpContextToken<boolean>(() => false );

export const skipAccessToken = () => {
  return new HttpContext().set(NO_ACCESS_TOKEN, true);
}