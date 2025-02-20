import { ChangeDetectorRef, Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { catchError, map, Observable, of, switchMap, tap } from 'rxjs';
import { ProductService } from '../product.service';
import { Product } from '../product.model';
import { AsyncPipe, NgIf } from '@angular/common';
import { CardModule } from 'primeng/card';
import { BadgeModule } from 'primeng/badge';
import { ChipModule } from 'primeng/chip';
import { DividerModule } from 'primeng/divider';


@Component({
  selector: 'app-product-details',
  imports: [AsyncPipe, NgIf, CardModule, BadgeModule, ChipModule, DividerModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent {

  product$!:Observable<Product | null>;
  private route = inject(ActivatedRoute);
  private productService= inject(ProductService);
  product= signal<Product | null>(null);
  ngOnInit() {
    this.product$ = this.route.paramMap.pipe(
      map(params => Number(params.get('id') || NaN)),
      switchMap(productId => {
          if(isNaN(productId)){
              return of(null)
           }else {
              return this.productService.getProductDetails(productId).pipe(
                tap(data=> this.product.set(data))
              )
           }
        }
      ),
      catchError(() => of(null))
    );


  }

}
