export default function MyApplicationsLoading() {
  return (
    <div className="space-y-7" aria-label="Loading student requests">
      <div className="h-40 animate-pulse rounded-3xl bg-[#dfe7dc]" />
      <div className="grid gap-4 lg:grid-cols-2">
        {Array.from({ length: 4 }, (_, index) => (
          <div
            key={index}
            className="h-44 animate-pulse rounded-2xl bg-white"
          />
        ))}
      </div>
    </div>
  );
}
