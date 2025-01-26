<script lang="ts">
    import type { Snippet } from "svelte";

    type TabsProps = {
        tabs: Array<Tab>;
        children?: Snippet;
        active?: number;
    };

    type Tab = {
        label: string;
        index: number;
        content: Snippet;
    };

    import SubmitButton from "@forms/fields/SubmitButton.svelte";
    // import SubmitButton from "@forms/SubmitButton.svelte";

    import { fly, slide, scale } from "svelte/transition";

    let { tabs, children, active = $bindable(1) }: TabsProps = $props();

    function show_tab(index: number): void {
        active = index;

        return;
    }

    function click_next(_event: Event): void {
        // console.log($host())
    }
</script>

<ul class="TabsNav">
    {#each tabs as { label, index }}
        <li class:active={active === index} class="TabsNav-tab">
            <a
                href={`#${label.toLowerCase().replace(" ", "")}`}
                onclick={() => show_tab(index)}
            >
                {label}
            </a>
        </li>
    {/each}
</ul>

<div class="Tabs">
    {#each tabs as { content: Content, index }}
        {#if active == index}
            <section
                class="Tab"
                in:fly={{ x: "100%", y: 0, delay: 350 }}
                out:fly={{ x: "-100%", y: 0, duration: 250 }}
            >
                <!-- transition:slide -->
                <Content />
            </section>
        {/if}
    {/each}

    {#if children}
        {@render children?.()}
    {/if}
</div>

<SubmitButton class="mt-2">
    Next
    <i class="nf nf-fa-arrow_right"></i>
</SubmitButton>

<style lang="postcss">
    @import "tailwindcss/theme" theme(reference);
    @import "@css/tailwind/theme.css" theme(reference);

    .TabsNav {
        @apply flex
            items-stretch
            rounded-md
            z-25;

        > li {
            @apply inline-flex rounded-t-md px-5 py-2.5;

            &.active {
                @apply border
                    border-red-500
                    border-b-red-500
                    bg-red-500;

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

        @apply border-red-500
            bg-red-500;

        > .Tab {
            @apply p-5;
            grid-area: stack;
        }
    }
</style>
