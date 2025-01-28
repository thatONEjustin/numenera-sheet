<script lang="ts">
    import type { Tab, Snippet } from "@components/types";

    import Tabs from "@ui/Tabs.svelte";
    import CharacterSheet from "@game/CharacterSheet.svelte";

    const tabs: Array<Tab> = [
        {
            label: "Character Sheet",
            content: CharacterSheet as Snippet,
        },
    ];
</script>

<Tabs {tabs} />
