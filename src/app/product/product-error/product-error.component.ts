import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-product-error',
  imports: [CardModule, ButtonModule],
  template: `
   <div class="ml-4 p-8 flex items-center justify-center">
   <p-card [style]="{ width: '18rem', overflow: 'hidden' }">
       <div class="p-d-flex p-flex-column p-ai-center">
           <div class="flex gap-4 mt-1 mb-4">
               <label for="integeronly">Not Found!</label>
           </div>
           <div class="flex gap-4 mt-3">
               <p-button label="Product List" class="w-full" styleClass="w-full" (onClick)="navigate()" />
           </div>
       </div>
   </p-card>
 </div>
  `,
})
export class ProductErrorComponent {
  private router = inject(Router)

  navigate(){
    this.router.navigate(['/lists']);
  }
}
