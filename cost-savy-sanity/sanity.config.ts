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
              .title('Blog Main Cards')
              .child(
                S.documentTypeList('blogMainCard')
                  .title('Blog Main Cards')
              ),
            S.listItem()
              .title('Blog Articles')
              .child(
                S.documentTypeList('blogArticle')
                  .title('Blog Articles')
              ),
            S.listItem()
              .title('Other Articles')
              .child(
                S.documentTypeList('otherArticle')
                  .title('Other Articles')
              ),
            S.listItem()
              .title('Authors')
              .child(S.documentTypeList('author')),
            S.listItem()
              .title('Healthcare Records')
              .child(S.documentTypeList('healthcareRecord'))
          ]),
    }),
    visionTool()
  ],
  schema: {
    types: schemaTypes,
  },
})