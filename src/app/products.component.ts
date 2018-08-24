import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { ProductsService } from "./products.service";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html'
})
export class ProductsComponent implements OnInit, OnDestroy {
    productName = "A book";
    isDisabled = true;
    products = [];
    private productsSubscription: Subscription;

    constructor(private productsService: ProductsService) {

      setTimeout(() => {
          //this.productName = "A tree";
          this.isDisabled = false;

      }, 2000)
    }

    ngOnInit() {
        this.products = this.productsService.getProducts();
        this.productsSubscription = this.productsService.productsUpdated.subscribe( () => {
            this.products = this.productsService.getProducts();
        });
    }

    ngOnDestroy() {
        this.productsSubscription.unsubscribe();
    }
    onAddProduct(form) {
      // console.log(form)
        if(form.valid) {
            //this.products.push(form.value.productName);
            this.productsService.addProduct(form.value.productName);
        }
    }

    onRemoveProduct(productName: string) {
      this.products = this.products.filter( p => p !==productName);
    }
}