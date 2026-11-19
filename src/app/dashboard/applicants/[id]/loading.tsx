export default function ApplicantDetailsLoading() {
  return (
    <div
      className="mx-auto max-w-4xl space-y-6"
      aria-label="Loading request details"
    >
      <div className="h-5 w-36 animate-pulse rounded bg-[#e3e9de]" />
      <div className="h-[520px] animate-pulse rounded-3xl bg-white" />
      <div className="h-40 animate-pulse rounded-3xl bg-white" />
    </div>
  );
}
