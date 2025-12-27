(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener('click', mobileNavToogle);
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Init typed.js
   */
  const selectTyped = document.querySelector('.typed');
  if (selectTyped) {
    let typed_strings = selectTyped.getAttribute('data-typed-items');
    typed_strings = typed_strings.split(',');
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /**
   * Frequently Asked Questions Toggle
   */
  document.querySelectorAll('.faq-item h3, .faq-item .faq-toggle, .faq-item .faq-header').forEach((faqItem) => {
    faqItem.addEventListener('click', () => {
      faqItem.parentNode.classList.toggle('faq-active');
    });
  });

})();


document.addEventListener('DOMContentLoaded', function() {
  
  // 1. LOGIKA FILTER KATEGORI
  const filterButtons = document.querySelectorAll('#portfolio-flters .filter-item');
  const postItems = document.querySelectorAll('.post-item');

  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Hapus class active dari tombol lain
      filterButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');

      const filterValue = this.getAttribute('data-filter');

      postItems.forEach(item => {
        if (filterValue === '*' || item.classList.contains(filterValue.substring(1))) {
          item.style.display = 'block';
          item.classList.remove('aos-animate');
          setTimeout(() => item.classList.add('aos-animate'), 50); // Efek animasi ulang
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  // 2. LOGIKA PENCARIAN (SEARCH)
  const searchInput = document.getElementById('searchInput');

  searchInput.addEventListener('keyup', function() {
    const searchText = this.value.toLowerCase();

    postItems.forEach(item => {
      const title = item.querySelector('.title a').innerText.toLowerCase();
      const category = item.querySelector('.post-category').innerText.toLowerCase();

      // Cari berdasarkan Judul ATAU Kategori
      if (title.includes(searchText) || category.includes(searchText)) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });
    
    // Reset filter tombol ke 'All' saat mengetik
    filterButtons.forEach(btn => btn.classList.remove('active'));
    document.querySelector('[data-filter="*"]').classList.add('active');
  });

});

  function sendToWhatsapp(event) {
    event.preventDefault(); // Mencegah reload halaman

    // 1. Ambil Nilai Input
    const fullName = document.getElementById('fullName').value;
    const phoneNumber = document.getElementById('phoneNumber').value;
    const city = document.getElementById('city').value;
    const email = document.getElementById('email').value;
    const serviceType = document.getElementById('serviceType').value;
    const notes = document.getElementById('notes').value;

    // 2. Format Pesan WhatsApp
    const waNumber = "62895639068080"; // Nomor Admin
    
    // Menggunakan template string (backticks) agar rapi
    const message = `
*FORMULIR PENDAFTARAN BARU*
---------------------------
Halo Admin, saya ingin mendaftar/bergabung.
Berikut data diri saya:

👤 *Nama:* ${fullName}
📱 *No. WA:* ${phoneNumber}
📍 *Domisili:* ${city}
📧 *Email:* ${email}

📌 *Minat Layanan:* ${serviceType}
📝 *Catatan:* ${notes ? notes : '-'}

Mohon informasi lebih lanjut. Terima kasih.
    `.trim();

    // 3. Buka WhatsApp
    const whatsappUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  }


