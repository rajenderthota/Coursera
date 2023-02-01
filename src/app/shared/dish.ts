import { Comment } from './comment';
export class Dish {
  // id: string;
  // name: string;
  // image: string;
  // category: string;
  // featured: boolean;
  // label: string;
  // price: string;
  // description: string;

  // private comments: Comment[] = [];

  constructor(public id:string,
    public name:string,
    public image:string,
    public category:string,
    public featured:boolean,
    public label:string,
    public price:string,
    public description:string,
    public comments:Comment[]
    ){

  }
}
