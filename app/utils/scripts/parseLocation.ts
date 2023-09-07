export const parseLocation = (location: string) => {
  const { address, coordinates } = JSON.parse(location);

  const [street, city] = address.split(",");
  return {
    coordinates,
    street,
    city,
  };
};
