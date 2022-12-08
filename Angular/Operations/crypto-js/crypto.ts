import * as CryptoJS from "crypto-js";
import { environment } from "src/environments/environment";

function decodeURI(uri: string): string {
  return decodeURIComponent(uri);
}

function decryptData(data: string) {
  const bytes = CryptoJS.AES.decrypt(data, environment.secretKey);
  const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  return decryptedData;
}

export function decryptURLData(url: string) {
  const data = decodeURI(url);
  return decryptData(data);
}