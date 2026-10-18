export const formatPrice = (price: number, currency: string) => {
  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
  }).format(price);

  return formattedPrice;
};
