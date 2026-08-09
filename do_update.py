import sys
import re

# 1. Update script.js
new_script_content = """document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('modelsContainer');
    const searchInput = document.getElementById('searchInput');
    const categoryFilter = document.getElementById('categoryFilter');
    
    // View state
    let currentView = 'table';
    const gridBtn = document.getElementById('gridBtn');
    const tableBtn = document.getElementById('tableBtn');

    // View toggle logic
    if (gridBtn && tableBtn) {
        gridBtn.addEventListener('click', () => {
            currentView = 'grid';
            gridBtn.classList.add('active');
            tableBtn.classList.remove('active');
            handleFilters();
        });
        tableBtn.addEventListener('click', () => {
            currentView = 'table';
            tableBtn.classList.add('active');
            gridBtn.classList.remove('active');
            handleFilters();
        });
    }

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

            const family = getFamilyInfo(categoryGroup.category);

            if (currentView === 'table') {
                // TABLE VIEW
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
                
                categoryGroup.models.forEach(model => {
                    const tr = document.createElement('tr');
                    let linksHTML = '';
                    if (model.paper) linksHTML += `<a href="${model.paper}" target="_blank" class="icon-link paper" title="Paper"><i class="ph ph-file-text"></i></a>`;
                    if (model.github) linksHTML += `<a href="${model.github}" target="_blank" class="icon-link github" title="Code"><i class="ph ph-github-logo"></i></a>`;
                    if (model.hf) linksHTML += `<a href="${model.hf}" target="_blank" class="icon-link hf" title="Hugging Face Model"><i class="ph ph-cube"></i></a>`;
                    if (model.website) linksHTML += `<a href="${model.website}" target="_blank" class="icon-link website" title="Website"><i class="ph ph-globe"></i></a>`;

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
                        <td><div class="links-col">${linksHTML}</div></td>
                    `;
                    tbody.appendChild(tr);
                });
                tableWrapper.appendChild(table);
                section.appendChild(tableWrapper);
            } else {
                // GRID VIEW
                const grid = document.createElement('div');
                grid.className = 'grid';
                
                categoryGroup.models.forEach(model => {
                    const card = document.createElement('div');
                    card.className = 'card';
                    let linksHTML = '';
                    if (model.paper) linksHTML += `<a href="${model.paper}" target="_blank" class="link-btn link-paper"><i class="ph ph-file-text"></i> Paper</a>`;
                    if (model.github) linksHTML += `<a href="${model.github}" target="_blank" class="link-btn link-github"><i class="ph ph-github-logo"></i> Code</a>`;
                    if (model.hf) linksHTML += `<a href="${model.hf}" target="_blank" class="link-btn link-hf"><i class="ph ph-cube"></i> Model</a>`;
                    if (model.website) linksHTML += `<a href="${model.website}" target="_blank" class="link-btn link-website"><i class="ph ph-globe"></i> Website</a>`;

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
            }

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

    function handleFilters() {
        const searchTerm = searchInput.value.toLowerCase();
        const selectedCategory = categoryFilter.value;
        const filtered = modelData.map(cat => {
            if (selectedCategory !== 'all' && cat.category !== selectedCategory) {
                return { ...cat, models: [] };
            }
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

    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'light' || (!savedTheme && window.matchMedia('(prefers-color-scheme: light)').matches)) {
        document.body.classList.add('light-mode');
        themeIcon.classList.replace('ph-sun', 'ph-moon');
    }

    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
        const isLight = document.body.classList.contains('light-mode');
        localStorage.setItem('theme', isLight ? 'light' : 'dark');
        if (isLight) themeIcon.classList.replace('ph-sun', 'ph-moon');
        else themeIcon.classList.replace('ph-moon', 'ph-sun');
    });

    searchInput.addEventListener('input', handleFilters);
    categoryFilter.addEventListener('change', handleFilters);

    const bibtexBtn = document.getElementById('bibtexBtn');
    if (bibtexBtn) {
        bibtexBtn.addEventListener('click', () => {
            const bibtex = `@misc{pfms2026,\\n  author = {Chanda, Dibaloke},\\n  title = {Pathology Foundation Models (PFMs)},\\n  year = {2026},\\n  publisher = {GitHub},\\n  journal = {GitHub repository},\\n  howpublished = {\\\\url{https://github.com/dibalokechanda/PFMs}}\\n}`;
            navigator.clipboard.writeText(bibtex).then(() => {
                const originalText = bibtexBtn.innerHTML;
                bibtexBtn.innerHTML = '<i class="ph ph-check"></i> Copied!';
                setTimeout(() => { bibtexBtn.innerHTML = originalText; }, 2000);
            });
        });
    }

    render(modelData);
});
"""

with open('/users/home/dchanda/pfm_website/script.js', 'w') as f:
    f.write(new_script_content)

# 2. Update style.css
css_addition = """
.view-toggle {
    display: flex;
    background: var(--card-bg);
    border: 1px solid var(--card-border);
    border-radius: 12px;
    overflow: hidden;
    backdrop-filter: blur(12px);
}

.view-btn {
    background: transparent;
    border: none;
    color: var(--text-secondary);
    padding: 0.8rem 1.2rem;
    font-size: 1.2rem;
    cursor: pointer;
    transition: all 0.2s ease;
}

.view-btn.active {
    background: rgba(99, 102, 241, 0.2);
    color: var(--accent-1);
}

.view-btn:hover:not(.active) {
    background: rgba(255, 255, 255, 0.05);
    color: var(--text-primary);
}
"""
with open('/users/home/dchanda/pfm_website/style.css', 'a') as f:
    f.write(css_addition)

# 3. Update index.html
html_insert = """            <div class="view-toggle">
                <button id="gridBtn" class="view-btn" aria-label="Grid View"><i class="ph ph-squares-four"></i></button>
                <button id="tableBtn" class="view-btn active" aria-label="Table View"><i class="ph ph-list-dashes"></i></button>
            </div>
"""

with open('/users/home/dchanda/pfm_website/index.html', 'r') as f:
    html_content = f.read()

# Insert the toggle right after the filter-box
html_content = html_content.replace('</select>\\n            </div>', '</select>\\n            </div>\\n' + html_insert)

with open('/users/home/dchanda/pfm_website/index.html', 'w') as f:
    f.write(html_content)

print("Update complete")
