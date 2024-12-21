export function formatCurrency(price, currInfoMeta) {
    const {
      currency_prefix: prefix,
      currency_suffix: suffix,
      currency_decimal_separator: decimalSeparator,
      currency_thousand_separator: thousandSeparator,
      currency_minor_unit: decimals,
    } = currInfoMeta;

    // Ensure `price` is a number
    const numericPrice = parseFloat(price);

    if (isNaN(numericPrice)) {
        console.error("Invalid price passed to formatCurrency:", price);
        return `${prefix}0${suffix}`; // Return default if price is invalid
    }
  
    // console.log('price', numericPrice);
    // Format the price with the provided metadata
    const formattedPrice = numericPrice
      .toFixed(decimals) // Format to the specified decimal places
      .replace(/\B(?=(\d{3})+(?!\d))/g, thousandSeparator) // Add thousand separator
      .replace(".", decimalSeparator); // Use specified decimal separator
  
    return `${prefix}${formattedPrice}${suffix}`;
}
  