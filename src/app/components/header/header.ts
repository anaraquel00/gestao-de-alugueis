import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
@Component({
  selector: 'app-header',
  imports: [RouterModule,
       MatToolbarModule,
       MatButtonModule,
       CommonModule,
       MatIconModule,
       MatMenuModule
  ],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {

}
