<!--
<script>
    export let options = ['']
    export let value = ($$restProps.value) ? options.find((item) => item == $$restProps.value) : options[0]

    const { name, id, label, required, containerClass } = $$restProps


    let active = false

    function showList(event) {
    active = ! active
    }

    function select(option) {
    value = option 
    active = false
    }
</script>
-->

<script lang="ts">
    import type { Snippet } from "svelte";

    // type SelectInput = HTMLSelectElement;

    let {
        options = [],
        value = $bindable(""),
        containerClass = "",
        active = $bindable(false),
        ...input
    } = $props();

    let { name, label, id } = input;

    // let active = $state(false);

    // function showList(event) {
    //   active = !active;
    // }
    //
    // function select(option) {
    //   value = option;
    //   active = false;
    // }
</script>

<div class="FieldContainer {containerClass}">
    <label for={name}>{label}</label>

    <!--
  <div class="DropdownContainer">
    <a href="#" class="cursor-pointer" on:click|preventDefault={showList}
      >{value == "" ? "Default" : value}</a
    >

    <div class:hidden={!active} class="Dropdown">
      {#each options as { value, label }}
        <a
          href="#"
          class="Dropdown-option"
          on:click|preventDefault={select(value)}>{label}</a
        >
      {/each}
    </div>
  </div>
  -->

    <select {name} {id} bind:value>
        {#each options as { option_value, label }}
            <option value={option_value}>{label}</option>
        {/each}
    </select>
</div>

<style lang="postcss">
    @import "tailwindcss/theme" theme(reference);

    .FieldContainer {
        @apply flex
      flex-col
      my-3;

        > label {
            @apply pb-1
        mb-3;
        }
    }

    .DropdownContainer {
        @apply border 
      border-slate-600 
      rounded-md 
      p-3 
      relative;
    }
    .Dropdown {
        @apply absolute 
      flex
      flex-col
      bg-white
      rounded-md 
      border 
      border-slate-400 
      min-w-max
      z-20;
    }

    .Dropdown-option {
        @apply px-3 
        py-3
        cursor-pointer;
    }

    .Dropdown-option.hidden {
        @apply !hidden;
    }
</style>
