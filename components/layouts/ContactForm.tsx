"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const GAS_URL =
  "https://script.google.com/macros/s/AKfycbwpLSr7gDBAeDdWFtJMBIXwmyxfHNGDD4Z_WYpd68iGAbY-Xtfmm2rDRfRzQzNtDeKp/exec";

export default function ContactForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    setStatus("idle");

    const formData = new FormData(e.currentTarget);
    const params = new URLSearchParams();
    params.append("name", formData.get("name") as string);
    params.append("email", formData.get("email") as string);
    params.append("message", formData.get("message") as string);

    try {
      await fetch(`${GAS_URL}?${params.toString()}`, {
        method: "POST",
        mode: "no-cors",
      });
      setStatus("success");
      formRef.current?.reset();
    } catch (error) {
      console.error(error);
      setStatus("error");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="w-full max-w-xl flex flex-col items-end gap-8"
    >
      <div className="grid w-full items-center gap-3">
        <Input
          required
          name="name"
          type="text"
          id="name"
          placeholder="Name..."
          autoComplete="name"
          className="bg-white/5 border-none text-white placeholder:text-white/30 h-12"
        />
      </div>
      <div className="grid w-full items-center gap-3">
        <Input
          required
          name="email"
          type="email"
          id="email"
          placeholder="Email..."
          autoComplete="email"
          className="bg-white/5 border-none text-white placeholder:text-white/30 h-12"
        />
      </div>
      <div className="grid w-full gap-3">
        <Textarea
          required
          name="message"
          id="message"
          placeholder="Message..."
          className="bg-white/5 border-none text-white placeholder:text-white/30 min-h-[240px] resize-none"
        />
      </div>

      {status === "success" && (
        <p className="text-white/60 text-sm w-full text-right">
          Message sent successfully!
        </p>
      )}
      {status === "error" && (
        <p className="text-red-400 text-sm w-full text-right">
          Failed to send. Please try again.
        </p>
      )}

      <Button
        disabled={isLoading}
        type="submit"
        className="px-8 bg-white text-black hover:bg-white/90 font-futura tracking-wider text-lg h-12 mt-4"
      >
        {isLoading ? "Sending..." : "Send Message"}
      </Button>
    </form>
  );
}
