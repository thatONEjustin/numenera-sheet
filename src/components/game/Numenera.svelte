<script lang="ts">
    import type { Tab } from "@components/types.d";

    import Tabs from "@ui/Tabs.svelte";
    import CharacterSheet from "@game/CharacterSheet.svelte";
    import Combat from "@game/Combat.svelte";

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

<Tabs {tabs} />
