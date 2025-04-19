// blog-data.js
import { createClient } from '@sanity/client';
import fetch from 'node-fetch';

const client = createClient({
  projectId: 'loof1pb6',
  dataset: 'production',
  apiVersion: '2023-05-03',
  token: 'sklcfsm7lToQS91LPIl9Oju3yfsERhXw4vXQ6fttf8U7CgpvqkvEhiATTSdzOPKqF7pTVdQ9ExFo17NXjNiI8KSbgjeCq6NTENsfq77uY5MyrtdeokjNUEzeFamqiOFOnWvXMrFHaAbKNUQxz92p2YM3yH4TOeePZrWl1MvRnLqBPdhiBSUC', 
  useCdn: false,
});

// Sample author data
const authors = [
  {
    _id: 'author-1',
    name: 'Chris Severn',
    imageUrl: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
  {
    _id: 'author-2',
    name: 'Mischka Moechtar',
    imageUrl: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
  {
    _id: 'author-3',
    name: 'Shay Forbes',
    imageUrl: 'https://randomuser.me/api/portraits/men/76.jpg',
  },
  {
    _id: 'author-4',
    name: 'Joe Wisniewski',
    imageUrl: 'https://randomuser.me/api/portraits/men/52.jpg',
  },
];

// Sample main card data
const mainCards = [
  {
    _id: 'maincard-1',
    title: 'Introducing the PATIENTS Framework for a Patient-Centered Healthcare Transaction',
    category: 'PRESS RELEASES',
    bulletPoints: [
      'Publicly Accountable Transparent Interoperable Efficient',
      'Nonproprietary Transaction Standard',
      'Framework for improving healthcare price transparency'
    ],
    readTime: '3 MIN READ',
    date: '2023-04-02',
    imageUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
    authorId: 'author-1',
    sortOrder: 1
  },
  {
    _id: 'maincard-2',
    title: 'Drug Manufacturer\'s Guide to Transparency in Coverage\'s Prescription Drug File',
    category: 'LIFE SCIENCES',
    bulletPoints: [
      'It\'s about time drugs prices got a dust-off',
      'Understanding the new requirements for drug pricing transparency',
      'How manufacturers can comply with the latest regulations'
    ],
    readTime: '4 MIN READ',
    date: '2023-03-21',
    imageUrl: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
    authorId: 'author-2',
    sortOrder: 2
  },
  {
    _id: 'maincard-3',
    title: 'Can Price Transparency Replace UDS Data for Brokers?',
    category: 'EMPLOYERS',
    bulletPoints: [
      'Let\'s take a look at the new kid on the block',
      'Comparing price transparency data with traditional UDS data',
      'Benefits and limitations for benefits brokers'
    ],
    readTime: '4 MIN READ',
    date: '2023-02-27',
    imageUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
    authorId: 'author-3',
    sortOrder: 3
  },
  {
    _id: 'maincard-4',
    title: 'Price Transparency Is One of The Few Bipartisan Issues Left',
    category: 'LEGISLATION',
    bulletPoints: [
      'New executive order accelerates price transparency',
      'Why both sides of the aisle are supporting healthcare price transparency',
      'Impact on providers, payers, and patients'
    ],
    readTime: '3 MIN READ',
    date: '2023-02-25',
    imageUrl: 'https://images.unsplash.com/photo-1577563908411-5077b6dc7624?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
    authorId: 'author-4',
    sortOrder: 4
  },
  {
    _id: 'maincard-5',
    title: 'The Future of Healthcare Price Transparency',
    category: 'ANALYSIS',
    bulletPoints: [
      'Where we\'re headed: trends and predictions',
      'Technology\'s role in advancing healthcare transparency',
      'What healthcare providers need to know for 2023 and beyond'
    ],
    readTime: '5 MIN READ',
    date: '2023-01-15',
    imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
    authorId: 'author-1',
    sortOrder: 5
  }
];

// Sample articles data for each main card
const articlesByMainCard = {
  'maincard-1': [
    {
      title: 'What is the PATIENTS Framework?',
      category: 'HEALTHCARE',
      description: "An introduction to the new standard that's changing healthcare transactions and pricing.",
      readTime: '3 MIN READ',
      date: '2023-04-03',
      imageUrl: 'https://images.unsplash.com/photo-1571772996211-2f02c9727629?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
      authorIds: ['author-1']
    },
    {
      title: 'Transparency in Healthcare: A History',
      category: 'HEALTHCARE',
      description: 'How did we get here? The evolution of price transparency in American healthcare.',
      readTime: '5 MIN READ',
      date: '2023-04-01',
      imageUrl: 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1632&q=80',
      authorIds: ['author-1', 'author-4']
    },
    {
      title: 'The Path to Interoperability',
      category: 'TECHNOLOGY',
      description: 'Why connected healthcare systems are essential for true price transparency.',
      readTime: '4 MIN READ',
      date: '2023-03-30',
      imageUrl: 'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
      authorIds: ['author-3']
    }
  ],
  'maincard-2': [
    {
      title: 'Prescription Drug Pricing: Explained',
      category: 'LIFE SCIENCES',
      description: 'Breaking down the complex factors that determine what patients pay for medications.',
      readTime: '6 MIN READ',
      date: '2023-03-19',
      imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
      authorIds: ['author-2']
    },
    {
      title: 'Compliance Guide for Pharma Companies',
      category: 'LIFE SCIENCES',
      description: 'Step-by-step processes for meeting new transparency requirements without disruption.',
      readTime: '4 MIN READ',
      date: '2023-03-17',
      imageUrl: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
      authorIds: ['author-2', 'author-4']
    },
    {
      title: 'The Impact of Transparent Drug Pricing',
      category: 'ANALYSIS',
      description: 'How accessible pricing information is changing patient behavior and market dynamics.',
      readTime: '5 MIN READ',
      date: '2023-03-15',
      imageUrl: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
      authorIds: ['author-1', 'author-2']
    }
  ],
  'maincard-3': [
    {
      title: 'UDS Data vs. Price Transparency Data',
      category: 'EMPLOYERS',
      description: "A detailed comparison of the datasets brokers have relied on and what's now available.",
      readTime: '5 MIN READ',
      date: '2023-02-25',
      imageUrl: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1472&q=80',
      authorIds: ['author-3']
    },
    {
      title: 'How Brokers Can Leverage New Data Sources',
      category: 'EMPLOYERS',
      description: 'Practical strategies for incorporating price transparency into client recommendations.',
      readTime: '4 MIN READ',
      date: '2023-02-22',
      imageUrl: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1476&q=80',
      authorIds: ['author-3', 'author-1']
    },
    {
      title: 'The Future of Benefits Decision Support',
      category: 'TECHNOLOGY',
      description: 'How technology is transforming the way employers and employees make healthcare choices.',
      readTime: '3 MIN READ',
      date: '2023-02-20',
      imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
      authorIds: ['author-3']
    }
  ],
  'maincard-4': [
    {
      title: 'The Executive Order: What You Need to Know',
      category: 'LEGISLATION',
      description: 'Breaking down the latest federal action on healthcare price transparency.',
      readTime: '4 MIN READ',
      date: '2023-02-24',
      imageUrl: 'https://images.unsplash.com/photo-1589262804704-c5aa9e6def89?ixlib=rb-4.0.3&auto=format&fit=crop&w=1471&q=80',
      authorIds: ['author-4', 'author-1']
    },
    {
      title: 'State vs. Federal Price Transparency Initiatives',
      category: 'LEGISLATION',
      description: 'How different levels of government are approaching healthcare cost visibility.',
      readTime: '6 MIN READ',
      date: '2023-02-22',
      imageUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
      authorIds: ['author-4']
    }
  ],
  'maincard-5': [
    {
      title: 'Compliance Timeline for Providers',
      category: 'PROVIDERS',
      description: 'Key dates and requirements that healthcare organizations need to prepare for.',
      readTime: '3 MIN READ',
      date: '2023-02-20',
      imageUrl: 'https://images.unsplash.com/photo-1516841273335-e39b37888115?ixlib=rb-4.0.3&auto=format&fit=crop&w=1447&q=80',
      authorIds: ['author-1']
    },
    {
      title: 'Technology Trends in Healthcare Transparency',
      category: 'TECHNOLOGY',
      description: 'How AI and machine learning are transforming the accessibility of healthcare pricing.',
      readTime: '4 MIN READ',
      date: '2023-01-10',
      imageUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
      authorIds: ['author-3']
    }
  ]
};

// Sample "other articles" data
const otherArticles = [
  {
    title: 'Healthcare Pricing in 2023: A Complete Guide',
    category: 'GUIDE',
    description: 'Everything you need to know about navigating the new transparent healthcare landscape.',
    readTime: '8 MIN READ',
    date: '2023-01-05',
    imageUrl: 'https://images.unsplash.com/photo-1504439468489-c8920d796a29?ixlib=rb-4.0.3&auto=format&fit=crop&w=1471&q=80',
    authorIds: ['author-1', 'author-2']
  },
  {
    title: 'Patient Rights Under New Transparency Rules',
    category: 'PATIENTS',
    description: 'What consumers need to know about their expanded rights to pricing information.',
    readTime: '5 MIN READ',
    date: '2023-01-02',
    imageUrl: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
    authorIds: ['author-4']
  },
  {
    title: 'Global Perspectives on Healthcare Transparency',
    category: 'INTERNATIONAL',
    description: 'How other countries are tackling the challenge of transparent healthcare pricing.',
    readTime: '6 MIN READ',
    date: '2022-12-15',
    imageUrl: 'https://images.unsplash.com/photo-1565073624497-9db02dbe232f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1632&q=80',
    authorIds: ['author-3']
  },
  {
    title: 'Small Practice Guide to Price Transparency',
    category: 'PROVIDERS',
    description: 'How independent physicians and small clinics can efficiently comply with new regulations.',
    readTime: '4 MIN READ',
    date: '2022-12-10',
    imageUrl: 'https://images.unsplash.com/photo-1560582861-45078880e48e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1474&q=80',
    authorIds: ['author-2']
  }
];

// Function to upload an image to Sanity
async function uploadImage(imageUrl, filename) {
  try {
    // Fetch the image
    const response = await fetch(imageUrl);
    const buffer = await response.arrayBuffer();
    
    // Upload to Sanity
    return client.assets.upload('image', Buffer.from(buffer), {
      filename
    });
  } catch (error) {
    console.error(`Error uploading image ${imageUrl}:`, error);
    throw error;
  }
}

// Main function to populate Sanity with mock data
async function populateSanity() {
  try {
    console.log('Starting to populate Sanity with mock blog data...');
    
    // 1. Create authors
    console.log('Creating authors...');
    const authorIds = {};
    
    for (const author of authors) {
      console.log(`Creating author: ${author.name}`);
      
      // Upload author image
      const imageAsset = await uploadImage(author.imageUrl, `author-${author.name.toLowerCase().replace(/\s+/g, '-')}`);
      
      // Create author document
      const createdAuthor = await client.create({
        _id: author._id,
        _type: 'author',
        name: author.name,
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: imageAsset._id
          }
        }
      });
      
      authorIds[author._id] = createdAuthor._id;
      console.log(`Created author: ${author.name} with ID: ${createdAuthor._id}`);
    }
    
    // 2. Create main cards
    console.log('Creating main cards...');
    const mainCardIds = {};
    
    for (const mainCard of mainCards) {
      console.log(`Creating main card: ${mainCard.title}`);
      
      // Upload main card image
      const imageAsset = await uploadImage(
        mainCard.imageUrl, 
        `maincard-${mainCard.title.toLowerCase().replace(/\s+/g, '-').substring(0, 50)}`
      );
      
      // Create main card document
      const createdMainCard = await client.create({
        _id: mainCard._id,
        _type: 'blogMainCard',
        title: mainCard.title,
        category: mainCard.category,
        bulletPoints: mainCard.bulletPoints,
        readTime: mainCard.readTime,
        date: new Date(mainCard.date).toISOString().split('T')[0],
        sortOrder: mainCard.sortOrder,
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: imageAsset._id
          }
        },
        authors: [
          {
            _type: 'blogPostAuthor',
            author: {
              _type: 'reference',
              _ref: authorIds[mainCard.authorId]
            }
          }
        ],
        slug: {
          _type: 'slug',
          current: mainCard.title.toLowerCase().replace(/\s+/g, '-').substring(0, 200)
        }
      });
      
      mainCardIds[mainCard._id] = createdMainCard._id;
      console.log(`Created main card: ${mainCard.title} with ID: ${createdMainCard._id}`);
    }
    
    // 3. Create articles for each main card
    console.log('Creating articles...');
    
    for (const [mainCardId, articles] of Object.entries(articlesByMainCard)) {
      for (const article of articles) {
        console.log(`Creating article: ${article.title}`);
        
        // Upload article image
        const imageAsset = await uploadImage(
          article.imageUrl,
          `article-${article.title.toLowerCase().replace(/\s+/g, '-').substring(0, 50)}`
        );
        
        // Create article document
        await client.create({
          _type: 'blogArticle',
          title: article.title,
          category: article.category,
          description: article.description,
          readTime: article.readTime,
          date: new Date(article.date).toISOString().split('T')[0],
          image: {
            _type: 'image',
            asset: {
              _type: 'reference',
              _ref: imageAsset._id
            }
          },
          authors: article.authorIds.map(authorId => ({
            _type: 'blogPostAuthor',
            author: {
              _type: 'reference',
              _ref: authorIds[authorId]
            }
          })),
          slug: {
            _type: 'slug',
            current: article.title.toLowerCase().replace(/\s+/g, '-').substring(0, 200)
          },
          mainCardRef: {
            _type: 'reference',
            _ref: mainCardIds[mainCardId]
          }
        });
        
        console.log(`Created article: ${article.title}`);
      }
    }
    
    // 4. Create other articles
    console.log('Creating other articles...');
    
    for (const otherArticle of otherArticles) {
      console.log(`Creating other article: ${otherArticle.title}`);
      
      // Upload other article image
      const imageAsset = await uploadImage(
        otherArticle.imageUrl,
        `other-article-${otherArticle.title.toLowerCase().replace(/\s+/g, '-').substring(0, 50)}`
      );
      
      // Create other article document
      await client.create({
        _type: 'otherArticle',
        title: otherArticle.title,
        category: otherArticle.category,
        description: otherArticle.description,
        readTime: otherArticle.readTime,
        date: new Date(otherArticle.date).toISOString().split('T')[0],
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: imageAsset._id
          }
        },
        authors: otherArticle.authorIds.map(authorId => ({
          _type: 'blogPostAuthor',
          author: {
            _type: 'reference',
            _ref: authorIds[authorId]
          }
        })),
        slug: {
          _type: 'slug',
          current: otherArticle.title.toLowerCase().replace(/\s+/g, '-').substring(0, 200)
        }
      });
      
      console.log(`Created other article: ${otherArticle.title}`);
    }
    
    console.log('Successfully populated Sanity with mock blog data!');
    
  } catch (error) {
    console.error('Error populating Sanity:', error);
  }
}

// Run the function
populateSanity();