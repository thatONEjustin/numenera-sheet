<script lang="ts" generics="BaseInputTypes extends 'input' | 'textarea'">
    import type {
        JustinTextInput,
        SvelteHTMLElements,
        TextInputElement,
    } from "@components/types.d";

    type TextInput = SvelteHTMLElements[BaseInputTypes] & JustinTextInput;

    let {
        name,
        type,
        id,
        hideLabel = false,
        label: raw_label = "",
        labelTag,
        required = false,
        class: className,
        rows = 4,
        placeholder: raw_placeholder = "",
        value = $bindable(""),
    }: TextInput = $props();

    let input_element: TextInputElement = $state() as TextInputElement;
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

        value = input_element.value;
    }
</script>

<div class={["input-field", className]}>
    {#if labelTag && hideLabel == false}
        {@render labelTag()}
    {:else if hideLabel == false}
        <label for={name}>{label}</label>
    {/if}

    {#if !editing && value != ""}
        <button
            type="button"
            class={[
                value != "" ? "has-value" : "",
                type == "textarea" ? "max-h-16 overflow-y-hidden" : "",
            ]}
            {onclick}
        >
            {value}
        </button>
    {/if}

    {#if type != "textarea"}
        <input
            {name}
            {type}
            {id}
            {value}
            {required}
            {placeholder}
            class={!editing && value != "" ? "hidden" : ""}
            bind:this={input_element}
        />
    {/if}

    {#if type == "textarea"}
        <textarea
            {name}
            {id}
            {rows}
            {required}
            {placeholder}
            class={!editing && value != "" ? "hidden" : ""}
            bind:this={input_element}>{value}</textarea
        >
    {/if}

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
    .input-field {
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

        > input,
        > textarea {
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
