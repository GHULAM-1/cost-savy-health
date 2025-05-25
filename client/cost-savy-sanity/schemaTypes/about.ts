// schemaTypes/about.ts

// Object types for About page sections
export const heroSection = {
    name: 'heroSection',
    title: 'Hero Section',
    type: 'object',
    fields: [
      { name: 'badgeText', title: 'Badge Text', type: 'string' },
      { name: 'title', title: 'Title', type: 'string' },
      { name: 'description', title: 'Description', type: 'text' },
      { name: 'buttonText', title: 'Button Text', type: 'string' },
      { name: 'buttonLink', title: 'Button Link', type: 'url' },
      { name: 'image', title: 'Hero Image', type: 'image' }
    ]
  };
  
  export const visionSection = {
    name: 'visionSection',
    title: 'Vision Section',
    type: 'object',
    fields: [
      { name: 'headline', title: 'Headline', type: 'text' },
      { name: 'subtext', title: 'Subtext', type: 'text' },
      { name: 'image', title: 'Vision Image', type: 'image' }
    ]
  };
  
  export const valueItem = {
    name: 'valueItem',
    title: 'Transparency Value Item',
    type: 'object',
    fields: [
      {
        name: 'type',
        title: 'Type',
        type: 'string',
        options: { list: [ { title: 'Do', value: 'do' }, { title: "Don't", value: 'dont' } ] }
      },
      { name: 'text', title: 'Text', type: 'string' }
    ]
  };
  
  export const transparencySection = {
    name: 'transparencySection',
    title: 'Transparency Section',
    type: 'object',
    fields: [
      { name: 'introTitle', title: 'Intro Title', type: 'string' },
      { name: 'introText', title: 'Intro Text', type: 'text' },
      { name: 'values', title: 'Values', type: 'array', of: [{ type: 'valueItem' }] },
      { name: 'roleImage', title: 'Role Image', type: 'image' },
      { name: 'imageCaption', title: 'Image Caption', type: 'string' }
    ]
  };
  
// in schemaTypes/about.ts (or wherever you define these)

