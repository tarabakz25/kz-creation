<script lang="ts">
  import Button from '$lib/components/ui/button/button.svelte';
  import Input from '$lib/components/ui/input/input.svelte';
  import Textarea from '$lib/components/ui/textarea/textarea.svelte';

  let isLoading = $state(false);
  let status = $state<'idle' | 'success' | 'error'>('idle');
  let formRef: HTMLFormElement;

  async function handleSubmit(event: SubmitEvent) {
    event.preventDefault();
    isLoading = true;
    status = 'idle';

    const formData = new FormData(event.currentTarget as HTMLFormElement);

    try {
      const gasUrl = "https://script.google.com/macros/s/AKfycbwpLSr7gDBAeDdWFtJMBIXwmyxfHNGDD4Z_WYpd68iGAbY-Xtfmm2rDRfRzQzNtDeKp/exec";

      const params = new URLSearchParams();
      params.append("name", formData.get("name") as string);
      params.append("email", formData.get("email") as string);
      params.append("message", formData.get("message") as string);

      await fetch(`${gasUrl}?${params.toString()}`, {
        method: "POST",
        mode: "no-cors",
      });

      status = 'success';
      formRef.reset();
    } catch (error) {
      console.error(error);
      status = 'error';
    } finally {
      isLoading = false;
    }
  }
</script>

<form
  bind:this={formRef}
  onsubmit={handleSubmit}
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
      class="bg-white/5 border-none text-white placeholder:text-white/30 h-12"
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
      class="bg-white/5 border-none text-white placeholder:text-white/30 h-12"
    />
  </div>
  <div class="grid w-full gap-3">
    <Textarea
      required
      name="message"
      id="message"
      placeholder="Message..."
      class="bg-white/5 border-none text-white placeholder:text-white/30 min-h-[240px] resize-none"
    />
  </div>

  {#if status === 'success'}
    <p class="text-white/60 font-avenir text-sm w-full text-right">Message sent successfully!</p>
  {:else if status === 'error'}
    <p class="text-red-400 font-avenir text-sm w-full text-right">Failed to send. Please try again.</p>
  {/if}

  <Button
    disabled={isLoading}
    type="submit"
    class="px-8 bg-white text-black hover:bg-white/90 font-futura_pt tracking-wider text-lg h-12 mt-4"
  >
    {isLoading ? "Sending..." : "Send Message"}
  </Button>
</form>
