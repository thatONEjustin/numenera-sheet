<script lang="ts">
    import type { SheetSection as SheetProps } from "@components/types.d";
    import SheetSection from "@game/sheet-sections/SheetSection.svelte";
    import PlayerInfo from "@game/sheet-sections/PlayerInfo.svelte";
    import CharacterClass from "@game/sheet-sections/CharacterClass.svelte";
    import { slide } from "svelte/transition";

    import { sheet_data } from "@game/data.svelte";

    import {
        character_type_options,
        character_descriptor_options,
        character_focus_options,
    } from "@game/data.svelte";

    const { class: className }: SheetProps = $props();

    let show_fancy_name = $state(false);
    $effect(() => {
        if (
            "character" in sheet_data == false ||
            "characterClass" in sheet_data == false
        ) {
            show_fancy_name = false;
            return;
        }

        const status =
            sheet_data.character.name != undefined &&
            sheet_data.characterClass.descriptor != undefined &&
            sheet_data.characterClass.type != undefined &&
            sheet_data.characterClass.focus != undefined;
        show_fancy_name = status;
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
        class="flex flex-col md:flex-row justify-between"
        transition:slide
    >
        <PlayerInfo class="w-full md:mr-2" />
        <CharacterClass class="max-w-full md:max-w-fit w-full" />
    </div>
{/snippet}

{#await sheet_data then sheet_data}
    <SheetSection name="fancy-name" class={className}>
        {#if show_fancy_name}
            {@const descriptor = sheet_data.characterClass?.descriptor}
            {@const focus = sheet_data.characterClass?.focus}
            {@const type = sheet_data.characterClass?.type}
            <div class="py-10 flex flex-row items-start" transition:slide>
                <h1 class="text-5xl">
                    {sheet_data.character?.name} a {clean_label(
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
                    onclick={() => (show_fancy_name = false)}
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
