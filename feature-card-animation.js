document.addEventListener('DOMContentLoaded', () => {
    const featureCards = document.querySelectorAll('.feature-card');

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                const card = entry.target;
                // 순차적인 애니메이션을 위해 transition-delay를 설정합니다.
                // 각 카드의 인덱스를 기반으로 딜레이를 계산합니다.
                card.style.transitionDelay = `${index * 150}ms`;
                card.classList.add('is-visible');
                observer.unobserve(card); // 한 번 애니메이션된 후에는 관찰을 중단합니다.
            }
        });
    }, {
        rootMargin: '0px',
        threshold: 0.1 // 카드의 10%가 보일 때 애니메이션을 시작합니다.
    });

    featureCards.forEach(card => {
        observer.observe(card);
    });
});