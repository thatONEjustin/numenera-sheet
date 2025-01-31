<script lang="ts">
    import type { Tabs } from "@components/types.d";

    import { fly } from "svelte/transition";

    let { tabs, sheet_data, children, active = $bindable(0) }: Tabs = $props();

    function show_tab(index: number): void {
        active = index;

        return;
    }

    function _click_next(event: Event): void {
        event.preventDefault();
    }
</script>

<ul class="TabsNav">
    {#each tabs as { label }, index}
        {@const href = `#${label.toLowerCase().replace(" ", "")}`}
        <li class={["TabsNav-tab", active === index ? "active" : ""]}>
            <a {href} onclick={() => show_tab(index)}>
                {label}
            </a>
        </li>
    {/each}
</ul>

<div class="Tabs">
    {#each tabs as { content: Content }, index}
        {#if active == index}
            <section
                class="Tab"
                in:fly={{ x: "100%", y: 0, delay: 350 }}
                out:fly={{ x: "-100%", y: 0, duration: 250 }}
            >
                <Content {sheet_data} />
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
                @apply border
                    border-blue-500
                    border-b-blue-500
                    bg-blue-500;

                a {
                    @apply text-white;
                }
            }
        }
    }

    .Tabs {
        @apply border-2 
            rounded-b-md 
            overflow-hidden
            z-10
            transition-all
            h-full;

        display: grid;
        grid-template-areas: "stack";

        @apply border-blue-500
            bg-white;

        > .Tab {
            @apply p-5;
            grid-area: stack;
        }
    }
</style>
