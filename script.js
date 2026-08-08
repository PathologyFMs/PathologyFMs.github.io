document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('modelsContainer');
    const searchInput = document.getElementById('searchInput');
    const categoryFilter = document.getElementById('categoryFilter');

    // Populate Category Filter
    modelData.forEach(cat => {
        const option = document.createElement('option');
        option.value = cat.category;
        option.textContent = cat.category;
        categoryFilter.appendChild(option);
    });

    // Helper to get family tag info based on category
    function getFamilyInfo(category) {
        if (category.includes('Tile-level')) return { text: 'vision SSL', color: 'blue' };
        if (category.includes('Slide-level')) return { text: 'multimodal', color: 'teal' };
        if (category.includes('Vision-Language')) return { text: 'vision-language', color: 'purple' };
        if (category.includes('Generative')) return { text: 'generative', color: 'pink' };
        if (category.includes('Distillation')) return { text: 'distillation', color: 'gray' };
        if (category.includes('Benchmarking')) return { text: 'benchmarking', color: 'orange' };
        return { text: 'control', color: 'gray' };
    }

    // Render Data
    function render(data) {
        container.innerHTML = '';
        
        let hasResults = false;

        data.forEach(categoryGroup => {
            if (categoryGroup.models.length === 0) return;
            hasResults = true;

            const section = document.createElement('div');
            section.className = 'category-section';

            const title = document.createElement('h2');
            title.className = 'category-title';
            title.textContent = categoryGroup.category;
            section.appendChild(title);

            const grid = document.createElement('div');
            grid.className = 'grid';

            const family = getFamilyInfo(categoryGroup.category);

            categoryGroup.models.forEach(model => {
                const card = document.createElement('div');
                card.className = 'card';

                // Setup links
                let linksHTML = '';
                if (model.paper) {
                    linksHTML += `<a href="${model.paper}" target="_blank" class="link-btn link-paper"><i class="ph ph-file-text"></i> Paper</a>`;
                }
                if (model.github) {
                    linksHTML += `<a href="${model.github}" target="_blank" class="link-btn link-github"><i class="ph ph-github-logo"></i> Code</a>`;
                }
                if (model.hf) {
                    linksHTML += `<a href="${model.hf}" target="_blank" class="link-btn link-hf"><i class="ph ph-cube"></i> Model</a>`;
                }

                card.innerHTML = `
                    <div class="card-header">
                        <div class="model-info">
                            <div class="model-name">${model.name}</div>
                            <span class="tag tag-${family.color}">${family.text}</span>
                        </div>
                        <div class="model-year">${model.year}</div>
                    </div>
                    <div class="model-idea">${model.idea}</div>
                    <div class="model-data">
                        <i class="ph ph-database"></i>
                        <span>${model.data}</span>
                    </div>
                    <div class="card-links">
                        ${linksHTML}
                    </div>
                `;
                grid.appendChild(card);
            });

            section.appendChild(grid);
            container.appendChild(section);
        });

        if (!hasResults) {
            container.innerHTML = `
                <div class="empty-state">
                    <i class="ph ph-ghost" style="font-size: 3rem; margin-bottom: 1rem; opacity: 0.5;"></i>
                    <h3>No models found</h3>
                    <p>Try adjusting your search or filters.</p>
                </div>
            `;
        }
    }

    // Filter Logic
    function handleFilters() {
        const searchTerm = searchInput.value.toLowerCase();
        const selectedCategory = categoryFilter.value;

        const filtered = modelData.map(cat => {
            // Category check
            if (selectedCategory !== 'all' && cat.category !== selectedCategory) {
                return { ...cat, models: [] };
            }

            // Search check
            const matchedModels = cat.models.filter(m => 
                m.name.toLowerCase().includes(searchTerm) ||
                m.idea.toLowerCase().includes(searchTerm) ||
                m.data.toLowerCase().includes(searchTerm) ||
                m.year.toString().includes(searchTerm)
            );

            return { ...cat, models: matchedModels };
        });

        render(filtered);
    }

    // Theme Toggle Logic
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    
    // Check saved theme or system preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light' || (!savedTheme && window.matchMedia('(prefers-color-scheme: light)').matches)) {
        document.body.classList.add('light-mode');
        themeIcon.classList.replace('ph-sun', 'ph-moon');
    }

    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
        const isLight = document.body.classList.contains('light-mode');
        
        localStorage.setItem('theme', isLight ? 'light' : 'dark');
        
        if (isLight) {
            themeIcon.classList.replace('ph-sun', 'ph-moon');
        } else {
            themeIcon.classList.replace('ph-moon', 'ph-sun');
        }
    });

    // Listeners
    searchInput.addEventListener('input', handleFilters);
    categoryFilter.addEventListener('change', handleFilters);

    // Initial render
    render(modelData);
});
