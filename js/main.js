function renderNav() {
    const path = window.location.pathname;
    const links = document.querySelectorAll('.nav__links a');
    links.forEach(link => {
        const href = link.getAttribute('href');
        if (path.endsWith(href) || (href === 'index.html' && (path === '/' || path.endsWith('/')))) {
            link.classList.add('active');
        }
    });
}

function showToast(message, icon = '✅') {
    const existing = document.querySelector('.toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<span class="toast__icon">${icon}</span><span>${message}</span>`;
    document.body.appendChild(toast);

    requestAnimationFrame(() => {
        requestAnimationFrame(() => toast.classList.add('show'));
    });

    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

function getQueryParam(name) {
    return new URLSearchParams(window.location.search).get(name);
}

function starsHTML(rating) {
    const full = Math.floor(rating);
    const half = rating % 1 >= 0.5 ? 1 : 0;
    const empty = 5 - full - half;
    return '★'.repeat(full) + (half ? '½' : '') + '☆'.repeat(empty);
}

function formatPrice(activity) {
    if (activity.isFree) return '<span class="price price--free">Бесплатно</span>';
    return `<span class="price">${activity.price.toLocaleString('ru-RU')} ₽ / ${activity.pricePeriod}</span>`;
}

function buildActivityCard(activity) {
    const org = ORGANIZATIONS.find(o => o.id === activity.orgId);
    return `
    <div class="activity-card" onclick="window.location='activity.html?id=${activity.id}'">
    <div class="activity-card__img">
    <span>${activity.emoji}</span>
    ${activity.isFree ? '<span class="activity-card__free">БЕСПЛАТНО</span>' : ''}
    </div>
    <div class="activity-card__body">
    <div class="activity-card__tags">
    <span class="tag tag--${activity.category}">${activity.categoryLabel}</span>
    <span class="age-badge"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" width="16" height="16">
    <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
    </svg>
    ${activity.ageFrom}–${activity.ageTo === 99 ? '∞' : activity.ageTo} лет</span>
    </div>
    <h3>${activity.title}</h3>
    <p>${activity.description.substring(0, 90)}...</p>
    <div class="activity-card__meta">
    <div class="meta-row">
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
    ${activity.district}, ${activity.address.split('(')[0].trim()}
    </div>
    <div class="meta-row">
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
    ${activity.schedule.map(s => s.day).join(', ')}
    </div>
    ${org ? `<div class="meta-row"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" width="16" height="16">
    <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
    </svg>
    ${org.name}</div>` : ''}
    </div>
    <div class="activity-card__footer">
    ${formatPrice(activity)}
    <div class="rating">
    <span class="stars">${starsHTML(activity.rating)}</span>
    <span class="rating__val">${activity.rating}</span>
    </div>
    </div>
    </div>
    </div>
    `;
}

document.addEventListener('DOMContentLoaded', renderNav);