<script lang="ts">
    import type { SheetSection as SheetProps } from "@components/types.d";
    import CharacterStat from "@game/mechanics/CharacterStat.svelte";
    import SheetSection from "@game/sheet-sections/SheetSection.svelte";

    const { class: className, sheet_data }: SheetProps = $props();
    const { stats } = sheet_data;
</script>

<SheetSection
    class={[className, "border-t border-b border-gray-200 py-4 my-4"]}
    name="character-stats"
>
    <div class="grid grid-cols-4 gap-x-6">
        <p class="text-4xl"><i class="nf nf-fa-dice_d20"></i></p>

        <h2 class="my-auto">Might</h2>
        <h2 class="my-auto">Speed</h2>
        <h2 class="my-auto">Intellect</h2>
    </div>
    <div class="grid grid-cols-4 gap-x-6 content-center">
        <h3 class="my-auto">Pool</h3>
        <CharacterStat
            label="Might"
            hideLabel={true}
            type="number"
            name="stats_might"
            id="stats_might"
            value={stats?.might}
            required
        />
        <CharacterStat
            label="Speed"
            hideLabel={true}
            type="number"
            name="stats_speed"
            id="stats_speed"
            value={stats?.speed}
            required
        />
        <CharacterStat
            label="Intellect"
            hideLabel={true}
            type="number"
            name="stats_intellect"
            id="stats_intellect"
            value={stats?.intellect}
            required
        />
    </div>
    <div class="grid grid-cols-4 gap-x-6">
        <h3 class="my-auto">Edge</h3>
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
        <h3 class="my-auto">Effort</h3>
        <CharacterStat
            hideLabel={true}
            type="number"
            name="stats_mightEffort"
            id="stats_mightEffort"
            value={stats?.mightEffort}
            required
        />
    </div>
</SheetSection>
