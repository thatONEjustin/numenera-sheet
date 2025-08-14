<script lang="ts">
    // import type { SheetSection } from "@components/types";

    import Form from "@forms/Form.svelte";
    // import SubmitButton from "@forms/fields/SubmitButton.svelte";

    // import CharacterDescription from "@game/sheet-sections/CharacterDescription.svelte";
    import CharacterStats from "@game/sheet-sections/CharacterStats.svelte";
    import FancyName from "@game/sheet-sections/FancyName.svelte";
    import CharacterAdvancement from "@game/sheet-sections/CharacterAdvancement.svelte";
    import RecoveryAvailable from "@game/sheet-sections/RecoveryAvailable.svelte";
    // import CharacterSkills from "@game/sheet-sections/CharacterSkills.svelte";
</script>

<Form>
    <FancyName />

    <!-- <div class="flex flex-col lg:flex-row"> -->
    <div class="grid grid-cols-1 md:grid-cols-12 gap-x-4">
        <div class="col-span-9">
            <CharacterStats />

            <CharacterAdvancement />
            <RecoveryAvailable />
        </div>
        <div class="col-span-3">
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

    <!-- <SubmitButton /> -->
</Form>
