import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import EnvelopeOpening from "@/components/EnvelopeOpening";
import { Cover } from "@/components/Cover";
import { Announcement } from "@/components/Announcement";
import { Families } from "@/components/Families";
import { Gallery } from "@/components/Gallery";
import { Events } from "@/components/Events";
import { Closing } from "@/components/Closing";
import { MusicToggle } from "@/components/MusicToggle";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Aswin & Soumya · Wedding Invitation · 29 November 2026" },
      {
        name: "description",
        content:
          "You are warmly invited to the wedding of Aswin & Soumya on Sunday, 29 November 2026 at Vakathanam, Kottayam.",
      },
      { property: "og:title", content: "Aswin & Soumya · Wedding Invitation" },
      {
        property: "og:description",
        content:
          "Sunday, 29 November 2026 · Vakathanam, Kottayam. Your presence and blessings will make our day complete.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: WeddingInvitationPage,
});

function WeddingInvitationPage() {
  const [stage, setStage] = useState<"sealed" | "opening" | "open">("sealed");

  const resetScrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }
  };

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    resetScrollToTop();
  }, []);

  useEffect(() => {
    if (stage !== "open") {
      document.body.style.overflow = "hidden";
      resetScrollToTop();
    } else {
      document.body.style.overflow = "";
      resetScrollToTop();
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [stage]);

  const handleOpenEnvelope = () => {
    if (stage !== "sealed") return;
    setStage("opening");
    resetScrollToTop();
    // Start background music directly within the user click gesture stack
    window.dispatchEvent(new CustomEvent("wedding-music-play"));
    window.setTimeout(() => {
      setStage("open");
      resetScrollToTop();
    }, 1850);
  };

  return (
    <main className="overflow-x-clip bg-background text-foreground">
      {stage !== "open" && (
        <EnvelopeOpening
          stage={stage}
          isOpening={stage === "opening"}
          onOpen={handleOpenEnvelope}
        />
      )}
      <Cover isOpen={stage === "open"} />
      <Announcement />
      <Families />
      <Gallery />
      <Events />
      <Closing />
      <MusicToggle shouldPlay={stage === "open"} />
    </main>
  );
}
