export const getCurrentDate = () => {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const dd = String(today.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
};

export const getMaxDate = () => {
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);
  return maxDate.toISOString().split('T')[0];
};