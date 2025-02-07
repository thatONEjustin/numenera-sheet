<script lang="ts">
    import type { SheetSection as SheetProps } from "@components/types.d";
    import SheetSection from "@game/sheet-sections/SheetSection.svelte";
    import PlayerInfo from "@game/sheet-sections/PlayerInfo.svelte";
    import CharacterClass from "@game/sheet-sections/CharacterClass.svelte";
    import { slide } from "svelte/transition";

    import { sheet_data } from "@components/data.svelte";

    import {
        character_type_options,
        character_descriptor_options,
        character_focus_options,
    } from "../mechanics/data";

    const { class: className }: SheetProps = $props();

    let hide_name_generator = $state();

    $effect(() => {
        const status =
            sheet_data.character.name == undefined &&
            sheet_data.characterClass.descriptor == undefined &&
            sheet_data.characterClass.type == undefined &&
            sheet_data.characterClass.focus == undefined;

        hide_name_generator = status;
    });

    function clean_label(key: string, options: any): string {
        const option = options.filter((option: any) => option?.value == key);

        if (option.length == 0) {
            return "";
        }

        const { value, label } = option[0];

        if (label != "" && label != undefined) {
            return label;
        }

        return value.charAt(0).toUpperCase() + value.slice(1);
    }
</script>

{#snippet userInputs(hidden: boolean = false)}
    <div
        class:hidden
        class="grid grid-cols-1 md:grid-cols-12 gap-x-6"
        transition:slide
    >
        <PlayerInfo class="col-span-5" />
        <CharacterClass class="col-span-7" />
    </div>
{/snippet}

{#await sheet_data then sheet_data}
    <SheetSection name="fancy-name" class={className}>
        {#if !hide_name_generator}
            {@const descriptor = sheet_data.characterClass?.descriptor}
            {@const focus = sheet_data.characterClass?.focus}
            {@const type = sheet_data.characterClass?.type}
            <div class="py-10 flex flex-row items-start" transition:slide>
                <h1 class="text-5xl">
                    {sheet_data.character.name} a {clean_label(
                        descriptor,
                        character_descriptor_options,
                    )}
                    {clean_label(type, character_type_options)}, who {clean_label(
                        focus,
                        character_focus_options,
                    )}
                </h1>
                <button
                    type="button"
                    class="edit-button"
                    aria-labelledby="reset_name"
                    onclick={() => (hide_name_generator = true)}
                >
                    edit
                    <i aria-label="reset_name" class="nf nf-fa-pencil"></i>
                </button>
            </div>

            {@render userInputs(true)}
        {:else}
            {@render userInputs()}
        {/if}
    </SheetSection>
{/await}

<style lang="postcss">
    @import "tailwindcss/theme" theme(reference);
    .edit-button {
        @apply rounded-md
            ml-auto
            my-auto
            cursor-pointer 
            flex
            flex-row
            items-center
            justify-center
            bg-red-400
            border-2
            border-red-400
            text-white
            max-h-max
            px-2
            py-1
            text-sm
            opacity-35
            transition-all;

        > i.nf {
            @apply ml-2;
        }

        &:hover {
            @apply bg-white text-red-400 opacity-100;
        }
    }
</style>
