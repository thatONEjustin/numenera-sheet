<script lang="ts">
    import type { TextInput } from "@components/types.d";
    import InputField from "@forms/fields/InputField.svelte";

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
    <InputField
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
