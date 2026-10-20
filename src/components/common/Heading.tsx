interface HeadingProps {
  eyebrow: string;
  title: string;
}

export function Heading({ eyebrow, title }: HeadingProps) {
  return (
    <div className="text-center">
      <p className="font-sans text-[10px] uppercase tracking-[0.45em] text-gold-deep">{eyebrow}</p>
      <h2 className="mt-3 font-serif text-4xl text-ink sm:text-5xl">{title}</h2>
      <img
        src="/images/lotus-heading-divider.svg"
        alt=""
        aria-hidden="true"
        className="mx-auto my-3.5 sm:my-4.5 w-[140px] sm:w-[170px] lg:w-[190px] h-auto select-none"
      />
    </div>
  );
}
