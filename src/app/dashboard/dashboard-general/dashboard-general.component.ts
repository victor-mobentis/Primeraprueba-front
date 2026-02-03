import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { TranslationService } from 'src/app/core/services/i18n/translation.service';

import { FilterService } from 'src/app/services/filter/filter.service';

@Component({
  selector: 'mobentis-dashboard-general',
  templateUrl: './dashboard-general.component.html',
  styleUrls: ['./dashboard-general.component.scss'],
})
export class DashboardGeneralComponent {

  menuBlocks = [
    {
      title: 'Aplicaciones',
      items: [
        {
          label: 'Ventas',
          icon: 'bi-cart-check-fill',
          route: '/sales',
          subOptions: [
            { label: 'Presupuestos', route: '/sales/budgets' },
            { label: 'Pedidos', route: '/sales/orders' },
            { label: 'Albaranes', route: '/sales/delivery-notes' },
            { label: 'Facturas', route: '/sales/invoices' }
          ]
        },
        { label: 'Agenda', icon: 'bi-calendar-event-fill', route: '/agenda' },
        { label: 'Tesoreria', icon: 'bi-wallet-fill', route: '/treasury' },
        { label: 'Clientes', icon: 'bi-people-fill', route: '/clients' },
        { label: 'Catalogo', icon: 'bi-journal-bookmark-fill', route: '/catalog' }
      ]
    },
    {
      title: 'Mantenimientos',
      items: [
        { label: 'M. Ventas', icon: 'bi-receipt', route: '/maintenance/sales' },
        { label: 'M. Tesoreria', icon: 'bi-cash-coin', route: '/maintenance/treasury' },
        { label: 'M. Clientes', icon: 'bi-person-gear', route: '/maintenance/clients' },
        { label: 'Equipos', icon: 'bi-display', route: '/maintenance/equipment' },
        { label: 'Miscelaneo', icon: 'bi-gear-wide-connected', route: '/maintenance/misc' }
      ]
    },
    {
      title: 'Informes',
      items: [
        { label: 'Ventas', icon: 'bi-bar-chart-line-fill', route: '/reports/sales' },
        { label: 'Tesoreria', icon: 'bi-pie-chart-fill', route: '/reports/treasury' },
        { label: 'Agenda', icon: 'bi-calendar-check-fill', route: '/reports/agenda' },
        { label: 'Clientes', icon: 'bi-person-lines-fill', route: '/reports/clients' }
      ]
    },
    {
      title: 'Modulos adicionales',
      items: [
        { label: 'Actions', icon: 'bi-lightning-fill', route: '/modules/actions' },
        { label: 'Forms', icon: 'bi-ui-checks', route: '/modules/forms' },
        { label: 'Delivery', icon: 'bi-truck', route: '/modules/delivery' },
        { label: 'Interest', icon: 'bi-bookmark-star-fill', route: '/modules/interest' },
        { label: 'Docs', icon: 'bi-file-earmark-text-fill', route: '/modules/docs' },
        { label: 'Goals', icon: 'bi-bullseye', route: '/modules/goals' },
        { label: 'Services', icon: 'bi-briefcase-fill', route: '/modules/services' }
      ]
    }
  ];

  activeItem: any = null;
  // Map to track the starting index of items to display for each block
  blockScrollIndices: { [key: string]: number } = {};

  constructor(private router: Router) {
    // Initialize scroll indices for each block to 0
    this.menuBlocks.forEach(block => {
      this.blockScrollIndices[block.title] = 0;
    });
  }

  onItemClick(item: any, event: Event): void {
    if (item.subOptions && item.subOptions.length > 0) {
      this.activeItem = item;
    } else {
      this.router.navigate([item.route]);
    }
  }

  closeMenu(): void {
    this.activeItem = null;
  }

  scrollLeft(blockTitle: string): void {
    const currentIndex = this.blockScrollIndices[blockTitle] || 0;
    if (currentIndex > 0) {
      this.blockScrollIndices[blockTitle] = currentIndex - 1;
    }
  }

  scrollRight(blockTitle: string, totalItems: number): void {
    const currentIndex = this.blockScrollIndices[blockTitle] || 0;
    if (currentIndex + 6 < totalItems) {
      this.blockScrollIndices[blockTitle] = currentIndex + 1;
    }
  }

  getVisibleItems(block: any): any[] {
    const startIndex = this.blockScrollIndices[block.title] || 0;
    return block.items.slice(startIndex, startIndex + 6);
  }

  getTransform(index: number, total: number, radius: number = 250): string {
    // Start from -90deg (top)
    const angle = (360 / total) * index - 90;
    return `rotate(${angle}deg) translate(${radius}px) rotate(${-angle}deg)`;
  }

}
