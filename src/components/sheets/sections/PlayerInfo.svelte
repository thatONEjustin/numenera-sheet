<script lang="ts">
    import InputField from "@forms/fields/InputField.svelte";

    const player_name = "";
</script>

<fieldset>
    <h3>Player Info</h3>
    <InputField
        type="text"
        label="Player Name"
        name="player_name"
        value={player_name}
        id="player_name"
        required
    />
</fieldset>

<style lang="postcss">
    @import "tailwindcss/theme" theme(reference);

    fieldset {
        @apply m-0;
    }
</style>
