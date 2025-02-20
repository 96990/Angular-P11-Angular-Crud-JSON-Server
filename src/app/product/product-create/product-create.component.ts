import { NgFor, NgIf, CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { availabilityStatus, Product } from '../product.model';
import { ProductService } from '../product.service';
import { SelectModule } from 'primeng/select';
import { InputNumberModule } from 'primeng/inputnumber';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, map, Observable, of, switchMap } from 'rxjs';
import { ButtonModule } from 'primeng/button';
import { Store } from '@ngrx/store';
import { addProduct, updateProduct } from '../store/product.actions';

@Component({
  selector: 'app-product-create',
  imports: [ReactiveFormsModule,CommonModule, NgIf, ToastModule, SelectModule, InputNumberModule, ButtonModule],
  templateUrl: './product-create.component.html',
  styleUrl: './product-create.component.css',
})
export class ProductCreateComponent {
    
  product$!: Observable<Object>;
  isEditMode = false;
  message!: string;
  productId!: string;
  private fb = inject(FormBuilder);
  private store = inject(Store);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private messageService = inject(MessageService);
  private productService = inject(ProductService);

  productForm: FormGroup = this.fb.group({
    id: [null],
    title: ['', Validators.required],
    category: ['', Validators.required],
    description: ['', Validators.required],
    price: [0, [Validators.required, Validators.min(1)]],
    discountPercentage: [0, [Validators.min(0), Validators.max(100)]],
    rating: [0, [Validators.min(0), Validators.max(5)]],
    stock: [1, [Validators.required, Validators.min(1)]],
    tags: [''],
    brand: [''],
    sku: [''],
    weight: [0, Validators.min(0)],
    warrantyInformation: [''],
    shippingInformation: [''],
    availabilityStatus: ['', Validators.required],
    returnPolicy: [''],
    minimumOrderQuantity: [1, [Validators.required, Validators.min(1)]]
  });

  availabilityOptions: availabilityStatus[] = [
    { label: 'In Stock', value: 'INSTOCK' },
    { label: 'Out of Stock', value: 'OUTOFSTOCK' },
    { label: 'Low Stock', value: 'LOWSTOCK' }
  ];

  ngOnInit() {
    let id = this.productService.productsCount?  Number(this.productService.productsCount) + 1: 1
    console.log("outside",this.productId, this.productService.productsCount);
    this.route.queryParamMap.pipe().subscribe(params =>{
        const productString = params.get('product');
        if(productString){
          try{
            const product = JSON.parse(productString);
            this.productForm.patchValue(product);
            this.isEditMode = true;
            id = product.id;
          }catch(error){
            console.error("error parsing product data",error);
          }
        }
      }
    )
    this.productId = id.toString();
    console.log("aflter",this.productId,);
  }

  onSubmit() {
    if (this.productForm.invalid) return;
    this.productForm.patchValue({id: this.productId})
    const productData = this.productForm.value as Product;
    if(!this.isEditMode){
      this.store.dispatch(addProduct({product: productData}));
    }else {
      this.store.dispatch(updateProduct({product: productData}))
    }
    this.isEditMode = false;
  }


}
