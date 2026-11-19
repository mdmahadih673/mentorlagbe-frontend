export default function EditTuitionLoading() {
  return (
    <div
      className="mx-auto max-w-6xl space-y-6"
      aria-label="Loading tuition editor"
    >
      <div className="h-24 animate-pulse rounded-3xl bg-[#e3e9de]" />
      <div className="grid gap-6 xl:grid-cols-[1fr_310px]">
        <div className="space-y-5">
          <div className="h-72 animate-pulse rounded-3xl bg-white" />
          <div className="h-72 animate-pulse rounded-3xl bg-white" />
          <div className="h-56 animate-pulse rounded-3xl bg-white" />
        </div>
        <div className="h-48 animate-pulse rounded-3xl bg-white" />
      </div>
    </div>
  );
}
