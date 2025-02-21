import { HttpClient } from "@angular/common/http";
import { inject, Injectable, Signal, signal } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, map, Observable, of, shareReplay, tap } from "rxjs";
import { Product } from "./product.model";
import { MessageService } from 'primeng/api';

@Injectable({
    providedIn: 'root'
})
export class ProductService{
    id = signal(0);
    productsCount: number = 30;
    API_URL = "http://localhost:3000/products";
    private http = inject(HttpClient);

    getProductDetails(id: number): Observable<Product>{
            return this.http.get<Product>(`${this.API_URL}/${id}`);
    }
    getProductsList(): Observable<Product[]>{
        return this.http.get<Product[]>(`${this.API_URL}`).pipe(
            tap((data) => {
                this.productsCount = data[data.length-1]?.id;
            })
        );
    }
    createProduct(productData: Product): Observable<Product>{
        return this.http.post<Product>(this.API_URL, productData);
    }

    updateProduct(product: Product,id: number): Observable<Product>{
        return this.http.put<Product>(`${this.API_URL}/${id}`,product);
    }

    deleteProduct(id: number): Observable<void>{
        return this.http.delete<void>(`${this.API_URL}/${id}`,);
    }
}