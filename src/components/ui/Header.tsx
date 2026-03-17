export function Header() {
  return (
    <div className="mb-7 text-center sm:mb-9">
      <p className="mb-3 inline-flex rounded-full border border-white/80 bg-white/65 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-teal-700 shadow-sm">
        Daily Planner
      </p>
      <h1 className="text-3xl font-bold text-slate-800 sm:text-5xl">
        Make Today Intentional
      </h1>
      <p className="mx-auto mt-3 max-w-xl text-sm text-slate-600 sm:text-base">
        Capture tasks, tune deadlines, and keep momentum visible at a glance.
      </p>
    </div>
  );
}
