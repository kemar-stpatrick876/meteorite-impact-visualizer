export const formattedDate = d => {
  const date = d ? new Date(d) : new Date();
  return date.toISOString().split('T')[0];
};
export const validateForm = errors => {
  let valid = true;
  Object.values(errors).forEach(val => {
    if (val.length > 0) {
      valid = false;
    }
  });
  return valid;
};
