// schemas/procedure.js
import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'procedure',
  title: 'Procedure',
  type: 'document',
  fields: [
    // 1. The main title
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required().custom(async (value, context) => {
        if (!context.document) return true;
        const { getClient } = context;
        const client = getClient({ apiVersion: '2023-05-03' });
        const id = context.document._id.replace(/^drafts\./, '');
        const query = `*[_type == "procedure" && title == $value && _id != $id][0]`;
        const existingDoc = await client.fetch(query, { value, id });
        return existingDoc ? 'Title must be unique' : true;
      }),
    }),

    // 2. Average Cash Price
    defineField({
      name: 'averageCashPrice',
      title: 'Average Cash Price',
      type: 'number',
      description: 'In USD, e.g. 120',
      validation: (Rule) => Rule.min(0),
    }),

    // 3. Introduction paragraph
    defineField({
      name: 'introduction',
      title: 'Introduction',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'Short intro under the title',
    }),

    // 4. A list of arbitrary sections (inlined object)
    defineField({
      name: 'sections',
      title: 'Information Sections',
      type: 'array',
      of: [
        {
          type: 'object',
          title: 'Section',
          fields: [
            defineField({
              name: 'heading',
              title: 'Heading',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'content',
              title: 'Content',
              type: 'array',
              of: [{ type: 'block' }],
              validation: (Rule) => Rule.required(),
            }),
          ],
        },
      ],
      description: 'Add "What is…?", "Why would I…?" etc.',
    }),

    // 5. Conclusion block
    defineField({
      name: 'conclusion',
      title: 'Conclusion',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'Final summary paragraph(s)',
    }),
  ],
});
