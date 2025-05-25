// schemas/homePage.js

// Home Hero Section
export const homeHero = {
    name: 'homeHero',
    title: 'Home Hero Section',
    type: 'object',
    fields: [
      {
        name: 'tagline',
        title: 'Tagline',
        type: 'string',
        description: "Static text before the rotating terms (e.g. 'Know what you\'ll pay')"
      },
      {
        name: 'rotatingWords',
        title: 'Rotating Words',
        type: 'array',
        of: [{ type: 'string' }],
        description: 'List of terms to rotate (e.g. "CT scans", "MRIs", etc.)'
      },
      {
        name: 'commonProcedures',
        title: 'Common Procedures',
        type: 'array',
        of: [{ type: 'string' }],
        description: 'Procedures shown as quick-search buttons'
      }
    ]
  };
  
  // Feature Card Object
  export const featureCard = {
    name: 'featureCard',
    title: 'Feature Card',
    type: 'object',
    fields: [
      {
        name: 'image',
        title: 'Image',
        type: 'image',
        description: 'Icon or illustration for the feature card'
      },
      {
        name: 'title',
        title: 'Title',
        type: 'string',
        description: 'Heading of the feature card'
      },
      {
        name: 'points',
        title: 'Points',
        type: 'array',
        of: [{ type: 'string' }],
        description: 'List of bullet points highlighting the feature'
      }
    ]
  };
  
  // Home Feature Cards Section
  export const homeFeatureCardsSection = {
    name: 'homeFeatureCardsSection',
    title: 'Home Feature Cards Section',
    type: 'object',
    fields: [
      {
        name: 'cards',
        title: 'Feature Cards',
        type: 'array',
        of: [{ type: 'featureCard' }],
        description: 'Collection of feature cards displayed on the home page'
      }
    ]
  };
  
  // Service Item Object
  export const serviceItem = {
    name: 'serviceItem',
    title: 'Service Item',
    type: 'object',
    fields: [
      {
        name: 'name',
        title: 'Service Name',
        type: 'string',
        description: 'Name of the service (e.g. CT scans)'
      },
      {
        name: 'link',
        title: 'Compare Link',
        type: 'url',
        description: 'URL to compare providers for this service'
      }
    ]
  };
  
  // Services Section
  export const servicesSection = {
    name: 'servicesSection',
    title: 'Services Section',
    type: 'object',
    fields: [
      {
        name: 'sectionTitle',
        title: 'Section Title',
        type: 'string',
        description: 'Heading for the services list'
      },
      {
        name: 'items',
        title: 'Service Items',
        type: 'array',
        of: [{ type: 'serviceItem' }],
        description: 'List of services to compare'
      }
    ]
  };
  
  // Shop Healthcare Section
  export const shopHealthcareSection = {
    name: 'shopHealthcareSection',
    title: 'Shop Healthcare Section',
    type: 'object',
    fields: [
      {
        name: 'heading',
        title: 'Heading',
        type: 'string',
        description: 'Main heading for shop healthcare section'
      },
      {
        name: 'description',
        title: 'Description',
        type: 'text',
        description: 'Subtext explaining the shop healthcare feature'
      },
      {
        name: 'iconImage',
        title: 'Icon Image',
        type: 'image',
        description: 'Image or icon displayed in the section'
      },
      {
        name: 'services',
        title: 'Services',
        type: 'servicesSection',
        description: 'Embedded services comparison list'
      }
    ]
  };
  
  // Price Feature Item Object
  export const priceFeatureItem = {
    name: 'priceFeatureItem',
    title: 'Price Feature Item',
    type: 'object',
    fields: [
      { name: 'icon', title: 'Icon Name', type: 'string', description: 'Filename or key for the feature icon' },
      { name: 'title', title: 'Feature Title', type: 'string' },
      { name: 'description', title: 'Feature Description', type: 'text' }
    ]
  };
  
  // Price Transparency Section
  export const priceTransparencySection = {
    name: 'priceTransparencySection',
    title: 'Price Transparency Section',
    type: 'object',
    fields: [
      { name: 'heading', title: 'Heading', type: 'string' },
      { name: 'description', title: 'Description', type: 'text' },
      { name: 'ctaText', title: 'CTA Text', type: 'string' },
      { name: 'ctaLink', title: 'CTA Link', type: 'url' },
      { name: 'features', title: 'Features', type: 'array', of: [{ type: 'priceFeatureItem' }] }
    ]
  };
  
  // Home Testimonial Section
  export const homeTestimonialSection = {
    name: 'homeTestimonialSection',
    title: 'Home Testimonial Section',
    type: 'object',
    fields: [
      { name: 'testimonial', title: 'Testimonial Text', type: 'text' },
      { name: 'image', title: 'Testimonial Image', type: 'image' }
    ]
  };
  
  // Enterprise Feature Item Object
  export const enterpriseFeatureItem = {
    name: 'enterpriseFeatureItem',
    title: 'Enterprise Feature Item',
    type: 'object',
    fields: [
      { name: 'value', title: 'ID', type: 'string' },
      { name: 'title', title: 'Title', type: 'string' },
      { name: 'content', title: 'Content', type: 'text' },
      { name: 'image', title: 'Image', type: 'image' }
    ]
  };
  
  // Enterprise Section
  export const enterpriseSection = {
    name: 'enterpriseSection',
    title: 'Enterprise Section',
    type: 'object',
    fields: [
      { name: 'heading', title: 'Heading', type: 'string' },
      { name: 'description', title: 'Description', type: 'text' },
      { name: 'ctaText', title: 'CTA Text', type: 'string' },
      { name: 'ctaLink', title: 'CTA Link', type: 'url' },
      { name: 'iconImage', title: 'Icon Image', type: 'image' },
      {
        name: 'features',
        title: 'Enterprise Features',
        type: 'array',
        of: [{ type: 'enterpriseFeatureItem' }]
      }
    ]
  };
  
  // Enterprise Solution Item
  export const enterpriseSolutionItem = {
    name: 'enterpriseSolutionItem',
    title: 'Enterprise Solution Item',
    type: 'object',
    fields: [
      { name: 'title', title: 'Title', type: 'string' },
      { name: 'description', title: 'Description', type: 'text' },
      { name: 'link', title: 'Link', type: 'url' },
      { name: 'iconImage', title: 'Icon Image', type: 'image' }
    ]
  };
  
  // Enterprise Solutions Section
  export const enterpriseSolutionsSection = {
    name: 'enterpriseSolutionsSection',
    title: 'Enterprise Solutions Section',
    type: 'object',
    fields: [
      {
        name: 'solutions',
        title: 'Solutions',
        type: 'array',
        of: [{ type: 'enterpriseSolutionItem' }]
      }
    ]
  };
  
  // Home Join Team Section
  export const homeJoinTeamSection = {
    name: 'homeJoinTeamSection',
    title: 'Home Join Team Section',
    type: 'object',
    fields: [
      { name: 'heading', title: 'Heading', type: 'string' },
      { name: 'description', title: 'Description', type: 'text' },
      { name: 'ctaText', title: 'CTA Button Text', type: 'string' },
      { name: 'image', title: 'Image', type: 'image' }
    ]
  };
  
  // Home Page Document
  export const homePage = {
    name: 'homePage',
    title: 'Home Page',
    type: 'document',
    fields: [
      { name: 'hero', title: 'Hero Section', type: 'homeHero' },
      { name: 'featureCards', title: 'Feature Cards Section', type: 'homeFeatureCardsSection' },
      { name: 'shopHealthcare', title: 'Shop Healthcare Section', type: 'shopHealthcareSection' },
      { name: 'priceTransparency', title: 'Price Transparency Section', type: 'priceTransparencySection' },
      { name: 'testimonial', title: 'Testimonial Section', type: 'homeTestimonialSection' },
      { name: 'enterprise', title: 'Enterprise Section', type: 'enterpriseSection' },
      { name: 'enterpriseSolutions', title: 'Enterprise Solutions Section', type: 'enterpriseSolutionsSection' },
      { name: 'joinTeam', title: 'Join Team Section', type: 'homeJoinTeamSection' }
    ]
  };
  
  // Export all home page schemas in a single array
  export default [
    homeHero,
    featureCard,
    homeFeatureCardsSection,
    serviceItem,
    servicesSection,
    shopHealthcareSection,
    priceFeatureItem,
    priceTransparencySection,
    homeTestimonialSection,
    enterpriseFeatureItem,
    enterpriseSection,
    enterpriseSolutionItem,
    enterpriseSolutionsSection,
    homeJoinTeamSection,
    homePage
  ];
  