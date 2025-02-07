<script lang="ts">
    import type { SheetSection } from "@components/types";

    import Form from "@forms/Form.svelte";
    import SubmitButton from "@forms/fields/SubmitButton.svelte";

    // import CharacterDescription from "@game/sheet-sections/CharacterDescription.svelte";
    import CharacterStats from "@game/sheet-sections/CharacterStats.svelte";
    import FancyName from "@game/sheet-sections/FancyName.svelte";
    import CharacterAdvancement from "@game/sheet-sections/CharacterAdvancement.svelte";
    import RecoveryAvailable from "@game/sheet-sections/RecoveryAvailable.svelte";
</script>

<Form>
    <FancyName />

    <div class="flex flex-col md:flex-row">
        <div class="grid grid-cols-1 gap-x-6 w-full md:w-4/5">
            <CharacterStats />
            <CharacterAdvancement />
            <RecoveryAvailable />
        </div>
        <!--
        <div class="w-2/5">
                TODO: need to make
                <CharacterSkills {sheet_data} />
                <CharacterEquipment {sheet_data} /> 
        </div>
            -->
    </div>

    <SubmitButton />
</Form>
