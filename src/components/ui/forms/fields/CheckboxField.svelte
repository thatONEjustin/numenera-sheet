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
        {/key}
    </label>
</div>
