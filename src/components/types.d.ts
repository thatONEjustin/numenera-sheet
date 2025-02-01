import type { Component, Snippet } from "svelte";
import type { ClassValue, SvelteHTMLElements } from "svelte/elements"

// NOTE: Svelte Types
export type { Component, Snippet, ClassValue, SvelteHTMLElements };

type Tab = {
    label: string;
    content?: Snippet;
    sheetData?: any;
}

type Tabs = {
    tabs: Array<Tab>;
    sheet_data?: any;
    children?: Snippet;
    active?: number;
};

type Accordion = {
    class?: ClassValue,
    open?: boolean;
    title?: Snippet;
    children?: Snippet;
    openIndicator?: Snippet;
};

type Form = {
    children?: Snippet;
};

type JustinTextInput = {
    name: string;
    type: string;
    hideLabel?: boolean;
    label?: string;
    labelTag?: Snippet;
    rows?: number;
    placeholder?: string;
};


type SubmitButton = {
    name?: string;
    class?: ClassValue;
    id?: string;
    children?: Snippet;
    onclick?: any;
};

/*
type SubmitButton = {
    name?: string;
    class?: ClassValue;
    id?: string;
    children?: Snippet;
    onclick?: any;
};

type JustinSubmitButton = {
    children?: Snippet;
}

type SubmitButton = HTMLButtonElement & JustinSubmitButton

*/
type SheetSection = {
    name?: string;
    class?: ClassValue;
    sheet_data?: any;
    children?: Snippet;
}



// NOTE: Justins Types
export type { Tab, Tabs, Accordion, SubmitButton, JustinTextInput, Form, SheetSection }
