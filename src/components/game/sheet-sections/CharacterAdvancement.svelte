<script lang="ts">
    import type { SheetSection as SheetProps } from "@components/types.d";

    import CheckboxField from "@components/ui/forms/fields/CheckboxField.svelte";
    import SheetSection from "@game/sheet-sections/SheetSection.svelte";
    import CharacterStat from "@game/mechanics/CharacterStat.svelte";

    const { class: className }: SheetProps = $props();
    import { sheet_data } from "@game/data.svelte";
    const { advancement, advancementSteps } = sheet_data;
</script>

<SheetSection
    class={[className, "border-b border-gray-200 py-4 my-4"]}
    name="character-advancement"
>
    <div class="grid grid-cols-3 md:grid-cols-4 gap-x-6">
        <div
            class="text-3xl flex flex-row items-start col-span-3 md:col-span-1"
        >
            <i class="nf nf-md-sort_clock_descending"></i>
            <h3 class="pl-2">Character Advancement</h3>
        </div>
        <div>
            <h3 class="my-auto">Tier</h3>
            <CharacterStat
                label="Tier"
                type="number"
                name="advancement_tier"
                min="1"
                id="advancement_tier"
                value={advancement?.tier}
                required
            />
        </div>
        <div>
            <h3 class="my-auto">Effort</h3>
            <CharacterStat
                type="number"
                name="advancement_effort"
                min="1"
                id="advancement_effort"
                value={advancement?.effort}
                required
            />
        </div>
        <div>
            <h3 class="my-auto">Experience</h3>
            <CharacterStat
                type="number"
                name="advancement_xp"
                id="advancement_xp"
                value={advancement?.xp}
                required
            />
        </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-4 gap-x-6">
        <div class="text-3xl flex flex-row items-center">
            <i class="nf nf-md-timer_refresh"></i>
            <h3 class="pl-2">Advancements</h3>
        </div>
        <CheckboxField
            name="advancementSteps_statBonus"
            id="statBonus"
            label="Increase Capabilities"
            checked={advancementSteps?.statBonus}
        />
        <CheckboxField
            name="advancementSteps_xtraEffort"
            id="extraEffort"
            label="Extra Effort"
            checked={advancementSteps?.xtraEffort}
        />
        <CheckboxField
            name="advancementSteps_edge"
            id="edge"
            label="Move towards perfection"
            checked={advancementSteps?.edge}
        />
        <CheckboxField
            name="advancementSteps_skillTraining"
            class="md:col-start-2"
            id="skillTraining"
            label="Skill Training"
            checked={advancementSteps?.skillTraining}
        />
    </div>
</SheetSection>
