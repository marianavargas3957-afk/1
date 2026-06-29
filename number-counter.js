document.addEventListener('DOMContentLoaded', () => {
    // Select all stat numbers in both hero and stats-banner sections
    const statNumbers = document.querySelectorAll('.hero-stats .stat-number, .stats-banner .stat-number');
    const animationDuration = 4000; // 애니메이션 지속 시간 (밀리초) - 4초로 설정

    // 숫자를 형식에 맞게 포맷하는 헬퍼 함수
    const formatNumber = (num, suffix) => {
        // 숫자가 0일 때의 특별 처리: 불필요한 접미사(예: "0M+")를 피하고 "0" 또는 "0%"로 표시
        if (num === 0) {
            return suffix === '%' ? '0%' : '0';
        }

        if (suffix === 'M+') {
            return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M+';
        } else if (suffix === 'k+') {
            return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'k+';
        } else if (suffix === 'k') {
            return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
        } else if (suffix === '%') {
            return Math.round(num) + '%';
        } else if (suffix === '+') {
            return Math.round(num).toLocaleString() + '+';
        }
        return Math.round(num).toLocaleString();
    };

    // 숫자 애니메이션을 처리하는 메인 함수
    const animateNumber = (element, targetValue, suffix, duration) => {
        let startValue = 0;
        const startTime = performance.now();

        const updateCount = (currentTime) => {
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / duration, 1);
            const currentValue = startValue + (targetValue - startValue) * progress;

            element.textContent = formatNumber(currentValue, suffix);

            if (progress < 1) {
                requestAnimationFrame(updateCount);
            } else {
                // 애니메이션 종료 후 최종 값이 정확하도록 설정
                element.textContent = formatNumber(targetValue, suffix);
            }
        };
        requestAnimationFrame(updateCount);
    };

    // Intersection Observer를 사용하여 요소가 뷰포트에 들어올 때 애니메이션 트리거
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const target = parseFloat(element.dataset.target);
                const suffix = element.dataset.suffix || '';

                element.textContent = '0'; // Set initial text to 0 before animation
                element.classList.add('is-visible'); // CSS 클래스로 부드럽게 보이게 함
                animateNumber(element, target, suffix, animationDuration); // 애니메이션 시작
                observer.unobserve(element); // 한 번만 실행
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(stat => observer.observe(stat));
});