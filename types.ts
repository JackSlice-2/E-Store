export interface Billboard {
    id: string;
    label: string;
    imageUrl: string;
};

export interface Category {
    id: string;
    name: string;
    billboard: Billboard;
    Billboard: Billboard;
};

export interface Product {
    id: string;
    category: Category;
    name: string;
    price: string;
    isFeatured: boolean;
    Size: Size;
    Color: Color;
    sizes: string[];
    colors: string[];
    images: Image[];
};

export interface Image {
    id: string;
    url: string;
};

export interface Size {
    id: string;
    name: string;
    value: string;
};

export interface Color {
    id: string;
    name: string;
    value: string;
}
export interface Info {
    id: string;
    name: string;
    billboardid: string;
    icon: string;
    phonenumber: string;
    whatsapp: string;
    instagram: string;
    facebook: string;
    email: string;   
    visa: boolean;
    mastercard: boolean;
    amex: boolean;
    hipercard: boolean;
    elo: boolean;
    pix: boolean;
    stripe: boolean; 
}