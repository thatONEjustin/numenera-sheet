import { getSheetData } from "@components/utils"

let sheet_data: any = $state(await getSheetData())

export { sheet_data }
