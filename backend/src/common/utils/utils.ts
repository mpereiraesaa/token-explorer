export const sleep = (ms: number): Promise<undefined> => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};
