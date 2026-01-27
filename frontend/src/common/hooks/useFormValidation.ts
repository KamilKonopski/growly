import { useState } from "react";

type Validator<T> = (values: T) => Partial<Record<keyof T, string>>;

export const useFormValidation = <T>(values: T, validator: Validator<T>) => {
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});

  const validate = () => {
    const validationErrors = validator(values);
    setErrors(validationErrors);

    return Object.keys(validationErrors).length === 0;
  };

  const clearError = (field: keyof T) => {
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  return {
    errors,
    validate,
    clearError,
  };
};
