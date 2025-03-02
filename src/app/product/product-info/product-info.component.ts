import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-info',
  imports: [CardModule, ButtonModule, InputNumberModule, FormsModule],
  template: `
          <div class="ml-4 p-8 flex items-center justify-center">
            <p-card [style]="{ width: '18rem', overflow: 'hidden' }">
                <div class="p-d-flex p-flex-column p-ai-center">
                    <div class="flex gap-4 mt-1 mb-4">
                        <label for="integeronly">Enter the id of product to display</label>
                        <p-inputnumber inputId="integeronly" [(ngModel)]="id" />
                    </div>
                    <div class="flex-end gap-4 mt-3">
                        <p-button label="Click" class="w-full" styleClass="w-full" (onClick)="navigate()" />
                    </div>
                </div>
            </p-card>
          </div>
`,
})
export class ProductInfoComponent {
  id!: number;
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  navigate() {
    if (this.id) {
      this.router.navigate(['/products/details', this.id])
    }
  }
}
