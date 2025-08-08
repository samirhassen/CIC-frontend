import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';

@Component({
  selector: 'app-header',
  imports: [MatToolbarModule, MatButtonModule, RouterModule, FlexLayoutModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
constructor(private router: Router) {}
  logout(): void {
     this.router.navigate(['/']);
   }
}
