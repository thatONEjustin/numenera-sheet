<script lang="ts">
  import type { Snippet } from "svelte";
  import { scale } from "svelte/transition";

  interface AccordionType {
    containerClass?: string;
    open?: boolean;
    title?: Snippet;
    children?: Snippet;
    openIndicator?: Snippet;
  }

  let {
    containerClass = "",
    open = false,
    title,
    children,
    openIndicator,
  }: AccordionType = $props();

  function show(event: Event) {
    event.preventDefault();
    open = !open;
  }
</script>

<div class={`accordion ${containerClass}`}>
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
          <i class="nf nf-fa-circle_plus"></i>
        {:else}
          <i class="nf nf-fa-circle_minus"></i>
        {/if}
      </div>
    {/if}
  </button>

  {#if !open}
    <div class="accordion" transition:scale>
      {@render children?.()}
    </div>
  {/if}
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
