<script>
  export const socials = [
    {
      name: "X",
      url: "https://x.com/kz25_kmc/",
    },
    {
      name: "GitHub",
      url: "https://github.com/tarabakz25/",
    },
    {
      name: "Instagram",
      url: "https://instagram.com/kizu25_01/",
    },
    {
      name: "Prarie Card",
      url: "https://my.prairie.cards/u/kz25_kmc",
    },
  ];
</script>

<main class="h-screen flex justify-between px-[5vw] py-[10vh]">
  <div class="flex flex-col items-start w-full min-h-screen text-white gap-8">
    <h1 class="text-3xl font-futura_pt tracking-wider">Who am I ?</h1>
    <MenuItem />
  </div>
  <div class="w-full items-right text-white flex flex-col justify-between">
    <div class="text-right space-y-4">
      <h1 class="text-3xl font-futura_pt tracking-wider">
        Kizuki Aiki
      </h1>
      <h2 class="text-xl font-avenir">
        Full Stack Developer / App & Web Designer
      </h2>
    </div>

    <div class="text-xl text-right font-light space-y-4 font-avenir">
      <div>Next.js / Astro / Vite / React / Tailwindcss / Node.js </div>   
      <div>Vercel / Supabase / Drizzle / Prisma / DynamoDB / API Gateway / AWS Lambda</div>
      <div>Cursor / Claude code / Manus / Google AI Studio</div>
    </div>

    <div class="w-full flex flex-col items-end text-right text-white">
      {#each socials as social, index}
        <a
          href={social.url}
          class="flex items-center gap-2 text-white hover:text-gray-300 font-futura_pt tracking-wider"
        >
          {social.name}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-3 w-auto"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width={2}
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
        </a>
      {/each}
    </div>
  </div>
</main>