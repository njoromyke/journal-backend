const filters = ["today", "this_week", "this_month"];
const dateFilter = (dateFilter: string): { startDate: Date; endDate: Date } => {
  const currentDate = new Date();
  let startDate: Date;
  let endDate: Date;

  switch (dateFilter) {
    case filters[0]:
      startDate = new Date(currentDate.setHours(0, 0, 0, 0));
      endDate = new Date(startDate);
      endDate.setDate(startDate.getDate() + 1);
      break;
    case filters[1]:
      const weekStart = currentDate.getDate() - currentDate.getDay();
      startDate = new Date(currentDate.setDate(weekStart));
      startDate.setHours(0, 0, 0, 0);
      endDate = new Date(startDate);
      endDate.setDate(startDate.getDate() + 7);
      break;
    case filters[2]:
      startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
      endDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
      break;
    default:
      startDate = new Date(currentDate.setHours(0, 0, 0, 0));
      endDate = new Date(startDate);
      endDate.setDate(startDate.getDate() + 1);
      break;
  }

  return { startDate, endDate };
};

export { dateFilter };
