import { Product } from "@/types";
import qs from "query-string";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/products`;

interface Query {
    categoryId?: string;
    colorId?: string;
    sizeId?: string;
    isFeatured?: boolean;
    sizes?: string[];
    colors?: string[];
    inStock?: number
}

const getAllProducts = async (query: Query): Promise<Product[]> => {
    const url = qs.stringifyUrl({
        url: URL,
        query: {
            colorId: query.colorId,
            colors: query.colors,
            sizeId: query.sizeId,
            sizes: query.sizes,
            categoryId: query.categoryId,
            isFeatured: query.isFeatured,
            inStock: query.inStock
        },
    });
    
    const res = await fetch(url);

    return res.json();
};

export default getAllProducts;