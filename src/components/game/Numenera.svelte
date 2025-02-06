<script lang="ts">
    import type { Tab } from "@components/types.d";

    import Tabs from "@components/ui/Tabs.svelte";
    import CharacterSheet from "@game/CharacterSheet.svelte";
    import Background from "@game/Background.svelte";
    import Form from "@components/ui/forms/Form.svelte";
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
        if (localStorage.getItem("sheetData")) {
            localStorage.removeItem("sheetData");
        }
    }
</script>

{#await getSheetData()}
    <div>Loading</div>
{:then sheet_data}
    <Tabs {tabs} {sheet_data} />
{:catch error}
    <Form class="flex flex-column items-start justify-center">
        <h1>{error}</h1>

        <button class="reset-button" type="submit" {onclick}>Reset Data</button>
    </Form>
{/await}

<style lang="postcss">
    @import "tailwindcss/theme" theme(reference);
    .reset-button {
        @apply max-w-fit w-full py-4 px-6 text-xl;
        @apply my-6 mx-auto cursor-pointer;
        @apply bg-amber-400 border-2 rounded-md shadow-lg text-gray-800 border-transparent transition-all;

        @variant hover {
            @apply bg-white border-amber-400 text-amber-400;
        }
    }
</style>
