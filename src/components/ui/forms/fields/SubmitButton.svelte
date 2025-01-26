<script lang="ts">
    import type { Snippet, ClassValue } from "@components/types";

    type SubmitButtonType = {
        name?: string;
        class?: ClassValue;
        id?: string;
        children?: Snippet;
        onclick?: any;
    };

    const {
        name,
        class: className,
        id,
        children,
        onclick,
    }: SubmitButtonType = $props();

    // let {
    //     name = "submit_next",
    //     id = "submit_next",
    //     class,
    //     children,
    // } = $props();
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
