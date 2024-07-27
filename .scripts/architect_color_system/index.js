// Define the needed modules.
const { createCanvas, Image, loadImage } = require("canvas");
const fsp = require("fs/promises");
const path = require("path");

// Define the path to the assets folder.
const assetsPath = path.join(__dirname, "..", "..", ".mergeable_packs", "From-The-Fog-SMP-Primary", "assets");

// List the colors that will be used.
const colorList = [
    "black",
    "blue",
    "brown",
    "cyan",
    "default",
    "green",
    "grey",
    "light_blue",
    "light_grey",
    "lime",
    "magenta",
    "orange",
    "pink",
    "purple",
    "red",
    "white",
    "yellow"
];

async function createStuff() {
    // Read the template info file.
    const properties = JSON.parse(await fsp.readFile(path.join(assetsPath, "input", "template_info.json"), "utf8"));
    // Read the template model file.
    const modelInfo = JSON.parse(await fsp.readFile(path.join(assetsPath, "input", "template.json"), "utf8"));
    // Load the template image file.
    const templateImage = new Image();
    templateImage.src = path.join(assetsPath, "input", "template.png");

    // Create a new canvas element.
    const canvas = createCanvas(templateImage.width, templateImage.height);
    const ctx = canvas.getContext("2d");
    // Define the function that will be used to color the images.
    function colorImageLayer() {
        const imageColorData = ctx.getImageData(
          0,
          0,
          canvas.width,
          canvas.height
        );
        // Loop through the pixel data and delete pixels based on their color values
        for (let i = 0; i < imageColorData.data.length; i += 4) {
          const red = imageColorData.data[i];
          const green = imageColorData.data[i + 1];
          const blue = imageColorData.data[i + 2];

          // Check if this pixel should be replaced
          if (red === 255 && green === 0 && blue === 42) {
            const replacementPixelData = canvas
              .getContext("2d")
              .getImageData(properties.color_template_location[0], properties.color_template_location[1], 1, 1).data;

            // Replace the pixel with the corresponding pixel from the replacement image
            imageColorData.data[i] = replacementPixelData[0];
            imageColorData.data[i + 1] = replacementPixelData[1];
            imageColorData.data[i + 2] = replacementPixelData[2];
            imageColorData.data[i + 3] = replacementPixelData[3];
          } else if (red === 0 && green === 55 && blue === 255) {
            const replacementPixelData = canvas
              .getContext("2d")
              .getImageData(properties.color_template_location[0], properties.color_template_location[1] + 1, 1, 1).data;

            // Replace the pixel with the corresponding pixel from the replacement image
            imageColorData.data[i] = replacementPixelData[0];
            imageColorData.data[i + 1] = replacementPixelData[1];
            imageColorData.data[i + 2] = replacementPixelData[2];
            imageColorData.data[i + 3] = replacementPixelData[3];
          } else if (red === 17 && green === 255 && blue === 0) {
            const replacementPixelData = canvas
              .getContext("2d")
              .getImageData(properties.color_template_location[0], properties.color_template_location[1] + 2, 1, 1).data;

            // Replace the pixel with the corresponding pixel from the replacement image
            imageColorData.data[i] = replacementPixelData[0];
            imageColorData.data[i + 1] = replacementPixelData[1];
            imageColorData.data[i + 2] = replacementPixelData[2];
            imageColorData.data[i + 3] = replacementPixelData[3];
          } else if (red === 255 && green === 115 && blue === 0) {
            const replacementPixelData = canvas
              .getContext("2d")
              .getImageData(properties.color_template_location[0], properties.color_template_location[1] + 3, 1, 1).data;

            // Replace the pixel with the corresponding pixel from the replacement image
            imageColorData.data[i] = replacementPixelData[0];
            imageColorData.data[i + 1] = replacementPixelData[1];
            imageColorData.data[i + 2] = replacementPixelData[2];
            imageColorData.data[i + 3] = replacementPixelData[3];
          } else if (red === 255 && green === 208 && blue === 0) {
            const replacementPixelData = canvas
              .getContext("2d")
              .getImageData(properties.color_template_location[0], properties.color_template_location[1] + 4, 1, 1).data;

            // Replace the pixel with the corresponding pixel from the replacement image
            imageColorData.data[i] = replacementPixelData[0];
            imageColorData.data[i + 1] = replacementPixelData[1];
            imageColorData.data[i + 2] = replacementPixelData[2];
            imageColorData.data[i + 3] = replacementPixelData[3];
          } else if (red === 255 && green === 0 && blue === 208) {
            const replacementPixelData = canvas
              .getContext("2d")
              .getImageData(properties.color_template_location[0], properties.color_template_location[1] + 5, 1, 1).data;

            // Replace the pixel with the corresponding pixel from the replacement image
            imageColorData.data[i] = replacementPixelData[0];
            imageColorData.data[i + 1] = replacementPixelData[1];
            imageColorData.data[i + 2] = replacementPixelData[2];
            imageColorData.data[i + 3] = replacementPixelData[3];
          } else if (red === 255 && green === 0 && blue === 119) {
            const replacementPixelData = canvas
              .getContext("2d")
              .getImageData(properties.color_template_location[0], properties.color_template_location[1] + 6, 1, 1).data;

            // Replace the pixel with the corresponding pixel from the replacement image
            imageColorData.data[i] = replacementPixelData[0];
            imageColorData.data[i + 1] = replacementPixelData[1];
            imageColorData.data[i + 2] = replacementPixelData[2];
            imageColorData.data[i + 3] = replacementPixelData[3];
          }
        }
        // Put the modified pixel data back onto the canvas
        ctx.putImageData(imageColorData, 0, 0);
      }

    // Define the overide data.
    let overrides = [];
    let overideNumber = 0;
    // Loop through the colors.
    for (let color of colorList) {
        // Draw the template image onto the canvas.
        ctx.drawImage(templateImage, 0, 0);
        // Draw the color template for the current color onto the canvas.
        const colorImage = new Image();
        colorImage.src = path.join(assetsPath, "colors", color + ".png");
        ctx.drawImage(colorImage, properties.color_template_location[0], properties.color_template_location[1]);
        // Color the template.
        colorImageLayer();
        // Output the image to a file.
        fsp.writeFile(path.join(__dirname, "output", "textures", color + ".png"), canvas.toBuffer());

        // Output the model info to a file.
        fsp.writeFile(path.join(__dirname, "output", "models", color + ".json"), (JSON.stringify(modelInfo)).replaceAll("%color%", color));

        // Add the current colors override.
        overrides.push({
            "model": modelInfo.parent.replace("template", color),
            "predicate": {
              "custom_model_data": properties.starting_ctm + overideNumber
            }
        });
        overideNumber++;
    }
    // Output the overides info to a file.
    fsp.writeFile(path.join(__dirname, "output", "overrides.json"), JSON.stringify(overrides));
}
createStuff();

