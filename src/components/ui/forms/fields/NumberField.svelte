<script lang="ts" generics="BaseInputTypes extends 'input'">
    import type { SvelteHTMLElements, Snippet } from "@components/types";

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

    function onclick(_: Event) {
        editing = !editing;

        if (editing) return;

        value = element?.value;
    }
</script>

<div class={["number-field", className]}>
    {#if labelTag && hideLabel == false}
        {@render labelTag()}
    {:else if hideLabel == false}
        <label for={name}>{label}</label>
    {/if}

    {#if !editing && value != ""}
        <button
            type="button"
            class={[value != "" ? "has-value" : ""]}
            {onclick}
        >
            {value}
        </button>
    {/if}

    <input
        {name}
        type="number"
        {id}
        {value}
        {required}
        {placeholder}
        {min}
        {max}
        class={!editing && value != "" ? "hidden" : ""}
        bind:this={element}
    />

    {#if editing || value != ""}
        <button
            class={[!editing || value == "" ? "hidden" : "", "edit"]}
            type="submit"
            {onclick}
        >
            Save
        </button>
    {/if}
</div>

<style lang="postcss">
    @import "tailwindcss/theme" theme(reference);
    .number-field {
        @apply flex
            flex-col
            my-3;

        > label {
            @apply pb-1
                mb-3;
        }

        > button {
            @apply cursor-pointer
                text-black
                rounded-md
                p-3
                border
                border-gray-300
                text-left;

            &.has-value {
                @apply text-black
                decoration-dotted
                font-bold;
            }

            &.edit {
                @apply bg-cyan-300
                    text-white
                    border-black
                    mt-2
                    cursor-pointer
                    w-max
                    max-w-max;
            }
        }

        > input {
            @apply w-full;

            @apply w-full
                bg-white
                text-black
                border
                border-black
                rounded-md
                p-3;
        }
    }
</style>
