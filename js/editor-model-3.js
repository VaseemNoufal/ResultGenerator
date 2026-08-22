const customFont = new FontFace(
  "MyCustomFont",
  "url('../fonts/AnekMalayalam-SemiBold.ttf')"
);

customFont.load().then((font) => {
  document.fonts.add(font);
  drawPoster();
});

const canvas =
  document.getElementById("posterCanvas");

const ctx =
  canvas.getContext("2d");


const background =
  new Image();



/*
  ALL INPUTS
*/

const inputs = {

  programName:
    document.getElementById("programName"),

  category:
    document.getElementById("category"),


  firstPrize:
    document.getElementById("firstPrize"),

  firstGroup:
    document.getElementById("firstGroup"),


  secondPrize:
    document.getElementById("secondPrize"),

  secondGroup:
    document.getElementById("secondGroup"),


  thirdPrize:
    document.getElementById("thirdPrize"),

  thirdGroup:
    document.getElementById("thirdGroup")

};



/*
  POSTER POSITIONS

  Poster size:
  1254 x 1254

  You can change these later.

  x = left/right
  y = up/down
  maxWidth = maximum text width
  fontSize = text size
*/

const POSITIONS = {


  program: {

    x: 155,

    y: 550,

    maxWidth: 560,

    fontSize: 81

  },


  category: {

    x: 165,

    y: 600,

    maxWidth: 560,

    fontSize: 29

  },


  first: {

    x: 205,

    y: 700,

    maxWidth: 560,

    fontSize: 38

  },


  firstGroup: {

    x: 205,

    y: 730,

    maxWidth: 560,

    fontSize: 20

  },


  second: {

    x: 205,

    y: 800,

    maxWidth: 560,

    fontSize: 38

  },


  secondGroup: {

    x: 205,

    y: 830,

    maxWidth: 560,

    fontSize: 20

  },


  third: {

    x: 205,

    y: 905,

    maxWidth: 560,

    fontSize: 38

  },


  thirdGroup: {

    x: 205,

    y: 935,

    maxWidth: 560,

    fontSize: 20

  }

};



/*
  LOAD POSTER IMAGE
*/

background.src =
  "assets/poster-model-5.png";



/*
  DRAW TEXT
*/

function drawText(
  text,
  position,
  color = "#263238"
) {


  text =
    text.trim();


  if (!text) {

    return;

  }



  let fontSize =
    position.fontSize;


  const fontFamily =
    "MyCustomFont";



  ctx.save();



  ctx.textBaseline =
    "middle";


  ctx.textAlign =
    "left";


  ctx.fillStyle =
    color;


  ctx.font =
    `800 ${fontSize}px ${fontFamily}`;



  /*
    Automatically reduce the font
    only if the text is too wide.
  */

  while (

    ctx.measureText(text).width >
      position.maxWidth

    &&

    fontSize > 24

  ) {

    fontSize -= 1;


    ctx.font =
      `800 ${fontSize}px ${fontFamily}`;

  }



  /*
    IMPORTANT:

    Do NOT use the fourth parameter
    of fillText().

    That was causing the text
    to visually shrink.
  */

  ctx.fillText(

    text,

    position.x,

    position.y

  );


  ctx.restore();

}



/*
  DRAW COMPLETE POSTER
*/

