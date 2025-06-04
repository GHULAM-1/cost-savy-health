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
import contactUs from './contact-us'
import indiviualHealth from './indiviual-health'

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
  indiviualHealth,
  contactUs,
  healthSystem,
  ...aboutSchemas,
  ...homeSchemas
]
