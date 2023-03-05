export function mongooseValidationCapture(error) {
  if (error.name === "ValidationError") {
    let errors = {};

    Object.keys(error.errors).forEach((key) => {
      errors[key] = error.errors[key].message;
    });
    return errors;
  }
}

export function respondToError(error, res, next) {
  const validationErrors = mongooseValidationCapture(error);
  if (validationErrors) {
    return res.status(400).send(validationErrors);
  }
  return next(error);
}
