import { createClient } from '@sanity/client';
import fetch from 'node-fetch';

const client = createClient({
    projectId: 'loof1pb6',
    dataset: 'production',
    apiVersion: '2023-05-03',
    token: 'sklcfsm7lToQS91LPIl9Oju3yfsERhXw4vXQ6fttf8U7CgpvqkvEhiATTSdzOPKqF7pTVdQ9ExFo17NXjNiI8KSbgjeCq6NTENsfq77uY5MyrtdeokjNUEzeFamqiOFOnWvXMrFHaAbKNUQxz92p2YM3yH4TOeePZrWl1MvRnLqBPdhiBSUC', 
    useCdn: false,
  });

// Helper to build Portable Text blocks
function textBlock(text) {
  return {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text }],
    markDefs: [],
  };
}

// Random data pools
const states   = ['CA','TX','FL','NY','IL','PA','OH','GA','NC','MI'];
const cities   = ['Springfield','Rivertown','Lakeview','Hillcrest','Grand City'];
const services = [
  'Evaluation And Management',
  'Labs And Pathology',
  'Medicine Services And Procedures',
  'Non-Surgical Procedures',
  'Other Services',
  'Physical Therapy',
  'Radiology And Imaging',
  'Surgical Procedures'
];

// 1) PROCEDURES
const PROCEDURE_COUNT = 20;
function makeProcedure(i) {
  const title = `Procedure ${i}: ${['Echo','Scan','Biopsy','MRI'][i%4]}`;
  return {
    _id:              `procedure-${i}`,
    _type:            'procedure',
    title,
    averageCashPrice: Math.floor(Math.random() * 400) + 50,
    introduction:     [
      textBlock(`This is a brief intro for ${title}.`)
    ],
    sections: [
      {
        heading: `What is ${title}?`,
        content: [
          textBlock(`${title} is a standard medical procedure.`)
        ],
      },
      {
        heading: `Why get ${title}?`,
        content: [
          textBlock(`You might get ${title} for diagnostic reasons.`)
        ],
      },
      {
        heading: `What to expect during ${title}`,
        content: [
          textBlock(`During a ${title}, you will experience a quick scan.`)
        ],
      }
    ],
    conclusion: [
      textBlock(`In conclusion, ${title} is safe and effective.`)
    ],
  };
}

// 2) PROVIDERS
const PROVIDER_COUNT = 20;
function makeProvider(i) {
  const state = states[i % states.length];
  const city  = cities[i % cities.length];
  const zip   = 90000 + i;
  return {
    _id: 'provider-' + i,
    _type: 'provider',
    name: `Provider ${i} Medical Center`,
    address: {
      street: `${100 + i} Main St`,
      city,
      state,
      zip: zip.toString(),
    },
    phone: `(555) 010-${String(i).padStart(4, '0')}`,
    medicareProviderId: `MPID${1000 + i}`,
    npi: `NPI${2000 + i}`,
    website: `https://provider${i}.example.com`,
    providerType: ['Hospital','Clinic','Imaging Center'][i % 3],
    ownership: ['Private','Government','Non-Profit'][i % 3],
    beds: Math.floor(Math.random() * 200) + 10,
    nearbyProviders: [
      `Neighbor Hosp ${i+1}`,
      `Neighbor Center ${i+2}`
    ],
    clinicalServices: services.slice(0, 3 + (i % 5)),
  };
}

// 3) HEALTH SYSTEMS
const HS_COUNT = 10;
function makeHealthSystem(i) {
  const locations = [];
  for (let j = 1; j <= 3; j++) {
    const state = states[(i + j) % states.length];
    const city  = cities[(i + j) % cities.length];
    locations.push({
      facilityName: `Facility ${i}-${j}`,
      street: `${200 + j} Oak Ave`,
      city,
      state,
      zip: (80000 + i * 10 + j).toString(),
    });
  }
  return {
    _id: 'healthSystem-' + i,
    _type: 'healthSystem',
    name: `Health System ${i}`,
    isVerified: i % 2 === 0,
    claimUrl: `https://example.com/claim/hs${i}`,
    locations,
    services: services.slice(0, 4 + (i % 4)),
  };
}

async function seed() {
  console.log('🔄 Seeding Procedures');
  for (let i = 1; i <= PROCEDURE_COUNT; i++) {
    const doc = makeProcedure(i);
    await client.createOrReplace(doc);
    process.stdout.write('.');
  }
  console.log('\n✅ Procedures done.');

  console.log('🔄 Seeding Providers');
  for (let i = 1; i <= PROVIDER_COUNT; i++) {
    const doc = makeProvider(i);
    await client.createOrReplace(doc);
    process.stdout.write('.');
  }
  console.log('\n✅ Providers done.');

  console.log('🔄 Seeding Health Systems');
  for (let i = 1; i <= HS_COUNT; i++) {
    const doc = makeHealthSystem(i);
    await client.createOrReplace(doc);
    process.stdout.write('.');
  }
  console.log('\n✅ Health Systems done.');

  console.log('🎉 All mock data seeded.');
  process.exit(0);
}

seed().catch(err => {
  console.error(err);
  process.exit(1);
});