// async function setupColors() {
//     // Create a new canvas element.
//     const canvas = createCanvas(1, 5);
//     const ctx = canvas.getContext("2d");
//     const couchCanvas = createCanvas(256, 256);
//     const couchCtx = couchCanvas.getContext("2d");

//     async function replacePixel(locationToCopy, whereToCopy) {
//         // Get the pixel data from the couchCanvas
//         const replacementPixelData = couchCtx.getImageData(locationToCopy[0], locationToCopy[1], 1, 1).data;
//         console.log(replacementPixelData);

//         // Create an ImageData object to hold the pixel data
//         const replacedPixel = ctx.createImageData(1, 1);

//         // Replace the pixel with the corresponding pixel from the replacement image
//         replacedPixel.data[0] = replacementPixelData[0];
//         replacedPixel.data[1] = replacementPixelData[1];
//         replacedPixel.data[2] = replacementPixelData[2];
//         replacedPixel.data[3] = replacementPixelData[3];

//         // Put the modified pixel data back onto the canvas
//         ctx.putImageData(replacedPixel, whereToCopy[0], whereToCopy[1]);
//     }
    

//     // Loop through the colors making each template.
//     for (let color of colorList) {
//         // Draw the couch texture of the current color.
//         let couchTexture = new Image();
//         couchTexture.src = path.join(assetsPath, "colors", "setup", color + ".png");
//         couchCtx.drawImage(couchTexture, 0, 0);
//         // Replace the specific pixels needed.
//         await replacePixel([19,21],[0,0]);
//         await replacePixel([19,20],[0,1]);
//         await replacePixel([19,19],[0,2]);
//         await replacePixel([19,18],[0,3]);
//         await replacePixel([19,17],[0,4]);
//         // Output the image to a file.
//         fsp.writeFile(path.join(assetsPath, "colors", color + ".png"), canvas.toBuffer());
//     }
// }
// setupColors()