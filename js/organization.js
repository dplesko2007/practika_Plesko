document.addEventListener('DOMContentLoaded', () => {
  const id = parseInt(getQueryParam('id'));
  const org = ORGANIZATIONS.find(o => o.id === id);

  if (!org) {
    document.body.innerHTML = '<div style="text-align:center;padding:80px">Организация не найдена</div>';
    return;
  }

  const activities = ACTIVITIES.filter(a => a.orgId === id);
  document.title = org.name + ' — Кружки Волжского';

  document.getElementById('orgHero').innerHTML = `
  <div class="container">
  <div class="breadcrumb">
  <a href="index.html">Главная</a>
  <span class="breadcrumb__sep">›</span>
  <a href="catalog.html">Каталог</a>
  <span class="breadcrumb__sep">›</span>
  <span>${org.name}</span>
  </div>
  <div class="org-hero__layout">
  <div class="org-hero__avatar">${org.emoji}</div>
  <div class="org-hero__info">
  <h1>${org.name}</h1>
  <p>${org.description}</p>
  <div class="org-hero__badges">
  <span class="badge"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" width="16" height="16">
    <path stroke-linecap="round" stroke-linejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 0 0-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0Z" />
  </svg> ${org.district}</span>
  ${org.badges.map(b => `<span class="badge">✔ ${b}</span>`).join('')}
  </div>
  </div>
  <div>
  <div class="rating" style="justify-content:flex-end;margin-bottom:8px">
  <span class="stars" style="font-size:1.3rem">${starsHTML(org.rating)}</span>
  <span class="rating__val" style="font-size:1.2rem">${org.rating}</span>
  </div>
  <div style="text-align:right;margin-bottom:16px">
  <div class="meta-row" style="justify-content:flex-end"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" width="16" height="16">
    <path stroke-linecap="round" stroke-linejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 0 0-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0Z" />
  </svg>
  ${org.address}</div>
  <div class="meta-row" style="justify-content:flex-end"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" width="16" height="16">
    <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
  </svg>
  ${org.phone}</div>
  </div>
  </div>
  </div>
  <div class="org-stats">
  <div class="org-stat"><div class="org-stat__val">${org.activitiesCount}</div><div class="org-stat__label">занятий</div></div>
  <div class="org-stat"><div class="org-stat__val">${org.rating}</div><div class="org-stat__label">рейтинг</div></div>
  <div class="org-stat"><div class="org-stat__val">${activities.length}</div><div class="org-stat__label">в каталоге</div></div>
  <div class="org-stat"><div class="org-stat__val">${org.district}</div><div class="org-stat__label">район</div></div>
  </div>
  </div>`;

  document.getElementById('orgActivities').innerHTML = `
  <div class="container section">
  <div class="section-header">
  <div><h2>Занятия организации</h2><p>Все активности, представленные в каталоге</p></div>
  </div>
  <div class="cards-grid">
  ${activities.map(buildActivityCard).join('')}
  </div>
  ${activities.length === 0 ? '<p style="color:var(--ink-muted)">Занятия пока не добавлены</p>' : ''}
  </div>`;
});