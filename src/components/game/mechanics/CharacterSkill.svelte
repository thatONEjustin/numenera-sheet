<script lang="ts">
    import TextInputField from "@components/ui/forms/fields/TextInputField.svelte";
    import { isEmptyObject } from "@components/utils";
    Object;

    let { skill = $bindable({}), ...input } = $props();

    let { id: raw_id, name: raw_name } = input;

    /*
    let id = $derived.by(() => {
        return raw_id != "" ? raw_id : name;
    });

    // HACK: this is *just* a placeholder while I'm working out logic
    let attribute_name = $derived.by(() => {
        return raw_name;
    });
    */

    let attribute_name = $derived.by(() => {
        return raw_name;
    });

    function skill_data_key_generator(
        key: string = "",
        modifier: string,
    ): string {
        return (
            "skill_" +
            key +
            modifier.charAt(0).toUpperCase() +
            modifier.slice(1)
        );
    }

    let is_new = $derived.by(() => {
        if (isEmptyObject(skill)) return true;

        if (skill.name == undefined || skill.tags.length == 0) {
            return true;
        }

        return false;
    });

    import { sheet_data } from "@game/data.svelte";

    let tags_array = $derived.by(() => {
        if (isEmptyObject(sheet_data.skills)) return [];

        return sheet_data.skills.split(",");
    });
</script>

{#snippet input_fields(hide: boolean = false)}
    <div class:hidden={hide}>
        <TextInputField
            name={skill_data_key_generator("", "name")}
            id={skill_data_key_generator("", "name")}
            value={skill?.name}
            type="text"
        />
        <TextInputField
            name={skill_data_key_generator(attribute_name, "description")}
            id={skill_data_key_generator(attribute_name, "description")}
            value={skill?.description}
            type="text"
        />

        <TextInputField
            name={skill_data_key_generator(attribute_name, "tags")}
            id={skill_data_key_generator(attribute_name, "tags")}
            value={skill?.tags}
            type="text"
        />
    </div>
{/snippet}
<div class="character-skill">
    {#if !is_new}
        <!-- content here -->
        <div>
            <h4>{skill.name}</h4>
            <p>{skill.description}</p>
            {#each tags_array as tag}
                <small>{tag}</small>
            {/each}

            {@render input_fields(true)}
        </div>
    {:else}
        {@render input_fields()}
    {/if}
</div>
