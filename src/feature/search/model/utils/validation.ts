export const isValidQuery = (query: string): boolean => {
  return query.trim().length > 0;
};

export const sanitizeQuery = (query: string): string => {
  return query.trim();
};
