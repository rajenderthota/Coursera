import { Injectable } from '@angular/core';
import { resolve } from 'dns';
import {Leader, LEADERS} from '../shared/leader';

import { of,firstValueFrom,Observable } from 'rxjs';
import { delay } from 'rxjs/operators';

import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';


@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor(private http: HttpClient) { }


  getLeaders(): Observable<Leader[]> {
    // return Promise.resolve(LEADERS);

    // return new Promise(resolve =>{
    //   setTimeout(() => {
    //     resolve(LEADERS);
    //   }, 2000);
    // });


    // return of(LEADERS).pipe(delay(2000));
    return this.http.get<Leader[]>(baseURL + 'leaders');

  }

  getLeader(id: string): Observable<Leader> {
    // return Promise.resolve(LEADERS.filter((leader) => (leader.id === id))[0]);

    // return new Promise(resolve =>{
    //   setTimeout(() => {
    //     resolve(LEADERS.filter((leader) => (leader.id === id))[0]);
    //   }, 2000);
    // });

    return this.http.get<Leader>(baseURL + 'leaders/' + id);
  }

  getFeaturedLeader(): Observable<Leader> {
    // return Promise.resolve(LEADERS.filter((leader) => leader.featured)[0]);

    // return new Promise(resolve =>{
    //   setTimeout(() => {
    //     resolve(LEADERS.filter((leader) => leader.featured)[0]);
    //   }, 2000);
    // });

    // return of(LEADERS.filter((leader) => leader.featured)[0]).pipe(delay(2000));
    return this.http.get<Leader[]>(baseURL + 'leaders?featured=true').pipe(map(dishes => dishes[0]));
  }

}
