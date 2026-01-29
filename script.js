document.addEventListener('DOMContentLoaded', function() {
    const menuCards = document.querySelectorAll('.menu-card');

    menuCards.forEach(card => {
        card.addEventListener('click', function() {
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
        });
    });

    const rewardBox = document.querySelector('.reward-box');
    if (rewardBox) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'pulse 2s ease-in-out infinite';
                }
            });
        }, { threshold: 0.5 });

        observer.observe(rewardBox);
    }

    const style = document.createElement('style');
    style.textContent = `
        @keyframes pulse {
            0%, 100% {
                transform: scale(1);
            }
            50% {
                transform: scale(1.02);
            }
        }
    `;
    document.head.appendChild(style);
});
