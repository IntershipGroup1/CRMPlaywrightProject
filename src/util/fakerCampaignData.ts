import fs from 'fs';
import path from 'path';
import { faker } from '@faker-js/faker';


//const filePath = path.resolve(__dirname, '../data/campaignData.json');
//const OpportunityfilePath = path.resolve(__dirname, '../data/opportunityData.json');
const clean = (str: string) => str.replace(/[^a-zA-Z]/g, '');

const campaignFilePath = path.resolve(process.cwd(), 'src/Data/campaignData.json');
const opportunityFilePath = path.resolve(process.cwd(), 'src/Data/opportunityData.json');

export const generateCampaignFromJson = () => {
  // Read existing JSON
  const rawData = fs.readFileSync(campaignFilePath, 'utf-8');
  const jsonData = JSON.parse(rawData);

  // Fill with Faker data
  //jsonData.campaignData.campaignName = faker.company.buzzNoun().slice(0, 20);
  
  jsonData.campaignData.campaignName =`TestCamp ${clean(faker.person.lastName())}`.slice(0, 20);
  jsonData.campaignData.campaignStatus = faker.helpers.arrayElement([
    'Active',
    'Paused',
    'Completed'
  ]);
  jsonData.campaignData.targetSize = faker.number.int({ min: 100, max: 10000 }).toString();
  jsonData.campaignData.expectedCloseDate = faker.date.future().toISOString().split('T')[0];
  jsonData.campaignData.targetAudience = faker.person.jobArea();
  jsonData.campaignData.description = faker.lorem.sentence().slice(0, 100);
  //jsonData.campaignData.createdAt = faker.date.past().toISOString();

  return jsonData;
};


export const generateOpportunityFromJson = () => {
  // read JSON template
  const rawData = fs.readFileSync(opportunityFilePath, 'utf-8');
  const jsonData = JSON.parse(rawData);
  //const clean = (str: string) => str.replace(/[^a-zA-Z]/g, '');
  // fill with Faker data
  jsonData.OpportunityData.opportunityName =
    //faker.company.buzzNoun().slice(0, 20);
    `TestOpp ${clean(faker.person.lastName())}`.slice(0, 20);

  jsonData.OpportunityData.amount =
    faker.number.int({ min: 1000, max: 100000 }).toString();

  jsonData.OpportunityData.assignedTo =
    faker.person.fullName();

  jsonData.OpportunityData.businessType =
    faker.word.sample();

  jsonData.OpportunityData.description =
    faker.lorem.sentence().slice(0, 100);

  jsonData.OpportunityData.expectedCloseDate =
    faker.date.future().toISOString().split('T')[0];

  jsonData.OpportunityData.nextStep =
    faker.lorem.words(3);

  jsonData.OpportunityData.salesStage =
    faker.helpers.arrayElement([
      'Prospecting',
      'Qualification',
      'Proposal',
      'Negotiation',
      'Closed Won'
    ]);

  jsonData.OpportunityData.probability =
    faker.number.int({ min: 10, max: 100 }).toString();

  return jsonData;
};

