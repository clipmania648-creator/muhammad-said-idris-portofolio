document.addEventListener('DOMContentLoaded', function () {

  // ---- Tahun footer ----
  document.getElementById('year').textContent = new Date().getFullYear();

  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ---- Navbar berubah saat scroll ----
  var navbar = document.getElementById('mainNav');
  window.addEventListener('scroll', function () {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  });

  // ---- Tutup menu mobile saat link diklik ----
  var navMenu = document.getElementById('navMenu');
  document.querySelectorAll('#mainNav .nav-link').forEach(function (link) {
    link.addEventListener('click', function () {
      if (navMenu.classList.contains('show')) {
        bootstrap.Collapse.getOrCreateInstance(navMenu).hide();
      }
    });
  });

  // ---- Highlight menu aktif sesuai posisi scroll ----
  var sections = document.querySelectorAll('section[id], header[id]');
  var navLinks = document.querySelectorAll('#mainNav .nav-link');
  var sectionObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        navLinks.forEach(function (l) { l.classList.remove('active'); });
        var active = document.querySelector('#mainNav .nav-link[href="#' + entry.target.id + '"]');
        if (active) active.classList.add('active');
      }
    });
  }, { rootMargin: '-50% 0px -50% 0px' });
  sections.forEach(function (s) { sectionObserver.observe(s); });

  // ---- Efek mengetik untuk jabatan ----
  var typingEl = document.getElementById('typingRole');
  var roles = ['Inventory Controller', 'Internal Auditor', 'Inventory Controller & Auditor'];
  if (prefersReduced) {
    typingEl.textContent = roles[0];
  } else {
    var roleIndex = 0, charIndex = 0, deleting = false;
    function typeLoop() {
      var current = roles[roleIndex];
      if (!deleting) {
        charIndex++;
        typingEl.textContent = current.slice(0, charIndex);
        if (charIndex === current.length) {
          deleting = true;
          setTimeout(typeLoop, 1800);
          return;
        }
      } else {
        charIndex--;
        typingEl.textContent = current.slice(0, charIndex);
        if (charIndex === 0) {
          deleting = false;
          roleIndex = (roleIndex + 1) % roles.length;
        }
      }
      setTimeout(typeLoop, deleting ? 35 : 80);
    }
    typeLoop();
  }

  // ---- Reveal saat elemen masuk viewport ----
  var revealEls = document.querySelectorAll('.reveal');
  var revealObserver = new IntersectionObserver(function (entries, obs) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach(function (el) { revealObserver.observe(el); });

  // ---- Animasi angka statistik ----
  function animateCounter(el) {
    var target = parseFloat(el.dataset.target);
    var suffix = el.dataset.suffix || '';
    var duration = 1200;
    var start = performance.now();
    function step(now) {
      var progress = Math.min((now - start) / duration, 1);
      el.textContent = Math.floor(progress * target) + suffix;
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target + suffix;
    }
    requestAnimationFrame(step);
  }
  var counters = document.querySelectorAll('.stat-number');
  var counterObserver = new IntersectionObserver(function (entries, obs) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(function (c) { counterObserver.observe(c); });

  // ---- Animasi progress bar skill ----
  var skillBars = document.querySelectorAll('.skill-fill');
  var skillObserver = new IntersectionObserver(function (entries, obs) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.style.width = entry.target.dataset.value + '%';
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  skillBars.forEach(function (b) { skillObserver.observe(b); });

  // ---- Tombol kembali ke atas ----
  var backToTop = document.getElementById('backToTop');
  window.addEventListener('scroll', function () {
    backToTop.classList.toggle('show', window.scrollY > 400);
  });
  backToTop.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: prefersReduced ? 'auto' : 'smooth' });
  });

  // ---- Validasi & simulasi kirim form kontak ----
  var form = document.getElementById('contactForm');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    e.stopPropagation();
    if (!form.checkValidity()) {
      form.classList.add('was-validated');
      return;
    }
    var successMsg = document.getElementById('formSuccess');
    successMsg.classList.remove('d-none');
    form.classList.remove('was-validated');
    form.reset();
    setTimeout(function () { successMsg.classList.add('d-none'); }, 6000);
  });

});
document.getElementById("contactForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const nama = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const subject = document.getElementById("subject").value;
    const message = document.getElementById("message").value;

    const pesan = `
Halo Said Idris,

Nama: ${nama}
Email: ${email}
Subjek: ${subject}

Pesan:
${message}
`;

    const whatsappURL =
        `https://wa.me/6289508167988?text=${encodeURIComponent(pesan)}`;

    window.open(whatsappURL, "_blank");
});