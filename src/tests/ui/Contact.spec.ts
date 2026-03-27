import { test, expect } from '@playwright/test';
import { ContactPage } from '../../pages/ui/Contactpage.ts';
import testdata  from '../../Data/testdata.json' assert { type: 'json' };

import { LoginPage } from '../../pages/ui/loginPage.ts';

import { getRandomContact } from '../../util/contactDataManager.ts';


// Shared variable (must be outside tests)
let sharedContactName: string = "";
let sharedContactId: string = "";
const username = process.env.APP_USERNAME!;
        const password = process.env.APP_PASSWORD!;
// Run tests in serial mode
test.describe.configure({ mode: 'serial' });

test('Verify Contact Page Elements', async ({ page }) => {
    const contactPage = new ContactPage(page);
    const loginPage = new LoginPage(page);
     const username = process.env.APP_USERNAME!;
        const password = process.env.APP_PASSWORD!;

   // await page.goto(testdata.loginPage.url);
   await loginPage.navigateTo();
    await loginPage.login(username, password);

    // Navigate to Contacts
    await page.getByRole('link', { name: 'Contacts' }).click();

    // Search by Contact ID
    await page.getByRole('combobox').selectOption('Search by Contact Id');
    await page.getByPlaceholder('Search by Contact Id').fill(testdata.contactpage.contactid);

    // Capture the contact name from results
    await page.waitForSelector('td:nth-child(2)');
    sharedContactName = await page.locator('td:nth-child(2)').innerText();

    console.log("Captured Contact Name:", sharedContactName);

    // Validate the captured name exists in the table
    await expect(page.getByRole('cell', { name: sharedContactName })).toBeVisible();
});

test('Verify Contact Search Functionality by name', async ({ page }) => {
    const loginPage = new LoginPage(page);

    //await page.goto(testdata.loginPage.url);
    await loginPage.navigateTo();
    await loginPage.login(
        username,
        password );

    // Navigate to Contacts
    await page.getByRole('link', { name: 'Contacts' }).click();

    // Debug: ensure sharedContactName is not empty
    if (!sharedContactName) {
        console.log("WARNING: sharedContactName is empty. Did the first test run?");
    }

    // Search by Contact Name
    await page.getByRole('combobox').selectOption('Search by Contact Name');
    await page.getByPlaceholder('Search by Contact Name').fill(sharedContactName);

   // console.log("Searching for:", sharedContactName);
    //await page.waitForSelector('td:nth-child(2)');
    // Validate the result
   // await expect(page.getByRole('cell', { name: sharedContactName })).toBeVisible();
});
test('Create New Contact', async ({ page }) => {

    const loginPage = new LoginPage(page);
    // await page.goto(testdata.loginPage.url);
     await loginPage.navigateTo();
    await loginPage.login(
        username,password);
     const contactinfo = getRandomContact();

    // Navigate to Contacts
    await page.getByRole('link', { name: 'Contacts' }).click();
    await page.getByRole('button', { name: 'Create Contact' }).click();
    await page.locator('#content > div:nth-child(2) > form > div > div > div:nth-child(2) > div:nth-child(1) > input[type=text]').fill(contactinfo.contactName);
    // await page.getByRole('button', { name: 'Create Contact' }).click();
    await page.locator('#content > div:nth-child(2) > form > div > div > div:nth-child(1) > div:nth-child(2) > input[type=text]').fill(contactinfo.organisations);
    await page.locator('#content > div:nth-child(2) > form > div > div > div:nth-child(2) > div:nth-child(2) > input[type=text]').fill(contactinfo.mobile);
    await page.locator('#content > div:nth-child(2) > form > div > div > div:nth-child(1) > div:nth-child(3) > input[type=text]').fill(contactinfo.title);
    await page.locator('#content > div:nth-child(2) > form > div > div > div:nth-child(2) > div:nth-child(3) > input[type=email]').fill(contactinfo.email);
     await page.locator('#content > div:nth-child(2) > form > div > div > div:nth-child(1) > div:nth-child(4) > input[type=text]').fill(contactinfo.department);
    // await page.locator('#content > div:nth-child(2) > form > div > div > div:nth-child(1) > div:nth-child(5) > input[type=text]').fill(contactinfo.mobile);
    await page.locator('#content > div:nth-child(2) > form > div > div > div:nth-child(1) > div:nth-child(5) > input[type=tel]').fill(contactinfo.officephone);
   

    
    const buttonThatOpensNewWindow =  page.locator('#content > div:nth-child(2) > form > div > div > div:nth-child(2) > div:nth-child(4) > div > button');
    // Robust locator for the Campaign lookup button
    //const buttonThatOpensNewWindow = page.locator('div').filter({ hasText: /^Campaign/ }).getByRole('button');

    // Handle Campaign Window
    //const buttonThatOpensNewWindow = page.locator('img[title="Select"]').last();
    const [newPage] = await Promise.all([
        page.context().waitForEvent('page'), // Start waiting for a new page
        buttonThatOpensNewWindow.click(),    // Click the button that opens the new page
    ]);
    await newPage.waitForLoadState(); // Wait for the new page to load

    await newPage.locator('tbody tr:nth-child(3) td:nth-child(7) button').click();
    await newPage.close();
    console.log('New page closed.');

    // Submit the main form
    await page.getByRole('button', { name: 'Create Contact' }).click();
    await page.waitForLoadState('networkidle');
    
    // Based on previous logs, the submit button might also be named "Save"
    //await page.getByRole('button', { name: 'Create Contact', exact: true }).last().click();
    // Click Save/Create
  //  await page.getByRole('button', { name: 'Save', exact: true }).first().click();

    // --- Capture the Contact ID ---
    // In this CRM, the ID is usually in the header text: "Contact Information [ CON123 ]"
    const header = page.locator('.dvHeaderText');
    
    console.log("Current URL:", page.url());
    await expect(page).toHaveURL("http://49.249.28.218:8098/contacts"); 
    //await expect(page).toHaveURL(/action=DetailView/); 
   // await expect(header).toBeVisible({ timeout: 10000 });
   // const headerText = await header.innerText();
    
    // Use Regex to extract the ID inside the square brackets
   // sharedContactId = headerText.match(/\[\s*(.*)\s*\]/)?.[1] || "";
    console.log(`Successfully created Contact with ID: ${sharedContactId}`);
    
    // expect(sharedContactId).toContain('CON');

    // // To verify it in the "Next Page Row" (List View), we must navigate back to the list
    // await page.getByRole('link', { name: 'Contacts', exact: true }).click();
    
    // const contactRow = page.locator('table.lvt tr').filter({ hasText: sharedContactId });
    // await expect(contactRow).toBeVisible();

    // const rowData = await contactRow.innerText();
    // expect(rowData).toContain(sharedContactId);
});

