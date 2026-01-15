interface ConfirmLeavingModalProps {
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmLeavingModal = ({
  onConfirm,
  onCancel,
}: ConfirmLeavingModalProps) => {
  return (
    <div
      style={{
        background: "#1b1b1f",
        padding: "24px",
        borderRadius: "12px",
        color: "white",
      }}
    >
      <p>Masz niezapisane zmiany. Czy na pewno chcesz wyjść?</p>

      <div style={{ display: "flex", gap: "12px", marginTop: "20px" }}>
        <button onClick={onCancel}>Zostań</button>
        <button onClick={onConfirm}>Wyjdź</button>
      </div>
    </div>
  );
};

export default ConfirmLeavingModal;
