import 'https://kit.fontawesome.com/ac7a85a09f.js';

function el(tag, properties) {
  return Object.assign(document.createElement(tag), properties);
}

class CommonHeader extends HTMLElement {
  connectedCallback() {
    this.append(el('nav-crumbs'), el('social-links'));
  }
}

class SocialLinks extends HTMLElement {
  connectedCallback() {
    const emailLink = el('a', { href: 'mailto:hello@meisel.dev' });
    emailLink.append(el('i', { className: 'fas fa-envelope', title: 'Email' }));

    const githubLink = el('a', { href: 'https://github.com/mmeisel/', target: '_blank' });
    githubLink.append(el('i', { className: 'fab fa-github', title: 'GitHub' }));

    const linkedInLink = el('a', {
      href: 'https://www.linkedin.com/in/michaelmeisel/',
      target: '_blank'
    });
    linkedInLink.append(el('i', { className: 'fab fa-linkedin', title: 'LinkedIn' }));

    this.append(emailLink, githubLink, linkedInLink);
  }
}

class NavCrumbs extends HTMLElement {
  static labels = { 'art': 'Art and Design', 'work': 'Professional Interests' };
  static separator = ' ← ';

  connectedCallback() {
    if (window.location.pathname === '/') {
      return;
    }

    const wrapper = el('nav');

    const topLevelLink = el('a', { href: '/' });
    topLevelLink.append('Michael Meisel');
    wrapper.append(topLevelLink, NavCrumbs.separator);

    const parts = window.location.pathname.split('/').slice(1, -1);

    if (window.location.pathname.endsWith('/')) {
      // Remove an extra part, a link to ./ would just be a link to the page itself
      parts.pop();
    }

    parts.forEach((part, i) => {
      const link = el('a', { href: '../'.repeat(parts.length - 1 - i) + './' });
      link.append(NavCrumbs.labels[part] || part);
      wrapper.append(link, NavCrumbs.separator);
    });

    this.append(wrapper);
  }
}

function onImageGridLoad() {
  const imageGridImages = document.querySelectorAll('.image-grid > *');

  if (imageGridImages.length) {
    const handleIntersect = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animating');
        } else {
          entry.target.classList.remove('animating');
        }
      });
    };
    const observer = new IntersectionObserver(handleIntersect);

    imageGridImages.forEach((element) => {
      observer.observe(element);
    });
  }
}

function onObserverLoad() {
  const video = document.getElementById('observer-video');

  if (video != null) {
    window.addEventListener('scroll', () => {
      video.currentTime = 0;
    });
  }
}

function blankifyUrls() {
  const myHostname = window.location.hostname;

  document.querySelectorAll('a').forEach((link) => {
    if (link.hostname !== myHostname) {
      link.target = '_blank';
    }
  })
}

window.addEventListener('load', onImageGridLoad);
window.addEventListener('load', onObserverLoad);
window.addEventListener('DOMContentLoaded', blankifyUrls);

customElements.define('common-header', CommonHeader);
customElements.define('nav-crumbs', NavCrumbs);
customElements.define('social-links', SocialLinks);
