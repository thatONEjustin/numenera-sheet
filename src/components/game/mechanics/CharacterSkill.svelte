<script lang="ts" generics="BaseInputTypes extends 'input' | 'textarea'">
    import type {
        JustinTextInput,
        SvelteHTMLElements,
    } from "@components/types.d";
    type TextInput = SvelteHTMLElements[BaseInputTypes] & JustinTextInput;

    import { isEmptyObject } from "@components/utils";
    import { sheet_data, skills } from "@game/data.svelte";

    let {
        skill = $bindable({
            name: "",
            description: "",
            tags: "",
        }),
        is_new = $bindable(true),
    } = $props();

    let editing = $state(false);

    let tags_array = $derived.by(() => {
        if (isEmptyObject(skill)) return [];

        if (skill.tags == undefined) {
            return [];
        }

        return skill.tags;
    });

    let is_saveable = $derived.by(() => {
        return (
            name_input.value != "" &&
            desc_input.value != "" &&
            tags_input.value != ""
        );
    });

    function save_skill() {
        if (!is_saveable) {
            return;
        }

        if (name_input.value != "") {
            skill.name = name_input.value;
        }

        if (desc_input.value != "") {
            skill.description = desc_input.value;
        }

        if (tags_input.value != "") {
            if (tags_input.value.includes(",")) {
                let array = tags_input.value.split(",");
                skill.tags = array;
            } else {
                skill.tags = [tags_input.value];
            }
        }

        if (is_new && !editing) {
            skills.push(skill);

            if (sheet_data["skills"] == undefined) {
                sheet_data["skills"] = skills;
                return;
            }

            sheet_data["skills"] = skills;
        } else {
            let editing_copy = skills;

            editing_copy = editing_copy.filter((skill_ref: any) => {
                return (
                    skill_ref.name != skill.name &&
                    skill_ref.description != skill.description &&
                    skill_ref.tags != skill.tags
                );
            });

            editing_copy.push(skill);

            sheet_data["skills"] = editing_copy;

            editing = false;
            is_new = false;
        }
    }

    function delete_skill() {
        let deleted_skill_copy = skills;

        deleted_skill_copy = deleted_skill_copy.filter((skill_ref: any) => {
            return (
                skill_ref.name != skill.name &&
                skill_ref.description != skill.description &&
                skill_ref.tags != skill.tags
            );
        });

        sheet_data["skills"] = deleted_skill_copy;

        editing = false;
    }

    let name_input: HTMLInputElement = $state() as HTMLInputElement;
    let desc_input: HTMLInputElement = $state() as HTMLInputElement;
    let tags_input: HTMLInputElement = $state() as HTMLInputElement;

    function startEditing(event: Event) {
        event.preventDefault();
        editing = true;
    }

    $effect(() => {
        console.log(`editing: ${editing}, is_new: ${is_new}`);
    });
</script>

{#snippet input_fields(hide: boolean = false)}
    {#key skill}
        <div class:hidden={hide}>
            <label>
                Name:
                <input type="text" value={skill?.name} bind:this={name_input} />
            </label>

            <label>
                Description:
                <input
                    type="text"
                    value={skill?.description}
                    bind:this={desc_input}
                />
            </label>

            <label>
                Tags:
                <input type="text" value={skill?.tags} bind:this={tags_input} />
            </label>

            {#if is_new || editing}
                <button type="button" onclick={save_skill}> save </button>

                <!-- {#if is_new == false}
                    <button type="button" onclick={delete_skill}>delete</button>
                {/if} -->
            {/if}
        </div>
    {/key}
{/snippet}
<div class="character-skill">
    {#key is_new}
        {#if !is_new && !editing}
            <div>
                <h4>{skill.name}</h4>
                <p>{skill.description}</p>
                {#each tags_array as tag}
                    <small>{tag}</small>
                {/each}

                <button type="button" onclick={startEditing}> edit </button>

                {@render input_fields(true)}
            </div>
        {:else}
            {@render input_fields()}
        {/if}
    {/key}
</div>

<style lang="postcss">
    @import "tailwindcss/theme" theme(reference);

    input {
        @apply border border-black rounded-md;
    }
</style>
