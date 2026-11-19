export default function ApplicantsLoading() {
  return (
    <div className="space-y-7" aria-label="Loading applicants">
      <div className="h-40 animate-pulse rounded-3xl bg-[#dfe7dc]" />
      <div className="space-y-3 rounded-2xl border border-[#e6e9e1] bg-white p-5">
        <div className="h-5 w-44 animate-pulse rounded bg-[#edf0e9]" />
        <div className="h-12 animate-pulse rounded-xl bg-[#f7f8f4]" />
        <div className="h-12 animate-pulse rounded-xl bg-[#f7f8f4]" />
        <div className="h-12 animate-pulse rounded-xl bg-[#f7f8f4]" />
      </div>
    </div>
  );
}
