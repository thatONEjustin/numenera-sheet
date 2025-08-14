<script lang="ts">
    import Form from "@ui/forms/Form.svelte";
    import TextInputField from "@forms/fields/TextInputField.svelte";
    import LZString from "lz-string";

    import { sheet_data } from "@game/data.svelte";
    let { character_data = "" } = $props();

    function import_data(event: Event) {
        event.preventDefault();
        console.log(character_data);

        if (character_data == "") {
            return;
        }
        localStorage.setItem("sheetData", character_data);
    }

    const backup_string = $derived.by(() => {
        return LZString.compressToEncodedURIComponent(
            JSON.stringify(sheet_data),
        );
    });

    let backup_field = $state();

    function copy_string() {
        // document.getElementById("fancy_string")?.select();
        const data_string_field = document.getElementById(
            "fancy_string",
        ) as HTMLTextAreaElement;

        data_string_field.select();
        navigator.clipboard.writeText(data_string_field.value);
    }
</script>

<Form class="glow bg-cyan-600/90 p-4 rounded-2xl">
    <h1>Character sheet Data</h1>

    {#key backup_string}
        <div
            onclick={copy_string}
            role="button"
            onkeypress={copy_string}
            tabindex="0"
        >
            <TextInputField
                disabled
                type="textarea"
                inputClass="h-max min-h-max"
                label="Fancy String"
                name="fancy_string"
                id="fancy_string"
                rows={10}
                value={character_data ? character_data : backup_string}
            />
        </div>
        <!-- <div onclick={copy_string} role="button">
        </div> -->
    {/key}

    <h3>or</h3>

    <button type="button" onclick={import_data}>Import Data</button>
</Form>

<style lang="postcss">
    @import "tailwindcss/theme" theme(reference);

    button {
        @apply max-w-fit w-full py-4 px-6 text-xl;
        @apply my-6 mx-auto cursor-pointer;
        @apply bg-amber-400 border-2 rounded-md shadow-lg text-gray-800 border-transparent transition-all;

        @variant hover {
            @apply bg-white border-amber-400 text-amber-400;
        }
    }
</style>
