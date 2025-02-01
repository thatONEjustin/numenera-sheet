<script lang="ts">
    import type { SheetSection as SheetProps } from "@components/types.d";
    import SheetSection from "@game/sheet-sections/SheetSection.svelte";
    import TextInputField from "@components/ui/forms/fields/TextInputField.svelte";

    import SelectField from "@ui/forms/fields/dropdownField.svelte";

    let { class: className, sheet_data }: SheetProps = $props();

    let { characterClass } = sheet_data;
</script>

<SheetSection class={className}>
    <div class="grid grid-cols-3 gap-x-6">
        <TextInputField
            label="Descriptor"
            type="text"
            name="characterClass_descriptor"
            id="characterClass_descriptor"
            value={characterClass?.descriptor}
            required
        />

        <TextInputField
            label="Type"
            type="text"
            name="characterClass_type"
            id="characterClass_type"
            value={characterClass?.type}
            required
        />

        <TextInputField
            label="Focus"
            type="text"
            name="characterClass_focus"
            id="characterClass_focus"
            value={characterClass?.focus}
            required
        />
    </div>
</SheetSection>
