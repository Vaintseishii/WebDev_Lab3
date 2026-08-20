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

export interface Order_item {
    order_id: number;
    product_id: number;
    quantity: number;
    discount: number;
}