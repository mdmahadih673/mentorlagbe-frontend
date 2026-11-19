export default function DashboardLoading() {
  return (
    <div className="space-y-8" aria-label="Loading dashboard overview">
      <div className="h-44 animate-pulse rounded-[1.8rem] bg-[#dfe7dc]" />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }, (_, index) => (
          <div
            key={index}
            className="h-36 animate-pulse rounded-3xl bg-white"
          />
        ))}
      </div>
      <div className="h-48 animate-pulse rounded-3xl bg-white" />
    </div>
  );
}
