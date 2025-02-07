<script lang="ts">
    import type { ClassValue } from "@components/types";
    import SheetSection from "@game/sheet-sections/SheetSection.svelte";
    import CharacterSkill from "@game/mechanics/CharacterSkill.svelte";
    import {
        character_type_options,
        character_descriptor_options,
        character_focus_options,
    } from "@game/data.svelte";
    import TextInputField from "@components/ui/forms/fields/TextInputField.svelte";

    const data_array = [
        {
            name: "Attack Flourish",
            description: `With your attack, you add stylish moves, entertaining quips, or a certain \"something\" that entertains or impresses others. Choose any number of creatures within short range who can see you; each of them gains a +1 bonus to its next die roll.`,
            tags: ["enabler"],
        },
    ];

    let input_value = $state("new");

    let new_skill_name = $state("");

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

    <div class="skills-list">
        {#each data_array as skill}
            <CharacterSkill {skill} />
            <!--
                TODO: this needs to be its own component or at least snippet 
                basically we need UX to replace the "form" of adding new
                <CharacterSkill />'s 
            <div class="skill">
                <h4>{name}</h4>
                <p>{description}</p>
                {#each tags as tag}
                    <small>{tag}</small>
                {/each}
            </div>
            -->
        {/each}

        <CharacterSkill />
    </div>
</SheetSection>
