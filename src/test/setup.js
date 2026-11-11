import '@testing-library/jest-dom';

// Polyfills / mocks for jsdom if needed
if (typeof window !== 'undefined') {
  // Mock matchMedia
  window.matchMedia = window.matchMedia || function() {
    return {
      matches: false,
      addListener: function() {},
      removeListener: function() {},
      addEventListener: function() {},
      removeEventListener: function() {},
      dispatchEvent: function() {}
    };
  };

  // Mock scrollTo
  window.scrollTo = window.scrollTo || function() {};
}
