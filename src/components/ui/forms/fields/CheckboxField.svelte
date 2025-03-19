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
        // value = element?.value;
        sheet_data[category_key] = updateSheetData(
            sheet_data,
            category_key,
            field_key,
            element.checked,
        );
    }
</script>

<div class={["checkbox-input", className]}>
    <label for={id} class="flex">
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
    /* Customize the label (the checkbox-input) */
    .checkbox-input {
        display: block;
        position: relative;
        padding-left: 35px;
        margin-bottom: 12px;
        cursor: pointer;
        font-size: 22px;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    /* Hide the browser's default checkbox */
    .checkbox-input input {
        position: absolute;
        opacity: 0;
        cursor: pointer;
        height: 0;
        width: 0;
    }

    /* Create a custom checkbox */
    .checkmark {
        position: absolute;
        top: 0;
        left: 0;
        height: 25px;
        width: 25px;
        background-color: #eee;
    }

    /* On mouse-over, add a grey background color */
    .checkbox-input:hover input ~ .checkmark {
        background-color: #ccc;
    }

    /* When the checkbox is checked, add a blue background */
    .checkbox-input input:checked ~ .checkmark {
        background-color: #2196f3;
    }

    /* Create the checkmark/indicator (hidden when not checked) */
    .checkmark:after {
        content: "";
        position: absolute;
        display: none;
    }

    /* Show the checkmark when checked */
    .checkbox-input input:checked ~ .checkmark:after {
        display: block;
    }

    /* Style the checkmark/indicator */
    .checkbox-input .checkmark:after {
        left: 9px;
        top: 5px;
        width: 5px;
        height: 10px;
        border: solid white;
        border-width: 0 3px 3px 0;
        -webkit-transform: rotate(45deg);
        -ms-transform: rotate(45deg);
        transform: rotate(45deg);
    }
</style>
