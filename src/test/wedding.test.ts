import { describe, it, expect } from "vitest";
import { timeLeft, WEDDING_START, CEREMONY_TARGET, RECEPTION_TARGET } from "@/lib/wedding";

describe("countdown", () => {
  it("targets 29 Nov 2026 11:30 IST for ceremony", () => {
    expect(WEDDING_START.toISOString()).toBe("2026-11-29T06:00:00.000Z");
    expect(CEREMONY_TARGET.toISOString()).toBe("2026-11-29T06:00:00.000Z");
  });

  it("targets 29 Nov 2026 18:00 IST for reception", () => {
    expect(RECEPTION_TARGET.toISOString()).toBe("2026-11-29T12:30:00.000Z");
  });

  it("counts exactly one day before ceremony", () => {
    const t = timeLeft(WEDDING_START, new Date("2026-11-28T11:30:00+05:30"));
    expect(t).toEqual({ done: false, days: 1, hours: 0, minutes: 0, seconds: 0 });
  });

  it("counts correctly for reception", () => {
    const t = timeLeft(RECEPTION_TARGET, new Date("2026-11-29T17:00:00+05:30"));
    expect(t).toEqual({ done: false, days: 0, hours: 1, minutes: 0, seconds: 0 });
  });

  it("is done after the wedding", () => {
    expect(timeLeft(WEDDING_START, new Date("2026-11-30T00:00:00+05:30")).done).toBe(true);
  });
});
