gsap.registerPlugin(ScrollTrigger);

        // ========== ANIMACIONES CON INTERSECTION OBSERVER ==========
        const observerOptions = {
            threshold: 0.2,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        document.querySelectorAll('.fade-up, .fade-left, .fade-right, .scale-in').forEach(el => {
            observer.observe(el);
        });

        // ========== ANIMACIÓN ESPECIAL PARA TARJETAS DE PRODUCTOS ==========
        const productObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    gsap.fromTo(entry.target,
                        { opacity: 0, y: 50 },
                        { opacity: 1, y: 0, duration: 0.6, delay: index * 0.1, ease: 'power2.out' }
                    );
                    productObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        // ========== ANIMACIÓN ESPECIAL PARA TARJETAS DE TESTIMONIOS ==========
        const testimonialObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    gsap.fromTo(entry.target,
                        { opacity: 0, y: 40 },
                        { opacity: 1, y: 0, duration: 0.6, delay: index * 0.1, ease: 'power2.out' }
                    );
                    testimonialObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        // ========== DETECTAR SECCIÓN ACTIVA EN EL NAVBAR ==========
        const sections = document.querySelectorAll('.scroll-section');
        const navLinks = document.querySelectorAll('.nav-links a');

        function updateActiveSection() {
            let currentSection = '';
            const scrollContainer = document.querySelector('.scroll-container');
            if (!scrollContainer) return;

            const scrollPosition = scrollContainer.scrollTop + 150;

            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionBottom = sectionTop + section.offsetHeight;

                if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                    currentSection = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                const href = link.getAttribute('href').substring(1);

                // Si estamos en cualquier sede (ids que empiezan con "sede-"), marcar "SEDES"
                if (currentSection.startsWith('sede-')) {
                    if (href === 'sedes') {
                        link.classList.add('active');
                    }
                } else if (href === currentSection) {
                    link.classList.add('active');
                }
            });
        }

        // ========== PRODUCTOS DINÁMICOS ==========
        const products = [
            { name: "CARBONO NEGRO", desc: "Tostado profundo, notas de cacao peruano y pimienta de Chanchamayo.", price: "S/ 189", img: "https://images.pexels.com/photos/1695052/pexels-photo-1695052.jpeg?auto=compress&cs=tinysrgb&w=600" },
            { name: "GEISHA ORIGEN", desc: "Jazmín, bergamota, miel de azahar. Calificación SCA 95+.", price: "S/ 289", img: "https://images.pexels.com/photos/851555/pexels-photo-851555.jpeg?auto=compress&cs=tinysrgb&w=600" },
            { name: "RESERVA VELI", desc: "Granos de altura de Villa Rica. Fermentación en barrica de roble.", price: "S/ 359", img: "https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?auto=compress&cs=tinysrgb&w=600" }
        ];

        function renderProducts() {
            const grid = document.getElementById('productsGrid');
            if (!grid) return;
            grid.innerHTML = '';
            products.forEach((p) => {
                const card = document.createElement('div');
                card.className = 'product-card';
                card.style.opacity = 0;
                card.style.transform = 'translateY(40px)';
                card.innerHTML = `
                    <div class="product-img" style="background-image: url('${p.img}'); background-size: cover;"></div>
                    <div class="product-info">
                        <h3>${p.name}</h3>
                        <p style="color:#aaa; font-size:0.85rem;">${p.desc}</p>
                        <div class="price">${p.price}</div>
                        <button class="order-btn-lux" data-product="${p.name}">ADQUIRIR <i class="fas fa-arrow-right"></i></button>
                    </div>
                `;
                grid.appendChild(card);
            });

            setTimeout(() => {
                document.querySelectorAll('.product-card').forEach(card => {
                    productObserver.observe(card);
                });
            }, 100);

            document.querySelectorAll('.order-btn-lux').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const name = btn.getAttribute('data-product');
                    showToast(`✨ ${name} añadido a tu pedido de prestigio.`);
                });
            });
        }

        // ========== TESTIMONIOS DINÁMICOS ==========
        const testimonialsData = [
            { name: "María Fernanda López", text: "Una experiencia que supera lo ordinario. VELI redefine el lujo en cada sorbo.", stars: 5 },
            { name: "Giancarlo Rossi", text: "La precisión y calidez son únicas. Cada detalle cuenta, impecable.", stars: 5 },
            { name: "Valeria Montalbán", text: "El servicio es impecable y el ambiente te transporta a otro nivel.", stars: 5 },
            { name: "Diego Alarcón", text: "El mejor café de especialidad en Lima. La atención y el ambiente son insuperables.", stars: 5 },
            { name: "Camila Reyes", text: "Cada visita a VELI es un ritual. Los baristas conocen su oficio a la perfección.", stars: 5 },
            { name: "Andrés Mendoza", text: "Un espacio que combina lujo, arte y pasión por el café. Altamente recomendado.", stars: 5 }
        ];

        function renderTestimonials() {
            const container = document.getElementById('testimonialsGrid');
            if (!container) return;
            container.innerHTML = '';
            testimonialsData.forEach((t) => {
                const div = document.createElement('div');
                div.className = 'testi-card';
                div.style.opacity = 0;
                div.style.transform = 'translateY(30px)';
                div.innerHTML = `
                    <div style="color:#d4af37; margin-bottom:1rem;">★★★★★</div>
                    <p style="font-style:italic;">“${t.text}”</p>
                    <h4 style="margin-top:1rem;">— ${t.name}</h4>
                `;
                container.appendChild(div);
            });

            setTimeout(() => {
                document.querySelectorAll('.testi-card').forEach(card => {
                    testimonialObserver.observe(card);
                });
            }, 100);
        }

        // ========== TOAST ==========
        function showToast(msg) {
            const toast = document.createElement('div');
            toast.innerText = msg;
            toast.style.position = 'fixed';
            toast.style.bottom = '30px';
            toast.style.left = '50%';
            toast.style.transform = 'translateX(-50%)';
            toast.style.backgroundColor = '#d4af37';
            toast.style.color = '#050505';
            toast.style.padding = '12px 30px';
            toast.style.fontWeight = 'bold';
            toast.style.zIndex = '9999';
            toast.style.fontFamily = "'Inter', sans-serif";
            toast.style.opacity = '0';
            toast.style.transition = '0.3s';
            toast.style.borderRadius = '40px';
            document.body.appendChild(toast);
            setTimeout(() => toast.style.opacity = '1', 10);
            setTimeout(() => {
                toast.style.opacity = '0';
                setTimeout(() => toast.remove(), 400);
            }, 2500);
        }

        // ========== BOTONES ==========
        document.getElementById('exploreBtn')?.addEventListener('click', () => {
            const target = document.getElementById('products');
            if (target) target.scrollIntoView({ behavior: 'smooth' });
            showToast('Explorando Colección Edición Limitada');
        });
        document.getElementById('reserveAtelier')?.addEventListener('click', () => {
            showToast('Un asesor te contactará para una cata privada');
        });
        document.getElementById('luxurySubscribe')?.addEventListener('click', () => {
            const email = document.getElementById('luxuryEmail')?.value;
            const fb = document.getElementById('formFeedback');
            if (email && email.includes('@') && email.includes('.')) {
                fb.innerHTML = '✓ Suscripción confirmada. Bienvenido al círculo VELI.';
                fb.style.color = '#d4af37';
                document.getElementById('luxuryEmail').value = '';
                showToast('Suscripción de prestigio validada');
            } else {
                fb.innerHTML = '✗ Correo electrónico inválido.';
                fb.style.color = '#b97f44';
            }
            setTimeout(() => fb.innerHTML = '', 3000);
        });


        // ========== SCROLL EN CONTAINER PARA NAVBAR ACTIVO ==========
        const scrollContainer = document.querySelector('.scroll-container');
        if (scrollContainer) {
            scrollContainer.addEventListener('scroll', updateActiveSection);
        }

        // ========== INICIALIZAR ==========
        renderProducts();
        renderTestimonials();
        updateActiveSection();

        setTimeout(() => {
            document.querySelectorAll('.fade-up, .fade-left, .fade-right, .scale-in').forEach(el => {
                const rect = el.getBoundingClientRect();
                if (rect.top < window.innerHeight - 100) {
                    el.classList.add('visible');
                }
            });
        }, 100);
