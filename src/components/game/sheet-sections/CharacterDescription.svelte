<script lang="ts">
    import type { SheetSection } from "@components/types.d";

    import InputField from "@forms/fields/InputField.svelte";
    import Accordion from "@ui/Accordion.svelte";

    let { sheet_data }: SheetSection = $props();

    let { character } = sheet_data;
</script>

<fieldset name="characterInfo">
    <Accordion open={true}>
        {#snippet title()}
            <h3 class="py-6">Character Background</h3>
        {/snippet}

        <div>
            <InputField
                type="textarea"
                label="Description"
                rows={4}
                name="character_description"
                id="character_description"
                value={character?.description}
            />

            <InputField
                type="textarea"
                label="Backstory"
                rows={10}
                name="character_backstory"
                id="character_backstory"
                value={character?.backstory}
            />
        </div>
    </Accordion>
    <!--
    <div class="grid grid-cols-2 gap-x-4">
        <Accordion>
            {#snippet title()}
                <h4>Description</h4>
            {/snippet}

            <InputField
                type="textarea"
                hideLabel={true}
                label="Description"
                rows={10}
                name="character_description"
                id="character_description"
                value={character?.description}
            />
        </Accordion>
        <Accordion>
            {#snippet title()}
                <h4>Backstory</h4>
            {/snippet}

            <InputField
                type="textarea"
                hideLabel={true}
                label="Backstory"
                rows={10}
                name="character_backstory"
                id="character_backstory"
                value={character?.backstory}
            />
        </Accordion>
    </div>
    -->
</fieldset>
