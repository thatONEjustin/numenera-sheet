<script lang="ts">
    import type { SubmitButton } from "@components/types";

    const {
        name,
        class: className,
        id,
        children,
        onclick,
    }: SubmitButton = $props();
</script>

<div class={["Submit", className]}>
    <button type="submit" {name} {id} class="Submit-button">
        {#if children}
            {@render children()}
        {:else}
            <strong>Submit</strong>
        {/if}
    </button>
</div>

<style lang="postcss">
    @import "tailwindcss/theme" theme(reference);

    .Submit {
        button {
            @apply border-2
                bg-cyan-500
                border-cyan-500
                text-white
                rounded-md
                cursor-pointer
                px-3
                py-2;

            &:hover {
                @apply bg-white text-cyan-500;
            }
        }
    }
</style>
