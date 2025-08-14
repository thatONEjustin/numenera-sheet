// @ts-check
import { defineConfig } from 'astro/config';

import svelte from '@astrojs/svelte';
import netlify from '@astrojs/netlify';

// import tailwindcss from "@tailwindcss/vite"

// https://astro.build/config
export default defineConfig({
    output: "server",
    // vite: {
    //     plugins: [tailwindcss()],
    // },
    integrations: [svelte()],
    adapter: netlify()
});
