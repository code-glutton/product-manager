import { Component, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { ProductService } from "./product.service";
import { IProduct } from "./products";

@Component({
    templateUrl:'./product-list.component.html',
    styleUrls:['./product-list.component.css']
})
export class ProductListComponent implements OnInit{

  constructor(private productService : ProductService){}

    sub!: Subscription;
    errorMessage: string = '';
    pageTitle: string = 'Product List';
    imageWidth: number = 50;
    private _listFilter: string = '';
    
    get listFilter(): string{
      return this._listFilter;
    }

    set listFilter(value:string){
      this._listFilter = value;
      console.log("setter"+value);
      this.filteredProducts = this.performFilter(value);
    }
    imageMargin: number = 2;
    showImage: boolean = false;
    filteredProducts : IProduct[] = [];
    products: IProduct[] = [];
      toggleImage(): void {
          this.showImage = !this.showImage
      }

      performFilter(filterBy: string): IProduct[]{
          filterBy = filterBy.toLocaleLowerCase();
          return this.products.filter((product: IProduct) => product.productName.toLocaleLowerCase().includes(filterBy));
      }

      onRatingClicked(message: string): void {
        this.pageTitle = "Product List: " + message;
      }

      ngOnInit(): void{
        this.sub = this.productService.getProducts().subscribe({
          next: products => {
            this.products = products;
            this.filteredProducts = this.products;
          },
          error : err => this.errorMessage = err
        });
        
      }

      ngOnDestroy(): void{
        this.sub.unsubscribe();
      }
}