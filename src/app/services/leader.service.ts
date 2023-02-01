import { Injectable } from '@angular/core';
import { resolve } from 'dns';
import {Leader, LEADERS} from '../shared/leader';

import { of,firstValueFrom } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor() { }


  getLeaders(): Promise<Leader[]> {
    // return Promise.resolve(LEADERS);

    // return new Promise(resolve =>{
    //   setTimeout(() => {
    //     resolve(LEADERS);
    //   }, 2000);
    // });


    return firstValueFrom(of(LEADERS).pipe(delay(2000)));
  }

  getLeader(id: string): Promise<Leader> {
    // return Promise.resolve(LEADERS.filter((leader) => (leader.id === id))[0]);

    // return new Promise(resolve =>{
    //   setTimeout(() => {
    //     resolve(LEADERS.filter((leader) => (leader.id === id))[0]);
    //   }, 2000);
    // });

    return firstValueFrom(of(LEADERS.filter((leader) => (leader.id === id))[0]).pipe(delay(2000)));
  }

  getFeaturedLeader(): Promise<Leader> {
    // return Promise.resolve(LEADERS.filter((leader) => leader.featured)[0]);

    // return new Promise(resolve =>{
    //   setTimeout(() => {
    //     resolve(LEADERS.filter((leader) => leader.featured)[0]);
    //   }, 2000);
    // });

    return firstValueFrom(of(LEADERS.filter((leader) => leader.featured)[0]).pipe(delay(2000)));
  }

}
