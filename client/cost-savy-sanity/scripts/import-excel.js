require('dotenv').config();
const { createClient } = require('@sanity/client');
const xlsx = require('xlsx');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

function generateId(length = 10) {
  return crypto.randomBytes(length).toString('hex');
}

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET || 'production',
  token: process.env.SANITY_TOKEN,
  apiVersion: '2023-05-03',
  useCdn: false,
});

const filePath = 'C:\\Users\\user\\Desktop\\cost-savy-health';

if (fs.existsSync(filePath)) {
  processFile(filePath);
} else if (fs.existsSync(`${filePath}.xlsx`)) {
  processFile(`${filePath}.xlsx`);
} else if (fs.existsSync(`${filePath}.xls`)) {
  processFile(`${filePath}.xls`);
} else {
  console.error(`Excel file not found at ${filePath} with any common extension.`);
  console.log("Please enter the full file path including extension:");
  
  const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  });

  readline.question('Full file path: ', (userFilePath) => {
    readline.close();
    if (fs.existsSync(userFilePath)) {
      processFile(userFilePath);
    } else {
      console.error(`File not found at: ${userFilePath}`);
      process.exit(1);
    }
  });
}

async function processFile(filePath) {
  try {
    console.log(`Reading Excel file from: ${filePath}`);
    
    const workbook = xlsx.readFile(filePath, {
      cellDates: true,
      cellNF: true,
      cellText: false,
    });
    
    const sheetName = workbook.SheetNames[0];
    console.log(`Processing sheet: ${sheetName}`);
    
    const worksheet = workbook.Sheets[sheetName];
    const jsonData = xlsx.utils.sheet_to_json(worksheet);
    
    console.log(`Found ${jsonData.length} records to import`);
    
    const batchSize = 50;
    const totalBatches = Math.ceil(jsonData.length / batchSize);
    
    console.log(`Will process in ${totalBatches} batches of ${batchSize} records`);
    
    for (let batchIndex = 0; batchIndex < totalBatches; batchIndex++) {
      const start = batchIndex * batchSize;
      const end = Math.min(start + batchSize, jsonData.length);
      const batch = jsonData.slice(start, end);
      
      console.log(`Processing batch ${batchIndex + 1}/${totalBatches} (records ${start + 1}-${end})`);
      
      const documents = batch.map(record => ({
        _id: `health_${generateId()}`,
        _type: 'healthcareRecord',
        reporting_entity_name: record.reporting_entity_name_in_network_files || '',
        provider_group_id: String(record.provider_group_id || ''),
        provider_group_id_type: record.provider_group_id_type || '',
        sub_npi: String(record.sub_npi || ''),
        negotiation_arrangement: record.negotiation_arrangement || '',
        billing_code: String(record.billing_code || ''),
        billing_code_type: record.billing_code_type || '',
        billing_code_name: record.billing_code_name || '',
        billing_code_modifier: record.billing_code_modifier ? String(record.billing_code_modifier) : '',
        negotiated_type: record.negotiated_type || '',
        negotiated_rate: parseFloat(record.negotiated_rate) || 0,
        billing_class: record.billing_class || '',
        provider_name: record.provider_name || '',
        provider_city: record.provider_city || '',
        provider_state: record.provider_state || '',
        provider_zip_code: String(record.provider_zip_code || ''),
      }));
      
      try {
        const transaction = client.transaction();
        
        documents.forEach(doc => {
          transaction.create(doc);
        });
        
        await transaction.commit();
        console.log(`✅ Successfully imported batch ${batchIndex + 1}`);
        
        await new Promise(resolve => setTimeout(resolve, 1000));
      } catch (error) {
        console.error(`❌ Error importing batch ${batchIndex + 1}:`, error.message);
      }
    }
    
    console.log('Import completed!');
  } catch (error) {
    console.error('Import failed:', error);
    process.exit(1);
  }
}