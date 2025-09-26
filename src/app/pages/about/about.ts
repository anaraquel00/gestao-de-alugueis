import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-about',
  imports: [RouterModule, MatButtonModule, CommonModule],
  templateUrl: './about.html',
  styleUrl: './about.scss'
})
export class About {

}
