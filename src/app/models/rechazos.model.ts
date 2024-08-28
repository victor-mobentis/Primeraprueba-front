export interface IRechazo {
    rechazo_id: number;
    estado: string; // Nombre del estado
    poblacion: string; // Nombre de la población
    provincia: string; // Nombre de Provincia
    cliente: string; // Nombre del cliente (empresa)
    producto: string; // Nombre del producto
    nombre_familia: string; // Nombre de la familia
    nombre_subfamilia: string; // Nombre de la subfamilia
    tipo_rechazo: string; // motivo de rechazo
    precio_producto: number; // Precio del producto
    precio_competidor: number; //Precio del competidor
    competidor: number; // Nombre del competidor
    pvp_es_promocion_precio: number; // Precio del competidor
    id_simbolo: number;
    pvp_es_promocion_symbol: string;
    accion_correctora: string; // Acción correctora
    propuesta_agente: string; // Propuesta del agente
    anulado: boolean; // Estado anulado
    rechazo_longitud: number; // Longitud del rechazo
    rechazo_latitud: number; // Latitud del rechazo
    notas: string
    tiene_promo_propia: boolean
    tiene_promo_competencia: boolean
    promo_propia: string
    promo_competencia:string
    fecha_interes:string
    editingAccionCorrectora?: boolean;
    tempAccionCorrectora?: string;
    editingPrecioPromocion?: boolean;
    tempPrecioPromocion?: number;
    tempSimboloPromocion?: number;
}
