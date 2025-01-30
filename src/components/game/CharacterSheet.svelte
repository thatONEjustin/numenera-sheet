<script lang="ts">
    import { getSheetData } from "@js/utils";

    import Form from "@forms/Form.svelte";
    import SubmitButton from "@forms/fields/SubmitButton.svelte";

    import CharacterDescription from "@game/sheet-sections/CharacterDescription.svelte";
    import CharacterStats from "@game/sheet-sections/CharacterStats.svelte";
    import FancyName from "@game/sheet-sections/FancyName.svelte";
</script>

{#await getSheetData()}
    <p>Loading</p>
{:then sheet_data}
    <Form>
        <FancyName {sheet_data} />

        <CharacterDescription {sheet_data} />

        <div class="grid grid-cols-1 md:grid-cols-2 gap-x-6">
            <CharacterStats {sheet_data} />
        </div>

        <SubmitButton />
    </Form>
{:catch error}
    {@debug error}
{/await}

<style lang="postcss">
    @import "tailwindcss/theme" theme(reference);
</style>
