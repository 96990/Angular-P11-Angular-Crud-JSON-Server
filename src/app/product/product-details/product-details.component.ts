import { Component, ElementRef, inject, OnDestroy, OnInit, signal, viewChild } from '@angular/core';
import { NgIf } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Subscription, switchMap, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { CardModule } from 'primeng/card';
import { BadgeModule } from 'primeng/badge';
import { ChipModule } from 'primeng/chip';
import { DividerModule } from 'primeng/divider';
import { ButtonModule } from 'primeng/button';
import * as ProductActions from '../store/product.actions';
import { selectSelectedProduct } from '../store/product.selectors';
import { Product } from '../product.model';
import { ProductService } from '../product.service';  
@Component({
  selector: 'app-product-details',
  imports: [NgIf, CardModule, BadgeModule, ChipModule, DividerModule, ButtonModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})

export class ProductDetailsComponent implements OnInit, OnDestroy{
  private route = inject(ActivatedRoute);
  private productService= inject(ProductService);
  private subscriptions = new Subscription();
  private store = inject(Store);
  private router = inject(Router);
  product= signal<Product | null>(null);

  ngOnInit() {
    this.subscriptions.add(
      this.route.paramMap.pipe(
        map(params => Number(params.get('id'))),
        tap(id => {console.log("idd",id); return this.store.dispatch(ProductActions.loadProductDetails({ productId: id}))}),
        switchMap(id => this.store.select(selectSelectedProduct)),
      ).subscribe(product => this.product.set(product))
    );
  }

  navigate(){
    this.router.navigate(['info'], {relativeTo: this.route});
  }
  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

}
