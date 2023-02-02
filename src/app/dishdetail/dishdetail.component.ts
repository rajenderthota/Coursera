import { Component, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DishService } from '../services/dish.service';
import { Dish } from '../shared/dish';
import { Comment } from '../shared/comment';
import { Params } from '@angular/router';
import { Location } from '@angular/common';
import { switchMap } from 'rxjs/operators';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent  implements OnInit {
  @Input()
  dish: Dish | undefined;
  comment:Comment |undefined;
  dishIds!: string[];
  prev!: string;
  next!: string;
  rating: FormControl = new FormControl();

     // public rating: number,
    // public comment: string,
    // public author: string,
    // public date: string


   commentForm!: FormGroup;
   @ViewChild('fform') commentFormDirective: any;

   formErrors:any = {
    author: '',
    rating: '',
    comment: ''
  };

  validationMessages:any = {
    'author': {
      'required':      'Author Name is required.'
    },
    'rating': {
      'required':      'Rating is required.'
    },
    'comment': {
      'required':      'comment is required.'
    }
  };

  formatLabel(value: number): string {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }

    return `${value}`;
  }

  constructor(private dishservice: DishService,
    private route: ActivatedRoute,
    private location: Location,
    private fb: FormBuilder,
    @Inject('BaseURL') public baseURL:string) {
      this.createForm();
    }

  ngOnInit() {
    const id = +this.route.snapshot.params['id']+"";
    // this.dish = this.dishservice.getDish(id);

    // this.dishservice.getDish(id).then(dish=> this.dish=dish);

    this.dishservice.getDish(id).subscribe(dish=> this.dish=dish);

    this.dishservice.getDishIds().subscribe(dishIds => this.dishIds = dishIds);
    this.route.params.pipe(switchMap((params: Params) => this.dishservice.getDish(params['id'])))
    .subscribe(dish => { this.dish = dish; this.setPrevNext(dish.id); });

    this.rating.setValue(5);
  }

  setPrevNext(dishId: string) {

    console.log(this.dishIds);
    const index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
  }

  goBack(): void {
    this.location.back();
    }



    createForm() {
      this.commentForm = this.fb.group({
        author: [null, Validators.required ],
        rating: [null, Validators.required ],
        comment: [null, Validators.required ]
      });

      this.commentForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged(); // (re)set validation messages now
    }

    onValueChanged(data?: any) {
      if (!this.commentForm) { return; }
      const form = this.commentForm;
      for (const field in this.formErrors) {
        if (this.formErrors.hasOwnProperty(field)) {
          // clear previous error message (if any)
          this.formErrors[field] = '';
          const control = form.get(field);
          if (control && control.dirty && !control.valid) {
            const messages = this.validationMessages[field];
            for (const key in control.errors) {
              if (control.errors.hasOwnProperty(key)) {
                this.formErrors[field] += messages[key] + ' ';
              }
            }
          }
        }
      }

    }

    onSubmit() {
      this.comment = this.commentForm.value;
      const d = new Date();
      let date = d.toISOString();
      this.comment!.date=date;
      this.dish?.comments.push(this.commentForm.value);
      console.log(this.commentForm);
      this.commentForm.reset({
        author: 'sadsaf',
        rating: 5,
        comment: ''
      });
      this.commentFormDirective.resetForm();
      this.rating.setValue(5);
    }

}
