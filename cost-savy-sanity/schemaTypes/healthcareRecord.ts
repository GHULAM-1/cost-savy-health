import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'healthcareRecord',
  title: 'Healthcare Record',
  type: 'document',
  fields: [
    defineField({
      name: 'reporting_entity_name',
      title: 'Reporting Entity Name',
      type: 'string',
    }),
    defineField({
      name: 'provider_group_id',
      title: 'Provider Group ID',
      type: 'string',
    }),
    defineField({
      name: 'provider_group_id_type',
      title: 'Provider Group ID Type',
      type: 'string',
    }),
    defineField({
      name: 'sub_npi',
      title: 'Sub NPI',
      type: 'string',
    }),
    defineField({
      name: 'negotiation_arrangement',
      title: 'Negotiation Arrangement',
      type: 'string',
    }),
    defineField({
      name: 'billing_code',
      title: 'Billing Code',
      type: 'string',
    }),
    defineField({
      name: 'billing_code_type',
      title: 'Billing Code Type',
      type: 'string',
    }),
    defineField({
      name: 'billing_code_name',
      title: 'Billing Code Name',
      type: 'string',
    }),
    defineField({
      name: 'billing_code_modifier',
      title: 'Billing Code Modifier',
      type: 'string',
    }),
    defineField({
      name: 'negotiated_type',
      title: 'Negotiated Type',
      type: 'string',
    }),
    defineField({
      name: 'negotiated_rate',
      title: 'Negotiated Rate',
      type: 'number',
    }),
    defineField({
      name: 'billing_class',
      title: 'Billing Class',
      type: 'string',
    }),
    defineField({
      name: 'provider_name',
      title: 'Provider Name',
      type: 'string',
    }),
    defineField({
      name: 'provider_city',
      title: 'Provider City',
      type: 'string',
    }),
    defineField({
      name: 'provider_state',
      title: 'Provider State',
      type: 'string',
    }),
    defineField({
      name: 'provider_zip_code',
      title: 'Provider ZIP Code',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      title: 'provider_name',
      subtitle: 'billing_code_name',
    },
  },
})