import { randomUUID } from "crypto";

export function saveAddress(addresses, address) {
  if (address.id) {
    const index = addresses.findIndex((addr) => addr.id == address.id);
    address.id = address.id;
    addresses[index] = address;
  } else {
    const nextId = randomUUID();
    address.id = nextId;
    addresses.push(address);
  }
  return addresses;
}
