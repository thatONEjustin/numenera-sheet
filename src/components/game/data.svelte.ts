import { getSheetData } from "@components/utils"

let sheet_data: any = $state(await getSheetData())

const character_type_options = [
    {
        value: "jack",
    },
    {
        value: "nano",
    },
    {
        value: "glaive",
    },
];

const character_descriptor_options = [
    {
        value: "charming",
    },
    {
        value: "clever",
    },
    {
        value: "graceful",
    },
    {
        value: "intelligent",
    },
    {
        value: "learned",
    },
    {
        value: "mystical",
    },
    {
        value: "mechanical",
    },
    {
        value: "rugged",
    },
    {
        value: "stealthy",
    },
    {
        value: "strong",
    },
    {
        label: "Strong-Willed",
        value: "strongWilled",
    },
    {
        value: "swift",
    },
    {
        value: "tough",
    },
];

const character_focus_options = [
    {
        label: "Bears a Halo of Fire",
        value: "fireHalo",
    },
    {
        label: "Carries a Quiver",
        value: "quiver",
    },
    {
        label: "Commands Mental Powers",
        value: "mentalPowers",
    },
    {
        label: "Controls Beasts",
        value: "controlsBeasts",
    },
    {
        label: "Controls Gravity",
        value: "controlsGravity",
    },
    {
        label: "Crafts Illusions",
        value: "craftsIllusions",
    },
    {
        label: "Crafts Unique Objects",
        value: "craftsUniqueObjects",
    },
    {
        label: "Employs Magnetism",
        value: "employsMagnetism",
    },
    {
        label: "Entertains",
        value: "entertains",
    },
    {
        label: "Exists Partially Out of Phase",
        value: "existsOutOfPhase",
    },
    {
        label: "Explores Dark Places",
        value: "exploresDarkPlaces",
    },
    {
        label: "Fights With Panache",
        value: "fightsWithPanache",
    },
    {
        label: "Focuses Mind Over Matter",
        value: "mindOverMatter",
    },
    {
        label: "Fuses Flesh and Steel",
        value: "fleshAndSteel",
    },
    {
        label: "Howls at the Moon",
        value: "howlsAtMoon",
    },
    {
        label: "Hunts With Great Skill",
        value: "huntsGreatSkill",
    },
    {
        value: "leads",
    },
    {
        label: "Lives in the Wilderness",
        value: "livesInWilderness",
    },
    {
        label: "Masters Defense",
        value: "defenseMaster",
    },
    {
        label: "Masters Weaponry",
        value: "weaponMaster",
    },
    {
        value: "murders",
    },
    {
        value: "rages",
    },
    {
        label: "Rides the Lightning",
        value: "ridesLightning",
    },
    {
        label: "Talks to Machines",
        value: "talksMachines",
    },
    {
        label: "Wears a Sheen of Ice",
        value: "sheenOfIce",
    },
    {
        label: "Wields Power With Precision",
        value: "powerWithPrecision",
    },
    {
        label: "Wields Two Weapons At Once",
        value: "twoWeapons",
    },
    {
        label: "Works Miracles Works the Back Alleys",
        value: "backAlleyMiracles",
    },
];

export {
    character_type_options,
    character_focus_options,
    character_descriptor_options,
    sheet_data
}
