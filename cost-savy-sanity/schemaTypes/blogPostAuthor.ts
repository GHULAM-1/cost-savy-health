import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'blogPostAuthor',
  title: 'Blog Post Author',
  type: 'object',
  fields: [
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{ type: 'author' }],
      validation: (Rule) => Rule.required()
    })
  ],
  preview: {
    select: {
      title: 'author.name',
      media: 'author.image'
    }
  }
});