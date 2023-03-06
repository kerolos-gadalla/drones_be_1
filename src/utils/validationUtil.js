export function mongooseValidationCapture(error) {
  if (error.name === "ValidationError") {
    const errors = {};

    Object.keys(error.errors).forEach((key) => {
      errors[key] = error.errors[key].message;
    });
    return errors;
  }
  return undefined;
}
export function mongooseDuplicateKeyCapture(error) {
  if (error.code && error.code === 11000) {
    const field = Object.keys(error.keyValue);
    return {
      type: "Duplicate Key",
      [field]: `An item with the same ${field} already exists.`,
    };
  }
  return undefined;
}

export function respondToError(error, res, next) {
  const validationErrors = mongooseValidationCapture(error);
  if (validationErrors) {
    return res.status(400).json(validationErrors);
  }
  const duplicationError = mongooseDuplicateKeyCapture(error);
  if (duplicationError) {
    return res.status(409).json(duplicationError);
  }
  return next(error);
}
