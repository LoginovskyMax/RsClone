export const showFormattedError = (err) => {
  // eslint-disable-next-line no-console
  console.error(
    "message: ",
    err.message,
    "/nFile:    ",
    err.file,
    "/nLine:    ",
    err.lineNumber
  );
};
