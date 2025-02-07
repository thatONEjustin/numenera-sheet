<script lang="ts">
    import TextInputField from "@components/ui/forms/fields/TextInputField.svelte";
    import { isEmptyObject } from "@components/utils";
    Object;

    let { skill = $bindable({}), ...input } = $props();

    let { id: raw_id, name: raw_name } = input;

    let id = $derived.by(() => {
        return raw_id != "" ? raw_id : name;
    });

    // HACK: this is *just* a placeholder while I'm working out logic
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
        return isEmptyObject(skill);
    });

    import { sheet_data } from "@components/data.svelte";

    let tags_array = $derived.by(() => {
        if (isEmptyObject(sheet_data.skills)) return [];

        return sheet_data.skills.split(",");
    });
</script>

<div class="character-skill">
    <div class:hidden={!is_new}>
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
    {#if !is_new && !isEmptyObject(skill)}
        <!-- content here -->
        <div>
            <h4>{skill.name}</h4>
            <p>{skill.description}</p>
            {#each tags_array as tag}
                <small>{tag}</small>
            {/each}
        </div>
    {/if}
</div>
