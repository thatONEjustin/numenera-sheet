import LZString from "lz-string";

export function isEmptyObject(obj: object) {
    for (const prop in obj) {
        if (Object.hasOwn(obj, prop)) {
            return false;
        }
    }

    return true;
}

export function getObjectDiffs(obj1: object, obj2: any): object {
    var result: any = {};
    var keys = Object.keys(obj1);

    for (var key in obj2) {
        if (!keys.includes(key)) {
            result[key] = obj2[key];
        }
    }
    return result;
}

export function storageAvailable(type: any) {
    let storage;
    try {
        storage = window[type];
        const x = "__storage_test__";
        (storage as any).setItem(x, x);
        (storage as any).removeItem(x);
        return true;
    } catch (e) {
        return (
            e instanceof DOMException &&
            e.name === "QuotaExceededError" &&
            // acknowledge QuotaExceededError only if there's something already stored
            storage &&
            storage.length !== 0
        );
    }
}


/** 
 * BUG:
 * this is supposed to dispatch event on click outside of node
 * but I think the example I found was older because it uses 
 * custom events rather than the actions patterns
 *
export function clickOutside(node: any, callbackFunction: () => {}) {
    const handleClick = (event: any) => {
        if (node && !node.contains(event.target) && !event.defaultPrevented) {
            node.dispatchEvent(
                new CustomEvent('ClickOutside', node)
            )
        }
    }

    document.addEventListener('click', handleClick, true);

    return {
        update(newCallBackFunction: any) {
            console.log('update?')
            callbackFunction = newCallBackFunction
        }, destroy() {
            document.removeEventListener('click', handleClick, true);
        }
    }
} */
import type { Action } from "svelte/action";
export const clickOutside: Action<
    HTMLElement,
    undefined,
    {
        onClickOutside: (event: Event) => void;
    }
> = (node: Node) => {
    const handleClick = (event: any) => {
        if (
            node &&
            !node.contains(event.target) &&
            !event.defaultPrevented
        ) {
            // NOTE: Process outside click
            node.dispatchEvent(new CustomEvent("ClickOutside"));
        }
    };

    document.addEventListener("click", handleClick, true);

    return {
        destroy() {
            document.removeEventListener("click", handleClick, true);
        },
    };
};

function get_data_string(local_storage_key: string): any {
    if (
        storageAvailable("localStorage") == false ||
        localStorage.getItem(local_storage_key) == null
    ) {
        return "";
    }

    return localStorage.getItem(local_storage_key);
}

export function getSheetData() {
    return new Promise((resolve, reject) => {
        const data_string = get_data_string("sheetData")

        if (data_string == "") {
            resolve({})
            return
        }

        try {
            const decompress = LZString.decompressFromEncodedURIComponent(data_string);
            resolve(JSON.parse(decompress))
        } catch (error) {
            reject(error)
        }
    })
}

export function updateSheetData(sheet: any, category_key: string, field_key: string, value: any): object {
    return {
        ...sheet[category_key],
        [field_key]: value
    }
}
