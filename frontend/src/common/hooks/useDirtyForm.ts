import { useEffect, useMemo, useState } from "react";

interface UseDirtyFormOptions<T> {
  isOpen: boolean;
  shouldResetForm: boolean;
  initialValues: T;
  onDirtyChange: (dirty: boolean) => void;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useDirtyForm = <T extends Record<string, any>>({
  isOpen,
  shouldResetForm,
  initialValues,
  onDirtyChange,
}: UseDirtyFormOptions<T>) => {
  const [values, setValues] = useState<T>(initialValues);

  useEffect(() => {
    if (!isOpen || !shouldResetForm) return;

    setValues(initialValues);
    onDirtyChange(false);
  }, [isOpen, shouldResetForm, initialValues, onDirtyChange]);

  const isDirty = useMemo(
    () =>
      Object.keys(initialValues).some(
        (key) => values[key] !== initialValues[key],
      ),
    [values, initialValues],
  );

  useEffect(() => {
    onDirtyChange(isDirty);
  }, [isDirty, onDirtyChange]);

  return {
    values,
    setValues,
    isDirty,
  };
};
