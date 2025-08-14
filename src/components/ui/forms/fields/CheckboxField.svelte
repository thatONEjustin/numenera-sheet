<script lang="ts" generics="BaseInputTypes extends 'input'">
    import { sheet_data } from "@components/game/data.svelte";

    import type {
        ClassValue,
        Snippet,
        SvelteHTMLElements,
    } from "@components/types";
    import { updateSheetData } from "@components/utils";

    type CheckboxField = {
        name: string;
        class?: ClassValue;
        labelClass?: ClassValue;
        label: string;
        checked?: boolean;
        hideLabel?: boolean;
        labelTag?: Snippet;
        value?: string;
    };

    type CheckboxProps = SvelteHTMLElements[BaseInputTypes] & CheckboxField;

    let {
        label: raw_label = "",
        class: className,
        checked = $bindable(false),
        value = $bindable(""),
        ...input
    }: CheckboxProps = $props();

    let { name, id } = input;

    const type = "checkbox";
    const label: string = $derived.by(() => {
        return raw_label.trim() != "" ? raw_label : name.replaceAll("_", " ");
    });

    let element: HTMLInputElement = $state() as HTMLInputElement;

    const [category_key, field_key] = name.split("_");

    function fake_submit(_: Event) {
        sheet_data[category_key] = updateSheetData(
            sheet_data,
            category_key,
            field_key,
            element.checked,
        );
    }
</script>

<div class={["checkbox-input", className]}>
    <label for={id} class={["flex", input?.labelClass]}>
        {label}
        {#key checked}
            <input
                class="pl-2"
                {type}
                {name}
                {id}
                {value}
                {checked}
                bind:this={element}
                onclick={fake_submit}
            />
            <span class="checkmark"></span>
        {/key}
    </label>
</div>

<style lang="postcss">
    @import "tailwindcss/theme" theme(reference);

    /* Customize the label (the checkbox-input) */
    .checkbox-input {
        @apply block
            relative
            pl-8
            mb-3
            cursor-pointer
            select-none;
    }

    /* Hide the browser's default checkbox */
    .checkbox-input input {
        @apply absolute
            opacity-0
            h-0
            w-0;
    }

    /* Create a custom checkbox */
    .checkmark {
        @apply absolute
            top-0
            left-0
            bg-white
            h-6
            w-6;
    }

    /* On mouse-over, add a grey background color */
    .checkbox-input:hover input ~ .checkmark {
        @apply bg-gray-200;
    }

    /* When the checkbox is checked, add a blue background */
    .checkbox-input input:checked ~ .checkmark {
        @apply bg-blue-700;
    }

    /* Create the checkmark/indicator (hidden when not checked) */
    .checkmark:after {
        @apply absolute
            hidden;
        content: "";
    }

    /* Show the checkmark when checked */
    .checkbox-input input:checked ~ .checkmark:after {
        @apply block;
    }

    /* Style the checkmark/indicator */
    .checkbox-input .checkmark:after {
        @apply left-2
            top-0.5
            w-1.5
            h-4
            border-white
            border-t-2
            border-r-2
            rotate-x-180
            rotate-45
            origin-center;
    }
</style>
