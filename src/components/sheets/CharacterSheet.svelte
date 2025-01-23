<script lang="ts">
    import Form from "@forms/Form.svelte";

    import PlayerInfo from "@sheets/sections/PlayerInfo.svelte";
</script>

<Form>
    <header>
        <h2>Character Sheet</h2>
    </header>

    <PlayerInfo />
</Form>

<style lang="postcss">
    @import "tailwindcss/theme" theme(reference);
</style>
