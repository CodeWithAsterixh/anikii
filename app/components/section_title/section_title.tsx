export function SectionTitle({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-6">
      <h2 className="text-2xl font-bold border-l-4 border-primary pl-4">
        {title}
      </h2>
      {subtitle && <p className="text-sm opacity-60 mt-1 pl-4">{subtitle}</p>}
    </div>
  );
}
