import { Injectable } from '@angular/core';
import { Promotion } from '../shared/promotion';
import { PROMOTIONS } from '../shared/promotions';


import { of,firstValueFrom,Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { first } from 'rxjs/internal/operators/first';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor(private http: HttpClient) { }

  getPromotions(): Observable<Promotion[]> {
    // return Promise.resolve(PROMOTIONS);
    // return new Promise(resolve=>{
    //   setTimeout(()=>{
    //     resolve(PROMOTIONS);
    //   },2000);
    // });

    // return of(PROMOTIONS).pipe(delay(2000));

    return this.http.get<Promotion[]>(baseURL + "promotions");

  }

  getPromotion(id: string): Observable<Promotion> {
    // return Promise.resolve(PROMOTIONS.filter((promo) => (promo.id === id))[0]);

    // return new Promise(resolve =>{
    //   setTimeout(() => {
    //     resolve(PROMOTIONS.filter((promo) => (promo.id === id))[0]);
    //   }, 2000);
    // });

    // return of(PROMOTIONS.filter((promo) => (promo.id === id))[0]).pipe(delay(2000));

    return this.http.get<Promotion>(baseURL + 'promotions/' + id);
  }

  getFeaturedPromotion(): Observable<Promotion> {
    // return Promise.resolve(PROMOTIONS.filter((promotion) => promotion.featured)[0]);
    // return new Promise(resolve =>{
    //   setTimeout(() => {
    //     resolve(PROMOTIONS.filter((promotion) => promotion.featured)[0]);
    //   }, 2000);
    // });

    // return of(PROMOTIONS.filter((promotion) => promotion.featured)[0]).pipe(delay(2000));

    return this.http.get<Promotion[]>(baseURL + 'leaders?featured=true').pipe(map(promotions => promotions[0]));

  }
}
