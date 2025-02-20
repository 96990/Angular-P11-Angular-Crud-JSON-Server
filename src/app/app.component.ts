import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
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

  constructor(private router: Router) { }

  ngOnInit() {
    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-palette',
        command: () => {
          this.router.navigate(['/']);
        }
      },
      {
        label: 'Lists',
        icon: 'pi pi-palette',
        command: () => {
          this.router.navigate(['/lists']);
        }
      },
      {
        label: 'Details',
        icon: 'pi pi-palette',
        command: () => {
          this.router.navigate(['/details']);
        }
      },
      {
        label: 'Create',
        icon: 'pi pi-palette',
        command: () => {
          this.router.navigate(['/create']);
        }
      },
    ];
  }
}
