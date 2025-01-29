<script lang="ts">
    import type { Snippet } from "@components/types.d";

    import InputField from "@forms/fields/InputField.svelte";

    type PlayerInfo = {
        sheet_data?: any;
        children?: Snippet;
    };

    const { sheet_data }: PlayerInfo = $props();

    let { player, character } = sheet_data;
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
