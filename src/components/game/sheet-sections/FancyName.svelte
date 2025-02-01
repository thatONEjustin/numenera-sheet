<script lang="ts">
    import type { SheetSection as SheetProps } from "@components/types.d";
    import SheetSection from "@game/sheet-sections/SheetSection.svelte";
    import PlayerInfo from "@game/sheet-sections/PlayerInfo.svelte";
    import CharacterClass from "@game/sheet-sections/CharacterClass.svelte";
    import { fly, slide } from "svelte/transition";

    const { class: className, sheet_data }: SheetProps = $props();

    const is_fancy = $derived.by(() => {
        const check_sheet = Object.keys(sheet_data).filter((key) => {
            return key == "character" || key == "characterClass";
        });

        if (check_sheet.length != 2) {
            return false;
        }

        return (
            sheet_data.character.name != "" &&
            sheet_data.characterClass.descriptor != "" &&
            sheet_data.characterClass.type != "" &&
            sheet_data.characterClass.focus != ""
        );
    });

    let hide_name_generator = $state(false);

    function show_name_generator(_: Event) {
        hide_name_generator = !hide_name_generator;
    }

    function has_fancy_name(): boolean {
        if (is_fancy && !hide_name_generator) {
            return true;
        }

        return false;
    }
</script>

{#snippet userInputs(hidden: boolean = false)}
    <div
        class:hidden
        class="grid grid-cols-1 md:grid-cols-2 gap-x-6"
        transition:slide
    >
        <PlayerInfo {sheet_data} />
        <CharacterClass {sheet_data} />
    </div>
{/snippet}

<SheetSection name="fancy-name" class={className}>
    {#if has_fancy_name()}
        <div class="py-10 flex flex-row items-start" transition:slide>
            <h1 class="text-5xl">
                {sheet_data.character.name} the {sheet_data.characterClass
                    .descriptor}
                {sheet_data.characterClass.type}, who {sheet_data.characterClass
                    .focus}
            </h1>
            <button
                type="button"
                class="edit-button"
                aria-labelledby="reset_name"
                onclick={show_name_generator}
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
