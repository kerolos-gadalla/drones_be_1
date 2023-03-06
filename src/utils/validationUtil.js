export function mongooseValidationCapture(error) {
  if (error.name === "ValidationError") {
    let errors = {};

    Object.keys(error.errors).forEach((key) => {
      errors[key] = error.errors[key].message;
    });
    return errors;
  }
}
export function mongooseDuplicateKeyCapture(error) {
  if (error.code && error.code == 11000) {
    const field = Object.keys(error.keyValue);
    const code = 409;
    return {
      type: "Duplicate Key",
      [field]: `An item with the same ${field} already exists.`,
    };
  }
}

export function respondToError(error, res, next) {
  const validationErrors = mongooseValidationCapture(error);
  if (validationErrors) {
    return res.status(400).json(validationErrors);
  }
  const duplicationError = mongooseDuplicateKeyCapture(error);
  if (duplicationError) {
    return res.status(400).json(duplicationError);
  }
  return next(error);
}
