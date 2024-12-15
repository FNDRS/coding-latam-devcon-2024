const formatNumberAsCurrency = (
  funding: string | number | undefined,
  decimalPlaces: number = 2,
  useAbbreviation: boolean = false
): string => {
  if (funding === undefined || funding === null) {
    return "$0.00";
  }

  let value: number;
  if (typeof funding === "number") {
    value = funding;
  } else {
    value = parseFloat(funding.replace(/,/g, ""));
  }

  if (isNaN(value)) {
    return "$0.00";
  }

  if (useAbbreviation) {
    if (value >= 1_000_000_000) {
      return `$${(value / 1_000_000_000).toFixed(decimalPlaces)}G`;
    }
    if (value >= 1_000_000) {
      return `$${(value / 1_000_000).toFixed(decimalPlaces)}M`;
    }
    if (value >= 1_000) {
      return `$${(value / 1_000).toFixed(decimalPlaces)}K`;
    }
  }

  // Return as currency format if no abbreviation
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: decimalPlaces,
    maximumFractionDigits: decimalPlaces,
  });
};

export const formatNumberWithoutCurrencySymbol = (
  funding: string | number | undefined,
  useAbbreviation: boolean = false
): string => {
  if (funding === undefined || funding === null) {
    return "0.00";
  }

  let value: number;
  if (typeof funding === "number") {
    value = funding;
  } else {
    value = parseFloat(funding.toString().replace(/,/g, ""));
  }

  if (isNaN(value)) {
    return "0.00";
  }

  if (useAbbreviation) {
    if (value >= 1_000_000_000) {
      return `${(value / 1_000_000_000).toFixed(2)}G`;
    }
    if (value >= 1_000_000) {
      return `${(value / 1_000_000).toFixed(2)}M`;
    }
    if (value >= 1_000) {
      return `${(value / 1_000).toFixed(2)}K`;
    }
  }

  return value.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

export default formatNumberAsCurrency;
