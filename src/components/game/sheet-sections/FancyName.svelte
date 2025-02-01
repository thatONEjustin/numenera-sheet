<script lang="ts">
    import type { SheetSection as SheetProps } from "@components/types.d";
    import SheetSection from "@game/sheet-sections/SheetSection.svelte";
    import PlayerInfo from "@game/sheet-sections/PlayerInfo.svelte";
    import CharacterClass from "@game/sheet-sections/CharacterClass.svelte";

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

<SheetSection name="fancy-name" class={className}>
    {#if has_fancy_name()}
        <!-- content here -->
        <div class="flex flex-row content-between py-10">
            <h1 class="text-5xl">
                {sheet_data.character.name} the {sheet_data.characterClass
                    .descriptor}
                {sheet_data.characterClass.type}, who {sheet_data.characterClass
                    .focus}
            </h1>
            <button
                type="button"
                class="ml-auto cursor-pointer"
                aria-labelledby="reset_name"
                onclick={show_name_generator}
            >
                <i aria-label="reset_name" class="nf nf-fa-close"></i>
            </button>
        </div>
    {/if}

    <div
        class:hidden={has_fancy_name() == true}
        class="grid grid-cols-1 md:grid-cols-2 gap-x-6"
    >
        <PlayerInfo {sheet_data} />
        <CharacterClass {sheet_data} />
    </div>
</SheetSection>
