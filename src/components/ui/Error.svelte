<script lang="ts">
    import Form from "@ui/forms/Form.svelte";

    let { error } = $props();

    function onclick(_event: Event) {
        if (localStorage.getItem("sheetData")) {
            localStorage.removeItem("sheetData");
        }
    }
</script>

<Form class="flex flex-column items-start justify-center">
    <h1>{error}</h1>

    <button class="reset-button" type="submit" {onclick}>Reset Data</button>
</Form>

<style lang="postcss">
    @import "tailwindcss/theme" theme(reference);
    .reset-button {
        @apply max-w-fit w-full py-4 px-6 text-xl;
        @apply my-6 mx-auto cursor-pointer;
        @apply bg-amber-400 border-2 rounded-md shadow-lg text-gray-800 border-transparent transition-all;

        @variant hover {
            @apply bg-white border-amber-400 text-amber-400;
        }
    }
</style>
