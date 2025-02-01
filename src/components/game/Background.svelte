<script lang="ts">
    import type { SheetSection } from "@components/types";
    import Form from "@components/ui/forms/Form.svelte";

    import CharacterDescription from "@game/sheet-sections/CharacterDescription.svelte";

    let { sheet_data }: SheetSection = $props();
</script>

<Form>
    <CharacterDescription class="py-6" {sheet_data} />
</Form>
