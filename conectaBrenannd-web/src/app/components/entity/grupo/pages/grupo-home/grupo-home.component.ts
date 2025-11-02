import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../../../service/auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-grupo-home',
  imports: [
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    RouterLink,
    CommonModule,
  ],
  templateUrl: './grupo-home.component.html',
  styleUrls: [
    './grupo-home.component.scss',
    './grupo-home-visitante.component.scss',
  ],
})
export class GrupoHomeComponent {
  sidebarVisible = true;
  isMobile = false;
  permissao: string | null = null;
  isLoggedIn: boolean = false;
  private subscriptions = new Subscription();
  mobileMenuOpen = false;

  constructor(private router: Router, private authService: AuthService) {}

  onBack() {
    this.router.navigate(['/home']);
  }

  ngOnInit() {
    this.checkScreenSize();

    this.subscriptions.add(
      this.authService.userRole$.subscribe((role) => (this.permissao = role))
    );
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
