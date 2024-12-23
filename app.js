const products = [
    { name: 'Phone', price: 800, category: 'electronics' },
    { name: 'Laptop', price: 1500, category: 'electronics' },
    { name: 'Tablet', price: 400, category: 'electronics' },
    { name: 'Chair', price: 200, category: 'furniture' },
    { name: 'Sofa', price: 700, category: 'furniture' },
    { name: 'Desk', price: 300, category: 'furniture' },
    { name: 'Monitor', price: 300, category: 'electronics' },
    { name: 'Mouse', price: 50, category: 'electronics' },
    { name: 'Keyboard', price: 100, category: 'electronics' },
    { name: 'Bed', price: 1000, category: 'furniture' },
    { name: 'Wardrobe', price: 1200, category: 'furniture' },
    { name: 'Dining Table', price: 900, category: 'furniture' },
    { name: 'Headphones', price: 150, category: 'electronics' },
    { name: 'Bookshelf', price: 400, category: 'furniture' },
    { name: 'Gaming Console', price: 500, category: 'electronics' },
    { name: 'Refrigerator', price: 1800, category: 'appliances' },
    { name: 'Washing Machine', price: 1500, category: 'appliances' },
    { name: 'Microwave', price: 300, category: 'appliances' },
    { name: 'Air Conditioner', price: 2500, category: 'appliances' },
    { name: 'Blender', price: 100, category: 'appliances' }
  ];
  
  let filteredProducts = [...products];
  let currentPage = 1;
  const productsPerPage = 3;
  
  const categoryFilter = document.getElementById('categoryFilter');
  const sortSelect = document.getElementById('sortSelect');
  const productGallery = document.getElementById('productGallery');
  const prevPageButton = document.getElementById('prevPage');
  const nextPageButton = document.getElementById('nextPage');
  const pageNumber = document.getElementById('pageNumber');
  
  function renderProducts() {
    productGallery.innerHTML = '';
    const start = (currentPage - 1) * productsPerPage;
    const end = start + productsPerPage;
    const productsToDisplay = filteredProducts.slice(start, end);
  
    productsToDisplay.forEach(product => {
      const productElement = document.createElement('div');
      productElement.classList.add('product-item');
      productElement.innerHTML = `
        <h3>${product.name}</h3>
        <p>Price: $${product.price}</p>
        <p>Category: ${product.category}</p>
      `;
      productGallery.appendChild(productElement);
    });
  
    prevPageButton.disabled = currentPage === 1;
    nextPageButton.disabled = currentPage * productsPerPage >= filteredProducts.length;
    pageNumber.textContent = `Page ${currentPage}`;
  }
  
  function filterProducts() {
    const selectedCategory = categoryFilter.value;
    filteredProducts = products.filter(product => 
      !selectedCategory || product.category === selectedCategory
    );
    currentPage = 1;
    renderProducts();
  }
  
  function sortProducts() {
    const selectedSort = sortSelect.value;
  
    if (selectedSort === 'price-asc') {
      filteredProducts.sort((a, b) => a.price - b.price);
    } else if (selectedSort === 'price-desc') {
      filteredProducts.sort((a, b) => b.price - a.price);
    } else if (selectedSort === 'name-asc') {
      filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
    } else if (selectedSort === 'name-desc') {
      filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
    }
  
    renderProducts();
  }
  
  function handlePagination(direction) {
    if (direction === 'next' && currentPage * productsPerPage < filteredProducts.length) {
      currentPage++;
    } else if (direction === 'prev' && currentPage > 1) {
      currentPage--;
    }
    renderProducts();
  }
  
  categoryFilter.addEventListener('change', () => {
    filterProducts();
    sortProducts();
  });
  
  sortSelect.addEventListener('change', () => {
    sortProducts();
  });
  
  prevPageButton.addEventListener('click', () => handlePagination('prev'));
  nextPageButton.addEventListener('click', () => handlePagination('next'));
  
  renderProducts();
  