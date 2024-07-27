// Define the needed modules.
const { createCanvas, Image, loadImage } = require("canvas");
const fsp = require("fs/promises");
const path = require("path");

// Define the path to the assets folder.
const assetsPath = path.join(__dirname, "..", "..", ".mergeable_packs", "From-The-Fog-SMP-Primary", "assets");

// Define the info that will be used to define the new cosmetics.
const info = require("./info.json");
// List the items to edit.
const itemList = [
  'diamond_axe.json',
  'diamond_hoe.json',
  'diamond_pickaxe.json',
  'diamond_shovel.json',
  'diamond_sword.json',
  'iron_axe.json',
  'iron_hoe.json',
  'iron_pickaxe.json',
  'iron_shovel.json',
  'iron_sword.json',
  'netherite_axe.json',
  'netherite_hoe.json',
  'netherite_pickaxe.json',
  'netherite_shovel.json',
  'netherite_sword.json',
];

async function createStuff() {
  // Loop through all the items in the list.
  for (let item of itemList) {
    // Read the file data and parse it.
    let fileData = JSON.parse(await fsp.readFile(path.join(assetsPath, "minecraft", "models", "item", item), "utf-8"));
    // Add the defined entry.
    fileData.overrides.push({
      "model": `lunareclipse.cosmetics:item/tools/${info.identifier}/${(((item.replace(".json", "")).replace("netherite_","")).replace("diamond_","")).replace("iron_","")}`,
      "predicate": {
        "custom_model_data": 1350000 + info.id
      }
    })
    // Output the overides info to a file.
    fsp.writeFile(path.join(assetsPath, "minecraft", "models", "item", item), JSON.stringify(fileData));
  }
}
createStuff();