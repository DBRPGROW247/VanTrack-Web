/**
 * VanTrack Dynamic Legal Document Loader
 * Fetches the latest Privacy Policy / Terms & Conditions from Supabase Storage bucket.
 * 
 * Features:
 * - Real-time sync with Supabase Public Storage
 * - Cache-busting (?v=timestamp) to ensure instant reflection on file updates
 * - Zero-FOUC bundled fallback (never shows blank page if offline or bucket loading)
 * - Auto-synchronizing Table of Contents & ScrollSpy
 * - Mobile-responsive live status indicator
 */

(function () {
  const SUPABASE_PROJECT_URL = 'https://dmcyyjhzrppiurazvdrz.supabase.co';
  const BUCKET_NAME = 'legal-docs';

  window.VanTrackPolicyLoader = {
    init: function (config) {
      document.addEventListener('DOMContentLoaded', () => {
        const {
          fileName,
          contentContainerId = 'legal-content-container',
          tocListId = 'toc-list',
          tocFilterId = 'toc-filter',
          syncPillId = 'doc-sync-pill',
          syncTextId = 'doc-sync-text'
        } = config;

        const container = document.getElementById(contentContainerId);
        const tocList = document.getElementById(tocListId);
        const syncPill = document.getElementById(syncPillId);
        const syncText = document.getElementById(syncTextId);
        const filterInput = document.getElementById(tocFilterId);

        // Public Supabase Storage URL
        const storageUrl = `${SUPABASE_PROJECT_URL}/storage/v1/object/public/${BUCKET_NAME}/${fileName}`;

        // Initialize features on initial/fallback markup
        setupTOCFilter(filterInput, tocList);
        setupScrollSpy();
        setupBackToTop();

        // Fetch latest version from Supabase Storage
        fetch(`${storageUrl}?v=${Date.now()}`, { cache: 'no-store' })
          .then(async (response) => {
            if (!response.ok) {
              throw new Error(`Storage returned ${response.status} (${response.statusText})`);
            }
            const htmlContent = await response.text();
            if (!htmlContent || htmlContent.trim().length < 100) {
              throw new Error('Retrieved content was unexpectedly short or empty.');
            }

            // Successfully fetched from Supabase
            if (container) {
              container.innerHTML = htmlContent;
            }

            // Sync Table of Contents with newly fetched sections
            regenerateTOC(container, tocList);

            // Re-bind ScrollSpy and TOC search filter on new elements
            setupScrollSpy();
            setupTOCFilter(filterInput, tocList);

            // Update live sync pill
            if (syncPill && syncText) {
              syncPill.classList.remove('sync-pending', 'sync-fallback');
              syncPill.classList.add('sync-live');
              syncText.textContent = 'Cloud Sync: Live';
              syncPill.setAttribute('title', 'Synced live from Supabase Storage');
            }
          })
          .catch((err) => {
            console.info('[VanTrack] Serving bundled official copy. Note:', err.message);
            // Graceful fallback to bundled copy
            if (syncPill && syncText) {
              syncPill.classList.remove('sync-pending', 'sync-live');
              syncPill.classList.add('sync-fallback');
              syncText.textContent = 'Active Version';
              syncPill.setAttribute('title', 'Serving verified local copy');
            }
          });
      });
    }
  };

  /**
   * Dynamically build TOC links from legal-section articles
   */
  function regenerateTOC(container, tocList) {
    if (!container || !tocList) return;

    const sections = container.querySelectorAll('.legal-section');
    if (!sections || sections.length === 0) return;

    // Clear existing TOC items
    tocList.innerHTML = '';

    sections.forEach((sec, index) => {
      let secId = sec.getAttribute('id');
      if (!secId) {
        secId = `sec-${index + 1}`;
        sec.setAttribute('id', secId);
      }

      const numBadge = sec.querySelector('.section-num-badge');
      const numText = numBadge ? numBadge.textContent.trim() : String(index + 1).padStart(2, '0');

      const heading = sec.querySelector('.section-heading');
      const headingText = heading ? heading.textContent.trim() : `Section ${numText}`;

      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = `#${secId}`;
      a.className = 'toc-link';
      a.innerHTML = `<span class="toc-num">${numText}</span><span>${escapeHtml(headingText)}</span>`;
      li.appendChild(a);
      tocList.appendChild(li);
    });
  }

  /**
   * Filter TOC links by search term
   */
  function setupTOCFilter(filterInput, tocList) {
    if (!filterInput || !tocList) return;

    // Remove any existing clone listeners
    const newInput = filterInput.cloneNode(true);
    filterInput.parentNode.replaceChild(newInput, filterInput);

    newInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase().trim();
      const tocItems = tocList.querySelectorAll('li');
      tocItems.forEach((item) => {
        const text = item.textContent.toLowerCase();
        item.style.display = text.includes(query) ? '' : 'none';
      });
    });
  }

  /**
   * IntersectionObserver ScrollSpy
   */
  let scrollObserver = null;
  function setupScrollSpy() {
    if (scrollObserver) {
      scrollObserver.disconnect();
    }

    const sections = document.querySelectorAll('.legal-section');
    const navLinks = document.querySelectorAll('.toc-link');
    if (!sections.length || !navLinks.length) return;

    scrollObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            navLinks.forEach((link) => {
              link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
            });
          }
        });
      },
      {
        rootMargin: '-80px 0px -70% 0px',
        threshold: 0
      }
    );

    sections.forEach((sec) => scrollObserver.observe(sec));
  }

  /**
   * Back to Top smooth scroll button
   */
  function setupBackToTop() {
    const backToTopBtn = document.getElementById('back-to-top');
    if (!backToTopBtn) return;

    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  function escapeHtml(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
})();
