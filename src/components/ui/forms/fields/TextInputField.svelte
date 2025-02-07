<script lang="ts" generics="BaseInputTypes extends 'input' | 'textarea'">
    import type {
        JustinTextInput,
        SvelteHTMLElements,
        TextInputElement,
    } from "@components/types.d";
    import { fly } from "svelte/transition";

    type TextInput = SvelteHTMLElements[BaseInputTypes] & JustinTextInput;

    let {
        name = $bindable(""),
        type,
        id = $bindable(""),
        hideLabel = false,
        label: raw_label = $bindable(""),
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

    function editOnClick(event: Event) {
        if (editing) return;

        editing = !editing;
        event.preventDefault();
    }
</script>

<div class={["input-field", className]}>
    {#if labelTag && hideLabel == false}
        {@render labelTag()}
    {:else if hideLabel == false}
        <label for={name}>{label}</label>
    {/if}

    <div class="input-grid">
        <div class="input-ux">
            {#if type != "textarea"}
                <input
                    {name}
                    {type}
                    {id}
                    {value}
                    {required}
                    {placeholder}
                    class={["transition-all", !editing ? "cursor-pointer" : ""]}
                    onclick={editOnClick}
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
                    class="transition-all"
                    bind:this={input_element}>{value}</textarea
                >
            {/if}

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
    .input-field {
        @apply flex
            flex-wrap
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

            > input,
            > textarea {
                @apply text-black
                    rounded-md
                    p-3
                    border
                    border-gray-300
                    text-left
                    transition-all
                    w-full;
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
                    w-full
                    max-w-max;
            }
        }
    }
</style>
