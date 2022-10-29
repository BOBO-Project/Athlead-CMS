export const getErrorMessage = (err) => {
  return err.response.data.message;
};
