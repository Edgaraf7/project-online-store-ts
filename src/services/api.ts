export async function getCategories() {
  try {
    const response = await fetch('https://api.mercadolibre.com/sites/MLB/categories');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
}

export async function getProductsFromCategoryAndQuery(categoryId: string, query: string) {
  try {
    let url = 'https://api.mercadolibre.com/sites/MLB/search?';
    if (categoryId) {
      url += `category=${categoryId}`;
    }
    if (query) {
      url += `&q=${query}`;
    }

    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
}

export async function getProductById(productId: string) {
  try {
    const response = await fetch(`https://api.mercadolibre.com/items/${productId}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching product details:', error);
    throw error;
  }
}

export async function searchProducts(query: string) {
  try {
    const response = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${query}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error searching products:', error);
    throw error;
  }
}
