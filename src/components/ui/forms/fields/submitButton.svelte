<script lang="ts">
  import type { Snippet } from "svelte";

  interface SubmitButtonType {
    name?: string;
    id?: string;
    className?: string;
    children?: Snippet;
    onclick?: any;
  }

  let {
    name = "submit_next",
    id = "submit_next",
    className = "",
    children,
  }: SubmitButtonType = $props();
</script>

<div class={`${className} Submit`}>
  <button type="submit" {name} {id}>
    {#if children}
      {@render children()}
    {:else}
      <strong>Submit</strong>
    {/if}
  </button>
</div>

<style lang="postcss">
  @import "tailwindcss/theme" theme(reference);
  @import "@css/tailwind/theme.css" theme(reference);

  .Submit {
    button {
      @apply border
        bg-primary
        border-primary
        rounded-md
        cursor-pointer
        px-3
        py-2;

      &:hover {
        @apply bg-primary text-white;
      }
    }
  }
</style>
