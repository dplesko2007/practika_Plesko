document.addEventListener('DOMContentLoaded', () => {
    let filtered = [...ACTIVITIES];
    let activeCategory = getQueryParam('category') || '';
    let activeDistrict = getQueryParam('district') || '';
    let activeSearch = getQueryParam('q') || '';
    let onlyFree = getQueryParam('free') === '1';
    let sortBy = 'rating';

    const grid = document.getElementById('catalogGrid');
    const countEl = document.getElementById('resultCount');
    const activeFiltersEl = document.getElementById('activeFilters');
    const searchInput = document.getElementById('catalogSearch');

    if (searchInput && activeSearch) searchInput.value = activeSearch;

    const catList = document.getElementById('catFilterList');
    if (catList) {
        CATEGORIES.forEach(cat => {
            catList.innerHTML += `
            <label class="filter-option">
            <input type="checkbox" name="cat" value="${cat.id}" ${activeCategory === cat.id ? 'checked' : ''}>
            ${cat.emoji} ${cat.label}
            </label>`;
        });
        catList.querySelectorAll('input[name="cat"]').forEach(cb => {
            cb.addEventListener('change', () => {
                const checked = catList.querySelectorAll('input[name="cat"]:checked');
                activeCategory = checked.length === 1 ? checked[0].value : '';
                applyFilters();
            });
        });
    }

    // Заполнить районы
    const distList = document.getElementById('distFilterList');
    if (distList) {
        DISTRICTS.forEach(d => {
            distList.innerHTML += `
            <label class="filter-option">
            <input type="radio" name="dist" value="${d}" ${activeDistrict === d ? 'checked' : ''}>
            ${d}
            </label>`;
        });
        distList.querySelectorAll('input[name="dist"]').forEach(rb => {
            rb.addEventListener('change', (e) => {
                activeDistrict = e.target.value;
                applyFilters();
            });
        });
    }

    const freeCheck = document.getElementById('freeCheck');
    if (freeCheck) {
        freeCheck.checked = onlyFree;
        freeCheck.addEventListener('change', () => { onlyFree = freeCheck.checked; applyFilters(); });
    }

    if (searchInput) {
        searchInput.addEventListener('input', () => { activeSearch = searchInput.value; applyFilters(); });
    }

    const sortSel = document.getElementById('sortSelect');
    if (sortSel) {
        sortSel.addEventListener('change', () => { sortBy = sortSel.value; applyFilters(); });
    }

    document.querySelectorAll('.filter-reset').forEach(btn => {
        btn.addEventListener('click', () => {
            activeCategory = ''; activeDistrict = ''; onlyFree = false; activeSearch = '';
            if (searchInput) searchInput.value = '';
            if (freeCheck) freeCheck.checked = false;
            catList && catList.querySelectorAll('input').forEach(i => i.checked = false);
            distList && distList.querySelectorAll('input').forEach(i => i.checked = false);
            applyFilters();
        });
    });

    function applyFilters() {
        filtered = ACTIVITIES.filter(a => {
            if (activeCategory && a.category !== activeCategory) return false;
            if (activeDistrict && a.district !== activeDistrict) return false;
            if (onlyFree && !a.isFree) return false;
            if (activeSearch) {
            const q = activeSearch.toLowerCase();
            if (!a.title.toLowerCase().includes(q) && !a.description.toLowerCase().includes(q) && !a.categoryLabel.toLowerCase().includes(q)) return false;
            }
            return true;
        });

        if (sortBy === 'rating') filtered.sort((a, b) => b.rating - a.rating);
        else if (sortBy === 'price_asc') filtered.sort((a, b) => a.price - b.price);
        else if (sortBy === 'price_desc') filtered.sort((a, b) => b.price - a.price);

        render();
        renderActiveFilters();
    }

    function render() {
        if (!grid) return;
        countEl && (countEl.innerHTML = `Найдено: <strong>${filtered.length}</strong> занятий`);

        if (filtered.length === 0) {
            grid.innerHTML = `
            <div class="no-results" style="grid-column:1/-1">
            <div class="no-results__icon">🔍</div>
            <h3>Ничего не найдено</h3>
            <p>Попробуйте изменить фильтры или поисковый запрос</p>
            </div>`;
            return;
        }
        grid.innerHTML = filtered.map(buildActivityCard).join('');
    }

    function renderActiveFilters() {
        if (!activeFiltersEl) return;
        const filters = [];
        if (activeCategory) {
            const cat = CATEGORIES.find(c => c.id === activeCategory);
            if (cat) filters.push({ label: cat.emoji + ' ' + cat.label, key: 'cat' });
        }
        if (activeDistrict) filters.push({ label: '📍 ' + activeDistrict, key: 'dist' });
        if (onlyFree) filters.push({ label: '💚 Бесплатно', key: 'free' });
        if (activeSearch) filters.push({ label: '🔎 ' + activeSearch, key: 'search' });

        activeFiltersEl.innerHTML = filters.map(f => `
        <span class="active-filter">
        ${f.label}
        <button onclick="removeFilter('${f.key}')">×</button>
        </span>`).join('');
    }

    window.removeFilter = (key) => {
        if (key === 'cat') { activeCategory = ''; catList && catList.querySelectorAll('input').forEach(i => i.checked = false); }
        if (key === 'dist') { activeDistrict = ''; distList && distList.querySelectorAll('input').forEach(i => i.checked = false); }
        if (key === 'free') { onlyFree = false; if (freeCheck) freeCheck.checked = false; }
        if (key === 'search') { activeSearch = ''; if (searchInput) searchInput.value = ''; }
        applyFilters();
    };

    applyFilters();
});