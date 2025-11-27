import { Component, HostListener, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { AuthService } from '../../service/auth/auth.service';
import { Grupo } from '../entity/grupo/models/grupo.models';
import { GrupoService } from '../entity/grupo/services/grupo.service';

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
  styleUrls: [
    './home-page.component.scss',
    './home-page-visitante.component.scss',
  ],
})
export class HomePageComponent implements OnInit {
  sidebarVisible = true;
  isMobile = false;

  permissao: string | null = null;
  isLoggedIn: boolean = false;
  private subscriptions = new Subscription();
  mobileMenuOpen = false;

  grupo: Grupo[] = [];

  constructor(
    private authService: AuthService,
    private router: Router,
    private grupoService: GrupoService
  ) {}

  ngOnInit() {
    this.checkScreenSize();

    this.subscriptions.add(
      this.authService.userRole$.subscribe((role) => (this.permissao = role))
    );

    this.subscriptions.add(
      this.authService.isLoggedIn$.subscribe(
        (status) => (this.isLoggedIn = status)
      )
    );
  }

  getTotalGrupos(): number {
    return this.grupo.length;
  }

  goToProtectedRoute(route: string) {
    if (!this.isLoggedIn) {
      this.router.navigate(['/login'], { queryParams: { redirectTo: route } });
      return;
    }
    this.router.navigate([route]);
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
      this.mobileMenuOpen = false;
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

  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  closeMobileMenu() {
    this.mobileMenuOpen = false;
  }
}
