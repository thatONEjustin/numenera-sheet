<script lang="ts">
    // import type { SheetSection } from "@components/types";
    import Form from "@components/ui/forms/Form.svelte";
    import SubmitButton from "@components/ui/forms/fields/SubmitButton.svelte";

    import CharacterDescription from "@game/sheet-sections/CharacterDescription.svelte";
</script>

<Form>
    <CharacterDescription class="py-6" />

    <SubmitButton />
</Form>
