export interface Translations {
  [key: string]: string;
}

export const dictionaries: { [lang: string]: Translations } = {
  es: {
    // Dashboard
    'dashboard.title': 'Dashboard',
    'chart.clients.title': 'Clientes',
    'chart.rejectionReasons.title': 'Motivos de Rechazo',
    'chart.productFamilies.title': 'Familias de productos',
    'chart.byMonth.title': 'Por mes',
    'chart.byWeekday.title': 'Por día de la semana',
    'table.total': 'Total',
    'table.noData': 'No hay datos que mostrar',
    
    // Rechazos
    'rejections.title': 'Rechazos',
    'rejections.search.placeholder': 'Buscar...',
    'rejections.invalidCharacters': 'Caracteres no permitidos',
    'rejections.export': 'Exportar',
    'rejections.map': 'Ver en Mapa',
    'rejections.loading': 'Cargando...',
    'rejections.saveChanges': 'Guardar cambios',
    'rejections.table.convertToOpportunity': 'Convertir en oportunidad (% ó € + Promo)',
    'rejections.table.status': 'Estado',
    'rejections.table.date': 'Fecha',
    'rejections.table.city': 'Población',
    'rejections.table.client': 'Cliente',
    'rejections.table.product': 'Producto',
    'rejections.table.reason': 'Motivo',
    'rejections.table.interest': 'Interés',
    'rejections.table.myPrice': 'Mi Precio',
    'rejections.table.theirPrice': 'Su Precio',
    'rejections.table.competitor': 'Competidor',
    'rejections.table.salesmanProposal': 'Propuesta Agente',
    
    // Usuarios
    'users.title': 'Gestión de Usuarios',
    'users.search.placeholder': 'Buscar por nombre, email o cargo...',
    'users.createUser': 'Crear Usuario',
    'users.clearSearch': 'Limpiar búsqueda',
    
    // Empresa Dropdown
    'empresaDropdown.selectAll': 'Seleccionar todas',
    'empresaDropdown.allCompanies': 'Todas las empresas',
    'empresaDropdown.companies': 'empresas',
    'empresaDropdown.noCompany': 'Ninguna empresa',
    'empresaDropdown.of': 'de',
    'empresaDropdown.warning.minOneRequired': 'Debes seleccionar al menos una empresa.',
    
    // KPI
    'kpi.rejections': 'Rechazos',
    'kpi.toConvert': 'A Convertir',
    'kpi.pendingConversions': 'Conversiones Pendientes',
    'kpi.activeOpportunities': 'Oportunidades Activas',
    'kpi.converted': 'Convertido',
    'kpi.opportunities': 'Oportunidades',
    
    // Motivos de Rechazo (valores dinámicos de BD)
    'rejection.reason.No aplica': 'No aplica',
    'rejection.reason.Otros': 'Otros',
    'rejection.reason.Precio': 'Precio',
    
    // Motivos de Rechazo (para dropdown)
    'reason.Precio': 'Precio',
    'reason.Otros': 'Otros',
    'reason.No aplica': 'No aplica',
    'reason.addReason': 'Añadir Motivo',
    
    // Estados de Conversión (valores dinámicos de BD)
    'conversion.status.No aplica': 'No aplica',
    'conversion.status.Otros': 'Otros',
    'conversion.status.Precio': 'Precio',
    'conversion.status.Aceptado': 'Aceptado',
    'conversion.status.Pendiente': 'Pendiente',
    'conversion.status.Rechazado': 'Rechazado',
    'conversion.status.Vendido': 'Vendido',
    
    // Filtros
    'filters.button': 'Filtros',
    'filters.clear': 'Limpiar filtros',
    'filters.save': 'Guardar filtro como plantilla',
    'filters.saved': 'Filtros guardados',
    'filters.saveModal.title': 'Guardar filtro como plantilla',
    'filters.saveModal.placeholder': 'Nombre del filtro',
    'filters.saveModal.saveButton': 'Guardar',
    'filters.status': 'Estados',
    
    // Estados de Rechazo (para filtros)
    'status.Pendiente': 'Pendiente',
    'status.Aceptado': 'Aceptado',
    'status.No aplica': 'No aplica',
    'status.Oportunidad': 'Oportunidad',
    'status.Rechazado': 'Rechazado',
    'status.Vendido': 'Vendido',
    
    // Acción Correctora
    'correctiveAction.placeholder': 'Promoción',
    
    // Meses (abreviados)
    'month.0': 'Ene',
    'month.1': 'Feb',
    'month.2': 'Mar',
    'month.3': 'Abr',
    'month.4': 'May',
    'month.5': 'Jun',
    'month.6': 'Jul',
    'month.7': 'Ago',
    'month.8': 'Sep',
    'month.9': 'Oct',
    'month.10': 'Nov',
    'month.11': 'Dic',
    
    // Días de la semana (abreviados)
    'day.0': 'Lun',
    'day.1': 'Mar',
    'day.2': 'Mié',
    'day.3': 'Jue',
    'day.4': 'Vie',
    'day.5': 'Sáb',
    'day.6': 'Dom',
    
    // Etiquetas de gráficas
    'chart.clients.withRejections': 'Con rechazos',
    'chart.clients.withoutRejections': 'Sin rechazos'
  },
  en: {
    // Dashboard
    'dashboard.title': 'Dashboard',
    'chart.clients.title': 'Clients',
    'chart.rejectionReasons.title': 'Rejection Reasons',
    'chart.productFamilies.title': 'Product Families',
    'chart.byMonth.title': 'By Month',
    'chart.byWeekday.title': 'By Day of Week',
    'table.total': 'Total',
    'table.noData': 'No data to display',
    
    // Rejections
    'rejections.title': 'Rejections',
    'rejections.search.placeholder': 'Search...',
    'rejections.invalidCharacters': 'Invalid characters',
    'rejections.export': 'Export',
    'rejections.map': 'View on Map',
    'rejections.loading': 'Loading...',
    'rejections.saveChanges': 'Save changes',
    'rejections.table.convertToOpportunity': 'Convert to opportunity (% or € + Promo)',
    'rejections.table.status': 'Status',
    'rejections.table.date': 'Date',
    'rejections.table.city': 'City',
    'rejections.table.client': 'Client',
    'rejections.table.product': 'Product',
    'rejections.table.reason': 'Reason',
    'rejections.table.interest': 'Interest',
    'rejections.table.myPrice': 'My Price',
    'rejections.table.theirPrice': 'Their Price',
    'rejections.table.competitor': 'Competitor',
    'rejections.table.salesmanProposal': 'Salesman Proposal',
    
    // Users
    'users.title': 'User Management',
    'users.search.placeholder': 'Search by name, email or position...',
    'users.createUser': 'Create User',
    'users.clearSearch': 'Clear search',
    
    // Company Dropdown
    'empresaDropdown.selectAll': 'Select all',
    'empresaDropdown.allCompanies': 'All companies',
    'empresaDropdown.companies': 'companies',
    'empresaDropdown.noCompany': 'No company',
    'empresaDropdown.of': 'of',
    'empresaDropdown.warning.minOneRequired': 'You must select at least one company.',
    
    // KPI
    'kpi.rejections': 'Rejections',
    'kpi.toConvert': 'To Convert',
    'kpi.pendingConversions': 'Pending Conversions',
    'kpi.activeOpportunities': 'Active Opportunities',
    'kpi.converted': 'Converted',
    'kpi.opportunities': 'Opportunities',
    
    // Rejection Reasons (dynamic values from DB)
    'rejection.reason.No aplica': 'Not applicable',
    'rejection.reason.Otros': 'Others',
    'rejection.reason.Precio': 'Price',
    
    // Rejection Reasons (for dropdown)
    'reason.Precio': 'Price',
    'reason.Otros': 'Others',
    'reason.No aplica': 'Not applicable',
    'reason.addReason': 'Add Reason',
    
    // Conversion Status (dynamic values from DB)
    'conversion.status.No aplica': 'Not applicable',
    'conversion.status.Otros': 'Others',
    'conversion.status.Precio': 'Price',
    'conversion.status.Aceptado': 'Accepted',
    'conversion.status.Pendiente': 'Pending',
    'conversion.status.Rechazado': 'Rejected',
    'conversion.status.Vendido': 'Sold',
    
    // Filters
    'filters.button': 'Filters',
    'filters.clear': 'Clear filters',
    'filters.save': 'Save filter as template',
    'filters.saved': 'Saved filters',
    'filters.saveModal.title': 'Save filter as template',
    'filters.saveModal.placeholder': 'Filter name',
    'filters.saveModal.saveButton': 'Save',
    'filters.status': 'Status',
    
    // Rejection Status (for filters)
    'status.Pendiente': 'Pending',
    'status.Aceptado': 'Accepted',
    'status.No aplica': 'Not applicable',
    'status.Oportunidad': 'Opportunity',
    'status.Rechazado': 'Rejected',
    'status.Vendido': 'Sold',
    
    // Corrective Action
    'correctiveAction.placeholder': 'Promotion',
    
    // Months (abbreviated)
    'month.0': 'Jan',
    'month.1': 'Feb',
    'month.2': 'Mar',
    'month.3': 'Apr',
    'month.4': 'May',
    'month.5': 'Jun',
    'month.6': 'Jul',
    'month.7': 'Aug',
    'month.8': 'Sep',
    'month.9': 'Oct',
    'month.10': 'Nov',
    'month.11': 'Dec',
    
    // Days of the week (abbreviated)
    'day.0': 'Mon',
    'day.1': 'Tue',
    'day.2': 'Wed',
    'day.3': 'Thu',
    'day.4': 'Fri',
    'day.5': 'Sat',
    'day.6': 'Sun',
    
    // Chart labels
    'chart.clients.withRejections': 'With rejections',
    'chart.clients.withoutRejections': 'Without rejections'
  },
  ca: {
    // Dashboard
    'dashboard.title': 'Panell',
    'chart.clients.title': 'Clients',
    'chart.rejectionReasons.title': 'Raons de Rebuig',
    'chart.productFamilies.title': 'Famílies de productes',
    'chart.byMonth.title': 'Per mes',
    'chart.byWeekday.title': 'Per dia de la setmana',
    'table.total': 'Total',
    'table.noData': 'No hi ha dades per mostrar',
    
    // Rebutjos
    'rejections.title': 'Rebutjos',
    'rejections.search.placeholder': 'Cercar...',
    'rejections.invalidCharacters': 'Caràcters no permesos',
    'rejections.export': 'Exportar',
    'rejections.map': 'Veure al Mapa',
    'rejections.loading': 'Carregant...',
    'rejections.saveChanges': 'Guardar canvis',
    'rejections.table.convertToOpportunity': 'Convertir en oportunitat (% o € + Promo)',
    'rejections.table.status': 'Estat',
    'rejections.table.date': 'Data',
    'rejections.table.city': 'Població',
    'rejections.table.client': 'Client',
    'rejections.table.product': 'Producte',
    'rejections.table.reason': 'Motiu',
    'rejections.table.interest': 'Interès',
    'rejections.table.myPrice': 'El meu Preu',
    'rejections.table.theirPrice': 'El seu Preu',
    'rejections.table.competitor': 'Competidor',
    'rejections.table.salesmanProposal': 'Proposta Agent',
    
    // Usuaris
    'users.title': 'Gestió d\'Usuaris',
    'users.search.placeholder': 'Cercar per nom, email o càrrec...',
    'users.createUser': 'Crear Usuari',
    'users.clearSearch': 'Netejar cerca',
    
    // Desplegable d'Empresa
    'empresaDropdown.selectAll': 'Seleccionar totes',
    'empresaDropdown.allCompanies': 'Totes les empreses',
    'empresaDropdown.companies': 'empreses',
    'empresaDropdown.noCompany': 'Cap empresa',
    'empresaDropdown.of': 'de',
    'empresaDropdown.warning.minOneRequired': 'Has de seleccionar almenys una empresa.',
    
    // KPI
    'kpi.rejections': 'Rebutjos',
    'kpi.toConvert': 'A Convertir',
    'kpi.pendingConversions': 'Conversions Pendents',
    'kpi.activeOpportunities': 'Oportunitats Actives',
    'kpi.converted': 'Convertit',
    'kpi.opportunities': 'Oportunitats',
    
    // Motius de Rebuig (valors dinàmics de BD)
    'rejection.reason.No aplica': 'No aplica',
    'rejection.reason.Otros': 'Altres',
    'rejection.reason.Precio': 'Preu',
    
    // Motius de Rebuig (per a dropdown)
    'reason.Precio': 'Preu',
    'reason.Otros': 'Altres',
    'reason.No aplica': 'No aplica',
    'reason.addReason': 'Afegir Motiu',
    
    // Estats de Conversió (valors dinàmics de BD)
    'conversion.status.No aplica': 'No aplica',
    'conversion.status.Otros': 'Altres',
    'conversion.status.Precio': 'Preu',
    'conversion.status.Aceptado': 'Acceptat',
    'conversion.status.Pendiente': 'Pendent',
    'conversion.status.Rechazado': 'Rebutjat',
    'conversion.status.Vendido': 'Venut',
    
    // Filtres
    'filters.button': 'Filtres',
    'filters.clear': 'Netejar filtres',
    'filters.save': 'Guardar filtre com a plantilla',
    'filters.saved': 'Filtres guardats',
    'filters.saveModal.title': 'Guardar filtre com a plantilla',
    'filters.saveModal.placeholder': 'Nom del filtre',
    'filters.saveModal.saveButton': 'Guardar',
    'filters.status': 'Estats',
    
    // Estats de Rebuig (per a filtres)
    'status.Pendiente': 'Pendent',
    'status.Aceptado': 'Acceptat',
    'status.No aplica': 'No aplica',
    'status.Oportunidad': 'Oportunitat',
    'status.Rechazado': 'Rebutjat',
    'status.Vendido': 'Venut',
    
    // Acció Correctora
    'correctiveAction.placeholder': 'Promoció',
    
    // Mesos (abreviats)
    'month.0': 'Gen',
    'month.1': 'Febr',
    'month.2': 'Març',
    'month.3': 'Abr',
    'month.4': 'Maig',
    'month.5': 'Juny',
    'month.6': 'Jul',
    'month.7': 'Ag',
    'month.8': 'Set',
    'month.9': 'Oct',
    'month.10': 'Nov',
    'month.11': 'Des',
    
    // Dies de la setmana (abreviats)
    'day.0': 'Dll',
    'day.1': 'Dmt',
    'day.2': 'Dmc',
    'day.3': 'Dij',
    'day.4': 'Div',
    'day.5': 'Dis',
    'day.6': 'Diu',
    
    // Etiquetes de gràfiques
    'chart.clients.withRejections': 'Amb rebutjos',
    'chart.clients.withoutRejections': 'Sense rebutjos'
  }
};
