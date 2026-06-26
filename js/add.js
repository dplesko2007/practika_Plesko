document.addEventListener('DOMContentLoaded', () => {
    let currentStep = 1;
    const totalSteps = 3;

    const steps = document.querySelectorAll('.form-step');
    const sections = document.querySelectorAll('.form-section[data-step]');
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');
    const submitBtn = document.getElementById('submitBtn');

    function updateView() {
        steps.forEach((s, i) => {
            s.classList.remove('active', 'done');
            if (i + 1 === currentStep) s.classList.add('active');
            if (i + 1 < currentStep) s.classList.add('done');
            s.querySelector('.step-dot').textContent = i + 1 < currentStep ? '✓' : i + 1;
        });

        sections.forEach(sec => {
            sec.style.display = parseInt(sec.dataset.step) === currentStep ? 'block' : 'none';
        });

        prevBtn.style.display = currentStep > 1 ? 'inline-flex' : 'none';
        nextBtn.style.display = currentStep < totalSteps ? 'inline-flex' : 'none';
        submitBtn.style.display = currentStep === totalSteps ? 'inline-flex' : 'none';
    }

    if (nextBtn) nextBtn.addEventListener('click', () => {
        if (currentStep < totalSteps) { currentStep++; updateView(); window.scrollTo(0,0) }
    });
    if (prevBtn) prevBtn.addEventListener('click', () => {
        if (currentStep > 1) { currentStep--; updateView(); window.scrollTo(0,0); }
    });

    if (submitBtn) submitBtn.addEventListener('click', () => {
        const title = document.getElementById('addTitle')?.value.trim();
        const org = document.getElementById('addOrg')?.value.trim();
        if (!title || !org) { showToast('Заполните обязательные поля', '⚠️'); return; }

        document.getElementById('addForm').style.display = 'none';
        document.getElementById('addSuccess').style.display = 'block';
    });

    const catSel = document.getElementById('addCategory');
    if (catSel) {
        CATEGORIES.forEach(c => {
            catSel.innerHTML += `<option value="${c.id}">${c.emoji} ${c.label}</option>`;
        });
    }

    const distSel = document.getElementById('addDistrict');
    if (distSel) {
        DISTRICTS.forEach(d => {
            distSel.innerHTML += `<option value="${d}">${d}</option>`;
        });
    }

    updateView();
});
