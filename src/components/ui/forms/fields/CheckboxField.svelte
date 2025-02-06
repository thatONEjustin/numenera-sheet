<script lang="ts" generics="BaseInputTypes extends 'input'">
    import type {
        ClassValue,
        Snippet,
        SvelteHTMLElements,
    } from "@components/types";
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
</script>

<div class={["checkbox-input", className]}>
    {#key value}
        <label for={id} class="flex">
            {label}
            <input class="pl-2" {type} {name} {id} {value} {checked} />
        </label>
    {/key}
</div>
