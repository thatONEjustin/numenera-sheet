<script lang="ts">
    import type { SheetSection as SheetProps } from "@components/types.d";
    import CharacterStat from "@game/mechanics/CharacterStat.svelte";
    import SheetSection from "@game/sheet-sections/SheetSection.svelte";

    const { class: className }: SheetProps = $props();
    import { sheet_data } from "@game/data.svelte";
    const { stats } = sheet_data;
</script>

<SheetSection
    class={[className, "border-t border-b border-gray-200 py-4 my-4"]}
    name="character-stats"
>
    <div class="grid grid-cols-4 gap-x-6">
        <div class="text-3xl flex flex-row items-center">
            <i class="nf nf-fa-dice_d20"></i>
            <h3 class="pl-2">Stats</h3>
        </div>

        <h2 class="my-auto">Might</h2>
        <h2 class="my-auto">Speed</h2>
        <h2 class="my-auto">Intellect</h2>
    </div>
    <div class="grid grid-cols-4 gap-x-6 content-center">
        <h3 class="my-auto">Pool</h3>
        <CharacterStat
            label="Might"
            name="stats_might"
            id="stats_might"
            value={stats?.might}
            max={69}
        />
        <CharacterStat
            label="Speed"
            name="stats_speed"
            id="stats_speed"
            value={stats?.speed}
            max={69}
        />
        <CharacterStat
            label="Intellect"
            name="stats_intellect"
            id="stats_intellect"
            value={stats?.intellect}
            max={69}
        />
    </div>
    <div class="grid grid-cols-4 gap-x-6">
        <h3 class="my-auto">Edge</h3>
        <CharacterStat
            name="stats_mightEdge"
            id="stats_mightEdge"
            value={stats?.mightEdge ? stats?.mightEdge : "0"}
        />
        <CharacterStat
            name="stats_speedEdge"
            id="stats_speedEdge"
            value={stats?.speedEdge ? stats?.speedEdge : "0"}
        />
        <CharacterStat
            name="stats_intellectEdge"
            id="stats_intellectEdge"
            value={stats?.intellectEdge ? stats?.intellectEdge : "0"}
        />
    </div>
</SheetSection>
