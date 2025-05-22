// schemas/healthSystem.js
import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'healthSystem',
  title: 'Health System',
  type: 'document',
  fields: [

    defineField({
      name: 'name',
      title: 'Health System Name',
      type: 'string',
      validation: Rule => Rule.required()
    }),

    defineField({
      name: 'isVerified',
      title: 'Verification Status',
      type: 'boolean',
      description: 'Turquoise verification badge (true = verified)',
      initialValue: false
    }),

    defineField({
      name: 'claimUrl',
      title: 'Claim Link',
      type: 'url',
      description: 'URL to claim this health system'
    }),

    defineField({
      name: 'locations',
      title: 'Locations',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({
            name: 'facilityName',
            title: 'Facility Name',
            type: 'string',
            validation: Rule => Rule.required()
          }),
          defineField({
            name: 'street',
            title: 'Street Address',
            type: 'string',
            validation: Rule => Rule.required()
          }),
          defineField({
            name: 'city',
            title: 'City',
            type: 'string',
            validation: Rule => Rule.required()
          }),
          defineField({
            name: 'state',
            title: 'State',
            type: 'string',
            validation: Rule => Rule.required()
          }),
          defineField({
            name: 'zip',
            title: 'Zip Code',
            type: 'string',
            validation: Rule => Rule.required()
          }),
        ]
      }],
      description: 'List of all system locations'
    }),

    defineField({
      name: 'services',
      title: 'Services',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'All service categories offered by this system'
    }),

  ]
});
