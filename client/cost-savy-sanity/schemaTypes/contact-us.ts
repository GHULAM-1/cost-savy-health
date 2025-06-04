import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'contact',
  title: 'Contact',
  type: 'document',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'string',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'subDescription',
      title: 'Sub Description',
      type: 'string',
      validation: (Rule) => Rule.required()
    })
  ]
});