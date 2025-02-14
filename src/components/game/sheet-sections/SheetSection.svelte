<script lang="ts">
    import type { SheetSection } from "@components/types.d";

    let { name, class: className = "", children }: SheetSection = $props();
</script>

<fieldset {name} class={className}>
    {#if children}
        {@render children()}
    {/if}
</fieldset>
