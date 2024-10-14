export const mapDataByMonth = (data) => {
  const monthlyData = {};
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  data.forEach((item) => {
    const date = new Date(item.date);

    const monthKey = `${monthNames[date.getMonth()]}`;

    if (!monthlyData[monthKey]) {
      monthlyData[monthKey] = {
        count: 0,
      };
    }

    if (!monthlyData[monthKey][item.type]) {
      monthlyData[monthKey][item.type] = 0;
    }

    monthlyData[monthKey][item.type] += item.count;
  });

  const mappedData = Object.keys(monthlyData)
    .map((month) => ({ month, ...monthlyData[month] }))
    .sort((a, b) => monthNames.indexOf(a.month) - monthNames.indexOf(b.month));

  return mappedData;
};
