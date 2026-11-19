export default function MyTuitionsLoading() {
  return (
    <div className="space-y-7 animate-pulse">
      <div className="h-40 rounded-3xl bg-[#e8ede4]" />
      <div className="h-8 w-48 rounded-lg bg-[#e8ede4]" />
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 3 }, (_, index) => (
          <div
            key={index}
            className="h-80 rounded-3xl border border-[#e6e9e1] bg-white"
          />
        ))}
      </div>
    </div>
  );
}
