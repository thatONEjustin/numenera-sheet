<script lang="ts" generics="BaseInputTypes extends 'input' | 'textarea'">
    // import type { CharacterStat as TextInput } from "@components/types.d";
    import TextInputField from "@forms/fields/TextInputField.svelte";
    import type {
        JustinTextInput,
        SvelteHTMLElements,
    } from "@components/types";

    type TextInput = SvelteHTMLElements[BaseInputTypes] & JustinTextInput;

    let {
        name,
        type,
        id,
        hideLabel = true,
        label,
        labelTag,
        required,
        class: className,
        rows,
        placeholder,
        value,
    }: TextInput = $props();
</script>

<div class="">
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
</div>