export const serviceFeature = {
    name: 'serviceFeature',
    title: 'Service Feature',
    type: 'object',
    fields: [
      { name: 'value', title: 'ID (value)', type: 'string' },
      { name: 'title', title: 'Title', type: 'string' },
      { name: 'content', title: 'Content', type: 'text' },
      { name: 'image', title: 'Image', type: 'image' },
    ],
  }
  
  export const serviceHighlightSection = {
    name: 'serviceHighlightSection',
    title: 'Service Highlight Section',
    type: 'object',
    fields: [
      { name: 'heading', title: 'Heading', type: 'string' },
      { name: 'ctaText', title: 'Button Text', type: 'string' },
      { name: 'ctaLink', title: 'Button Link', type: 'url' },
      {
        name: 'features',
        title: 'Features (Accordion)',
        type: 'array',
        of: [{ type: 'serviceFeature' }],
      },
    ],
  }
  
  
  export const panelFeature = {
    name: 'panelFeature',
    title: 'Panel Feature',
    type: 'object',
    fields: [
      { name: 'title', title: 'Title', type: 'string' },
      { name: 'description', title: 'Description', type: 'text' },
      { name: 'iconName', title: 'Icon Name', type: 'string' }
    ]
  };
  
  export const collaborativePanelSection = {
    name: 'collaborativePanelSection',
    title: 'Collaborative Panel Section',
    type: 'object',
    fields: [
      { name: 'heading', title: 'Heading', type: 'string' },
      { name: 'subtext', title: 'Subtext', type: 'text' },
      { name: 'ctaText', title: 'CTA Text', type: 'string' },
      { name: 'ctaLink', title: 'CTA Link', type: 'url' },
      { name: 'features', title: 'Features', type: 'array', of: [{ type: 'panelFeature' }] }
    ]
  };
  
  export const testimonialSection = {
    name: 'testimonialSection',
    title: 'Testimonial Section',
    type: 'object',
    fields: [
      { name: 'testimonial', title: 'Testimonial Text', type: 'text' },
      { name: 'reference', title: 'Reference', type: 'string' },
      { name: 'image', title: 'Quotation Image', type: 'image' }
    ]
  };
  
  export const joinTeamSection = {
    name: 'joinTeamSection',
    title: 'Join Team Section',
    type: 'object',
    fields: [
      { name: 'heading', title: 'Heading', type: 'string' },
      { name: 'description', title: 'Description', type: 'text' },
      { name: 'image', title: 'Image', type: 'image' },
      { name: 'ctaText', title: 'CTA Text', type: 'string' },
      { name: 'ctaLink', title: 'CTA Link', type: 'url' }
    ]
  };
  
  export const leadershipSection = {
    name: 'leadershipSection',
    title: 'Leadership Section',
    type: 'object',
    fields: [
      { name: 'title', title: 'Section Title', type: 'string' },
      { name: 'description', title: 'Section Description', type: 'text' },
      { name: 'members', title: 'Team Members', type: 'array', of: [{ type: 'reference', to: [{ type: 'teamMember' }] }] }
    ]
  };
  
  // Document types
  export const teamMember = {
    name: 'teamMember',
    title: 'Team Member',
    type: 'document',
    fields: [
      { name: 'name', title: 'Name', type: 'string' },
      { name: 'role', title: 'Role', type: 'string' },
      { name: 'defaultImage', title: 'Default Image', type: 'image' },
      { name: 'hoverImage', title: 'Hover Image', type: 'image' },
      { name: 'linkedin', title: 'LinkedIn URL', type: 'url' }
    ]
  };
  
  export const advisor = {
    name: 'advisor',
    title: 'Advisor',
    type: 'document',
    fields: [
      { name: 'name', title: 'Name', type: 'string' },
      { name: 'title', title: 'Title', type: 'string' },
      { name: 'image', title: 'Image', type: 'image' },
      { name: 'linkedin', title: 'LinkedIn URL', type: 'url' }
    ]
  };
  
  export const investor = {
    name: 'investor',
    title: 'Investor',
    type: 'document',
    fields: [
      { name: 'name', title: 'Name', type: 'string' },
      { name: 'title', title: 'Organization', type: 'string' },
      { name: 'image', title: 'Image', type: 'image' },
      { name: 'linkedin', title: 'LinkedIn URL', type: 'url' }
    ]
  };
  
  // Singleton About Page
  export const aboutPage = {
    name: 'aboutPage',
    title: 'About Page',
    type: 'document',
    __experimental_actions: ['update', 'publish'],
    fields: [
      {
        name: 'about',
        title: 'About',
        type: 'object',
        fields: [
          { name: 'hero', type: 'heroSection' },
          { name: 'vision', type: 'visionSection' },
          { name: 'transparency', type: 'transparencySection' },
          { name: 'serviceHighlight', type: 'serviceHighlightSection' },
          { name: 'collaborativePanel', type: 'collaborativePanelSection' },
          { name: 'testimonial', type: 'testimonialSection' },
          { name: 'leadership', type: 'leadershipSection' },
          { name: 'joinTeam', type: 'joinTeamSection' },
          { name: 'advisors', type: 'array', of: [{ type: 'reference', to: [{ type: 'advisor' }] }] },
          { name: 'investors', type: 'array', of: [{ type: 'reference', to: [{ type: 'investor' }] }] }
        ]
      }
    ]
  };
  
  // Export all types in one array for schema creation
  export default [
    heroSection,
    visionSection,
    valueItem,
    transparencySection,
    serviceFeature,
    serviceHighlightSection,
    panelFeature,
    collaborativePanelSection,
    testimonialSection,
    joinTeamSection,
    leadershipSection,
    teamMember,
    advisor,
    investor,
    aboutPage
  ];
  