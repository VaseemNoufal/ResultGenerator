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

    x: 165,

    y: 660,

    maxWidth: 560,

    fontSize: 105

  },


  category: {

    x: 165,

    y: 710,

    maxWidth: 560,

    fontSize: 48

  },


  first: {

    x: 205,

    y: 755,

    maxWidth: 560,

    fontSize: 78

  },


  firstGroup: {

    x: 205,

    y: 790,

    maxWidth: 560,

    fontSize: 30

  },


  second: {

    x: 205,

    y: 855,

    maxWidth: 560,

    fontSize: 78

  },


  secondGroup: {

    x: 205,

    y: 890,

    maxWidth: 560,

    fontSize: 30

  },


  third: {

    x: 205,

    y: 955,

    maxWidth: 560,

    fontSize: 78

  },


  thirdGroup: {

    x: 205,

    y: 990,

    maxWidth: 560,

    fontSize: 30

  }

};



/*
  LOAD POSTER IMAGE
*/

background.src =
  "assets/poster-model-1.png";



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
    "Arial, sans-serif";



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

    "#263238"

  );



  /*
    CATEGORY

    Example:

    (Junior Boys)
  */

  drawText(

    inputs.category.value
      ? `(${inputs.category.value})`
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

    "#263238"

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

    "#263238"

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

    "#263238"

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