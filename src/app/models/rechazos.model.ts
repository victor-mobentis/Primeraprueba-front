export interface IRechazo {
    id: number;
    estados: string; // Nombre del estado
    fecha_rechazo: Date;
    poblacion: string; // Nombre de la población
    provincia: string; // Nombre de Provincia
    cliente: string; // Nombre del cliente (empresa)
    segmentacion1: string; // Nombre de la segmentación (familia)
    segmentacion2: string; // Nombre de la segmentación (subfamilia)
    producto: string; // Nombre del producto
    pvp: number; // Precio del producto
    tipo_rechazo: string; // Tipo de rechazo
    competidor: string; // Nombre del competidor
    pvp_promocion: string; // Precio promocional
    pvp_competencia: number; // Precio del competidor
    accion_correcta: string; // Acción correctora
    propuesta_agente: string; // Propuesta del agente
    anulado: boolean; // Estado anulado
    rechazo_longitud: number; // Longitud del rechazo
    rechazo_latitud: number; // Latitud del rechazo
}
