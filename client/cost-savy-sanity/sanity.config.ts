import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'cost-savy-health',
  projectId: 'loof1pb6',
  dataset: 'production',
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('Home Page')
              .child(S.document().schemaType('homePage').documentId('homePage')),
            S.listItem()
              .title('About Page')
              .child(S.document().schemaType('aboutPage').documentId('aboutPage')),
            S.listItem()
              .title('Medicare Page')
              .child(S.document().schemaType('medicare').documentId('medicare')),
            S.listItem()
              .title('Blog Main Cards')
              .child(S.documentTypeList('blogMainCard').title('Blog Main Cards')),
            S.listItem()
              .title('Blog Articles')
              .child(S.documentTypeList('blogArticle').title('Blog Articles')),
            S.listItem()
              .title('Other Articles')
              .child(S.documentTypeList('otherArticle').title('Other Articles')),
            S.listItem().title('Authors').child(S.documentTypeList('author')),
            S.listItem().title('Healthcare Records').child(S.documentTypeList('healthcareRecord')),
            S.listItem()
              .title('Procedures')
              .child(S.documentTypeList('procedure').title('Procedures')),
            S.listItem()
              .title('Providers')
              .child(S.documentTypeList('provider').title('Providers')),
            S.listItem()
              .title('Health Systems')
              .child(S.documentTypeList('healthSystem').title('Health Systems')),
          ]),
    }),
    visionTool(),
  ],
  schema: {
    types: schemaTypes,
  },
})
