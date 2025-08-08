import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit, HostListener } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';

@Component({
  selector: 'app-home',
  imports: [MatTableModule, MatSortModule],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})

export class HomeComponent implements OnInit {
  screenWidth: number = 0;
  screenHeight: number = 0;
  ngOnInit(): void {
    this.updateScreenSize();
  }
  
  @HostListener('window:resize')
  onResize() {
    this.updateScreenSize();
  }
  private updateScreenSize(): void {
    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;
  }
}

