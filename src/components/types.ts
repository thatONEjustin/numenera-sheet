import type { Component, Snippet } from "svelte";
export type { Component, Snippet };

import type { ClassValue } from "svelte/elements"

type Tab = {
    label: string;
    content?: Snippet;
}

type Tabs = {
    tabs: Array<Tab>;
    sheet_data?: any;
    children?: Snippet;
    active?: number;
};

export type { Tab, Tabs, ClassValue }
