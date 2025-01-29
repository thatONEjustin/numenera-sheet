<script lang="ts">
    import type { Snippet } from "@components/types.d";

    import InputField from "@forms/fields/InputField.svelte";
    import Accordion from "@ui/Accordion.svelte";

    type CharacterBasicInfo = {
        sheet_data?: any;
        children?: Snippet;
    };

    let { sheet_data }: CharacterBasicInfo = $props();

    let { character } = sheet_data;
</script>

<fieldset name="characterInfo">
    <h3>Character Info</h3>

    <Accordion>
        {#snippet title()}
            <h4>Backstory & Description</h4>
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
