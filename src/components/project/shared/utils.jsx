export const formatCurrency = (amount) => {
  if (!amount) return "-";
  return `₹${parseInt(amount).toLocaleString("en-IN")}`;
};

export const getStatusBadge = (status) => {
  const badges = {
    Approved: { bg: "bg-green-100 text-green-800" },
    Pending: { bg: "bg-yellow-100 text-yellow-800" },
    Rejected: { bg: "bg-red-100 text-red-800" },
    Applied: { bg: "bg-blue-100 text-blue-800" },
  };
  return badges[status] || { bg: "bg-gray-100 text-gray-800" };
};

export const hasData = (item) => {
  return !!(
    item.priceDetails?.expectedPrice ||
    item.areaDetails?.plotArea ||
    item.propertyFeatures?.landArea ||
    item.purchaser ||
    item.broker ||
    item.constructor
  );
};