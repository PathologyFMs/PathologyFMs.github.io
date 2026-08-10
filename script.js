document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('modelsContainer');
    const searchInput = document.getElementById('searchInput');
    const categoryFilter = document.getElementById('categoryFilter');
    
    // Modal Elements
    const modal = document.getElementById('metadataModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalSubtitle = document.getElementById('modalSubtitle');
    const modalBody = document.getElementById('modalBody');
    const closeModal = document.getElementById('closeModal');

    // Close Modal Logic
    if (closeModal) {
        closeModal.onclick = function() {
            modal.style.display = "none";
        }
    }
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

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
        if (catLower.includes('adaptation')) return { text: 'adaptation', color: 'blue' };
        if (catLower.includes('survey')) return { text: 'survey', color: 'gray' };
        if (catLower.includes('interpretability')) return { text: 'analysis', color: 'pink' };
        return { text: 'control', color: 'gray' };
    }

    function formatField(text) {
        if (!text) return '';
        // Replace **text** with <strong>text</strong> or just strip. Let's use strong.
        return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    }

    // Show Modal Function
    function openModal(model) {
        modalTitle.textContent = model.name;
        
        if (model.paper_title || model.paper_author) {
            let subtitleHtml = '';
            if (model.paper_title) {
                subtitleHtml += model.paper_title;
            }
            if (model.paper_author) {
                subtitleHtml += (subtitleHtml ? ' — ' : '') + model.paper_author + ' et al.';
            }
            modalSubtitle.textContent = subtitleHtml;
            modalSubtitle.style.display = 'block';
        } else {
            modalSubtitle.style.display = 'none';
        }
        
        let rowsHtml = '';
        
        const fields = [
            { label: 'Pretraining WSIs', value: model.audit_wsis },
            { label: 'Patches / tiles', value: model.audit_patches },
            { label: 'Image-text pairs', value: model.audit_image_text },
            { label: 'WSI-report pairs', value: model.audit_wsi_report },
            { label: 'Image-omics pairs', value: model.audit_image_omics },
            { label: 'Organs / tissues', value: model.audit_organs },
            { label: 'Downstream evaluation', value: model.audit_downstream },
            { label: 'Cohorts / institutions', value: model.audit_cohorts },
            { label: 'Dataset notes', value: model.audit_notes }
        ];

        fields.forEach(field => {
            if (field.value && field.value.replace(/\*/g, '').trim() !== 'Not found') {
                let displayValue = field.value.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
                rowsHtml += `<tr><th>${field.label}</th><td>${displayValue}</td></tr>`;
            }
        });

        if (rowsHtml === '') {
            modalBody.innerHTML = '<p style="color: var(--text-muted); text-align: center; padding: 2rem;">No detailed metadata found for this model.</p>';
        } else {
            modalBody.innerHTML = `
                <table class="modal-table">
                    <tbody>
                        ${rowsHtml}
                    </tbody>
                </table>
            `;
        }
        
        modal.style.display = "block";
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
                            <th>${categoryGroup.category.includes('Survey') ? 'Paper' : categoryGroup.category.includes('Benchmarking') ? 'Framework/Benchmark' : 'Model'}</th>
                            <th>Year</th>
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
                        <td class="expand-col"><button class="expand-btn" title="View Detailed Metadata"><i class="ph ph-arrows-out-simple"></i></button></td>
                        <td>
                            <div class="model-info-col">
                                <div class="model-name">${model.name}</div>
                                <span class="tag tag-${model.tag_color || family.color}">${model.tag || family.text}</span>
                            </div>
                        </td>
                        <td><span class="year-badge">${model.year}</span></td>
                        <td class="idea-col">${formatField(model.audit_notes) || model.idea}</td>
                        <td><div class="links-col">${linksHTML}</div></td>
                    `;
                    
                    // Modal logic
                    tr.querySelector('.expand-btn').addEventListener('click', function() {
                        openModal(model);
                    });

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
                                <span class="tag tag-${model.tag_color || family.color}">${model.tag || family.text}</span>
                            </div>
                            <div class="model-year">${model.year}</div>
                        </div>
                        <div class="model-idea">${formatField(model.audit_notes) || model.idea}</div>
                        <div class="model-data">
                            <i class="ph ph-database"></i>
                            <span>${formatField(model.audit_wsis) || model.data}</span>
                        </div>
                        <div class="card-links">
                            ${linksHTML}
                        </div>
                        <button class="card-expand-btn">
                            Detailed Metadata <i class="ph ph-arrows-out-simple"></i>
                        </button>
                    `;

                    // Modal logic
                    card.querySelector('.card-expand-btn').addEventListener('click', function() {
                        openModal(model);
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
