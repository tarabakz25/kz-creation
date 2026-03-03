<script lang="ts">
  import { toast } from "sonner";
  import Button from "~/shared/components/ui/button/Button.svelte";
  import Input from "~/shared/components/ui/input/Input.svelte";
  import Textarea from "~/shared/components/ui/textarea/Textarea.svelte";

  let isLoading = false;
  let formRef: HTMLFormElement;

  async function handleSubmit(event: SubmitEvent) {
    event.preventDefault();
    isLoading = true;

    const formData = new FormData(event.currentTarget as HTMLFormElement);

    try {
      const gasUrl = "https://script.google.com/macros/s/AKfycbwpLSr7gDBAeDdWFtJMBIXwmyxfHNGDD4Z_WYpd68iGAbY-Xtfmm2rDRfRzQzNtDeKp/exec";

      // Create URLSearchParams for GAS submission
      const params = new URLSearchParams();
      params.append("name", formData.get("name") as string);
      params.append("email", formData.get("email") as string);
      params.append("message", formData.get("message") as string);

      // Submit to Google Apps Script
      await fetch(`${gasUrl}?${params.toString()}`, {
        method: "POST",
        mode: "no-cors",
      });

      // With no-cors, we can't check response, but if no error thrown, assume success
      toast.success("Message sent successfully!");
      formRef.reset();
    } catch (error) {
      console.error(error);
      toast.error("Failed to send message. Please try again.");
    } finally {
      isLoading = false;
    }
  }
</script>

<form
  bind:this={formRef}
  on:submit={handleSubmit}
  class="w-full max-w-xl flex flex-col items-end gap-8"
>
  <div class="grid w-full items-center gap-3">
    <Input
      required
      name="name"
      type="text"
      id="name"
      placeholder="Name..."
      autocomplete="name"
      class="bg-white/5 border border-none text-white placeholder:text-white/30 h-12"
    />
  </div>
  <div class="grid w-full items-center gap-3">
    <Input
      required
      name="email"
      type="email"
      id="email"
      placeholder="Email..."
      autocomplete="email"
      class="bg-white/5 border border-none text-white placeholder:text-white/30 h-12"
    />
  </div>
  <div class="grid w-full gap-3">
    <Textarea
      required
      name="message"
      id="message"
      placeholder="Message..."
      class="bg-white/5 border border-none text-white placeholder:text-white/30 min-h-[240px] resize-none"
    />
  </div>
  <Button
    disabled={isLoading}
    type="submit"
    class="px-8 bg-white text-black hover:bg-white/90 font-futura_pt tracking-wider text-lg h-12 mt-4"
  >
    {isLoading ? "Sending..." : "Send Message"}
  </Button>
</form>