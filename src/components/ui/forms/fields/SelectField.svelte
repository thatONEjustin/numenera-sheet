<script lang="ts" generics="BaseInputTypes extends 'select'">
    import type { SvelteHTMLElements, ClassValue } from "@components/types";
    import { clickOutside } from "@components/utils";
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
    };

    type _SelectProps = SvelteHTMLElements[BaseInputTypes] & SelectField;

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
    } = $props();

    let { name, label, id } = input;
    let select_field;

    function showList(event: Event) {
        active = !active;
        event.preventDefault();
    }

    function select(option: string) {
        value = option;
        active = false;
    }

    function formatLabel(option_value: string, option_label: string) {
        if (option_label == undefined) {
            return option_value.charAt(0).toUpperCase() + option_value.slice(1);
        }

        return option_label;
    }

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
</script>

<div class={["select-field", className]}>
    <label for={name}>{label}</label>

    <div class="select-container">
        {#if !active}
            <button
                class="cursor-pointer w-full h-full block text-left font-bold"
                onclick={showList}
            >
                {value == ""
                    ? "Enter " + label + " here"
                    : formatLabel(
                          value,
                          options.filter(
                              (option: any) => value == option.value,
                          )[0].label,
                      )}
            </button>
        {:else}
            <input
                type="text"
                name="ignore"
                bind:this={filter_input}
                bind:value={filter_value}
                use:clickOutside
                onClickOutside={showList}
            />
        {/if}

        {#if active}
            <div class="select-options" transition:slide>
                {#each filtered_options(filter_value, options) as option}
                    <button
                        class="select-option"
                        onclick={(event: Event) => {
                            select(option.value);
                            event?.preventDefault();
                        }}
                        transition:slide
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

    .select-container {
        @apply border 
            rounded-md
            relative;
        > button,
        > input {
            @apply px-4
                py-3
                border-gray-300
                rounded-md
                w-full;
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
            min-w-max
            max-w-full
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
