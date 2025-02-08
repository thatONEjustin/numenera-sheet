<script lang="ts">
    import type { SheetSection as SheetProps } from "@components/types.d";
    import CheckboxField from "@components/ui/forms/fields/CheckboxField.svelte";
    const { class: className }: SheetProps = $props();

    import { sheet_data } from "@game/data.svelte";
    const { recovery } = sheet_data;
</script>

<fieldset class={className} name="recovery-available">
    <div class="grid grid-cols-1 md:grid-cols-4 gap-x-6">
        <div class="text-3xl flex flex-row items-center">
            <i class="nf nf-md-timer_refresh"></i>
            <h3 class="pl-2">Recovery</h3>
        </div>
        <CheckboxField
            name="recovery_oneAction"
            id="1action"
            label="1 action"
            value="1action"
            checked={recovery?.oneAction}
        />
        <CheckboxField
            name="recovery_tenMin"
            id="10min"
            label="10 minutes"
            value="10min"
            checked={recovery?.tenMin}
        />
        <CheckboxField
            name="recovery_oneHour"
            id="1hour"
            label="1 hour"
            value="1hour"
            checked={recovery?.oneHour}
        />
        <CheckboxField
            name="recovery_available"
            class="md:col-start-2"
            id="10hours"
            label="10 hours"
            value="10hours"
            checked={recovery?.available}
        />
    </div>
</fieldset>
