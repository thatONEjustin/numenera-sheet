<script lang="ts">
    import type { Snippet } from "@components/types";

    import InputField from "@forms/fields/InputField.svelte";
    import CharacterStat from "@game/mechanics/CharacterStat.svelte";

    type StatsProps = {
        sheet_data?: any;
        children?: Snippet;
    };

    let { sheet_data }: StatsProps = $props();

    let { stats } = sheet_data;
</script>

<fieldset name="characterStats">
    <h3>Character Stats</h3>

    <div class="grid grid-cols-3 gap-x-4 max-w-1/3">
        <!-- NOTE: keep this pattern, its cool that I can 
                pass a snippet downwards
                 
                <CharacterStat
                    type="text"
                    name="stats_might"
                    id="stats_might"
                    value={stats?.might}
                    required
                >
                    {#snippet labelTag()}
                        <h1>Might</h1>
                    {/snippet}
                </CharacterStat>
        -->

        <CharacterStat
            type="text"
            name="stats_might"
            id="stats_might"
            value={stats?.might}
            required
        />

        <InputField
            type="text"
            label="Speed"
            name="stats_speed"
            id="stats_speed"
            value={stats?.speed}
            required
        />

        <InputField
            type="text"
            label="Intellect"
            name="stats_intellect"
            id="stats_intellect"
            value={stats?.intellect}
            required
        />
    </div>
</fieldset>
