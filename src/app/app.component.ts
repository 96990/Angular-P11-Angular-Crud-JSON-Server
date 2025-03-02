import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Menubar } from 'primeng/menubar';
import { MenubarModule } from 'primeng/menubar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MenubarModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Techwarelab';
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
          this.router.navigate(['/products/lists']);
        }
      },
      {
        label: 'Create',
        icon: 'pi pi-palette',
        command: () => {
          this.router.navigate(['/create']);
        }
      },
      {
        label: 'Details',
        icon: 'pi pi-palette',
        command: () => {
          this.router.navigate(['/info']);
        }
      },
      {
        label: 'Login',
        icon: 'pi pi-palette',
        command: () => {
          this.router.navigate(['/login']);
        }
      },
    ];
  }
}
