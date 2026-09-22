export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin', '/maintenance', '/api'],
    },
    sitemap: 'https://bcfrankfurt.de/sitemap.xml',
  }
}
