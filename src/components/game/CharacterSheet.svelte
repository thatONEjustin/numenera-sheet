<script lang="ts">
    import type { SheetSection } from "@components/types";

    import Form from "@forms/Form.svelte";
    import SubmitButton from "@forms/fields/SubmitButton.svelte";

    // import CharacterDescription from "@game/sheet-sections/CharacterDescription.svelte";
    import CharacterStats from "@game/sheet-sections/CharacterStats.svelte";
    import FancyName from "@game/sheet-sections/FancyName.svelte";
    import CharacterAdvancement from "@game/sheet-sections/CharacterAdvancement.svelte";
    import RecoveryAvailable from "@game/sheet-sections/RecoveryAvailable.svelte";
    import CharacterSkills from "@game/sheet-sections/CharacterSkills.svelte";
</script>

<Form>
    <FancyName />

    <div class="flex flex-col md:flex-row">
        <div class="w-full">
            <CharacterStats />

            <CharacterAdvancement />
            <RecoveryAvailable />
        </div>
        <div class="w-1/5">
            <h3>Hints</h3>
            <p>
                Basically lets use this space for "todos" for the user, like
                guided char creation
            </p>
        </div>
        <!--
        <div class="w-2/5">

            TODO: need to make
            <CharacterEquipment {sheet_data} /> 

        </div>
        -->
    </div>

    <SubmitButton />
</Form>
