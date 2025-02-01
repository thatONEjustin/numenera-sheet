<script lang="ts">
    import { slide } from "svelte/transition";

    let {
        options = [],
        value = $bindable(""),
        class: className = "",
        active = $bindable(false),
        ...input
    } = $props();

    let { name, label, id } = input;
    let select_field;

    // let active = $state(false);

    function showList(event: Event) {
        active = !active;
        event.preventDefault();
    }

    function select(option: string) {
        value = option;
        active = false;
    }
</script>

<div class={["select-field", className]}>
    <label for={name}>{label}</label>

    <div class="select-container">
        <button
            class="cursor-pointer w-full h-full block text-left font-bold"
            onclick={showList}
        >
            {value == "" ? "Default" : value}
        </button>

        {#if active}
            <div class="select-options" transition:slide>
                {#each options as { value, label }}
                    <button class="select-option" onclick={() => select(value)}>
                        {label}
                    </button>
                {/each}
            </div>
        {/if}
    </div>

    <select class="hidden" {name} {id} bind:value bind:this={select_field}>
        {#each options as { value: option_value, label }}
            <option value={option_value}>{label}</option>
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
            border-gray-300
            rounded-md
            px-4
            py-2
            relative;
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
            z-20;
    }

    .select-option {
        @apply px-3
            py-3
            cursor-pointer
            text-left;
    }

    .select-option.hidden {
        @apply !hidden;
    }
</style>
