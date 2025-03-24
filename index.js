import inquirer from 'inquirer';
import qr from "qr-image";
import fs from "fs";

/* Using the inquirer npm package to get user input. */
inquirer
  .prompt([
    {
      message: "Type your URL: ", 
      name: "URL"
    },
  ])
  .then((answers) => {
    const url = answers.URL;
    /* Use the qr-image npm package to turn the user entered URL into a QR code image. */
    var qr_svg = qr.image(url);
    qr_svg.pipe(fs.createWriteStream('qr_image.png'));


    //Create a txt file to save the user input using the native fs node module.
    fs.writeFile('url.txt', url, (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
      });
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });