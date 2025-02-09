<script lang="ts">
    import type { Form as FormProps } from "@components/types.d";
    import LZString from "lz-string";

    import { storageAvailable } from "@components/utils";
    import { sheet_data } from "@game/data.svelte";

    let { children, class: className }: FormProps = $props();

    let form: HTMLFormElement | undefined = $state() as
        | HTMLFormElement
        | undefined;

    async function onsubmit(event: SubmitEvent) {
        event.preventDefault();
    }

    $effect(() => {
        // if (isEmptyObject(sheet_data)) return;
        // console.log(isEmptyObject(sheet_data));
        // console.log($state.snapshot(sheet_data));
        if (storageAvailable("localStorage") == false) return;

        localStorage.setItem(
            "sheetData",
            LZString.compressToEncodedURIComponent(JSON.stringify(sheet_data)),
        );
    });
</script>

<form class={className} action="/" method="POST" {onsubmit} bind:this={form}>
    {@render children?.()}
</form>
