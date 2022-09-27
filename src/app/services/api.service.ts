 /*************************************************************************
 * 
 * EQUATIONS WORK CONFIDENTIAL
 * __________________
 * 
 *  [2018] - [2020] Equations Work IT Services Private Limited, India
 *  All Rights Reserved.
 * 
 * NOTICE:  All information contained herein is, and remains
 * the property of Equations Work IT Services Private Limited and its suppliers,
 * if any.  The intellectual and technical concepts contained
 * herein are proprietary to Equations Work IT Services Private Limited
 * and may be covered by U.S. and Foreign Patents,
 * patents in process, and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Equations Work IT Services Private Limited.
*
 * Copyright (C) Equations Work IT Services Pvt. Ltd.
 * NOTE: Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Owned and written by the proprietors of Equations Work IT Private Limited, India, August 2018
 */
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams,HttpRequest,HttpEvent, HttpErrorResponse} from '@angular/common/http';
import { Observable, throwError } from '../../../node_modules/rxjs';
import { catchError } from '../../../node_modules/rxjs/operators';
// import { HttpResponse } from '../../../node_modules/@types/selenium-webdriver/http';
import { HttpResponse } from 'selenium-webdriver/networkinterceptor';
import { Http, Headers, Response, ResponseContentType } from '@angular/http';
import { RequestOptions, Request, RequestMethod } from '@angular/http';
import { Router } from '@angular/router'; 
import { Location } from '@angular/common';
//import { Subject } from 'rxjs/Subject';
// var Subject = require('rxjs/Subject');
import { Subject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class ApiService {
 
  token: any;
  apiUrl = '/assets/test.json';
   //  apiBaseUrl ='http://192.168.0.177:3000/' ; 
  //  apiBaseUrl ='https://alpha-dev.experizer.com/api/' ; 
  apiBaseUrl ='https://alpha-dev.experizer.com/api/'; 
    
//  apiBaseUrl = 'https://betaapi.experizer.com:444/';
 
//  experienceBaseURL: string ='https://beta.experizer.com/act/';
 experienceBaseURL: string ='https://alpha-dev.experizer.com/act/';
  planExpiryFlag: boolean = false;
  isCustomizationEnd: boolean = false;
  
  helpText: string = "This guide is mouse pointer sensitive. Point at a page item to view its help.";
  helpFlag:boolean = false;
 
  helpTextChange: Subject<string> = new Subject<string>();
  helpFlagChange: Subject<boolean> = new Subject<boolean>();

   constructor(private  http:  HttpClient, private _http: Http, public router: Router, public location: Location) {

   }

   httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'x-access-token': ''
    })
  };

  logoutURL:any;

  setApiUrl(url:any) {
    this.apiUrl = url;
  }

  setHelpFlag(flagValue :any){
    this.helpFlagChange.next(flagValue);
  }

  setHelpText(textValue:any){
    this.helpTextChange.next(textValue);
  }

  getHelpFlagValue(){
    return this.helpFlag;
  }

  getHelpTextValue(){
    return this.helpText;
  }

  setLogoutUrl(logoutUrl:any) {
    this.logoutURL = logoutUrl;
  }

  getLogoutUrl() {
    return this.logoutURL;
  }

  getApiUrl() {
    return this.apiUrl;
  }

  getExperienceBaseUrl() {
    return this.experienceBaseURL;
  }

  setToken(tokenString:any) {
    this.httpOptions.headers = this.httpOptions.headers.set('x-access-token', tokenString);
    this.token = tokenString;
  }

  getData(url:any): Observable<HttpResponse> {
    return this.http.get( this.apiBaseUrl+url, this.httpOptions)
    .pipe(
          (data:any) =>  data,
          catchError(this.handleError)
          // error => error
        );
  }

  postData(url:any, data:any): Observable<HttpResponse> {
    /*const httpOptionsPostData = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'x-access-token': token
      })
    };*/
    return this.http.post(this.apiBaseUrl+url, data, this.httpOptions).pipe(
      (respdata:any) => respdata,
      catchError(this.handleError)
      // error => error
    );
  }

  putData(url:any, data:any): Observable<HttpResponse> {
    return this.http.put(this.apiBaseUrl+url, data, this.httpOptions).pipe(
      (respdata:any) => respdata,
      catchError(this.handleError)
      // error => error
    );
  }

  deleteData(url:any): Observable<HttpResponse> {
    return this.http.delete(this.apiBaseUrl+url, this.httpOptions).pipe(
      (respdata:any) => respdata,
      catchError(this.handleError)
      // error => error
    );
  }
  
  deleteMultipleData(url:any, data:any): Observable<HttpResponse> {
    if (!data) {
      data = '';
    }
    const options = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'x-access-token': this.token,
      }),
      body: data
    };
    return this.http.delete(this.apiBaseUrl + url, options).pipe(
      (respdata:any) => respdata,
      catchError(this.handleError)
      // error => error
    );
  }
  downloadFile(url:any): Observable<HttpResponse> {
    return this.http.get(url, {responseType: 'blob' })
    .pipe(
          (data:any) =>  data,
          catchError(this.handleError)
          // error => error
        );
  }

  uploadFile(url: string ,formData:any): Observable<HttpEvent<any>> {
    let URL = this.apiBaseUrl + url;
    let params = new HttpParams();
    const options = {
      headers: new HttpHeaders({
        'x-access-token': this.token,
      }),
      params: params,
      reportProgress: true,
    };
    const req = new HttpRequest('POST', URL, formData, options);
    return this.http.request(req);
  }

  uploadFilePut(url: string ,formData:any): Observable<HttpEvent<any>> {
    let URL = this.apiBaseUrl + url;
    let params = new HttpParams();
    const options = {
      headers: new HttpHeaders({
        'x-access-token': this.token,
      }),
      params: params,
      reportProgress: true,
    };
    const req = new HttpRequest('PUT', URL, formData, options);
    return this.http.request(req);
  }

  post(data:any,url:any): Observable<Response> {
    
    let headers = new Headers().set('Content-Type', 'application/json; charset=utf-8');
    const options = new RequestOptions({
      body: headers,
    });
    return this._http.post(this.apiBaseUrl+url, data, options);
  }


  public handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      if (error.status === 401) {
        window.sessionStorage.clear();
        window.localStorage.clear();
        localStorage.clear();
        if(!window.location.href.includes('login') && window.location.href.split('#').length>1)
          window.location.reload();
      }
    }
    // return an observable with a user-facing error message
    return throwError(error);//throwError('Something bad happened; please try again later.');
  }
}
