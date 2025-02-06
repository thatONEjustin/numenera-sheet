<script lang="ts">
    import type { Accordion as AccordionProps } from "@components/types.d";
    import { slide } from "svelte/transition";

    let {
        class: className = "",
        open = false,
        title,
        children,
        openIndicator,
    }: AccordionProps = $props();

    function show(event: Event) {
        event.preventDefault();
        open = !open;
    }
</script>

<div class={["accordion", className]}>
    <button type="button" class="accordion-title" onclick={show}>
        {#if title}
            {@render title()}
        {:else}
            <h4>Default</h4>
        {/if}

        {#if openIndicator}
            {@render openIndicator()}
        {:else}
            <div class="font-bold text-3xl">
                {#if open}
                    <i class="nf nf-fa-circle_minus"></i>
                {:else}
                    <i class="nf nf-fa-circle_plus"></i>
                {/if}
            </div>
        {/if}
    </button>

    <div class="accordion" class:hidden={open} transition:slide>
        {@render children?.()}
    </div>
</div>

<style lang="postcss">
    .accordion {
        @apply flex
            flex-col;
    }

    .accordion-title {
        @apply flex flex-row justify-between cursor-pointer;
    }
</style>
