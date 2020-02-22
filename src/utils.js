import moment from 'moment';

export const formattedDate = d => {
  const date = d ? new Date(d) : new Date();
  return date.toISOString().split('T')[0];
};

export const isValidDate = currentDate =>
  moment(currentDate).isSameOrBefore(new Date(), 'year');
