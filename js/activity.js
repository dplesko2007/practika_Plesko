

document.addEventListener('DOMContentLoaded', () => {
    const id = parseInt(getQueryParam('id'));
    const activity = ACTIVITIES.find(a => a.id === id);

    if (!activity) {
        document.getElementById('activityContent').innerHTML = `
        <div style="text-align:center;padding:80px 20px">
        <div style="font-size:3rem;margin-bottom:16px"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" width="48" height="48">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
        </svg>
        </div>
        <h2>Занятие не найдено</h2>
        <a href="catalog.html" class="btn btn--primary" style="margin-top:20px;display:inline-flex">← Вернуться в каталог</a>
        </div>`;
        return;
    }

    const org = ORGANIZATIONS.find(o => o.id === activity.orgId);
    document.title = activity.title + ' — КружкиСПб';

    document.getElementById('activityHero').innerHTML = `
    <div class="container">
    <a href="catalog.html" class="activity-hero__back">← Назад в каталог</a>
    <div class="activity-hero__layout">
    <div>
    <div class="activity-hero__icon">${activity.emoji}</div>
    <div class="activity-hero__tags">
    <span class="tag tag--${activity.category}">${activity.categoryLabel}</span>
    <span class="age-badge">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" width="12" height="12">
    <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
    </svg>
    ${activity.ageFrom}–${activity.ageTo === 99 ? '∞' : activity.ageTo} лет</span>
    ${activity.isFree ? '<span class="tag" style="background:#7CFF6B;color:#1A1A2E">БЕСПЛАТНО</span>' : ''}
    </div>
    <h1>${activity.title}</h1>
    <div class="activity-hero__meta">
    <div class="hero-meta-item">
    <span class="hero-meta-item__label">Район</span>
    <span class="hero-meta-item__value"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" width="20" height="20">
    <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
    </svg>
    ${activity.district}</span>
    </div>
    <div class="hero-meta-item">
    <span class="hero-meta-item__label">Рейтинг</span>
    <span class="hero-meta-item__value"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" width="20" height="20">
    <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
    </svg>
    ${activity.rating} (${activity.reviewCount})</span>
    </div>
    <div class="hero-meta-item">
    <span class="hero-meta-item__label">Организация</span>
    <span class="hero-meta-item__value">${org ? org.name : '—'}</span>
    </div>
    </div>
    </div>
    <div class="activity-hero__card">
    <div class="price-block">
    <div class="price-block__label">Стоимость</div>
    <div class="price-block__val">${activity.isFree ? 'Бесплатно' : activity.price.toLocaleString('ru-RU') + ' ₽'}</div>
    ${!activity.isFree ? `<div class="price-block__period">/ ${activity.pricePeriod}</div>` : ''}
    </div>
    <button class="btn btn--white btn--full" onclick="openModal()">Записаться</button>
    <button class="btn btn--outline btn--full" style="margin-top:8px;color:rgba(255,255,255,0.7);border-color:rgba(255,255,255,0.2)" onclick="shareActivity()">Поделиться</button>
    </div>
    </div>
    </div>`;

    document.getElementById('activityContent').innerHTML = `
    <div class="container">
    <div class="breadcrumb">
    <a href="index.html">Главная</a>
    <span class="breadcrumb__sep">›</span>
    <a href="catalog.html">Каталог</a>
    <span class="breadcrumb__sep">›</span>
    <a href="catalog.html?category=${activity.category}">${activity.categoryLabel}</a>
    <span class="breadcrumb__sep">›</span>
    <span>${activity.title}</span>
    </div>
    <div class="activity-body">
    <div class="activity-main">
    <div class="content-block">
    <h3>О занятии</h3>
    <p style="color:var(--ink-muted);line-height:1.8">${activity.fullDescription}</p>
    <div class="divider"></div>
    <div style="display:flex;gap:8px;flex-wrap:wrap">
    ${activity.tags.map(t => `<span class="tag tag--${activity.category}">${t}</span>`).join('')}
    </div>
    </div>
    <div class="content-block">
    <h3>Расписание</h3>
    <table class="schedule-table">
    <thead><tr><th>День</th><th>Время</th></tr></thead>
    <tbody>
    ${activity.schedule.map(s => `<tr><td>${s.day}</td><td>${s.time}</td></tr>`).join('')}
    </tbody>
    </table>
    </div>
    <div class="content-block">
    <h3>Отзывы <span style="color:var(--ink-muted);font-weight:400;font-size:0.9rem">(${activity.reviewCount})</span></h3>
    <div style="margin-bottom:16px">
    <div class="rating">
    <span class="stars" style="font-size:1.1rem">${starsHTML(activity.rating)}</span>
    <span class="rating__val" style="font-size:1.1rem">${activity.rating}</span>
    <span class="rating__count">из 5</span>
    </div>
    </div>
    ${activity.reviews.map(r => `
    <div class="review">
    <div class="review__header">
    <span class="review__author">${r.author}</span>
    <span class="review__date">${r.date} · ${'★'.repeat(r.stars)}</span>
    </div>
    <p class="review__text">${r.text}</p>
    </div>`).join('')}
    </div>
    </div>
    <div class="sidebar-sticky">
    ${org ? `
    <div class="sidebar-card">
    <h4>Организация</h4>
    <div class="org-mini">
    <div class="org-mini__avatar">${org.emoji}</div>
    <div>
    <div class="org-mini__name">${org.name}</div>
    <div class="org-mini__type">${org.type}</div>
    </div>
    </div>
    <a href="organization.html?id=${org.id}" class="btn btn--accent-light btn--full btn--sm">Все занятия организации →</a>
    </div>` : ''}
    <div class="sidebar-card">
    <h4>Контакты</h4>
    <div class="contact-list">
    <div class="contact-item"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" width="24" height="24">
    <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
    </svg>
    ${activity.address}</div>
    <div class="contact-item"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" width="24" height="24">
    <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
    </svg>
    <a href="tel:${activity.phone}">${activity.phone}</a></div>
    <div class="contact-item"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" width="24" height="24">
    <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
    </svg>
    <a href="mailto:${activity.email}">${activity.email}</a></div>
    ${activity.website ? `<div class="contact-item"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" width="24" height="24">
    <path stroke-linecap="round" stroke-linejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
    </svg>
    <a href="https://${activity.website}" target="_blank">${activity.website}</a></div>` : ''}
    </div>
    </div>
    <button class="btn btn--primary btn--full" onclick="openModal()">Записаться на занятие</button>
    </div>
    </div>
    </div>`;

    document.getElementById('modalTitle') && (document.getElementById('modalTitle').textContent = 'Запись на «' + activity.title + '»');

    window.openModal = () => {
        document.getElementById('enrollModal').classList.add('open');
    };
    window.closeModal = () => {
        document.getElementById('enrollModal').classList.remove('open');
    };
    window.submitEnroll = () => {
        const name = document.getElementById('enrollName').value.trim();
        const phone = document.getElementById('enrollPhone').value.trim();
        if (!name || !phone) { showToast('Заполните все поля', '⚠️'); return; }
        document.getElementById('enrollModal').classList.remove('open');
        showToast('Заявка отправлена! Вам перезвонят в течение дня.');
    };

    window.shareActivity = () => {
        if (navigator.share) {
        navigator.share({ title: activity.title, url: window.location.href });
        } else {
            navigator.clipboard.writeText(window.location.href);
            showToast('Ссылка скопирована!', '🔗');
        }
    };
});