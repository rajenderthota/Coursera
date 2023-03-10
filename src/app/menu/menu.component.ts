import { Component, Inject, OnInit } from '@angular/core';
import { Dish } from '../shared/dish';
import { DISHES } from '../shared/dishes';
import { DishService } from '../services/dish.service';




@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit{

  dishes : Dish[] | undefined;
  selectedDish = DISHES[0];

  constructor(private dishService: DishService,
    @Inject('BaseURL') public baseURL:string) { }

  ngOnInit() {
    // this.dishes = this.dishService.getDishes();
    // this.dishService.getDishes().then(dishes =>this.dishes=dishes);

    this.dishService.getDishes().subscribe(dishes =>this.dishes=dishes);
  }

  onSelect(dish: Dish) {
    this.selectedDish = dish;
  }

}
