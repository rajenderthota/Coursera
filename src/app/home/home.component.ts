import { Component, OnInit } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { Promotion } from '../shared/promotion';
import { PromotionService } from '../services/promotion.service';
import { LeaderService } from '../services/leader.service';
import { Leader } from '../shared/leader';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  dish: Dish | undefined;
  promotion: Promotion | undefined;
  featureLeader : Leader | undefined;

  constructor(private dishservice: DishService,
    private promotionservice: PromotionService,
    private leaderService:LeaderService) { }

  ngOnInit() {
    // this.dish = this.dishservice.getFeaturedDish();
    // this.promotion = this.promotionservice.getFeaturedPromotion();
    // this.featureLeader=this.leaderService.getFeaturedLeader();

    this.dishservice.getFeaturedDish().then(dish=>this.dish=dish);
    this.promotionservice.getFeaturedPromotion().then(promotion => this.promotion=promotion);
    this.leaderService.getFeaturedLeader().then(featureLeader => this.featureLeader=featureLeader);



  }

}
