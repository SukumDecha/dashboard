export const formatDate = (date) => date.toISOString().split("T")[0];

export const months = Array.from({ length: 12 }, (_, i) => {
  const month = new Date(2021, i, 1).toLocaleString("en-US", {
    month: "short",
  });

  return month;
});

export const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
