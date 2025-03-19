<script lang="ts">
    import type { Tabs } from "@components/types.d";

    import { fly } from "svelte/transition";

    let { tabs, children, active = $bindable(0) }: Tabs = $props();

    function show_tab(index: number): void {
        active = index;

        return;
    }
</script>

<ul class="TabsNav">
    {#each tabs as { label }, index}
        {@const href = `#${label.toLowerCase().replace(" ", "")}`}
        <li
            class={[
                "TabsNav-tab",
                active === index ? "bg-cyan-600/60" : "",
                active === index ? "glow" : "",
                active === index ? "active" : "",
            ]}
        >
            <a
                {href}
                onclick={() => show_tab(index)}
                class="text-glow text-white/60"
            >
                {label}
            </a>
        </li>
    {/each}
</ul>

<div class="Tabs glow">
    {#each tabs as { content: Content }, index}
        {#if active == index}
            <section
                class="Tab"
                in:fly={{ x: "100%", y: 0, delay: 350 }}
                out:fly={{ x: "-100%", y: 0, duration: 250 }}
            >
                <Content />
            </section>
        {/if}
    {/each}

    {#if children}
        {@render children?.()}
    {/if}
</div>

<style lang="postcss">
    @import "tailwindcss/theme" theme(reference);

    .TabsNav {
        @apply flex
            items-stretch
            rounded-md
            z-25;

        > li {
            @apply inline-flex rounded-t-md px-5 py-2.5;

            &.active {
                @apply border-0;

                a {
                    @apply text-white;
                }
            }
        }
    }

    .Tabs {
        @apply rounded-b-xl 
            rounded-tr-xl
            overflow-hidden
            z-10
            transition-all
            border-white/20
            bg-cyan-600/90
            h-full;

        display: grid;
        grid-template-areas: "stack";

        > .Tab {
            @apply p-5;
            grid-area: stack;
        }
    }
</style>
