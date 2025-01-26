<script lang="ts">
    import type { Tabs as TabsProps, Snippet } from "@components/types";
    import SubmitButton from "@forms/fields/SubmitButton.svelte";

    import { fly, slide, scale } from "svelte/transition";

    let {
        tabs,
        children,
        sheet_data,
        active = $bindable(0),
    }: TabsProps = $props();

    function show_tab(index: number): void {
        active = index;

        return;
    }

    function click_next(event: Event): void {
        console.log(event);
        event.preventDefault();
    }
</script>

<ul class="TabsNav">
    {#each tabs as { label }, index}
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
    {#each tabs as { content: Content, label }, index}
        {#if active == index}
            <section
                class="Tab"
                in:fly={{ x: "100%", y: 0, delay: 350 }}
                out:fly={{ x: "-100%", y: 0, duration: 250 }}
            >
                <Content {sheet_data} />
                {label}
                {index}
            </section>
        {/if}
        <!--
        {#if active == index}
            <section
                class="Tab"
                in:fly={{ x: "100%", y: 0, delay: 350 }}
                out:fly={{ x: "-100%", y: 0, duration: 250 }}
            >
                <Content />
            </section>
        {/if}
        -->
    {/each}

    {#if children}
        {@render children?.()}
    {/if}
</div>

<button onclick={click_next}>
    Next
    <i class="nf nf-fa-arrow_right"></i>
</button>

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
            bg-blue-500;

        > .Tab {
            @apply p-5;
            grid-area: stack;
        }
    }
</style>
