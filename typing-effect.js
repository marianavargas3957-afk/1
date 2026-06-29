document.addEventListener('DOMContentLoaded', () => {
    const typingElement = document.getElementById('typing-effect');
    if (!typingElement) return;

    const textToType = typingElement.dataset.text;
    const typingSpeed = 40; // 타이핑 속도 (밀리초)
    const startDelay = 500; // 시작 전 딜레이 (밀리초)
    let charIndex = 0;

    typingElement.textContent = ''; // 초기 텍스트 비우기

    function type() {
        if (charIndex < textToType.length) {
            typingElement.textContent += textToType.charAt(charIndex);
            charIndex++;
            setTimeout(type, typingSpeed);
        } else {
            // 타이핑이 끝나면 커서가 계속 깜빡이도록 유지
            // CSS에서 #typing-effect::after를 통해 커서가 제어되므로, 여기서는 추가적인 조작이 필요 없습니다.
            // typingElement.style.borderRight = 'none'; // 더 이상 커서 추가 안 함 (CSS로 제어되므로 주석 처리)
        }
    }

    setTimeout(type, startDelay);
});