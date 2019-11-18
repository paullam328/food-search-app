import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private _http:HttpClient) { 

  }

  //The services for REST API:
  setKeyword(keyword): Observable<any> {
    let token = localStorage.getItem('token') ? localStorage.getItem('token') : 'abcd';
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token,
      })
    };
    let jsonData = {'keyword': keyword};
    return this._http.post("http://localhost:3000/post", jsonData, httpOptions);
  }

  getKeywords(): Observable<any> {
    let token = localStorage.getItem('token') ? localStorage.getItem('token') : 'abcd';
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token,
      })
    };
    return this._http.get("http://localhost:3000/get", httpOptions);
  }

  deleteKeyword(keyword): Observable<any> {
    let token = localStorage.getItem('token') ? localStorage.getItem('token') : 'abcd';
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token,
      }),
      body: {
        'keyword': keyword
      }
    };
    return this._http.delete("http://localhost:3000/delete", httpOptions);
  }

  putKeyword(ChangeFromKeyword, ChangeToKeyword): Observable<any> {
    let token = localStorage.getItem('token') ? localStorage.getItem('token') : 'abcd';
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token,
      })
    };
    let jsonData = {
      'ChangeFromKeyword': ChangeFromKeyword,
      'ChangeToKeyword': ChangeToKeyword
    };
    return this._http.put("http://localhost:3000/put", jsonData , httpOptions);
  }
}
