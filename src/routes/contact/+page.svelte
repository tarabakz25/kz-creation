<script>
  import Menu from "$lib/components/layouts/Menu.svelte";
</script>
<main class="flex justify-between px-[5vw] py-[10vh] h-screen">
  <div class="flex flex-col items-start w-full min-h-screen text-white gap-8">
    <h1 class="text-3xl font-futura_pt tracking-wider">Say HELLO !</h1>
    <Menu/>
  </div>

  <div class="flex flex-col justify-center items-end w-full text-white gap-8">
    <ContactForm />
  </div>
</main>