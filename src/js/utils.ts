import LZString from "lz-string";

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

        switch (data_string) {
            case "":
                resolve({})
                break
            default:
                const decompress = LZString.decompressFromEncodedURIComponent(data_string);
                resolve(JSON.parse(decompress))
        }
    })
}
