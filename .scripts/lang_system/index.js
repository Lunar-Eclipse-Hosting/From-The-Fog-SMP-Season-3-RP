const fs = require('fs');
const path = require('path');
const util = require('util');
const readDirAsync = util.promisify(fs.readdir);
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

// Define the path to the assets folder.
const assetsPath = path.join(__dirname, "..", "..", ".mergeable_packs", "From-The-Fog-SMP-Primary", "assets");
const pathToOrganize = path.join(assetsPath, "lunareclipse.ftfsmp", "lang");

// Function to sort a JSON object alphabetically by its keys
function sortObject(obj) {
    return Object.keys(obj)
        .sort()
        .reduce((result, key) => {
            result[key] = obj[key];
            return result;
        }, {});
}

async function init() {
    // Get the list of folder from the "pathToOrganize" directory.
    let dirFolderList = await readDirAsync(pathToOrganize);

    for (let index in dirFolderList) {
        // Define the current file being changing.
        let currentFolderPath = path.join(pathToOrganize, dirFolderList[index]);
        // Read the JSON file's info.
        let fileInfo = await readFileAsync(currentFolderPath, 'utf8');

        try {
            // Parse JSON and sort it
            const fileInfoJson = JSON.parse(fileInfo);
            const sortedJson = sortObject(fileInfoJson);

            // Write the sorted JSON back to a new file
            await writeFileAsync(currentFolderPath, JSON.stringify(sortedJson, null, 4))
            console.log(dirFolderList[index] + " file has been sorted!");
        } catch (err) {
            console.error("Error parsing JSON:", err);
        }
    }
}
// init();

async function updateFiles(mainFile) {
    // Define the list of files to be updated.
    let langFiles = [
        'cs_cz.json', 'de_at.json', 'de_ch.json',
        'de_de.json', 'enws.json', 'en_au.json',
        'en_ca.json', 'en_gb.json', 'en_nz.json',
        'en_pt.json', 'en_ud.json', 'en_us.json',
        'es_ar.json', 'es_cl.json', 'es_ec.json',
        'es_es.json', 'es_mx.json', 'es_uy.json',
        'es_ve.json', 'fr_ca.json', 'fr_fr.json',
        'hr_hr.json', 'it_it.json', 'lol_us.json',
        'lt_lt.json', 'nl_be.json', 'nl_nl.json',
        'pl_pl.json', 'ro_ro.json', 'ru_ru.json',
        'sv_se.json', 'th_th.json', 'tr_tr.json',
        'uk_ua.json'
    ];
    // Read the main JSON file.
    let fileInfo = await readFileAsync(path.join(pathToOrganize, mainFile + ".json"), 'utf8');
    for (let index of langFiles) {
        // Write the copied JSON back to a new file
        await writeFileAsync(path.join(pathToOrganize, index), fileInfo);
        console.log("Updated " + index);
    }
}
updateFiles("en_gb");

async function checkDifference(mainFile, comparedFile) {
    // Define the mainList object to list the intial items to be checked.
    let mainList = [];
    // Get the list of folder from the "pathToOrganize" directory.
    let dirFolderList = await readDirAsync(pathToOrganize);

    // Read the main JSON file.
    let fileInfo = await readFileAsync(path.join(pathToOrganize, mainFile + ".json"), 'utf8');
    for (let index in JSON.parse(fileInfo)) {
        // Add the current object to mainList.
        mainList.push(index)
    }

    // Read the compared JSON file.
    let comparedFileInfo = await readFileAsync(path.join(pathToOrganize, comparedFile + ".json"), 'utf8');
    for (let index in JSON.parse(comparedFileInfo)) {
        // Add the current object to mainList.
        if (!mainList.includes(index)) console.log(index + " is missing.");
    }
}
// checkDifference("cs_cz", "en_us");