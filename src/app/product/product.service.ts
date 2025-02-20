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
    productsCount: number = 0;
    API_URL = "http://localhost:3000/products";
    error =  signal([]);
    private cache: {[id: string]: Observable<Product  | null>} = {}
    private http = inject(HttpClient);
    private messageService = inject(MessageService);

    getProductDetails(id: number){
            return this.http.get<Product>(`${this.API_URL}/${id}`,).pipe(
                catchError((err) => {
                    this.error.set(err);
                    console.log(err);
                    return of(null);
                })
            );
    }
    getProductsList(){
        return this.http.get<Product[]>(`${this.API_URL}`).pipe(
            catchError((err) => {
                this.error.set(err);
                console.log(err);
                return of([]);
            })
        );
    }
    createProduct(productData: Product){
        return this.http.post(this.API_URL, productData).pipe(

        );
    }
    updateProduct(product: Product,id: number){
        return this.http.put(`${this.API_URL}/${id}`,product).pipe(
            catchError((err) => {
                this.error.set(err);
                console.log(err);
                return of([]);
            })
        );
    }
    deleteProduct(id: number){
        return this.http.delete(`${this.API_URL}/${id}`,).pipe(
            catchError((err) => {
                this.error.set(err);
                console.log(err);
                return of([]);
            })
        );
    }
}