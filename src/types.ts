export interface Pie {
  id?: number;
  name: string;
  crust_type: string;
  filling: string;
  is_baked?: boolean;
  slice_count?: number;
}

export interface Customer {
    customer_id: number;
    customer_name: string;
    city: string;
    membership_level: string;
}