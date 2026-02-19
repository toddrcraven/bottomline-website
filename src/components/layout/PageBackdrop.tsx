export function PageBackdrop() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10"
    >
      <div className="absolute left-0 top-0 h-64 w-64 rounded-full bg-brandGreen/10 blur-3xl" />
      <div className="absolute right-0 top-20 h-72 w-72 rounded-full bg-brandBlue/10 blur-3xl" />
    </div>
  );
}
