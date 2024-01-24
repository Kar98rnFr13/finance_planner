export const dateFormatter = () => {
  const currentDate = new Date();

  const year = currentDate.getFullYear();

  const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");

  const day = currentDate.getDay().toString().padStart(2, "0");

  const date = `${year}-${month}-${day}`;

  return date;
};
