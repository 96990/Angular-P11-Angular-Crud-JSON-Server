import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
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

@Component({
  selector: 'app-product-list',
  imports: [CommonModule, FormsModule, TableModule, NgFor, BadgeModule, ToastModule, ButtonModule, MultiSelectModule],
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
      { field: 'price', header: 'price' },
      { field: 'discountPercentage', header: 'DiscountPercentage' },
      { field: 'rating', header: 'Rating' },
      { field: 'stock', header: 'Stock' },
      { field: 'tags', header: 'Tags' },
      { field: 'brand', header: 'Brand' },
      { field: 'sku', header: 'SKU' },
      { field: 'weight', header: 'Weight' },
      { field: 'dimensions', header: 'Dimensions' },
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
      { field: 'price', header: 'price' },
    ];
  //   this.productService.getProductsList().subscribe({
  //     next: (data) => {
  //       this.products$ = data;
  //       this.productService.productsCount = data[data.length-1]?.id;
  //       console.log("length",data.length, this.productService.productsCount);
  //       this.messageService.add({ severity: 'success', summary: 'Loaded', detail: 'Products loaded successfully!' });
  //     },
  //     error: (error) => console.log(error),
  //  })
    this.store.dispatch(loadProducts());
    this.products$ = this.store.select(selectAllProducts);

  }

  showDetails(id: number) {
    this.router.navigate(['/details',id]);
  }

  onDeleteProduct(id: number) {
    // this.router.navigate(['/details',id]);
    if(confirm('Do you want to delete this product?')){
      this.store.dispatch(deleteProduct({ productId: id}));
    }
  }

  editProduct(product: Product) {
    this.router.navigate(['/create'],{queryParams: {product: JSON.stringify(product)}});
  }
}
