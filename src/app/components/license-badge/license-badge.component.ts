import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UsersService } from '../../services/users/users.service';
import { ConfigurationService } from '../../services/configuration.service';

@Component({
  selector: 'mobentis-license-badge',
  templateUrl: './license-badge.component.html',
  styleUrls: ['./license-badge.component.scss']
})
export class LicenseBadgeComponent implements OnInit {
  
  activeUsersCount: number = 0;
  maxLicenses: number = 10;
  licenseReached: boolean = false;
  loading: boolean = true;

  @Output() licenseStatusChange = new EventEmitter<{ canCreate: boolean, reached: boolean }>();

  constructor(
    private usersService: UsersService,
    private configService: ConfigurationService
  ) {}

  ngOnInit(): void {
    this.loadLicenseData();
  }

  get remainingLicenses(): number {
    return Math.max(0, this.maxLicenses - this.activeUsersCount);
  }

  get isWarningLevel(): boolean {
    return this.activeUsersCount >= this.maxLicenses * 0.8;
  }

  get isDangerLevel(): boolean {
    return this.licenseReached;
  }

  loadLicenseData(): void {
    this.loading = true;
    
    // Cargar configuración de licencias
    this.configService.getConfigurationByName('converterLICENCIAS_RESTANTES').subscribe({
      next: (config) => {
        this.maxLicenses = parseInt(config.Valor, 10) || 10;
        this.checkAndEmitStatus();
      },
      error: (error) => {
        console.error('Error cargando configuración de licencias:', error);
        this.maxLicenses = 10;
        this.loading = false;
      }
    });

    // Cargar conteo de usuarios activos
    this.usersService.getActiveUsersCount().subscribe({
      next: (response) => {
        this.activeUsersCount = response.count;
        this.checkAndEmitStatus();
        this.loading = false;
      },
      error: (error) => {
        console.error('Error cargando conteo de usuarios activos:', error);
        this.loading = false;
      }
    });
  }

  checkAndEmitStatus(): void {
    this.licenseReached = this.activeUsersCount >= this.maxLicenses;
    
    this.licenseStatusChange.emit({
      canCreate: !this.licenseReached,
      reached: this.licenseReached
    });
  }

  refreshCount(): void {
    this.usersService.getActiveUsersCount().subscribe({
      next: (response) => {
        this.activeUsersCount = response.count;
        console.log('Conteo actualizado:', this.activeUsersCount);
        this.checkAndEmitStatus();
      },
      error: (error) => {
        console.error('Error actualizando conteo:', error);
      }
    });
  }
}
