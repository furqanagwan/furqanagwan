type InfoSectionProps = {
  title: string;
  children: React.ReactNode;
};

export default function InfoSection({ title, children }: InfoSectionProps) {
  return (
    <section className="flex flex-col items-start gap-2 min-w-[160px]">
      <h2 className="pt-2 border-t-2 border-neutral-900 dark:border-neutral-300 font-semibold text-sm leading-tight w-fit mb-0">
        {title}
      </h2>
      <div className="text-sm">{children}</div>
    </section>
  );
}
