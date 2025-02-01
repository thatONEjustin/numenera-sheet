<script lang="ts">
    import type { SheetSection } from "@components/types.d";

    import CharacterStat from "@game/mechanics/CharacterStat.svelte";

    let { sheet_data }: SheetSection = $props();

    let { stats } = sheet_data;
</script>

<fieldset name="characterStats">
    <div class="grid grid-cols-4 gap-x-6 mb-4">
        <p class="text-4xl"><i class="nf nf-fa-dice_d20"></i></p>

        <h2>Might</h2>
        <h2>Speed</h2>
        <h2>Intellect</h2>
    </div>
    <div class="grid grid-cols-4 gap-x-6 content-center">
        <h3>Pool</h3>
        <CharacterStat
            label="Might"
            hideLabel={true}
            type="number"
            class="!mt-0"
            name="stats_might"
            id="stats_might"
            value={stats?.might}
            required
        />
        <CharacterStat
            label="Speed"
            hideLabel={true}
            type="number"
            class="!mt-0"
            name="stats_speed"
            id="stats_speed"
            value={stats?.speed}
            required
        />
        <CharacterStat
            label="Intellect"
            hideLabel={true}
            type="number"
            class="!my-0"
            name="stats_intellect"
            id="stats_intellect"
            value={stats?.intellect}
            required
        />
    </div>
    <div class="grid grid-cols-4 gap-x-6">
        <h3>Edge</h3>
        <CharacterStat
            hideLabel={true}
            type="number"
            name="stats_mightEdge"
            id="stats_mightEdge"
            value={stats?.mightEdge}
            required
        />
        <CharacterStat
            hideLabel={true}
            type="number"
            name="stats_speedEdge"
            id="stats_speedEdge"
            value={stats?.speedEdge}
            required
        />
        <CharacterStat
            hideLabel={true}
            type="number"
            name="stats_intellectEdge"
            id="stats_intellectEdge"
            value={stats?.intellectEdge}
            required
        />
    </div>
    <div class="grid grid-cols-4 gap-x-6">
        <h3>Effort</h3>
        <CharacterStat
            hideLabel={true}
            type="number"
            name="stats_mightEffort"
            id="stats_mightEffort"
            value={stats?.mightEffort}
            required
        />
    </div>
</fieldset>
