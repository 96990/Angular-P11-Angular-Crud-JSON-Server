import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Menubar } from 'primeng/menubar';
import { MenubarModule } from 'primeng/menubar';

@Component({
  selector: 'app-product',
  imports: [NgIf, CardModule, MenubarModule, Menubar, RouterOutlet],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
  items: MenuItem[] | undefined;

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-palette',
        command: () => {
          this.router.navigate(['/products']);
        }
      },
      {
        label: 'Lists',
        icon: 'pi pi-palette',
        command: () => {
          this.router.navigate([{ outlets: { sidebar: ['products','lists'] } }]);
        }
      },
      {
        label: 'Create',
        icon: 'pi pi-palette',
        command: () => {
          this.router.navigate([{ outlets: { sidebar: ['products','create'] } }]);
        }
      },
      {
        label: 'Details',
        icon: 'pi pi-palette',
        command: () => {
          this.router.navigate([{ outlets: { sidebar: ['info'] } }]);
        }
      },
    ];
  }
}
