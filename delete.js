export function deleteAddress(addresses, id) {
  const parsedId = parseInt(id, 10);
  const filteredAddress = addresses.filter((address) => address.id != parsedId);
  return filteredAddress;
}
