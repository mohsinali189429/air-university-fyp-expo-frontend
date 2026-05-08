export default function SkeletonCard() {
  return (
    <div className="card p-0 overflow-hidden">
      <div className="skeleton h-48 w-full" />
      <div className="p-5 space-y-3">
        <div className="skeleton h-4 w-3/4" />
        <div className="skeleton h-3 w-full" />
        <div className="skeleton h-3 w-5/6" />
        <div className="flex gap-2 pt-2">
          <div className="skeleton h-6 w-16 rounded-full" />
          <div className="skeleton h-6 w-20 rounded-full" />
        </div>
      </div>
    </div>
  );
}