<script lang="ts">
    import type { Form as FormProps } from "@components/types.d";

    import LZString from "lz-string";
    import { getSheetData, storageAvailable } from "@components/utils";
    import { sheet_data } from "@components/data.svelte";

    let { children, class: className }: FormProps = $props();

    let form: HTMLFormElement | undefined = $state() as
        | HTMLFormElement
        | undefined;

    function get_diffs(obj1: any, data: any) {
        var result: any = {};
        var keys = Object.keys(obj1);

        for (var key in data) {
            if (!keys.includes(key)) {
                result[key] = data[key];
            }
        }
        return result;
    }

    async function onsubmit(event: SubmitEvent) {
        event.preventDefault();
        // console.log("maybe just get rid of this entirely");

        const form_data = new FormData(form);

        console.log("sheet_data", $state.snapshot(sheet_data));

        form_data.forEach(function (value: FormDataEntryValue, key: string) {
            if (key.includes("_") == false) {
                return;
            }

            const [category_key, field_key] = key.split("_");
            sheet_data[category_key] = {
                ...sheet_data[category_key],
                [field_key]: value,
            };
        });

        if (storageAvailable("localStorage") == false) return;

        console.log("form_data", $state.snapshot(sheet_data));

        localStorage.setItem(
            "sheetData",
            LZString.compressToEncodedURIComponent(JSON.stringify(sheet_data)),
        );
    }
</script>

<form class={className} action="/" method="POST" {onsubmit} bind:this={form}>
    {@render children?.()}
</form>
