<script lang="ts">
    import type { TextInput } from "@components/types";
    import InputField from "@forms/fields/InputField.svelte";

    // let { props } = $props()
    let {
        name = "",
        type = "",
        id = "",
        label = "",
        labelTag,
        hideLabel = false,
        required = false,
        class: className = "",
        rows,
        placeholder = "",
        value = $bindable(""),
    }: TextInput = $props();
</script>

<InputField
    {name}
    {type}
    {id}
    {label}
    {hideLabel}
    {required}
    class={className}
    {rows}
    {placeholder}
    {value}
    {labelTag}
/>
