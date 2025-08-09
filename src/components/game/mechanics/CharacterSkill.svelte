<script lang="ts" generics="BaseInputTypes extends 'input' | 'textarea'">
    import type {
        JustinTextInput,
        SvelteHTMLElements,
    } from "@components/types.d";

    type TextInput = SvelteHTMLElements[BaseInputTypes] & JustinTextInput;

    import { isEmptyObject } from "@components/utils";
    import { sheet_data, skills } from "@game/data.svelte";
    import { marked } from "marked";

    let {
        skill = $bindable({
            name: "",
            description: "",
            tags: "",
        }),
        is_new = $bindable(true),
        placeholders = $bindable({
            name: "",
            description:
                "So there's no great way to do skills without literally building a dice roller app, so the best we can do is just copy and paste from the rulebook and keep track of things in notes/tags",
            tags: "comma, separated, lists!",
        }),
    } = $props();

    let editing = $state(false);

    let name_input: HTMLInputElement = $state() as HTMLInputElement;
    let desc_input: HTMLTextAreaElement = $state() as HTMLTextAreaElement;
    let tags_input: HTMLInputElement = $state() as HTMLInputElement;

    let skill_description = $derived.by(() => {
        return marked.parse(skill?.description);
    });

    let tags_array = $derived.by(() => {
        if (isEmptyObject(skill)) {
            return [];
        }

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

        skill.name = name_input.value;
        skill.description = desc_input.value;

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
            is_new = true;
            skill = {
                name: "",
                description: "",
                tags: "",
            };
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

    function startEditing(event: Event) {
        event.preventDefault();
        editing = true;
    }

    // $effect(() => console.log(`is_new: ${is_new}, is_editing: ${editing}`));
</script>

{#snippet input_fields(hide: boolean = false)}
    {#key skill}
        <div
            class={["character-skill-form", hide ? "!hidden" : ""]}
            class:hidden={hide}
        >
            <div class="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                <div class="character-skill-input">
                    <label
                        for="skill-name{skill?.name
                            .replaceAll(' ', '')
                            .toLowerCase()}">Name:</label
                    >
                    <input
                        class="character-skill-field"
                        type="text"
                        id="skill-name{skill?.name
                            .replaceAll(' ', '')
                            .toLowerCase()}"
                        value={skill?.name}
                        bind:this={name_input}
                        placeholder={placeholders.name}
                    />
                </div>
                <div class="character-skill-input">
                    <label
                        for="skill-tags{skill?.name
                            .replaceAll(' ', '')
                            .toLowerCase()}"
                    >
                        Tags:
                    </label>

                    <input
                        class="character-skill-field"
                        id="skill-tags{skill?.name
                            .replaceAll(' ', '')
                            .toLowerCase()}"
                        type="text"
                        value={skill?.tags}
                        bind:this={tags_input}
                        placeholder={placeholders.tags}
                    />
                </div>
            </div>

            <div class="character-skill-input">
                <label
                    for="skill-description{skill?.description
                        .replaceAll(' ', '')
                        .toLowerCase()}"
                >
                    Description:
                </label>
                <textarea
                    class="character-skill-field"
                    id="skill-description{skill?.description
                        .replaceAll(' ', '')
                        .toLowerCase()}"
                    bind:this={desc_input}
                    placeholder={placeholders.description}
                    >{skill?.description}</textarea
                >
            </div>

            {#if is_new || editing}
                <div class="flex flex-row items-start">
                    <button
                        type="button"
                        onclick={save_skill}
                        class="self-start px-3 py-2 transition-all border-2 bg-emerald-500 border-transparent rounded-md text-white hover:border-emerald-500 hover:text-emerald-500 hover:bg-transparent mr-6"
                    >
                        save
                    </button>

                    {#if is_new == false}
                        <button
                            type="submit"
                            onclick={delete_skill}
                            class="self-start underline text-rose-600 py-2"
                            >delete</button
                        >
                    {/if}
                </div>
            {/if}
        </div>
    {/key}
{/snippet}
<div class="character-skill">
    {#key is_new}
        {#if !is_new && !editing}
            <div class="character-skill-display">
                <div
                    class="flex flex-row items-center justify-between border-b border-gray-400"
                >
                    <h4>{skill.name}</h4>
                    <div>
                        {#each tags_array as tag}
                            <small>{tag}</small>
                        {/each}
                    </div>
                </div>
                <div>{@html skill_description}</div>

                <button
                    type="button"
                    onclick={startEditing}
                    class="bg-amber-500 rounded-md px-3 py-2 border-2 border-amber-500 hover:bg-transparent transition-all hover:text-amber-500"
                    >edit</button
                >
            </div>

            {@render input_fields(true)}
        {:else}
            {@render input_fields()}
        {/if}
    {/key}
</div>

<style lang="postcss">
    @import "tailwindcss/theme" theme(reference);

    .character-skill-form {
        @apply flex flex-col;
    }

    .character-skill-input {
        @apply flex
                flex-col
                items-start
                my-3;

        > label {
            @apply pb-1
                    mb-3
                    w-full;
        }

        > input,
        > textarea {
            @apply text-black
                rounded-md
                p-3
                border
                border-gray-300
                text-left
                transition-all
                w-full;
        }
    }

    .character-skill-display {
        h4 {
            @apply text-3xl mt-4 mb-2 pb-1;
        }

        p {
            @apply text-xl my-2;
        }

        small {
            @apply text-xs rounded-md bg-emerald-600 text-white px-2 py-1;
            @apply mr-1 last:mr-0;
        }
    }
</style>
