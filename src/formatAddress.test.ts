import { formatAddress } from './UserCard';

test("formatAddress formatting", () => {
  const city: string = "Gothenburg";
  const country: string = "Sweden";
  const street = {
    streetNumber: 123,
    name: "Cool Street",
  };
  const address = formatAddress(city, country, street);
  expect(address).toMatch("Cool Street 123, Gothenburg, Sweden")
})