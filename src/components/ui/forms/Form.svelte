<script lang="ts">
    import type { Snippet } from "svelte";
    type FormProps = {
        children?: Snippet;
        active?: any;
    };

    let { children, active = $bindable(1) }: FormProps = $props();

    let form: HTMLFormElement | undefined;
    let form_data: FormData = $state(new FormData(form));

    const input_fields_list: Array<string> = ["input", "select", "textarea"];

    function onsubmit(event: SubmitEvent) {
        form_data = new FormData(form);

        const submitter: HTMLElement = event.submitter as HTMLElement;

        if (submitter.getAttribute("name") == "submit_next") {
            // console.log(submitter);
            // console.log(active, tabs.length);
            // if (active >= tabs.length) {
            //     active = 1;
            //     return;
            // }

            active++;
            return;
        }
    }
</script>

<form method="POST" {onsubmit} bind:this={form}>
    {#if children}
        {@render children?.()}
    {/if}
</form>
