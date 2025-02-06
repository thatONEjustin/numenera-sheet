<script lang="ts" generics="BaseInputTypes extends 'input'">
    import type { SvelteHTMLElements, Snippet } from "@components/types";
    import { fly, scale } from "svelte/transition";

    type JustinNumberField = {
        name: string;
        label?: string;
        hideLabel?: boolean;
        labelTag?: Snippet;
        placeholder?: string;
    };

    type NumberField = SvelteHTMLElements[BaseInputTypes] & JustinNumberField;

    type NumberInputElement = HTMLInputElement | undefined;

    let {
        name,
        id,
        class: className,
        label: raw_label = "",
        min,
        max,
        hideLabel,
        labelTag,
        value = "",
        required = false,
        placeholder: raw_placeholder = "",
    }: NumberField = $props();

    let element: NumberInputElement = $state() as NumberInputElement;
    let editing: boolean = $state(false);

    const label: string = $derived.by(() => {
        return raw_label.trim() != "" ? raw_label : name.replaceAll("_", " ");
    });

    const placeholder: string = $derived.by(() => {
        return raw_placeholder != "" ? raw_placeholder : `Enter ${label} here`;
    });

    function editOnClick(event: Event) {
        if (editing) return;
        editing = !editing;
        event.preventDefault();
    }
</script>

<div class={["number-field", className]}>
    {#if labelTag && hideLabel == false}
        {@render labelTag()}
    {:else if hideLabel == false}
        <label for={name}>{label}</label>
    {/if}

    <div class="input-grid">
        <div class="input-ux">
            <input
                {name}
                type="number"
                {id}
                {value}
                {required}
                {placeholder}
                {min}
                {max}
                class={["transition-all", !editing ? "cursor-pointer" : ""]}
                onclick={editOnClick}
                bind:this={element}
            />
            {#if editing}
                <button
                    class={["input-edit-button"]}
                    type="submit"
                    onclick={(_: Event) => (editing = !editing)}
                    in:fly={{ x: "100%", y: 0 }}
                    out:fly={{ x: "100%", y: 0 }}
                >
                    save
                </button>
            {/if}
        </div>
    </div>
</div>

<style lang="postcss">
    @import "tailwindcss/theme" theme(reference);
    .number-field {
        @apply flex
            my-3;

        > label {
            @apply pb-1
                mb-3
                w-full;
        }
    }

    .input-grid {
        @apply grid;
        grid-template-areas: "stack";

        @apply w-full;

        > .input-ux {
            grid-area: stack;

            @apply flex;

            > input {
                @apply text-black
                    rounded-md
                    p-3
                    border
                    border-gray-300
                    text-left
                    transition-all
                    w-[76px];
            }

            > .input-edit-button {
                @apply flex-none;
                @apply transition-all;

                @apply rounded-md
                    p-3
                    ml-4
                    border
                    border-gray-300
                    text-left
                    bg-cyan-300
                    text-white
                    cursor-pointer
                    w-[76px];
            }
        }
    }
</style>
