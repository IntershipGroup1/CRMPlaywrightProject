import { faker } from "@faker-js/faker";

export function randomMobile(): string {
  return faker.string.numeric({ length: 10 }); // 10-digit
}

export function randomOfficePhone(): string {
  return faker.string.numeric({ length: 10 });
}

export function randomEmail(): string {
  return faker.internet.email().toLowerCase();
}

export function randomTitle(): string {
  return faker.person.jobTitle();
}

export function randomDepartment(): string {
  return faker.commerce.department(); // e.g., "Electronics", "Books"
}

export function randomFirstName(): string {
  return faker.person.firstName();
}

export function randomLastName(): string {
  return faker.person.lastName();
}

export function randomAddress(): string {
  return faker.location.streetAddress();
}