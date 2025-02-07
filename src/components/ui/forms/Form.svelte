<script lang="ts">
    import type { Form as FormProps } from "@components/types.d";

    import LZString from "lz-string";
    import { storageAvailable, getSheetData } from "@components/utils";
    import { sheet_data } from "@game/data.svelte";

    let { children, class: className }: FormProps = $props();

    let form: HTMLFormElement | undefined = $state() as
        | HTMLFormElement
        | undefined;

    async function onsubmit(event: SubmitEvent) {
        event.preventDefault();

        const form_data = new FormData(form);
        let json_data: any = sheet_data;
        // console.log("sheet_data", $state.snapshot(sheet_data));
        console.log("json_data", $state.snapshot(json_data));

        form_data.forEach(function (value: FormDataEntryValue, key: string) {
            if (key.includes("_") == false) {
                return;
            }

            const [category_key, field_key] = key.split("_");
            json_data[category_key] = {
                ...json_data[category_key],
                [field_key]: value,
            };
        });

        if (storageAvailable("localStorage") == false) return;

        localStorage.setItem(
            "sheetData",
            LZString.compressToEncodedURIComponent(JSON.stringify(json_data)),
        );
    }
</script>

<form class={className} action="/" method="POST" {onsubmit} bind:this={form}>
    {@render children?.()}
</form>
