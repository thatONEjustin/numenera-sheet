<script lang="ts" generics="BaseInputTypes extends 'input'">
    import type { SvelteHTMLElements, Snippet } from "@components/types";
    import { sheet_data } from "@components/game/data.svelte";
    import { updateSheetData } from "@components/utils";

    type JustinNumberField = {
        name: string;
        label?: string;
        hideLabel?: boolean;
        labelTag?: Snippet;
        placeholder?: string;
    };

    type NumberField = SvelteHTMLElements[BaseInputTypes] & JustinNumberField;

    type NumberInputElement = HTMLInputElement | undefined;

    let {
        name,
        id,
        class: className,
        label: raw_label = "",
        min,
        max,
        hideLabel,
        labelTag,
        value = $bindable(),
        required = false,
        placeholder: raw_placeholder = "",
    }: NumberField = $props();

    let element: NumberInputElement = $state() as NumberInputElement;
    // let editing: boolean = $state(false);

    const label: string = $derived.by(() => {
        return raw_label.trim() != "" ? raw_label : name.replaceAll("_", " ");
    });

    const placeholder: string = $derived.by(() => {
        return raw_placeholder != "" ? raw_placeholder : `Enter ${label} here`;
    });

    const [category_key, field_key] = name.split("_");

    function update_number() {
        sheet_data[category_key] = updateSheetData(
            sheet_data,
            category_key,
            field_key,
            element?.value,
        );
    }
</script>

<div class={["number-field", className]}>
    {#if labelTag && hideLabel == false}
        {@render labelTag()}
    {:else if hideLabel == false}
        <label for={name}>{label}</label>
    {/if}

    <div class="input-grid">
        <div class="input-ux relative max-w-fit">
            <input
                {name}
                type="number"
                {id}
                bind:value
                {required}
                {placeholder}
                {min}
                {max}
                oninput={(event: Event) => {
                    event.preventDefault();
                    update_number();
                }}
                bind:this={element}
            />
            <div
                class="number-field-arrows absolute grid grid-cols-1 max-w-max w-full text-black right-0 top-1/2 -translate-1/2"
            >
                <button
                    type="submit"
                    onclick={(event: Event) => {
                        event.preventDefault();
                        element?.stepUp();
                        update_number();
                    }}
                    class="cursor-pointer"
                >
                    <i class="nf nf-cod-arrow_up text-sm text-center"></i>
                    <span class="sr-only">Up</span>
                </button>

                <button
                    type="submit"
                    onclick={(event: Event) => {
                        event.preventDefault();
                        element?.stepDown();
                        update_number();
                    }}
                    class="cursor-pointer"
                >
                    <i class="nf nf-cod-arrow_down text-sm text-center"></i>
                    <span class="sr-only">Down</span>
                </button>
            </div>
        </div>
    </div>
</div>

<style lang="postcss">
    @import "tailwindcss/theme" theme(reference);

    .number-field {
        @apply flex
            my-3;

        > label {
            @apply pb-1
                mb-3
                w-full;
        }
    }

    .input-grid {
        @apply grid;
        grid-template-areas: "stack";

        @apply w-full;

        > .input-ux {
            > input {
                @apply text-black
                    rounded-md
                    py-3
                    pl-3
                    pr-5.5
                    border
                    border-gray-300
                    text-center
                    transition-all
                    w-[76px];

                -moz-appearance: textfield;

                &::-webkit-inner-spin-button,
                &::-webkit-outer-spin-button {
                    -webkit-appearance: none;
                }
            }
        }
    }
</style>
