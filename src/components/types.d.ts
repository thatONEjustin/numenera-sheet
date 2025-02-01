import type { Component, Snippet } from "svelte";
import type { ClassValue } from "svelte/elements"

// NOTE: Svelte Types
export type { Component, Snippet, ClassValue };

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

type TextInput = {
    name: string;
    type: string;
    id: string;
    hideLabel?: boolean;
    label?: string;
    labelTag?: Snippet;
    required?: boolean;
    class?: ClassValue;
    rows?: number;
    placeholder?: string;
    value?: string;
};

type SubmitButton = {
    name?: string;
    class?: ClassValue;
    id?: string;
    children?: Snippet;
    onclick?: any;
};

type SheetSection = {
    name?: string;
    class?: ClassValue;
    sheet_data?: any;
    children?: Snippet;
}



// NOTE: Justins Types
export type { Tab, Tabs, Accordion, SubmitButton, TextInput, Form, SheetSection }
