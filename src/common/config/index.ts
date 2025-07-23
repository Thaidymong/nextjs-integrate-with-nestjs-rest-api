const createSiteConfig = () => {
  return {
    name: 'Nextjs App', // The name of your application
    title: 'Nextjs App – Modern Web Application', // Full title for SEO
    url: 'https://www.nextjsapp.com', // Replace with your actual domain
    description: 'A modern, fast, and scalable web application built with Next.js.', // Short site description
    thumbnailImage: '/images/thumbnail.png', // Path to your site thumbnail/logo
  };
};

export const siteConfig = createSiteConfig();
