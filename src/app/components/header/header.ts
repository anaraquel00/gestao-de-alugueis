import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterModule, MatToolbarModule, MatButtonModule, CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {

}
