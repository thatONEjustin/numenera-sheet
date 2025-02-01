<script lang="ts">
    import type { Tab } from "@components/types.d";

    import Tabs from "@components/ui/Tabs.svelte";
    import CharacterSheet from "@game/CharacterSheet.svelte";
    import Background from "@game/Background.svelte";
    // import Combat from "@game/Combat.svelte";

    import { getSheetData } from "@components/utils";

    const tabs: Array<Tab> = [
        {
            label: "Character Sheet",
            content: CharacterSheet as any,
        },
        {
            label: "Background",
            content: Background as any,
        },
        // {
        //     label: "Combat",
        //     content: Combat as any,
        // },
    ];

    function onclick(_event: Event) {
        localStorage.clear();
    }
</script>

<!-- {#await getSheetData() then sheet_data}
    <Tabs {tabs} {sheet_data} />
{/await} -->

{#await getSheetData()}
    <!-- getSheetData() is pending -->
    <div>Loading</div>
{:then sheet_data}
    <Tabs {tabs} {sheet_data} />
{:catch error}
    {error}
    <button {onclick}>Reset Data</button>
{/await}
