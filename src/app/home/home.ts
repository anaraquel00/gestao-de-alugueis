import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, inject, ViewChild } from '@angular/core';
@Component({
  selector: 'app-home',
  imports: [RouterModule, CommonModule, MatButtonModule],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home implements AfterViewInit {
  ngAfterViewInit(): void {
    throw new Error('Method not implemented.');
  }
  @ViewChild('bgVideo') videoElement!: ElementRef<HTMLVideoElement>;
   // Injetamos o ChangeDetectorRef para um controle mais fino, se necessário
  // Uma flag para garantir que só tentaremos dar play uma vez
  private videoPlayed = false;

  /**
   * Esta função será chamada por qualquer clique na área do vídeo.
   */
  tryToPlayVideo(): void {
    // Se o vídeo ainda não tocou e o elemento existe...
    if (!this.videoPlayed && this.videoElement) {
      this.videoPlayed = true; // Marca que já tentamos
      this.videoElement.nativeElement.play().catch(error => {
        // Se mesmo assim o navegador bloquear, apenas registramos no console.
        console.warn('O navegador ainda bloqueou o play após a interação.', error);
      });
    }
  }
}

