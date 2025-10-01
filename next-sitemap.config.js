/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://noasplace.org.uk',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  sitemapSize: 7000,
  changefreq: 'weekly',
  priority: 0.7,
  autoLastmod: true,
  exclude: [
    '/api/*',
    '/_not-found',
  ],
  additionalPaths: async (config) => {
    const staticPaths = [
      '/',
      '/about',
      '/contact',
      '/interactive-tools',
      '/plans',
      '/interactive-tools/all-about-me-adult',
      '/interactive-tools/all-about-me-child',
      '/interactive-tools/all-about-me-teen',
      '/interactive-tools/bullying-help',
      '/interactive-tools/bullying-support',
      '/interactive-tools/feelings-coping',
      '/interactive-tools/life-transitions',
      '/interactive-tools/my-feelings',
      '/interactive-tools/my-transitions',
      '/interactive-tools/safety-plan',
      '/interactive-tools/sensory-overload',
      '/interactive-tools/sensory-overload-teen',
      '/interactive-tools/sensory-profile-adult',
      '/interactive-tools/transition-plan',
      '/interactive-tools/transition-planning',
    ];

    return staticPaths.map((path) => {
      if (path === '/') {
        return {
          loc: path,
          changefreq: 'daily',
          priority: 1.0,
          lastmod: new Date().toISOString(),
        };
      }

      if (['/about', '/contact', '/interactive-tools', '/plans'].includes(path)) {
        return {
          loc: path,
          changefreq: 'weekly',
          priority: 0.8,
          lastmod: new Date().toISOString(),
        };
      }

      return {
        loc: path,
        changefreq: 'weekly',
        priority: 0.7,
        lastmod: new Date().toISOString(),
      };
    });
  },
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    additionalSitemaps: [
      'https://noasplace.org.uk/sitemap.xml',
    ],
  },
}
