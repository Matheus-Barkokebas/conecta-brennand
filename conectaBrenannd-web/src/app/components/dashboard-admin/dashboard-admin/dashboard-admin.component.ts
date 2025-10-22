import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  Chart,
  ChartConfiguration,
  ChartOptions,
  ChartType,
  registerables,
} from 'chart.js';
import { CommonModule } from '@angular/common';
import {
  BaseChartDirective,
  provideCharts,
  withDefaultRegisterables,
} from 'ng2-charts';
import { DataService, DayCount } from '../service/data.service';
import { Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard-admin',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    BaseChartDirective],
  providers: [provideCharts(withDefaultRegisterables())],
  templateUrl: './dashboard-admin.component.html',
  styleUrl: './dashboard-admin.component.scss',
})
export class DashboardAdminComponent implements OnInit {
  kpis = [
    {
      title: 'Visitantes Hoje',
      value: '247',
      subtitle: '+12% em relação à ontem',
      trend: 'positive',
      icon: 'people'
    },
    {
      title: 'Agendamentos',
      value: '89',
      subtitle: '15 pendentes de confirmação',
      trend: 'positive',
      icon: 'event_available'
    },
    {
      title: 'Taxa de Ocupação',
      value: '68%',
      subtitle: 'Capacidade máxima: 500 pessoas',
      trend: 'negative',
      icon: 'analytics'
    },
  ];

  lineChartData: ChartConfiguration['data'] = {
    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
    datasets: [
      {
        label: 'Visitantes',
        data: [1200, 1900, 1500, 2200, 1800, 2500, 2200, 2800, 2600, 3000, 3200, 3500],
        borderColor: '#663C1F',
        backgroundColor: 'rgba(102, 60, 31, 0.1)',
        fill: true,
        tension: 0.4,
        borderWidth: 2
      }
    ]
  };

  pieChartData: ChartConfiguration['data'] = {
    labels: ['Individual', 'Grupos Escolares', 'Excursões', 'Eventos Especiais'],
    datasets: [
      {
        data: [45, 25, 20, 10],
        backgroundColor: [
          '#663C1F',
          '#8B7355',
          '#C4A484',
          '#E5D5C5'
        ],
        borderWidth: 0
      }
    ]
  };

  lineChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: '#663C1F',
        borderWidth: 1
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        },
        ticks: {
          color: '#6b7280'
        }
      },
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)'
        },
        ticks: {
          color: '#6b7280'
        }
      }
    }
  };

  pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: '#111827',
          font: {
            size: 12
          },
          padding: 20
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#fff',
        bodyColor: '#fff'
      }
    }
  };

  lineChartType: ChartType = 'line';
  pieChartType: ChartType = 'pie';

  recentBookings = [
    {
      id: '#00123',
      name: 'Maria Silva',
      type: 'Individual',
      date: '15 Nov 2024',
      time: '14:00',
      visitors: 2,
      status: 'confirmed'
    },
    {
      id: '#00124',
      name: 'Escola Municipal',
      type: 'Grupo Escolar',
      date: '16 Nov 2024',
      time: '10:00',
      visitors: 35,
      status: 'pending'
    },
    {
      id: '#00125',
      name: 'João Santos',
      type: 'Individual',
      date: '16 Nov 2024',
      time: '15:30',
      visitors: 4,
      status: 'confirmed'
    },
    {
      id: '#00126',
      name: 'Agência Tour',
      type: 'Excursão',
      date: '17 Nov 2024',
      time: '11:00',
      visitors: 25,
      status: 'confirmed'
    },
    {
      id: '#00127',
      name: 'Empresa XYZ',
      type: 'Evento Corporativo',
      date: '18 Nov 2024',
      time: '16:00',
      visitors: 50,
      status: 'pending'
    }
  ];

  quickActions = [
    {
      title: 'Novo Agendamento',
      description: 'Criar nova reserva',
      icon: 'add_circle',
      route: '/ingressos/new'
    },
    {
      title: 'Gerenciar Grupos',
      description: 'Visualizar e editar grupos',
      icon: 'groups',
      route: '/grupos'
    },
    {
      title: 'Relatórios',
      description: 'Gerar relatórios detalhados',
      icon: 'assessment',
      route: '/relatorios'
    },
    {
      title: 'Configurações',
      description: 'Configurar parâmetros',
      icon: 'settings',
      route: '/configuracoes'
    }
  ];

  selectedPeriod: string = 'month';
  searchTerm: string = '';

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onBack() {
    this.router.navigate(['/home']);
  }

  onPeriodChange(period: string): void {
    this.selectedPeriod = period;
    this.updateChartData(period);
  }

  private updateChartData(period: string): void {
    console.log('Atualizando dados para o período:', period);

    switch(period) {
      case 'today':
        break;
      case 'week':
        break;
      case 'month':
        break;
      case 'quarter':
        break;
      case 'year':
        break;
    }
  }

  getStatusText(status: string): string {
    const statusMap: { [key: string]: string } = {
      'confirmed': 'Confirmado',
      'pending': 'Pendente',
      'cancelled': 'Cancelado'
    };
    return statusMap[status] || status;
  }

  onSearchChange(searchTerm: string): void {
    this.searchTerm = searchTerm;
    console.log('Buscando por:', searchTerm);
  }

  onExportReport(): void {
    console.log('Exportando relatório...');
  }

  onQuickActionClick(action: any): void {
    console.log('Ação rápida clicada:', action);
  }
}
