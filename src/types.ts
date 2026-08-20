export interface Customer {
    customer_id: number;
    customer_name: string;
    city: string;
    membership_level: string;
}

export interface Product {
    product_id: number;
    product_name: string;
    category: string;
    unit_price: number;
}

export interface Order {
    order_id: number;
    customer_id: number;
    order_date: string;
    shipping_city: string;
}