const API_BASE = 'https://api.mercadolibre.com';

export async function getCategories(): Promise<any> {
  try {
    const response = await fetch(`${API_BASE}/sites/MLB/categories`);
    const data = await response.json();
    return data;
  } catch (error: any) {
    throw new Error(`Failed to fetch categories: ${error.message}`);
  }
}

export async function getProductsFromCategoryAndQuery(query: string, categoryId: string):
Promise<any> {
  try {
    const response = await fetch(`${API_BASE}/
    sites/MLB/search?category=${categoryId}&q=${query}`);
    const data = await response.json();
    return data;
  } catch (error: any) {
    throw new Error(`Failed to fetch products: ${error.message}`);
  }
}

export async function getProductsByCategoryFromId(categoryId: string): Promise<any> {
  try {
    const response = await fetch(`${API_BASE}/sites/MLB/search?category=${categoryId}`);
    const data = await response.json();
    return data;
  } catch (error: any) {
    throw new Error(`Failed to fetch products: ${error.message}`);
  }
}

export async function getProductsFromQuery(query: string): Promise<any> {
  try {
    const response = await fetch(`${API_BASE}/sites/MLB/search?q=${query}`);
    const data = await response.json();
    return data;
  } catch (error: any) {
    throw new Error(`Failed to fetch products: ${error.message}`);
  }
}

export async function getDetailsFromId(id: string): Promise<any> {
  try {
    const response = await fetch(`${API_BASE}/items/${id}`);
    const data = await response.json();
    return data;
  } catch (error: any) {
    throw new Error(`Failed to fetch products: ${error.message}`);
  }
}
