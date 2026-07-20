const BASE = 'http://localhost:4321/Gonzalez-Harilanto-ANDRINIRINA';

module.exports = {
  ci: {
    collect: {
      startServerCommand: 'npm run preview -- --port 4321',
      startServerReadyPattern: 'Local',
      startServerReadyTimeout: 30000,
      url: [
        `${BASE}/fr/`,
        `${BASE}/en/`,
        `${BASE}/fr/projects/`,
        `${BASE}/en/projects/`,
        `${BASE}/fr/blog/`,
        `${BASE}/en/blog/`,
        `${BASE}/fr/leadership/`,
        `${BASE}/en/leadership/`,
      ],
      numberOfRuns: 1,
      settings: {
        preset: 'desktop',
        chromeFlags: '--no-sandbox --headless=new --disable-gpu',
      },
    },
    assert: {
      assertions: {
        'categories:performance': ['error', { minScore: 0.9 }],
        'categories:accessibility': ['error', { minScore: 0.9 }],
        'categories:seo': ['error', { minScore: 0.9 }],
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
};
