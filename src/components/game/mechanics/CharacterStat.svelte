<script lang="ts">
    import type { TextInput } from "@components/types.d";
    import TextInputField from "@forms/fields/TextInputField.svelte";

    let {
        name,
        type,
        id,
        hideLabel,
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
