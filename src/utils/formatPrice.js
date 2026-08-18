export const formatPrice = (price, currency = "USD") => {

  if (price === null || price === undefined || isNaN(price)) {
    return "N/A";
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(Number(price));
};