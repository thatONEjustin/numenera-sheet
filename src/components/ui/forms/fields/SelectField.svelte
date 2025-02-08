<script lang="ts" generics="BaseInputTypes extends 'select'">
    import type { SvelteHTMLElements, ClassValue } from "@components/types";
    import { clickOutside, updateSheetData } from "@components/utils";
    import { sheet_data } from "@components/game/data.svelte";
    import { slide } from "svelte/transition";

    type SelectOption = {
        label?: string;
        value: string;
    };

    type SelectField = {
        options: Array<SelectOption>;
        class?: ClassValue;
        active?: boolean;
        value?: string;
        label?: string;
    };

    type SelectProps = SvelteHTMLElements[BaseInputTypes] & SelectField;

    /*
    type SelectOption = {
        label?: string;
        value: string;
    };

    type SelectField = {
        options: Array<SelectOption>;
        class?: ClassValue;
        active?: boolean;
        value?: string;
    };

    type SelectField = HTMLSelectElement & HTMLOptionElement & JustinSelectField;
    */

    let {
        options,
        value = $bindable(""),
        class: className = "",
        active = $bindable(false),
        ...input
    }: SelectProps = $props();

    let { name, label, id } = input;
    let select_field;
    let options_element: any = $state() as HTMLDivElement;

    let filter_input: any = $state() as HTMLInputElement;
    let filter_value: string = $state("");

    let filtered_options = (input: string, options: any) => {
        if (input == "" || input.length < 2) {
            return options;
        }

        return options.filter((item: any) =>
            item?.value.includes(input.toLowerCase()),
        );
    };

    function hideList() {
        active = false;
    }

    // const [category_key, field_key] = name?.split("_");
    const category_key = $derived.by(() => {
        if (name == undefined) {
            return "";
        }

        return name.split("_")[0];
    });

    const field_key = $derived.by(() => {
        if (name == undefined) {
            return "";
        }

        return name.split("_")[1];
    });

    function select(option: string) {
        value = option;
        active = false;
        sheet_data[category_key] = updateSheetData(
            sheet_data,
            category_key,
            field_key,
            value,
        );
    }

    function formatLabel(
        option_value: string,
        option_label: string | undefined,
    ) {
        if (option_label == undefined) {
            return option_value.charAt(0).toUpperCase() + option_value.slice(1);
        }

        return option_label;
    }
</script>

<div class={["select-field", className]}>
    <label for={name}>{label}</label>

    <div class="select-container">
        <input
            type="text"
            name="ignore"
            bind:this={filter_input}
            bind:value={filter_value}
            onclick={(event) => {
                if (active) return;
                active = !active;
                event.preventDefault();
            }}
            class={["select-filter", !active ? "cursor-pointer" : ""]}
            placeholder={value == ""
                ? "Choose"
                : formatLabel(
                      value,
                      options.filter((option) => value == option.value)[0]
                          .label,
                  )}
        />

        {#if active && filtered_options(filter_value, options).length}
            <div
                class="select-options"
                transition:slide
                bind:this={options_element}
            >
                {#each filtered_options(filter_value, options) as option}
                    <button
                        class="select-option"
                        onclick={(event: Event) => {
                            event.preventDefault();
                            select(option.value);
                        }}
                        transition:slide
                        use:clickOutside
                        onClickOutside={hideList}
                    >
                        {formatLabel(option.value, option.label)}
                    </button>
                {/each}
            </div>
        {/if}
    </div>

    <select class="hidden" {name} {id} bind:value bind:this={select_field}>
        {#each options as option}
            {@const label = formatLabel(option.value, option.label)}
            <option value={option.value}>
                {label}
            </option>
        {/each}
    </select>
</div>

<style lang="postcss">
    @import "tailwindcss/theme" theme(reference);

    .select-field {
        @apply flex
            flex-col
            my-3;

        > label {
            @apply pb-1
                mb-3
                text-left;
        }
    }

    .select-filter {
        &::placeholder {
            @apply text-black;
        }
    }

    .select-container {
        @apply border 
            rounded-md
            relative
            flex-1;

        > input {
            @apply px-4
                py-3
                border-gray-400
                rounded-md
                w-full
                max-w-fit;
        }
    }
    .select-options {
        @apply absolute
            flex
            flex-col
            bg-white
            text-left
            rounded-md
            border 
            border-gray-400
            max-w-max
            w-full
            z-20
            left-0
            top-full
            translate-y-2
            max-h-56
            overflow-y-scroll;
    }

    .select-option {
        @apply px-3
            py-3
            cursor-pointer
            text-left
            break-words;
    }

    .select-option.hidden {
        @apply !hidden;
    }
</style>
