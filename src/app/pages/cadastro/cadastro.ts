import { Component } from '@angular/core';
import { MatToolbar } from "@angular/material/toolbar";
import { RouterModule } from "@angular/router";

@Component({
  selector: 'app-cadastro',
  imports: [MatToolbar, RouterModule],
  templateUrl: './cadastro.html',
  styleUrl: './cadastro.scss'
})
export class Cadastro {

}
