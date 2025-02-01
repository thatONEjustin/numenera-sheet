<script lang="ts">
    import type { Form as FormProps } from "@components/types.d";

    import LZString from "lz-string";
    import { storageAvailable } from "@components/utils";

    let { children }: FormProps = $props();

    let form: HTMLFormElement | undefined;

    function onsubmit(_: SubmitEvent) {
        let form_data = new FormData(form);
        let json_data: any = {};

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

<form action="/" {onsubmit} bind:this={form}>
    {@render children?.()}
</form>
