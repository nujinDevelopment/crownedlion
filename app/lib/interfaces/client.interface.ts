export interface Client {
  id: string;
  isUser: boolean;
  created: Date;
  updated: Date;
  company?: string;
  title?: string;
  firstname: string;
  lastname: string;
  email: string;
  phone?: string;
  street?: string;
  number?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
  isActive: boolean;
  // Add other client properties as needed
}
