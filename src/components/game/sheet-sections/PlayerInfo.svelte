<script lang="ts">
    import type { SheetSection } from "@components/types.d";

    import InputField from "@forms/fields/InputField.svelte";

    const { sheet_data }: SheetSection = $props();

    let { character } = sheet_data;
</script>

<fieldset name="playerInfo">
    <InputField
        type="text"
        label="Character Name"
        name="character_name"
        id="character_name"
        value={character?.name}
        required
    />
    <!--
    <InputField
        type="text"
        label="Player Name"
        name="player_name"
        value={player?.name}
        id="player_name"
        required
    />
    -->
</fieldset>

<style lang="postcss">
    @import "tailwindcss/theme" theme(reference);
</style>
