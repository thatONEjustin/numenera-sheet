<script lang="ts">
    import type { TextInput } from "@components/types";

    type TextInputElement =
        | HTMLInputElement
        | HTMLTextAreaElement
        | HTMLSelectElement;

    // import { fade } from "svelte/transition";

    let {
        name = "",
        type = "",
        id = "",
        label = "",
        labelTag,
        hideLabel = false,
        required = false,
        class: className = "",
        rows = 4,
        placeholder = "",
        value = $bindable(""),
    }: TextInput = $props();

    let input: TextInputElement = $state() as TextInputElement;

    let display_placeholder: string = $derived.by(() => {
        return placeholder != ""
            ? placeholder
            : `Enter ${name.replaceAll("_", " ")} here`;
    });

    let editing: boolean = $state(false);

    function input_field_save(_: Event) {
        editing = !editing;

        if (editing) return;

        value = input.value;
    }
</script>

<div class:className class="input-field">
    <!--
    {#if labelTag && hideLabel == true}
    {:else if hideLabel == false}
        <label for={name}>{label}</label>
    {/if}
    -->
    {#if labelTag && hideLabel == false}
        {@render labelTag()}
    {:else if hideLabel == false}
        <label for={name}>{label}</label>
    {/if}

    {#if !editing && value != ""}
        <button
            class:has-value={value != ""}
            type="button"
            onclick={input_field_save}
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
            placeholder={display_placeholder}
            class:hidden={!editing && value != ""}
            bind:this={input}
        />
    {/if}

    {#if type == "textarea"}
        <textarea
            {name}
            {id}
            {rows}
            {required}
            placeholder={display_placeholder}
            class:hidden={!editing && value != ""}
            bind:this={input}>{value}</textarea
        >
    {/if}

    {#if editing || value != ""}
        <button
            class="edit"
            class:hidden={!editing || value == ""}
            type="submit"
            onclick={input_field_save}
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
                px-4
                py-2
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
