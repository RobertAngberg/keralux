import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Före & Efter - Se resultatet",
  description:
    "Se hur KeraLux hårfibrer fungerar i praktiken. Video som visar dramatisk förbättring av hårets utseende på bara sekunder.",
  alternates: {
    canonical: "https://keralux.se/fore-efter",
  },
};

export default function ForeEfterPage() {
  return (
    <div className="container mx-auto px-6 py-6 md:py-10 max-w-4xl">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-10 text-zinc-600">
        Före / efter
      </h1>

      <p className="text-center text-zinc-600 mb-6">Denna video visar hur hårfiber fungerar.</p>

      <div className="flex justify-center">
        <video
          src="/hårfiber-keralux-video.mp4"
          controls
          playsInline
          className="w-full max-w-2xl rounded-lg"
        >
          Din webbläsare stödjer inte video.
        </video>
      </div>

      <p className="text-center text-zinc-600 mt-6">
        Som det framgår av videon ovan kan hårets utseende förbättras dramatiskt med KeraLux
        hårfibrer.
      </p>
    </div>
  );
}
