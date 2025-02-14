<script lang="ts">
    import type { SheetSection as SheetProps } from "@components/types.d";

    import SheetSection from "@game/sheet-sections/SheetSection.svelte";
    import TextInputField from "@forms/fields/TextInputField.svelte";
    import Accordion from "@ui/Accordion.svelte";

    let { class: className }: SheetProps = $props();

    import { sheet_data } from "@game/data.svelte";

    let { character } = sheet_data;

    let open: boolean = $derived.by(() => {
        return (
            character?.backstory != "" ||
            character?.backstory != undefined ||
            character?.description != "" ||
            character?.description != undefined
        );
    });
</script>

<SheetSection name="character-info" class={className}>
    <!--
    <TextInputField
        type="textarea"
        label="Description"
        rows={4}
        name="character_description"
        id="character_description"
        value={character?.description}
    />

    <TextInputField
        type="textarea"
        label="Backstory"
        rows={10}
        name="character_backstory"
        id="character_backstory"
        value={character?.backstory}
    />

    -->
    <Accordion {open}>
        {#snippet title()}
            <h3 class="py-6">Character Background</h3>
        {/snippet}

        <div>
            <TextInputField
                type="textarea"
                label="Description"
                rows={4}
                name="character_description"
                id="character_description"
                value={character?.description}
            />

            <TextInputField
                type="textarea"
                label="Backstory"
                rows={10}
                name="character_backstory"
                id="character_backstory"
                value={character?.backstory}
            />
        </div>
    </Accordion>
</SheetSection>
