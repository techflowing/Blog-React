import moment from 'moment';

export const convertDate = (timestamp: number): string => {
  return moment(timestamp).format('YYYY-MM-DD');
};
