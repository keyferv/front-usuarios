export interface Categoria {
  id: number;
  categoryName: string;
  description?: string;
}

export interface Estado {
  id: number;
  type: string;
}

export interface OfertaDetalle {
  id: number;
  requirements: string;
  responsibilities: string;
  benefits: string;
  location: string;
  startHour: string;
  endHour: string;
  processSelection: string;
  salary: number;
}

export interface Vacante {
  id: number;
  offerName: string;
  description: string;
  date: string;
  expirationDate: string;
  salary: number;
  featured: boolean;
  image: string;
  estado: Estado;
  categories: Categoria[];
  detail?: OfertaDetalle; // OneToOne relation
}
