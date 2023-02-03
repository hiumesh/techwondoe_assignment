import React = require('react');
import {UserTypes} from '../types/user';

export const download = function (data: string) {
  const blob = new Blob([data], {type: 'text/csv'});
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.setAttribute('href', url);

  a.setAttribute('download', 'user.csv');

  a.click();
};

export const csvmaker = function (data: UserTypes[]) {
  const csvRows = [];

  const headers = Object.keys(data[0]);

  csvRows.push(headers.join(','));

  data.forEach(user => csvRows.push(Object.values(user).join(',')));

  return csvRows.join('\n');
};
