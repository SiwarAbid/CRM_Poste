export interface Client {
  id: number;
  nom: string;
  email: string;
  num_tel: number;
  adresse: string;
}

export const clients: Client[] = [];
