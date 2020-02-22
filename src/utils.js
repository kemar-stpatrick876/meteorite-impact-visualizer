export const formattedDate = d => {
  const date = d ? new Date(d) : new Date();
  return date.toISOString().split('T')[0];
};
