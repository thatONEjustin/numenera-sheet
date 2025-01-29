<script lang="ts">
    let { sheet_data } = $props();
</script>

<h1 class="text-5xl">
    {sheet_data.character.name} the {sheet_data.characterClass.descriptor}
    {sheet_data.characterClass.type}, who {sheet_data.characterClass.focus}
</h1>
