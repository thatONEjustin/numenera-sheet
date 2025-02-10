<script lang="ts">
    import type { ClassValue } from "@components/types";
    import SheetSection from "@game/sheet-sections/SheetSection.svelte";
    import CharacterSkill from "@game/mechanics/CharacterSkill.svelte";
    import { sheet_data } from "@game/data.svelte";

    let skills = $derived.by(() => {
        return sheet_data["skills"];
    });

    type SkillsTabProps = {
        class?: ClassValue;
    };

    let { class: className }: SkillsTabProps = $props();
</script>

<SheetSection name="character-skill" class={className}>
    <div class="text-3xl flex flex-row items-center">
        <i class="nf nf-fa-dice_d20"></i>
        <h3 class="pl-2">Skills</h3>
    </div>

    {#key skills}
        <div class="skills-list grid grid-cols-1 md:grid-cols-2 gap-x-6">
            {#each skills as skill}
                <CharacterSkill {skill} is_new={false} />
            {/each}

            <div class="skills-list-add md:col-span-2">
                <h2>Add Skill</h2>
                <CharacterSkill is_new={true} />
            </div>
        </div>
    {/key}
</SheetSection>

<style lang="postcss">
    @import "tailwindcss/theme" theme(reference);
    .skills-list-add {
        @apply mt-4 pt-6 border-t border-t-gray-400;
    }
</style>
