(function() {
    const canvas = document.getElementById('hero-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width, height;

    // Mouse position variables for parallax effect
    let mouseX = 0;
    let mouseY = 0;

    // 파티클 설정
    const PARTICLE_COUNT = 120;
    const particles = [];

    // 색상 팔레트 (PlayCanvas 스타일)
    const colors = [
        'rgba(241, 103, 38, 0.4)',
        'rgba(241, 103, 38, 0.25)',
        'rgba(255, 138, 92, 0.3)',
        'rgba(255, 255, 255, 0.08)',
        'rgba(241, 103, 38, 0.15)',
    ];

    function resize() {
        const rect = canvas.parentElement.getBoundingClientRect();
        const dpr = window.devicePixelRatio || 1;
        width = rect.width;
        height = Math.max(rect.height, 400);
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        canvas.style.width = width + 'px';
        canvas.style.height = height + 'px';

        // Initialize mouse position to center after canvas dimensions are known
        mouseX = width / 2;
        mouseY = height / 2;
        ctx.scale(dpr, dpr);
    }

    function initParticles() {
        for (let i = 0; i < PARTICLE_COUNT; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                size: 2 + Math.random() * 5,
                speedX: (Math.random() - 0.5) * 0.4,
                speedY: (Math.random() - 0.5) * 0.4,
                color: colors[Math.floor(Math.random() * colors.length)],
                opacity: 0.3 + Math.random() * 0.5,
                life: Math.random() * 100,
                drift: 0.2 + Math.random() * 0.3,
            });
        }
    }

    // Mouse influence factor for parallax effect (조절하여 효과 강도 변경)
    const mouseInfluenceFactor = 0.001; // 효과를 좀 더 명확하게 하기 위해 값 증가

    function drawParticles() {
        ctx.clearRect(0, 0, width, height);

        // 연결선 그리기
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                const maxDist = 150;

                if (dist < maxDist) {
                    const alpha = (1 - dist / maxDist) * 0.2;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(241, 103, 38, ${alpha})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }

        // Calculate mouse-based force relative to the center of the canvas
        const centerMouseX = mouseX - width / 2;
        const centerMouseY = mouseY - height / 2;

        // 파티클 그리기
        for (const p of particles) {
            const pulse = 1 + Math.sin(p.life * 0.02) * 0.2;
            const size = p.size * pulse;

            ctx.beginPath();
            ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.fill();

            // 내부 글로우
            if (size > 3) {
                const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, size * 2.5);
                grad.addColorStop(0, `rgba(241, 103, 38, ${0.08 * pulse})`);
                grad.addColorStop(1, 'rgba(241, 103, 38, 0)');
                ctx.beginPath();
                ctx.arc(p.x, p.y, size * 2.5, 0, Math.PI * 2);
                ctx.fillStyle = grad;
                ctx.fill();
            }

            // 위치 업데이트
            // Add mouse influence to particle movement
            p.x += p.speedX + Math.sin(p.life * 0.01) * 0.1 + (centerMouseX * mouseInfluenceFactor);
            p.y += p.speedY + Math.cos(p.life * 0.015) * 0.1 + (centerMouseY * mouseInfluenceFactor);
            p.life += 1;

            // 경계 처리
            if (p.x < 0) p.x = width;
            if (p.x > width) p.x = 0;
            if (p.y < 0) p.y = height;
            if (p.y > height) p.y = 0;
        }

        requestAnimationFrame(drawParticles);
    }

    // 초기화
    resize();
    initParticles();
    drawParticles();

    // Mouse event listener for parallax effect
    canvas.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        mouseX = e.clientX - rect.left;
        mouseY = e.clientY - rect.top;
    });
    // 리사이즈 대응
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            resize();
        }, 150);
    });
})();