function drawPoster() {


  /*
    Don't draw until the image
    has loaded.
  */

  if (

    !background.complete ||

    background.naturalWidth === 0

  ) {

    return;

  }



  /*
    Clear canvas
  */

  ctx.clearRect(

    0,

    0,

    canvas.width,

    canvas.height

  );



  /*
    Draw background
  */

  ctx.drawImage(

    background,

    0,

    0,

    canvas.width,

    canvas.height

  );



  /*
    PROGRAM NAME
  */

  drawText(

    inputs.programName.value,

    POSITIONS.program,

    "#531f83"

  );



  /*
    CATEGORY

    Example:

    (Junior Boys)
  */

  drawText(

    inputs.category.value
      ? `${inputs.category.value}`
      : "",

    POSITIONS.category,

    "#5f686d"

  );



  /*
    1ST PRIZE
  */

  drawText(

    inputs.firstPrize.value,

    POSITIONS.first,

    "#531f83"

  );



  /*
    1ST GROUP

    Example:

    (Yakut)
  */

  drawText(

    inputs.firstGroup.value
      ? `(${inputs.firstGroup.value})`
      : "",

    POSITIONS.firstGroup,

    "#5f686d"

  );



  /*
    2ND PRIZE
  */

  drawText(

    inputs.secondPrize.value,

    POSITIONS.second,

    "#531f83"

  );



  /*
    2ND GROUP
  */

  drawText(

    inputs.secondGroup.value
      ? `(${inputs.secondGroup.value})`
      : "",

    POSITIONS.secondGroup,

    "#5f686d"

  );



  /*
    3RD PRIZE
  */

  drawText(

    inputs.thirdPrize.value,

    POSITIONS.third,

    "#531f83"

  );



  /*
    3RD GROUP
  */

  drawText(

    inputs.thirdGroup.value
      ? `(${inputs.thirdGroup.value})`
      : "",

    POSITIONS.thirdGroup,

    "#5f686d"

  );

}



/*
  DRAW WHEN IMAGE LOADS
*/

background.onload =
  drawPoster;



/*
  LIVE UPDATES

  input = typing

  change = dropdown selection
*/

Object
  .values(inputs)
  .forEach((input) => {


    input.addEventListener(
      "input",
      drawPoster
    );


    input.addEventListener(
      "change",
      drawPoster
    );

  });



/*
  RESET BUTTON
*/

document
  .getElementById("resetBtn")
  .addEventListener(
    "click",
    () => {


      Object
        .values(inputs)
        .forEach((input) => {

          input.value = "";

        });


      drawPoster();

    }
  );



/*
  DOWNLOAD PNG
*/

document
  .getElementById("downloadBtn")
  .addEventListener(
    "click",
    () => {


      /*
        Make sure the latest values
        are drawn before downloading.
      */

      drawPoster();



      /*
        Create a safe filename
      */

      const safeName = (

        inputs
          .programName
          .value
          .trim()

        ||

        "result-poster"

      )
        .replace(
          /[^\w\-]+/g,
          "-"
        )
        .replace(
          /^-+|-+$/g,
          ""
        );



      /*
        Create download link
      */

      const link =
        document.createElement("a");


      link.download =
        `${safeName || "result-poster"}.png`;


      link.href =
        canvas.toDataURL(
          "image/png"
        );


      document
        .body
        .appendChild(link);


      link.click();


      link.remove();

    }
  );

  document
  .getElementById("whatsappBtn")
  .addEventListener("click", async () => {

    // Make sure the latest poster is rendered
    drawPoster();

    // Get the poster as an image file
    canvas.toBlob(async (blob) => {

      if (!blob) {
        alert("Could not create the poster image.");
        return;
      }

      const file = new File(
        [blob],
        "result-poster.png",
        {
          type: "image/png"
        }
      );

      /*
        Try native sharing first.

        This works especially well on mobile
        browsers that support sharing files.
      */

      if (
        navigator.share &&
        navigator.canShare &&
        navigator.canShare({
          files: [file]
        })
      ) {

        try {

          await navigator.share({

            title: "Result Poster",

            text: "Result Poster",

            files: [file]

          });

          return;

        } catch (error) {

          // User cancelled sharing.
          if (error.name === "AbortError") {
            return;
          }

        }

      }


      /*
        Fallback for desktop / unsupported browsers.

        Download the image and open WhatsApp.
      */

      const link =
        document.createElement("a");

      link.download =
        "result-poster.png";

      link.href =
        URL.createObjectURL(blob);

      document.body.appendChild(link);

      link.click();

      link.remove();


      

      

      window.open(
        "https://wa.me/",
        "_blank"
      );

    }, "image/png");

  });