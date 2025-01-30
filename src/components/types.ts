import type { Component, Snippet } from "svelte";
export type { Component, Snippet };

import type { ClassValue } from "svelte/elements"

type Tab = {
    label: string;
    tabContent?: Component;
}

type Tabs = {
    content?: Array<Tab>;
    sheetData?: any;
    children?: Snippet;
    active?: number;
};

export type { Tab, Tabs, ClassValue }
