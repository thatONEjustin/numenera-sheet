<script lang="ts">
    import type { Snippet } from "@components/types";

    import InputField from "@forms/fields/InputField.svelte";

    type PlayerInfo = {
        sheet_data?: any;
        children?: Snippet;
    };

    const { sheet_data }: PlayerInfo = $props();

    let { player } = sheet_data;
</script>

<fieldset name="playerInfo">
    <h3>Player Info</h3>
    <InputField
        type="text"
        label="Player Name"
        name="player_name"
        value={player?.name}
        id="player_name"
        required
    />
</fieldset>

<style lang="postcss">
    @import "tailwindcss/theme" theme(reference);

    fieldset {
        @apply m-0;

        > h3 {
            @apply text-3xl;
        }
    }
</style>
