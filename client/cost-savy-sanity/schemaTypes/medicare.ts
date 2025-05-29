import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'medicare',
  title: 'Medicare',
  type: 'document',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'number',
      title: 'Number',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'featuresGrid',
      title: 'Features Grid',
      type: 'array',
      of: [
        {
          type: 'object',
          title: 'Feature Item',
          fields: [
            defineField({
              name: 'image',
              title: 'Feature Image',
              type: 'image',
              options: {hotspot: true},
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'heading',
              title: 'Feature Heading',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Feature Description',
              type: 'text',
              validation: (Rule) => Rule.required(),
            }),
          ],
        },
      ],
      // no max: allows unlimited items
      validation: (Rule) => Rule.min(1).error('Add at least one feature'),
      // if you don’t even want to enforce a minimum, you can omit the validation entirely
    }),
  ],
})
