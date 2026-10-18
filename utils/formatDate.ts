import dayjs from "dayjs";

export const formatDate = (date: string) => {
  return dayjs(date).format("MM/DD");
};

export const formatSubscriptionDateTime = (date: string) => {
  return dayjs(date).format("MM/DD/YY");
};
