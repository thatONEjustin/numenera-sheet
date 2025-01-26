<script lang="ts">
    import type { Snippet } from "svelte";

    import LZString from "lz-string";
    import { storageAvailable } from "@js/utils";

    type FormProps = {
        data_string?: string;
        children?: Snippet;
        active?: any;
    };

    let {
        data_string = "",
        children,
        active = $bindable(1),
    }: FormProps = $props();

    let form: HTMLFormElement | undefined;

    function onsubmit(event: SubmitEvent) {
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

<form method="POST" action="/" {onsubmit} bind:this={form}>
    {#if children}
        {@render children?.()}
    {/if}
</form>
