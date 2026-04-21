document.addEventListener("DOMContentLoaded", () => {
    const music = document.getElementById('bg-music'); 
    const musicToggle = document.getElementById('music-toggle');
    const overlay = document.getElementById('welcome-overlay');
    const wishesSection = document.getElementById('wishes');
    
    let heartInterval;

    if (musicToggle && music) {
        musicToggle.addEventListener('click', () => {
            if (music.paused) {
                music.play().then(() => {
                    musicToggle.parentElement.classList.add('playing');
                }).catch(err => console.log("Audio play error:", err));
            } else {
                music.pause();
                musicToggle.parentElement.classList.remove('playing');
            }
        });
    }

    const canvas = document.getElementById('scratch-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        const container = document.querySelector('.scratch-container');

        canvas.width = 300;
        canvas.height = 160;

        ctx.fillStyle = '#bdc3c7';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#7f8c8d';
        ctx.font = 'bold 16px Poppins';
        ctx.textAlign = 'center';
        ctx.fillText('GOSOK INI', canvas.width/2, canvas.height/2 + 5);

        let isDrawing = false;

        function scratch(e) {
            if (!isDrawing) return;

            const rect = canvas.getBoundingClientRect();
            const x = (e.type.includes('mouse') ? e.clientX : e.touches[0].clientX) - rect.left;
            const y = (e.type.includes('mouse') ? e.clientY : e.touches[0].clientY) - rect.top;

            ctx.globalCompositeOperation = 'destination-out';
            ctx.beginPath();
            ctx.arc(x, y, 20, 0, Math.PI * 2);
            ctx.fill();
        }

        canvas.addEventListener('mousedown', () => isDragging = isDrawing = true);
        canvas.addEventListener('touchstart', () => isDragging = isDrawing = true);
        
        window.addEventListener('mousemove', scratch);
        window.addEventListener('touchmove', scratch);
        
        window.addEventListener('mouseup', () => isDragging = isDrawing = false);
        window.addEventListener('touchend', () => isDragging = isDrawing = false);
    }

    function createHeart() {
        const heart = document.createElement('div');
        heart.classList.add('heart-flare');
        const hearts = ['❤️', '💖', '💗', '💓', '✨'];
        heart.innerText = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.left = Math.random() * 100 + 'vw';
        const duration = Math.random() * 3 + 3;
        heart.style.setProperty('--duration', duration + 's');
        const drift = (Math.random() * 200 - 100) + 'px';
        heart.style.setProperty('--drift', drift);
        heart.style.fontSize = Math.random() * 15 + 15 + 'px';
        document.body.appendChild(heart);
        setTimeout(() => { heart.remove(); }, duration * 1000);
    }

    const heartObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                heartInterval = setInterval(createHeart, 400);
            } else {
                clearInterval(heartInterval);
            }
        });
    }, { threshold: 0.3 });

    if (wishesSection) {
        heartObserver.observe(wishesSection);
    }

    window.bukaHadiah = function() {
        music.play().then(() => {
        if (musicToggle) {
            musicToggle.classList.add('playing');
        }
   
    }).catch(err => console.log("Audio error:", err));

    overlay.classList.add('hide-overlay');
    document.body.style.overflow = 'auto';

    window.scrollTo(0, 0);

    setTimeout(startTyping, 1000);

        var duration = 3 * 1000;
    var end = Date.now() + duration;

    (function frame() {
        confetti({
            particleCount: 3,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: ['#ff69b4', '#34d399', '#ffffff']
        });
        confetti({
            particleCount: 3,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: ['#ff69b4', '#34d399', '#ffffff']
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);


        }
    }());

    overlay.classList.add('hide-overlay');
    document.body.style.overflow = 'auto';
    window.scrollTo(0, 0);
    }

    window.showPage = function(pageId) {
        document.querySelectorAll('.page-section').forEach(s => {
            s.style.display = 'none';
            s.classList.remove('active-section');
        });
        const activePage = document.getElementById(pageId);
        activePage.style.display = 'block';
        setTimeout(() => activePage.classList.add('active-section'), 10);

        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        document.getElementById('link-' + pageId).classList.add('active');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function startTyping() {
        const el = document.getElementById('typing-text');
        if (el) {
            const text = el.getAttribute('data-text');
            el.innerText = '';
            el.classList.add('typing');
            let i = 0;
            function type() {
                if (i < text.length) {
                    el.innerHTML += text.charAt(i);
                    i++;
                    setTimeout(type, 50);
                } else {
                    el.classList.remove('typing');
                }
            }
            type();
        }
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('active');
        });
    });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
});