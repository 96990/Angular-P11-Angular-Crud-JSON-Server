import { Component, inject } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ProductService } from '../product.service';
import { NgFor } from '@angular/common';
import { Column, Product } from '../product.model';
import { BadgeModule } from 'primeng/badge';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { MultiSelectModule } from 'primeng/multiselect';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectAllProducts } from '../store/product.selectors';
import { deleteProduct, loadProducts } from '../store/product.actions';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { CardModule } from 'primeng/card';
@Component({
  selector: 'app-product-list',
  imports: [CommonModule, FormsModule, TableModule, NgIf, BadgeModule, ToastModule, ButtonModule, MultiSelectModule, IconFieldModule, InputIconModule, CardModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {
  private productService = inject(ProductService);
  private messageService = inject(MessageService);
  private store = inject(Store);
  private router = inject(Router);
  cols!: Column[];
  products$!: Observable<Product[]>;
  selectedColumns!: Column[];

  ngOnInit() {
    this.cols = [
      { field: 'id', header: 'ID' },
      { field: 'title', header: 'Title' },
      { field: 'category', header: 'Category' },
      { field: 'brand', header: 'Brand' },
      { field: 'price', header: 'price' },
      { field: 'stock', header: 'Stock' },
      { field: 'discountPercentage', header: 'DiscountPercentage' },
      { field: 'rating', header: 'Rating' },
      { field: 'tags', header: 'Tags' },
      { field: 'sku', header: 'SKU' },
      { field: 'weight', header: 'Weight' },
      { field: 'warrantyInformation', header: 'WarrantyInformation' },
      { field: 'shippingInformation', header: 'ShippingInformation' },
      { field: 'availabilityStatus', header: 'AvailabilityStatus' },
      { field: 'returnPolicy', header: 'ReturnPolicy' },
      { field: 'minimumOrderQuantity', header: 'MinimumOrderQuantity' },
    ];
    this.selectedColumns = [
      { field: 'id', header: 'ID' },
      { field: 'title', header: 'Title' },
      { field: 'category', header: 'Category' },
      { field: 'brand', header: 'brand' },
      { field: 'stock', header: 'Stock' },
      { field: 'price', header: 'price' },
    ];
    this.store.dispatch(loadProducts());
    this.products$ = this.store.select(selectAllProducts);

  }

  showDetails(id: number) {
    this.router.navigate(['/details',id]);
  }

  onDeleteProduct(id: number) {
    if(confirm('Do you want to delete this product?')){
      this.store.dispatch(deleteProduct({ productId: id}));
    }
  }

  editProduct(product: Product) {
    this.router.navigate(['/create'],{queryParams: {product: JSON.stringify(product)}});
  }

  navigate(){
    this.router.navigate(['/home'])
  }
}
