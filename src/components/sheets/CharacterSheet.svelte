<script lang="ts">
    import LZString from "lz-string";

    import Form from "@forms/Form.svelte";
    import SubmitButton from "@forms/fields/SubmitButton.svelte";

    import PlayerInfo from "@sheets/sections/PlayerInfo.svelte";

    import { storageAvailable } from "@js/utils";
    import CharacterBasicInfo from "./sections/CharacterBasicInfo.svelte";

    let sheet_data: object = {};

    /*
    if (
        storageAvailable("localStorage") == true &&
        localStorage.getItem("sheetData")
    ) {
        data_string = localStorage.getItem("sheetData");
    }

    if (data_string != "" && data_string != null) {
        let decompress: any =
            LZString.decompressFromEncodedURIComponent(data_string);
        sheet_data = JSON.parse(decompress);
        let { character, player } = sheet_data;
    }
    */

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
</script>

<Form>
    <header>
        <h2>Character Sheet</h2>
    </header>

    <PlayerInfo {sheet_data} />
    <CharacterBasicInfo {sheet_data} />

    <SubmitButton />
</Form>

<style lang="postcss">
    @import "tailwindcss/theme" theme(reference);
</style>
