<script lang="ts">
    import type { Form as FormProps } from "@components/types.d";

    import LZString from "lz-string";
    import { getSheetData, storageAvailable } from "@components/utils";

    let { children, class: className }: FormProps = $props();

    let form: HTMLFormElement | undefined = $state() as
        | HTMLFormElement
        | undefined;

    async function onsubmit(_event: SubmitEvent) {
        const form_data = new FormData(form);
        let json_data: any = await getSheetData().then((data) => data);

        console.log(json_data);

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

<form class={className} action="/" {onsubmit} bind:this={form}>
    {@render children?.()}
</form>
