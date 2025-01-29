<script lang="ts">
    import LZString from "lz-string";
    import { storageAvailable } from "@js/utils";

    import Form from "@forms/Form.svelte";
    import SubmitButton from "@forms/fields/SubmitButton.svelte";

    import PlayerInfo from "@game/sheet-sections/PlayerInfo.svelte";
    import CharacterDescription from "@game/sheet-sections/CharacterDescription.svelte";
    import CharacterStats from "@game/sheet-sections/CharacterStats.svelte";
    import CharacterClass from "@game/sheet-sections/CharacterClass.svelte";

    let sheet_data: any = $state({});

    function get_data_string(local_storage_key: string): any {
        if (
            storageAvailable("localStorage") == false ||
            localStorage.getItem(local_storage_key) == null
        ) {
            return "";
        }

        return localStorage.getItem(local_storage_key);
    }

    const data_string = get_data_string("sheetData");

    if (data_string != "") {
        let decompress: any =
            LZString.decompressFromEncodedURIComponent(data_string);
        sheet_data = JSON.parse(decompress);
    }

    let hide_name_generator: boolean = $state(true);

    function is_name_fancy(): boolean {
        if (
            sheet_data.character.name != "" &&
            sheet_data.characterClass.descriptor != "" &&
            sheet_data.characterClass.type != "" &&
            sheet_data.characterClass.focus != ""
        ) {
            return true;
        }

        return false;
    }

    function show_name_generator(event: Event) {
        event.preventDefault();
        hide_name_generator = !hide_name_generator;
    }
</script>

<Form>
    <!-- TODO: while this works and is cool, there is no way to reset it or show the other data -->
    {#if is_name_fancy() == true}
        <div class="flex flex-row content-between">
            <h2>
                {sheet_data.character.name} the {sheet_data.characterClass
                    .descriptor}
                {sheet_data.characterClass.type}, who {sheet_data.characterClass
                    .focus}
            </h2>
            <button
                type="button"
                class="ml-auto"
                aria-labelledby="reset_name"
                onclick={show_name_generator}
            >
                <i aria-label="reset_name" class="nf nf-fa-close"></i>
            </button>
        </div>
    {/if}

    {#if hide_name_generator == false}
        <div class="grid grid-cols-2 gap-x-6">
            <PlayerInfo {sheet_data} />
            <CharacterClass {sheet_data} />
        </div>
    {/if}

    <CharacterDescription {sheet_data} />

    <div class="grid grid-cols-2 gap-x-6">
        <CharacterStats {sheet_data} />
    </div>

    <SubmitButton />
</Form>

<style lang="postcss">
    @import "tailwindcss/theme" theme(reference);
</style>
