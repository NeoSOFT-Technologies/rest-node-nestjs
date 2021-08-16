import AppLogger from './logger/logger';

export const getProviders = (): [any] => {
  return [AppLogger];
};

export const exportProvider = (): [any] => {
  return [AppLogger];
};
