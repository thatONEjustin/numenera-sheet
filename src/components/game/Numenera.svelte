<script lang="ts">
    import type { Tab } from "@components/types.d";

    import Tabs from "@components/ui/Tabs.svelte";
    import CharacterSheet from "@game/CharacterSheet.svelte";
    import Background from "@game/Background.svelte";
    import Skills from "@game/Skills.svelte";

    import { sheet_data } from "@game/data.svelte";
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

{#await sheet_data catch error}
    <Error {error} />
{/await}

<Tabs {tabs} />
<!-- {#await sheet_data then _}
    <Tabs {tabs} />
{:catch error}
    <Error {error} />
{/await} -->
