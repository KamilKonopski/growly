import { useEffect, useState } from "react";

export const useModalWithDirtyForm = () => {
  const [open, setOpen] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [shouldReopen, setShouldReopen] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const [shouldResetForm, setShouldResetForm] = useState(false);

  const openModal = () => {
    setShouldResetForm(true);
    setOpen(true);
  };

  const forceClose = () => {
    setIsDirty(false);
    setShouldResetForm(true);
    setOpen(false);
  };

  const attemptClose = () => {
    if (isDirty) {
      setOpen(false);
      setShowConfirm(true);
      setShouldReopen(true);
    } else {
      setOpen(false);
    }
  };

  const confirmStay = () => {
    setShowConfirm(false);

    if (shouldReopen) {
      setOpen(true);
      setShouldReopen(false);
    }
  };

  const confirmLeave = () => {
    setIsDirty(false);
    setShouldResetForm(true);
    setShowConfirm(false);
    setShouldReopen(false);
  };

  useEffect(() => {
    if (open) setShouldResetForm(false);
  }, [open]);

  return {
    open,
    showConfirm,
    shouldResetForm,
    setIsDirty,
    openModal,
    forceClose,
    attemptClose,
    confirmStay,
    confirmLeave,
  };
};
