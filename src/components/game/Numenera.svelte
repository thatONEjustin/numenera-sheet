<script lang="ts">
    import type { Tab } from "@components/types.d";

    import Tabs from "@components/ui/Tabs.svelte";
    import CharacterSheet from "@game/CharacterSheet.svelte";
    import Combat from "@game/Combat.svelte";

    import { getSheetData } from "@js/utils";

    const tabs: Array<Tab> = [
        {
            label: "Character Sheet",
            content: CharacterSheet as any,
        },
        {
            label: "Combat",
            content: Combat as any,
        },
    ];
</script>

{#await getSheetData() then sheet_data}
    <Tabs {tabs} {sheet_data} />
{/await}
