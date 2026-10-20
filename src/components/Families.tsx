import { families } from "@/lib/wedding";
import { Heading } from "@/components/common/Heading";
import { Reveal } from "@/components/common/Reveal";

export function Families() {
  return (
    <section className="bg-ivory px-6 py-24">
      <div className="mx-auto max-w-3xl">
        <Heading eyebrow="Our Families" title="Two Families, One Journey" />
        <div className="mt-14 grid gap-12 sm:grid-cols-2 sm:gap-0 sm:divide-x sm:divide-gold/40">
          {families.map((f) => (
            <Reveal key={f.role} className="px-4 text-center">
              <p className="font-sans text-[10px] uppercase tracking-[0.45em] text-gold-deep">
                {f.role}
              </p>
              <h3 className="mt-2 font-serif text-5xl text-ink">{f.name}</h3>
              <p className="mt-5 font-serif italic text-slate-ink">{f.relation}</p>
              <p className="mt-1 font-serif text-2xl text-ink">
                {f.parents[0]} <span className="text-gold">&amp;</span> {f.parents[1]}
              </p>
              <p className="mt-4 font-sans text-sm leading-relaxed text-ink/70">
                {f.address[0]}
                <br />
                {f.address[1]}
              </p>
            </Reveal>
          ))}
        </div>
        <p className="mt-14 text-center font-serif text-xl italic text-slate-ink">
          Together with their families, relatives and well-wishers.
        </p>
      </div>
    </section>
  );
}
