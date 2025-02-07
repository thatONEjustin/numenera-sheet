<script lang="ts">
    import type { SheetSection as SheetProps } from "@components/types.d";
    import {
        character_type_options,
        character_focus_options,
        character_descriptor_options,
    } from "@game/mechanics/data";

    import SheetSection from "@game/sheet-sections/SheetSection.svelte";
    import SelectField from "@ui/forms/fields/SelectField.svelte";

    let { class: className }: SheetProps = $props();

    import { sheet_data } from "@components/data.svelte";
    let { characterClass } = sheet_data;
</script>

<SheetSection class={className}>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-x-6">
        <SelectField
            label="Type"
            name="characterClass_type"
            id="characterClass_type"
            options={character_type_options}
            value={characterClass?.type}
            required
        />

        <SelectField
            label="Descriptor"
            name="characterClass_descriptor"
            id="characterClass_descriptor"
            options={character_descriptor_options}
            value={characterClass?.descriptor}
            required
        />

        <SelectField
            label="Focus"
            name="characterClass_focus"
            id="characterClass_focus"
            options={character_focus_options}
            value={characterClass?.focus}
            required
        />
    </div>
</SheetSection>
