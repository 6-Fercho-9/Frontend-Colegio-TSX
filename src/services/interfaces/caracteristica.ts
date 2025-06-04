export interface Caracteristica {
  ram?: string;
  almacenamiento?: string;
  sistema_operativo?: string;
  conectividad?: string;
  puertos?: string;
  camara?: string;
  procesador?: string;
  bateria?: string;
  tarjeta_grafica?: string;
  microfono_integrado?: boolean;
  modelo?: string;
  dimension?: string;
  peso?: string;
  pantalla?: string;
  resolucion?: string;
  color: string; // requerido
}



export interface CaracteristicaResponseUpdateBackend {
  ram: string;
  almacenamiento: string;
  sistema_operativo: string;
  conectividad: string;
  puertos: string;
  camara: string;
  procesador: string;
  bateria: string;
  tarjeta_grafica: string;
  microfono_integrado: boolean;
  modelo: string;
  dimension: string;
  peso: string;
  pantalla: string;
  resolucion: string;
  color: string; // requerido
}

