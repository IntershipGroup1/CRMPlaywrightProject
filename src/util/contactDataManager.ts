import { loadJSON } from '../util/dataLoader.ts';
import { faker } from "@faker-js/faker";
import * as path from "path";

export function getRandomContact() {
  //const base = loadJSON("src/Data/contactData.json").createContact;
 const base = loadJSON(path.join(process.cwd(), 'src', 'Data', 'contactdata.json')).createContact;


  return {
    ...base,

    // UI fields from your form
    contactName: faker.person.fullName(),
    organisations: faker.company.name(),
    title: faker.person.jobTitle(),
    department: faker.commerce.department(),
    officephone: faker.helpers.fromRegExp(/[0-9]{10}/),
    mobile: faker.helpers.fromRegExp(/[0-9]{10}/),
    email: faker.internet.email().toLowerCase(),
    campaign: faker.commerce.productName(), // optional but matches your UI
  };
}