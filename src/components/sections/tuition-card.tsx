import { ArrowUpRight, MapPin, Monitor, Star } from "lucide-react";

export type TuitionCardData = {
  id: string;
  subject: string;
  title: string;
  classLevel: string;
  mode: "Online" | "Offline";
  tutor: string;
  initials: string;
  rating: string;
  location: string;
  fee: string;
  schedule: string;
  accent: string;
};

export function TuitionCard({ tuition }: { tuition: TuitionCardData }) {
  return (
    <article className="group overflow-hidden rounded-[1.6rem] border border-[#e6e9e1] bg-white transition duration-200 hover:-translate-y-1 hover:border-[#cbd7bd] hover:shadow-[0_20px_55px_-35px_rgba(29,59,49,.3)]">
      <div className={`relative flex h-40 items-end overflow-hidden p-5 ${tuition.accent}`}>
        <div className="absolute -right-7 -top-12 size-44 rounded-full border-[22px] border-white/15" />
        <div className="absolute right-20 top-8 size-12 rounded-2xl border border-white/30 rotate-12" />
        <div className="absolute left-5 top-5 rounded-full bg-white/80 px-3 py-1 text-[11px] font-bold uppercase tracking-[.14em] text-[#3e5947]">{tuition.subject}</div>
        <div className="relative flex w-full items-end justify-between">
          <div>
            <p className="text-xs font-medium text-[#294438]/70">{tuition.classLevel}</p>
            <p className="mt-1 max-w-[250px] text-xl font-semibold leading-tight tracking-tight text-[#203b31]">{tuition.title}</p>
          </div>
          <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-white/80 text-[#284239] transition group-hover:bg-[#d9f36a]"><ArrowUpRight size={18} /></span>
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#eaf0dc] text-xs font-bold text-[#496844]">{tuition.initials}</span>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-[#354a40]">{tuition.tutor}</p>
              <p className="mt-0.5 flex items-center gap-1 text-xs text-[#8a958d]"><Star size={12} className="fill-[#d5a84e] text-[#d5a84e]" /> {tuition.rating} tutor rating</p>
            </div>
          </div>
          <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-[#f3f6ed] px-2.5 py-1.5 text-[11px] font-semibold text-[#567445]">
            {tuition.mode === "Online" ? <Monitor size={13} /> : <MapPin size={13} />}{tuition.mode}
          </span>
        </div>

        <div className="mt-5 flex items-center justify-between border-t border-[#edf0e9] pt-4">
          <p className="text-xs text-[#87928b]">Monthly fee <span className="mt-1 block text-lg font-bold tracking-tight text-[#203b31]">{tuition.fee}<span className="ml-1 text-xs font-medium text-[#87928b]">/ month</span></span></p>
          <div className="text-right text-xs text-[#87928b]">
            <p>{tuition.schedule}</p>
            <p className="mt-1 inline-flex items-center justify-end gap-1"><MapPin size={12} />{tuition.location}</p>
          </div>
        </div>
      </div>
    </article>
  );
}
