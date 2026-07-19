document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const categoryType = urlParams.get('type');
    
    if (categoryType) {
        document.getElementById('categoryTitle').textContent = categoryType;
        fetchProducts(categoryType);
    } else {
        document.getElementById('categoryTitle').textContent = 'All Categories';
    }

    function fetchProducts(category) {
        // Fetch from Django API running on Render
        fetch(`https://vs-sport-3.onrender.com/api/products/?category=${encodeURIComponent(category)}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                renderProducts(data);
            })
            .catch(error => {
                console.error('Error fetching products:', error);
                document.getElementById('noProductsMessage').style.display = 'block';
                document.getElementById('noProductsMessage').innerHTML = '<h3>Error loading products. Make sure the backend is running.</h3>';
            });
    }

    function renderProducts(products) {
        const grid = document.getElementById('productsGrid');
        const noProductsMessage = document.getElementById('noProductsMessage');
        
        grid.innerHTML = '';
        
        if (products.length === 0) {
            noProductsMessage.style.display = 'block';
            return;
        }

        noProductsMessage.style.display = 'none';

        products.forEach(product => {
            const card = document.createElement('div');
            card.className = 'product-card';
            
            // Django media url prefix for images
            const imageUrl = product.image ? `https://vs-sport-3.onrender.com/media/${product.image}` : '/images/products/kit.jpg';

            card.innerHTML = `
              <div class="product-img-wrapper">
                <img
                  src="${imageUrl}"
                  alt="${product.name}"
                  style="max-height: 200px; object-fit: contain; width: 100%"
                />
              </div>
              <div class="product-info">
                <h4 class="product-name">${product.name}</h4>
                <div class="product-price">$${product.price}</div>
                <button class="btn btn-outline product-btn">
                  View Details
                </button>
              </div>
            `;
            grid.appendChild(card);
        });
    }
});
