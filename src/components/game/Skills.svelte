<script lang="ts">
    import type { SheetSection } from "@components/types";
    import Form from "@components/ui/forms/Form.svelte";
    import SubmitButton from "@components/ui/forms/fields/SubmitButton.svelte";

    import CharacterSkills from "@game/sheet-sections/CharacterSkills.svelte";
</script>

<Form>
    <CharacterSkills class="py-6" />

    <SubmitButton />
</Form>
