<script lang="ts">
    import type { Snippet } from "@components/types.d";
    import InputField from "@components/ui/forms/fields/InputField.svelte";

    // import CharacterStat from "@game/mechanics/CharacterStat.svelte";

    type StatsProps = {
        sheet_data?: any;
        children?: Snippet;
    };

    let { sheet_data }: StatsProps = $props();

    let { characterClass } = sheet_data;
</script>

<fieldset name="characterStats">
    <div class="grid grid-cols-3 gap-x-6">
        <InputField
            label="Descriptor"
            type="text"
            name="characterClass_descriptor"
            id="characterClass_descriptor"
            value={characterClass?.descriptor}
            required
        />

        <InputField
            label="Type"
            type="text"
            name="characterClass_type"
            id="characterClass_type"
            value={characterClass?.type}
            required
        />

        <InputField
            label="Focus"
            type="text"
            name="characterClass_focus"
            id="characterClass_focus"
            value={characterClass?.focus}
            required
        />
    </div>
</fieldset>
