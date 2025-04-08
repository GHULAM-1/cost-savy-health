export default {
    name: 'healthcareRecord',
    title: 'Healthcare Record',
    type: 'document',
    fields: [
      {
        name: 'reporting_entity_name',
        title: 'Reporting Entity Name',
        type: 'string',
      },
      {
        name: 'provider_group_id',
        title: 'Provider Group ID',
        type: 'string',
      },
      {
        name: 'provider_group_id_type',
        title: 'Provider Group ID Type',
        type: 'string',
      },
      {
        name: 'sub_npi',
        title: 'Sub NPI',
        type: 'string',
      },
      {
        name: 'negotiation_arrangement',
        title: 'Negotiation Arrangement',
        type: 'string',
      },
      {
        name: 'billing_code',
        title: 'Billing Code',
        type: 'string',
      },
      {
        name: 'billing_code_type',
        title: 'Billing Code Type',
        type: 'string',
      },
      {
        name: 'billing_code_name',
        title: 'Billing Code Name',
        type: 'string',
      },
      {
        name: 'billing_code_modifier',
        title: 'Billing Code Modifier',
        type: 'string',
      },
      {
        name: 'negotiated_type',
        title: 'Negotiated Type',
        type: 'string',
      },
      {
        name: 'negotiated_rate',
        title: 'Negotiated Rate',
        type: 'number',
      },
      {
        name: 'billing_class',
        title: 'Billing Class',
        type: 'string',
      },
      {
        name: 'provider_name',
        title: 'Provider Name',
        type: 'string',
      },
      {
        name: 'provider_city',
        title: 'Provider City',
        type: 'string',
      },
      {
        name: 'provider_state',
        title: 'Provider State',
        type: 'string',
      },
      {
        name: 'provider_zip_code',
        title: 'Provider ZIP Code',
        type: 'string',
      },
    ],
    preview: {
      select: {
        title: 'provider_name',
        subtitle: 'billing_code_name',
      },
    },
  }