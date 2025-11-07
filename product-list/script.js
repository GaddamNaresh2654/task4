// Product Data
const products = [
    {
        id: 1,
        name: "Wireless Headphones",
        category: "electronics",
        price: 79.99,
        rating: 4.5,
        description: "High-quality wireless headphones with noise cancellation"
    },
    {
        id: 2,
        name: "Smart Watch",
        category: "electronics",
        price: 199.99,
        rating: 4.8,
        description: "Advanced fitness tracking and smartphone integration"
    },
    {
        id: 3,
        name: "Laptop Stand",
        category: "electronics",
        price: 45.99,
        rating: 4.2,
        description: "Ergonomic aluminum laptop stand for better posture"
    },
    {
        id: 4,
        name: "Cotton T-Shirt",
        category: "clothing",
        price: 24.99,
        rating: 4.3,
        description: "Comfortable 100% cotton t-shirt in various colors"
    },
    {
        id: 5,
        name: "Denim Jeans",
        category: "clothing",
        price: 59.99,
        rating: 4.6,
        description: "Classic fit denim jeans with stretch fabric"
    },
    {
        id: 6,
        name: "Winter Jacket",
        category: "clothing",
        price: 89.99,
        rating: 4.7,
        description: "Warm and waterproof winter jacket"
    },
    {
        id: 7,
        name: "JavaScript Guide",
        category: "books",
        price: 34.99,
        rating: 4.9,
        description: "Comprehensive guide to modern JavaScript"
    },
    {
        id: 8,
        name: "Web Design Book",
        category: "books",
        price: 29.99,
        rating: 4.4,
        description: "Learn responsive web design principles"
    },
    {
        id: 9,
        name: "Programming Basics",
        category: "books",
        price: 19.99,
        rating: 4.1,
        description: "Introduction to programming for beginners"
    },
    {
        id: 10,
        name: "Coffee Maker",
        category: "home",
        price: 69.99,
        rating: 4.5,
        description: "Programmable coffee maker with thermal carafe"
    },
    {
        id: 11,
        name: "Desk Lamp",
        category: "home",
        price: 39.99,
        rating: 4.3,
        description: "LED desk lamp with adjustable brightness"
    },
    {
        id: 12,
        name: "Throw Pillows",
        category: "home",
        price: 29.99,
        rating: 4.2,
        description: "Set of 2 decorative throw pillows"
    },
    {
        id: 13,
        name: "Tablet",
        category: "electronics",
        price: 299.99,
        rating: 4.7,
        description: "10-inch tablet with high-resolution display"
    },
    {
        id: 14,
        name: "Phone Case",
        category: "electronics",
        price: 15.99,
        rating: 4.0,
        description: "Protective phone case with shock absorption"
    },
    {
        id: 15,
        name: "Running Shoes",
        category: "clothing",
        price: 79.99,
        rating: 4.6,
        description: "Comfortable running shoes with cushioned sole"
    },
    {
        id: 16,
        name: "Cookbook",
        category: "books",
        price: 24.99,
        rating: 4.5,
        description: "Collection of easy-to-follow recipes"
    },
    {
        id: 17,
        name: "Bed Sheets",
        category: "home",
        price: 49.99,
        rating: 4.4,
        description: "Premium cotton bed sheets, set of 2"
    },
    {
        id: 18,
        name: "Bluetooth Speaker",
        category: "electronics",
        price: 54.99,
        rating: 4.3,
        description: "Portable Bluetooth speaker with great sound"
    }
];

class ProductCatalog {
    constructor() {
        this.filteredProducts = [...products];
        this.currentCategory = 'all';
        this.currentPriceFilter = 'all';
        this.currentSort = 'default';
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.render();
    }

