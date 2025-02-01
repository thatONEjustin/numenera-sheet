<script lang="ts" generics="BaseInputTypes extends 'input'">
    import type { SvelteHTMLElements, Snippet } from "@components/types";
    import NumberField from "@components/ui/forms/fields/NumberField.svelte";

    type JustinNumberField = {
        name: string;
        label?: string;
        hideLabel?: boolean;
        labelTag?: Snippet;
        placeholder?: string;
    };

    type NumberProps = SvelteHTMLElements[BaseInputTypes] & JustinNumberField;

    let {
        name,
        id,
        hideLabel = true,
        min = 0,
        max,
        label,
        labelTag,
        required,
        class: className,
        placeholder,
        value,
    }: NumberProps = $props();
</script>

<div class="">
    <NumberField
        class={className}
        {name}
        {min}
        {max}
        {id}
        {hideLabel}
        {label}
        {required}
        {placeholder}
        {value}
        {labelTag}
    />
    <!--
    <TextInputField
        class={className}
        {name}
        {type}
        {id}
        {hideLabel}
        {label}
        {required}
        {rows}
        {placeholder}
        {value}
        {labelTag}
    />
    -->
</div>
