export default function GoogleButton({
  loading,
  onClick,
  label = "Continue with Google",
}) {
  return (
    <button
      type="button"
      className="auth0-btn social google"
      onClick={onClick}
      disabled={loading}
    >
      {label}
    </button>
  );
}
