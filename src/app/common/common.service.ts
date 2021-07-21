import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export abstract class CommonService {

  constructor(protected http: HttpClient) { }

  protected URL = 'http://localhost:9000'; // Web APIのURL
  protected httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

}
