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

<!--
<Form>
    {#if hide_name_generator == false}
        <div class="grid grid-cols-2 gap-x-6">
            <PlayerInfo {sheet_data} />
            <CharacterClass {sheet_data} />
        </div>
    {:else}
        <div class="flex flex-row content-between py-10">
            <FancyName {sheet_data} />
            <button
                type="button"
                class="ml-auto cursor-pointer"
                aria-labelledby="reset_name"
                onclick={show_name_generator}
            >
                <i aria-label="reset_name" class="nf nf-fa-close"></i>
            </button>
        </div>
    {/if}

    <CharacterDescription {sheet_data} />

    <div class="grid grid-cols-2 gap-x-6">
        <CharacterStats {sheet_data} />
    </div>

    <SubmitButton />
</Form>
    -->

<style lang="postcss">
    @import "tailwindcss/theme" theme(reference);
</style>
