<script lang="ts">
    import type { SheetSection as SheetProps } from "@components/types.d";

    import SheetSection from "@game/sheet-sections/SheetSection.svelte";
    import CharacterStat from "@game/mechanics/CharacterStat.svelte";

    const { class: className, sheet_data }: SheetProps = $props();
    const { advancement } = sheet_data;
</script>

<SheetSection
    class={[className, "border-t border-b border-gray-200 py-4 my-4"]}
    name="character-advancement"
>
    <div class="min-h-[40px]">
        <h2 class="my-auto">Advancement</h2>
    </div>

    <div class="grid grid-cols-4 gap-x-6 content-center">
        <h3 class="my-auto">Tier</h3>
        <CharacterStat
            label="Tier"
            type="number"
            name="advancement_tier"
            id="advancement_tier"
            value={advancement?.tier}
            required
        />
    </div>
    <div class="grid grid-cols-4 gap-x-6">
        <h3 class="my-auto">Effort</h3>
        <CharacterStat
            type="number"
            name="advancement_effort"
            id="advancement_effort"
            value={advancement?.effort}
            required
        />
    </div>
</SheetSection>
