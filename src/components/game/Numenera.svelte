<script lang="ts">
    import type { Tab } from "@components/types.d";

    import Tabs from "@components/ui/Tabs.svelte";
    import CharacterSheet from "@game/CharacterSheet.svelte";
    import Background from "@game/Background.svelte";
    import Skills from "@game/Skills.svelte";
    import Form from "@components/ui/forms/Form.svelte";

    import { sheet_data } from "@game/data.svelte";
    import { getSheetData } from "@components/utils";
    import Error from "@components/ui/Error.svelte";

    const tabs: Array<Tab> = [
        {
            label: "Character Sheet",
            content: CharacterSheet as any,
        },
        {
            label: "Skills",
            content: Skills as any,
        },
        {
            label: "Background",
            content: Background as any,
        },
    ];
</script>

<!-- 
{#await import("@ui/Tabs.svelte") then { default: Tabs }}
    <Tabs {tabs} />
{:catch error}
    <Form class="flex flex-column items-start justify-center">
        <h1>{error}</h1>

        <button class="reset-button" type="submit" {onclick}>Reset Data</button>
    </Form>
{/await}

-->
{#await sheet_data then { character, characterClass, skills, advancementSteps, recovery }}
    <Tabs {tabs} />
{:catch error}
    <Error {error} />
{/await}
