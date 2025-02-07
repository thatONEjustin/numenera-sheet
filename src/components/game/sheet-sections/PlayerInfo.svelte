<script lang="ts">
    import type { SheetSection as SheetProps } from "@components/types.d";
    import SheetSection from "@game/sheet-sections/SheetSection.svelte";
    import TextInputField from "@forms/fields/TextInputField.svelte";

    const { class: className }: SheetProps = $props();

    import { sheet_data } from "@components/data.svelte";

    let { character } = sheet_data;
</script>

<SheetSection name="playerInfo" class={className}>
    <TextInputField
        type="text"
        label="Character Name"
        name="character_name"
        id="character_name"
        value={character?.name}
        required
    />
</SheetSection>
