import AppLogger from './logger/AppLogger';

export const getProviders = (): [any] => {
  return [AppLogger];
};

export const exportProvider = (): [any] => {
  return [AppLogger];
};
