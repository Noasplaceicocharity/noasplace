/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://noasplace.org.uk',
  generateRobotsTxt: true,
  generateIndexSitemap: false, // Generate single sitemap instead of index
  sitemapSize: 7000,
  changefreq: 'weekly',
  priority: 0.7,
  autoLastmod: true,
  // Additional paths to include in sitemap
  additionalPaths: async (config) => {
    return [
      await config.transform(config, '/'),
    ]
  },
  // Custom transformation for specific URLs
  transform: async (config, path) => {
    // Customise priority for important pages
    if (path === '/') {
      return {
        loc: path,
        changefreq: 'daily',
        priority: 1.0,
        lastmod: new Date().toISOString(),
      }
    }

    // Default transformation
    return {
      loc: path,
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: new Date().toISOString(),
    }
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
