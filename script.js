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
        const catLower = category.toLowerCase();
        if (catLower.includes('tile-level')) return { text: 'vision SSL', color: 'blue' };
        if (catLower.includes('slide-level')) return { text: 'multimodal', color: 'teal' };
        if (catLower.includes('vision-language')) return { text: 'vision-language', color: 'purple' };
        if (catLower.includes('generative')) return { text: 'generative', color: 'pink' };
        if (catLower.includes('distillation')) return { text: 'distillation', color: 'gray' };
        if (catLower.includes('benchmarking')) return { text: 'benchmarking', color: 'orange' };
        if (catLower.includes('molecular')) return { text: 'molecular', color: 'green' };
        if (catLower.includes('segmentation')) return { text: 'segmentation', color: 'yellow' };
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

            const tableWrapper = document.createElement('div');
            tableWrapper.className = 'table-responsive';

            const table = document.createElement('table');
            table.className = 'models-table';

            table.innerHTML = `
                <thead>
                    <tr>
                        <th>Model</th>
                        <th>Year</th>
                        <th>Pretraining Data</th>
                        <th>Key Idea</th>
                        <th>Resources</th>
                    </tr>
                </thead>
                <tbody></tbody>
            `;
            
            const tbody = table.querySelector('tbody');
            const family = getFamilyInfo(categoryGroup.category);

            categoryGroup.models.forEach(model => {
                const tr = document.createElement('tr');

                // Setup icon links
                let linksHTML = '';
                if (model.paper) {
                    linksHTML += `<a href="${model.paper}" target="_blank" class="icon-link paper" title="Paper"><i class="ph ph-file-text"></i></a>`;
                }
                if (model.github) {
                    linksHTML += `<a href="${model.github}" target="_blank" class="icon-link github" title="Code"><i class="ph ph-github-logo"></i></a>`;
                }
                if (model.hf) {
                    linksHTML += `<a href="${model.hf}" target="_blank" class="icon-link hf" title="Hugging Face Model"><i class="ph ph-cube"></i></a>`;
                }
                if (model.website) {
                    linksHTML += `<a href="${model.website}" target="_blank" class="icon-link website" title="Website"><i class="ph ph-globe"></i></a>`;
                }

                tr.innerHTML = `
                    <td>
                        <div class="model-info-col">
                            <div class="model-name">${model.name}</div>
                            <span class="tag tag-${family.color}">${family.text}</span>
                        </div>
                    </td>
                    <td><span class="year-badge">${model.year}</span></td>
                    <td class="data-col">${model.data}</td>
                    <td class="idea-col">${model.idea}</td>
                    <td>
                        <div class="links-col">
                            ${linksHTML}
                        </div>
                    </td>
                `;
                tbody.appendChild(tr);
            });

            tableWrapper.appendChild(table);
            section.appendChild(tableWrapper);
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
