<script lang="ts">
    import type { Tab } from "@components/types.d";

    import Tabs from "@ui/Tabs.svelte";
    import CharacterSheet from "@game/CharacterSheet.svelte";
    import Combat from "@game/Combat.svelte";

    import LZString from "lz-string";
    import { storageAvailable } from "@js/utils";
    import { setContext } from "svelte";

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

    // function is_name_fancy(): boolean {
    //     if (
    //         sheet_data.character.name != "" &&
    //         sheet_data.characterClass.descriptor != "" &&
    //         sheet_data.characterClass.type != "" &&
    //         sheet_data.characterClass.focus != ""
    //     ) {
    //         return true;
    //     }
    //
    //     return false;
    // }

    // function show_name_generator(event: Event) {
    //     hide_name_generator = !hide_name_generator;
    //     event.preventDefault();
    // }

    let hide_name_generator: boolean = $state(false);

    const data_string = get_data_string("sheetData");

    if (data_string != "") {
        let decompress: any =
            LZString.decompressFromEncodedURIComponent(data_string);
        sheet_data = JSON.parse(decompress);

        // if (is_name_fancy()) {
        //     hide_name_generator = true;
        // }
    }

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

<Tabs {tabs} sheetData={sheet_data} />
