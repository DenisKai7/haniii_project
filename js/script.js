document.addEventListener('DOMContentLoaded', function() {
    // --- Hamburger Menu Logic ---
    const hamburgerMenu = document.getElementById('hamburger-menu');
    const navLinks = document.getElementById('nav-links');

    hamburgerMenu.addEventListener('click', function() {
        hamburgerMenu.classList.toggle('open');
        navLinks.classList.toggle('open');
        // Nonaktifkan scroll saat menu terbuka
        document.body.classList.toggle('no-scroll');
    });

    // Menutup menu saat link diklik
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            hamburgerMenu.classList.remove('open');
            navLinks.classList.remove('open');
            document.body.classList.remove('no-scroll');
        });
    });

    // --- Animasi Bunga & Hati di Latar Belakang ---
    const backgroundAnimationOverlay = document.getElementById('background-animation-overlay');
    const animatedElements = ['🌸', '💖', '✨']; // Ikon untuk animasi

    function createAnimatedElement() {
        const element = document.createElement('div');
        element.classList.add('animated-element');
        element.innerHTML = animatedElements[Math.floor(Math.random() * animatedElements.length)];

        // Posisi awal di bawah layar
        element.style.left = Math.random() * 100 + 'vw';
        element.style.bottom = '-10%'; // Mulai dari bawah
        element.style.opacity = 0; // Mulai tersembunyi

        // Variasi animasi
        element.style.animationDuration = (Math.random() * 8 + 7) + 's'; // Durasi 7-15 detik
        element.style.animationDelay = (Math.random() * 2) + 's'; // Delay awal
        element.style.fontSize = (Math.random() * 1.5 + 1) + 'em'; // Ukuran 1-2.5em

        // Custom properties for keyframes (for more complex paths)
        element.style.setProperty('--random-x', (Math.random() * 200 - 100)); // -100 to 100 for translateX
        element.style.setProperty('--random-rot', (Math.random() * 360 - 180)); // -180 to 180 for rotate

        backgroundAnimationOverlay.appendChild(element);

        // Hapus elemen setelah animasi selesai untuk performa
        element.addEventListener('animationend', () => {
            element.remove();
        });
    }

    // Buat elemen baru secara berkala
    setInterval(createAnimatedElement, 800); // Setiap 0.8 detik

    // --- Animasi On Scroll (AOS-like) ---
    const observerOptions = {
        root: null, // Menggunakan viewport sebagai root
        rootMargin: '0px',
        threshold: 0.1 // Ketika 10% elemen terlihat, aktifkan
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // observer.unobserve(entry.target); // Hentikan observasi setelah aktif (opsional)
            } else {
                // Opsional: hapus 'active' jika elemen keluar dari viewport untuk animasi berulang
                // entry.target.classList.remove('active');
            }
        });
    }, observerOptions);

    // Amati semua elemen dengan kelas 'animate-on-scroll'
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });

    // --- Parallax Effect Sederhana (opsional, jika tidak pakai background-attachment: fixed) ---
    // Jika Anda ingin efek parallax yang lebih dinamis dari CSS background-attachment: fixed
    // const parallaxSections = document.querySelectorAll('.parallax-bg');

    // window.addEventListener('scroll', () => {
    //     parallaxSections.forEach(section => {
    //         const img = section.querySelector('.parallax-img');
    //         if (img) {
    //             const scrollY = window.scrollY;
    //             const sectionTop = section.offsetTop;
    //             const speed = 0.3; // Kecepatan parallax
    //             const yPos = (sectionTop - scrollY) * speed;
    //             img.style.transform = `translateY(${yPos}px)`;
    //         }
    //     });
    // });
});

