// schemas/provider.js
import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'provider',
  title: 'Provider',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Provider Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'address',
      title: 'Address',
      type: 'object',
      fields: [
        defineField({ name: 'street', title: 'Street', type: 'string', validation: Rule => Rule.required() }),
        defineField({ name: 'city',   title: 'City',   type: 'string', validation: Rule => Rule.required() }),
        defineField({ name: 'state',  title: 'State',  type: 'string', validation: Rule => Rule.required() }),
        defineField({ name: 'zip',    title: 'Zip Code', type: 'string', validation: Rule => Rule.required() }),
      ],
    }),

    defineField({
      name: 'phone',
      title: 'Phone',
      type: 'string',
    }),

    defineField({
      name: 'medicareProviderId',
      title: 'Medicare Provider ID',
      type: 'string',
    }),

    defineField({
      name: 'npi',
      title: 'National Provider ID (NPI)',
      type: 'string',
    }),

    defineField({
      name: 'website',
      title: 'Website',
      type: 'url',
    }),

    defineField({
      name: 'providerType',
      title: 'Provider Type',
      type: 'string',
    }),

    defineField({
      name: 'ownership',
      title: 'Ownership',
      type: 'string',
    }),

    defineField({
      name: 'beds',
      title: 'Number of Beds',
      type: 'number',
      description: 'Enter total bed count',
      validation: (Rule) => Rule.min(0),
    }),

    defineField({
      name: 'nearbyProviders',
      title: 'Nearby Providers',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'List names (and optionally distance) of nearby facilities',
    }),

    defineField({
      name: 'clinicalServices',
      title: 'Clinical Services',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'E.g. CT Scan, Laboratory, etc.',
    }),
  ]
});
