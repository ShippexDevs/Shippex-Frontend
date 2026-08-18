import axiosClient from "../api/axiosClient.js";

export const getFeaturedProducts = async () => {

  const response = await axiosClient.get(
    "/api/v1/products/featured"
  );

  return response.data.map((product) => ({
    id: product.id,
    name: product.name,
    brand: product.brand,
    image: product.images?.[0] ?? "",
    unit: product.unit,
    currency: product.currency,
    price: product.currentPrice,
    originalPrice: product.originalPrice,
    category: product.category,
    categorySlug: product.categorySlug,
    rating: product.ratings,
    stock: product.stock,
    featured: product.featured,
    deliveryTime: product.deliveryTime,
    description: product.description,
    active: product.active,
    displayOrder: product.displayOrder,
    tags: product.tags,
  }));

};

export const getProductsByCategorySlug = async (categorySlug) => {

  const response = await axiosClient.get(
    `/api/v1/products/category/${categorySlug}`
  );

  return response.data.map((product) => ({
    id: product.id,
    name: product.name,
    brand: product.brand,

    // Backend returns List<String>
    // ProductCard expects one image
    image: product.images?.[0] ?? "",

    unit: product.unit,

    currency: product.currency,
    price: product.currentPrice,
    originalPrice: product.originalPrice,

    category: product.category,
    categorySlug: product.categorySlug,

    rating: product.ratings,
    stock: product.stock,
    featured: product.featured,

    deliveryTime: product.deliveryTime,
    description: product.description,

    active: product.active,
    displayOrder: product.displayOrder,
    tags: product.tags,
  }));

};

export const getProductById = async (id) => {

  const response = await axiosClient.get(
    `/api/v1/products/${id}`
  );

  const product = response.data;

  return {
    id: product.id,
    name: product.name,
    brand: product.brand,

    // Backend returns multiple images
    images: product.images ?? [],
    image: product.images?.[0] ?? "",

    unit: product.unit,

    currency: product.currency,
    price: product.currentPrice,
    originalPrice: product.originalPrice,

    category: product.category,
    categorySlug: product.categorySlug,

    rating: product.ratings,
    stock: product.stock,
    featured: product.featured,

    deliveryTime: product.deliveryTime,
    description: product.description,

    active: product.active,
    displayOrder: product.displayOrder,
    tags: product.tags,
  };
};