const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const lenis = window.Lenis && !prefersReducedMotion
  ? new Lenis({
      duration: 1.35,
      easing: (t) => 1 - Math.pow(1 - t, 4),
      smoothWheel: true,
    })
  : null;

if (lenis) {
  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);
}

function initCursor() {
  const dot = document.querySelector('.cursor-dot');
  const outline = document.querySelector('.cursor-outline');
  if (!dot || !outline || window.innerWidth < 901) return;

  window.addEventListener('mousemove', (event) => {
    dot.style.left = `${event.clientX}px`;
    dot.style.top = `${event.clientY}px`;
    outline.animate(
      { left: `${event.clientX}px`, top: `${event.clientY}px` },
      { duration: 520, fill: 'forwards', easing: 'cubic-bezier(.16,1,.3,1)' }
    );
  });

  document.querySelectorAll('a, button, .interactive, .magnetic-btn').forEach((element) => {
    element.addEventListener('mouseenter', () => outline.classList.add('is-hovering'));
    element.addEventListener('mouseleave', () => outline.classList.remove('is-hovering'));
  });
}

function initMagneticButtons() {
  document.querySelectorAll('.magnetic-btn').forEach((button) => {
    button.addEventListener('mousemove', (event) => {
      const rect = button.getBoundingClientRect();
      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;
      button.style.transform = `translate(${x * 0.16}px, ${y * 0.16}px)`;
    });

    button.addEventListener('mouseleave', () => {
      button.style.transform = 'translate(0, 0)';
    });
  });
}

function initWhatsapp() {
  const widget = document.querySelector('.whatsapp-widget');
  if (!widget || prefersReducedMotion || !window.gsap) return;

  gsap.fromTo(widget,
    { autoAlpha: 0, y: 22, scale: 0.9 },
    { autoAlpha: 1, y: 0, scale: 1, duration: 0.9, ease: 'power3.out', delay: 0.6 }
  );
}

function initGsap() {
  if (!window.gsap || prefersReducedMotion) return;

  gsap.registerPlugin(ScrollTrigger);

  if (lenis) {
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
  }

  if (window.SplitType) {
    document.querySelectorAll('.split-title').forEach((title) => {
      const split = new SplitType(title, { types: 'lines, words' });
      gsap.from(split.words, {
        yPercent: 108,
        autoAlpha: 0,
        duration: 1.15,
        stagger: 0.025,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: title,
          start: 'top 86%',
        },
      });
    });
  }

  gsap.utils.toArray('.gsap-fade-up').forEach((element) => {
    gsap.from(element, {
      y: 42,
      autoAlpha: 0,
      duration: 1.05,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: element,
        start: 'top 88%',
      },
    });
  });

  gsap.utils.toArray('.gsap-stagger-list').forEach((list) => {
    gsap.from(list.children, {
      y: 34,
      autoAlpha: 0,
      duration: 0.9,
      stagger: 0.07,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: list,
        start: 'top 82%',
      },
    });
  });

  gsap.utils.toArray('.scene').forEach((scene) => {
    gsap.to(scene.querySelectorAll('.device-frame, .light-sweep'), {
      yPercent: 12,
      ease: 'none',
      scrollTrigger: {
        trigger: scene,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });
  });

  const track = document.querySelector('.portfolio-track');
  const wrap = document.querySelector('.portfolio-track-wrap');
  if (track && wrap && window.innerWidth > 760) {
    const travel = () => Math.max(0, track.scrollWidth - window.innerWidth + 40);
    gsap.to(track, {
      x: () => -travel(),
      ease: 'none',
      scrollTrigger: {
        trigger: wrap,
        start: 'top top',
        end: () => `+=${travel()}`,
        scrub: 0.65,
        pin: true,
        invalidateOnRefresh: true,
      },
    });
  }
}

window.addEventListener('load', () => {
  initCursor();
  initMagneticButtons();
  initGsap();
  initWhatsapp();
});
