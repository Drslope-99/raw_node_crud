export function deleteAddress(addresses, id) {
  const filteredAddress = addresses.filter((address) => address.id != id);
  return filteredAddress;
}