    setupEventListeners() {
        // Category filter buttons
        document.querySelectorAll('.filter-btn[data-category]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.filter-btn[data-category]').forEach(b => {
                    b.classList.remove('active');
                });
                e.target.classList.add('active');
                this.currentCategory = e.target.dataset.category;
                this.applyFilters();
            });
        });

        // Price filter radio buttons
        document.querySelectorAll('input[name="priceFilter"]').forEach(radio => {
            radio.addEventListener('change', (e) => {
                this.currentPriceFilter = e.target.value;
                this.applyFilters();
            });
        });

        // Sort select
        document.getElementById('sortSelect').addEventListener('change', (e) => {
            this.currentSort = e.target.value;
            this.applyFilters();
        });

        // Clear filters button
        document.getElementById('clearFilters').addEventListener('click', () => {
            this.clearAllFilters();
        });
    }

    applyFilters() {
        // Filter by category
        let filtered = products;
        if (this.currentCategory !== 'all') {
            filtered = filtered.filter(p => p.category === this.currentCategory);
        }

        // Filter by price
        if (this.currentPriceFilter !== 'all') {
            filtered = filtered.filter(p => {
                const price = p.price;
                switch (this.currentPriceFilter) {
                    case '0-50':
                        return price >= 0 && price <= 50;
                    case '50-100':
                        return price > 50 && price <= 100;
                    case '100+':
                        return price > 100;
                    default:
                        return true;
                }
            });
        }

        // Sort products
        filtered = this.sortProducts(filtered);

        this.filteredProducts = filtered;
        this.render();
    }

    sortProducts(productsToSort) {
        const sorted = [...productsToSort];
        
        switch (this.currentSort) {
            case 'price-low':
                return sorted.sort((a, b) => a.price - b.price);
            case 'price-high':
                return sorted.sort((a, b) => b.price - a.price);
            case 'rating-high':
                return sorted.sort((a, b) => b.rating - a.rating);
            case 'rating-low':
                return sorted.sort((a, b) => a.rating - b.rating);
            case 'name-asc':
                return sorted.sort((a, b) => a.name.localeCompare(b.name));
            case 'name-desc':
                return sorted.sort((a, b) => b.name.localeCompare(a.name));
            default:
                return sorted;
        }
    }

    clearAllFilters() {
        // Reset category filter
        document.querySelectorAll('.filter-btn[data-category]').forEach(b => {
            b.classList.remove('active');
        });
        document.querySelector('.filter-btn[data-category="all"]').classList.add('active');
        this.currentCategory = 'all';

        // Reset price filter
        document.querySelector('input[name="priceFilter"][value="all"]').checked = true;
        this.currentPriceFilter = 'all';

        // Reset sort
        document.getElementById('sortSelect').value = 'default';
        this.currentSort = 'default';

        this.applyFilters();
    }

    render() {
        const productsGrid = document.getElementById('productsGrid');
        const resultsCount = document.getElementById('resultsCount');
        const noResults = document.getElementById('noResults');

        // Update results count
        const count = this.filteredProducts.length;
        resultsCount.textContent = `${count} ${count === 1 ? 'product' : 'products'} found`;

        // Show/hide no results message
        if (count === 0) {
            productsGrid.innerHTML = '';
            noResults.classList.add('show');
        } else {
            noResults.classList.remove('show');
            productsGrid.innerHTML = '';
        }

        // Render products
        this.filteredProducts.forEach(product => {
            const card = this.createProductCard(product);
            productsGrid.appendChild(card);
        });
    }

    createProductCard(product) {
        const card = document.createElement('div');
        card.className = 'product-card';

        // Generate star rating
        const stars = this.generateStars(product.rating);

        // Category display name
        const categoryName = product.category.charAt(0).toUpperCase() + product.category.slice(1);

        card.innerHTML = `
            <div class="product-image">
                ${this.getCategoryEmoji(product.category)}
                <span class="product-category">${categoryName}</span>
            </div>
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-rating">
                    <span class="stars">${stars}</span>
                    <span class="rating-value">(${product.rating})</span>
                </div>
                <div class="product-footer">
                    <span class="product-price">$${product.price.toFixed(2)}</span>
                    <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
                </div>
            </div>
        `;

        // Add click event to add to cart button
        const addToCartBtn = card.querySelector('.add-to-cart');
        addToCartBtn.addEventListener('click', () => {
            this.addToCart(product);
        });

        return card;
    }

    generateStars(rating) {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;
        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

        return '★'.repeat(fullStars) + 
               (hasHalfStar ? '☆' : '') + 
               '☆'.repeat(emptyStars);
    }

    getCategoryEmoji(category) {
        const emojis = {
            electronics: '📱',
            clothing: '👕',
            books: '📚',
            home: '🏠'
        };
        return emojis[category] || '📦';
    }

    addToCart(product) {
        // Simple cart functionality (you can enhance this)
        alert(`Added "${product.name}" to cart!`);
        console.log('Added to cart:', product);
    }
}

// Initialize the catalog when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ProductCatalog();
});
