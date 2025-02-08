<script lang="ts">
    import Form from "@ui/forms/Form.svelte";

    let { error } = $props();

    function onclick(event: Event) {
        if (localStorage.getItem("sheetData")) {
            localStorage.removeItem("sheetData");
        }
    }
</script>

<Form class="flex flex-column items-start justify-center">
    <h1>{error}</h1>

    <button class="reset-button" type="submit" {onclick}>Reset Data</button>
</Form>
