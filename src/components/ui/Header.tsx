export function Header() {
  return (
    <div className="mb-7 text-center sm:mb-9">
      <img
        src="https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&w=1200&q=80"
        srcSet="https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&w=640&q=80 640w, https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&w=1200&q=80 1200w"
        sizes="(max-width: 768px) 100vw, 768px"
        alt="A planner notebook with organized daily tasks"
        className="mb-5 h-32 w-full rounded-2xl object-cover shadow-sm sm:h-44"
      />
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
