import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'blogMainCard',
  title: 'Blog Main Card',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
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
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'bulletPoints',
      title: 'Bullet Points',
      type: 'array',
      of: [{ type: 'string' }],
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'date',
      options: {
        dateFormat: 'MMM D, YYYY'
      },
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'readTime',
      title: 'Read Time',
      type: 'string',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96
      },
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        { type: 'block' },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative text',
              description: 'Important for accessibility and SEO',
              options: { isHighlighted: true }
            }
          ]
        }
      ]
    }),
    defineField({
      name: 'authors',
      title: 'Authors',
      type: 'array',
      of: [{ type: 'blogPostAuthor' }],
      validation: (Rule) => Rule.required().min(1)
    }),
    defineField({
      name: 'sortOrder',
      title: 'Sort Order',
      description: 'Used to order the main cards on the page',
      type: 'number',
      validation: (Rule) => Rule.required()
    })
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
      media: 'image'
    }
  }
});