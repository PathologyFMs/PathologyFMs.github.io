document.addEventListener('DOMContentLoaded', () => {
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

    function generateAuditHTML(model) {
        return `
            <div class="audit-details">
                <table class="audit-table">
                    <tbody>
                        <tr><th>Pretraining WSIs</th><td>${model.audit_wsis || 'Not found'}</td></tr>
                        <tr><th>Patches / tiles</th><td>${model.audit_patches || 'Not found'}</td></tr>
                        <tr><th>Image-text pairs</th><td>${model.audit_image_text || 'Not found'}</td></tr>
                        <tr><th>WSI-report pairs</th><td>${model.audit_wsi_report || 'Not found'}</td></tr>
                        <tr><th>Image-omics pairs</th><td>${model.audit_image_omics || 'Not found'}</td></tr>
                        <tr><th>Organs / tissues</th><td>${model.audit_organs || 'Not found'}</td></tr>
                        <tr><th>Downstream evaluation</th><td>${model.audit_downstream || 'Not found'}</td></tr>
                        <tr><th>Cohorts / institutions</th><td>${model.audit_cohorts || 'Not found'}</td></tr>
                        <tr><th>Dataset notes</th><td>${model.audit_notes || 'Not found'}</td></tr>
                    </tbody>
                </table>
            </div>
        `;
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
                            <th class="expand-col"></th>
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
                    tr.className = 'main-row';
                    
                    let linksHTML = '';
                    if (model.paper) linksHTML += `<a href="${model.paper}" target="_blank" class="icon-link paper" title="Paper"><i class="ph ph-file-text"></i></a>`;
                    if (model.github) linksHTML += `<a href="${model.github}" target="_blank" class="icon-link github" title="Code"><i class="ph ph-github-logo"></i></a>`;
                    if (model.hf) linksHTML += `<a href="${model.hf}" target="_blank" class="icon-link hf" title="Hugging Face Model"><i class="ph ph-cube"></i></a>`;
                    if (model.website) linksHTML += `<a href="${model.website}" target="_blank" class="icon-link website" title="Website"><i class="ph ph-globe"></i></a>`;

                    tr.innerHTML = `
                        <td class="expand-col"><button class="expand-btn"><i class="ph ph-caret-down"></i></button></td>
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
                    
                    const detailsTr = document.createElement('tr');
                    detailsTr.className = 'details-row';
                    detailsTr.innerHTML = `
                        <td colspan="6" class="details-cell">
                            <div class="details-content">
                                ${generateAuditHTML(model)}
                            </div>
                        </td>
                    `;

                    // Toggle logic
                    tr.querySelector('.expand-btn').addEventListener('click', function() {
                        const isExpanded = tr.classList.contains('expanded');
                        if (isExpanded) {
                            tr.classList.remove('expanded');
                            detailsTr.classList.remove('expanded');
                        } else {
                            tr.classList.add('expanded');
                            detailsTr.classList.add('expanded');
                        }
                    });

                    tbody.appendChild(tr);
                    tbody.appendChild(detailsTr);
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
                        <button class="card-expand-btn">
                            Detailed Metadata <i class="ph ph-caret-down"></i>
                        </button>
                        <div class="card-details-content">
                            ${generateAuditHTML(model)}
                        </div>
                    `;

                    // Toggle logic
                    card.querySelector('.card-expand-btn').addEventListener('click', function() {
                        const isExpanded = card.classList.contains('expanded');
                        if (isExpanded) {
                            card.classList.remove('expanded');
                        } else {
                            card.classList.add('expanded');
                        }
                    });

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
            const bibtex = `@misc{pfms2026,\n  author = {Chanda, Dibaloke},\n  title = {Pathology Foundation Models (PFMs)},\n  year = {2026},\n  publisher = {GitHub},\n  journal = {GitHub repository},\n  howpublished = {\\url{https://github.com/dibalokechanda/PFMs}}\n}`;
            navigator.clipboard.writeText(bibtex).then(() => {
                const originalText = bibtexBtn.innerHTML;
                bibtexBtn.innerHTML = '<i class="ph ph-check"></i> Copied!';
                setTimeout(() => { bibtexBtn.innerHTML = originalText; }, 2000);
            });
        });
    }

    render(modelData);
});
