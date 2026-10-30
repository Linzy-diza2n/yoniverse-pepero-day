// Preview navigation only; this is not authentication or authorization.
// Replace with server-verified session and onboarding state in production.
(() => {
  const key = 'yoniverse-session-preview-v1';
  const page = location.pathname.split('/').pop() || 'index.html';
  window.previewSession = {
    signOut() { try { localStorage.removeItem(key); } catch {} }
  };
  try {
    if (page === 'cabinet.html') {
      // The owner cabinet is the existing signed-in preview entry point.
      localStorage.setItem(key, 'signed-in');
    } else if (page === 'index.html' &&
               localStorage.getItem(key) === 'signed-in') {
      // Only the default entry redirects; explicit landing visits (including the logo) stay visible.
      // School onboarding opens on the cabinet when no choice has been saved.
      location.replace('cabinet.html');
    }
    // Visitor URLs retain their original destination and cabinet query data.
  } catch { /* Storage unavailable: keep the current page usable. */ }
})();
