import healthcareRecord from './healthcareRecord'
import author from './author'
import blogPostAuthor from './blogPostAuthor'
import blogMainCard from './blogMainCard'
import blogArticle from './blogArticle'
import otherArticle from './otherArticle'
import procedure from './procedure'
import healthSystem from './healthSystem'
import provider from './provider'
import aboutSchemas from './about'
import homeSchemas from './home'
import medicare from './medicare'

export const schemaTypes = [
  author,
  blogPostAuthor,
  blogMainCard,
  blogArticle,
  otherArticle,
  healthcareRecord,
  provider,
  procedure,
  medicare,
  healthSystem,
  ...aboutSchemas,
  ...homeSchemas
]
