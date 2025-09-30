import { Component, HostListener } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
  ],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent {
  features = [
    {
      title: 'Visita Individual',
      description: 'Agende sua visita com antecedência e evite filas.',
      icon: 'calendar_today',
      image: 'assets/parque1.jpg',
      badge: 'Mais Popular',
    },
    {
      title: 'Visita em Grupo',
      description: 'Descontos especiais para grupos acima de 10 pessoas.',
      icon: 'groups',
      image: 'assets/grupo.jpg',
      badge: 'Economize 20%',
    },
    {
      title: 'Check-in Rápido',
      description: 'Apresente seu QR code na entrada.',
      icon: 'qr_code',
      image: 'assets/checkin.jpg',
      badge: 'Novidade',
    },
  ];

  sidebarVisible = true;
  isMobile = false;

  ngOnInit() {
    this.checkScreenSize();
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.checkScreenSize();
  }

  private checkScreenSize() {
    this.isMobile = window.innerWidth <= 768;

    if (this.isMobile) {
      this.sidebarVisible = false;
    } else {
      this.sidebarVisible = true;
    }
  }

  toggleSidebar() {
    this.sidebarVisible = !this.sidebarVisible;
  }

  closeSidebarOnMobile() {
    if (this.isMobile) {
      this.sidebarVisible = false;
    }
  }

  openSidebar() {
    this.sidebarVisible = true;
  }

  closeSidebar() {
    this.sidebarVisible = false;
  }
}
