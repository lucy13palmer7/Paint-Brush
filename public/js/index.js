let thing = 2;
let record = false;
let testArr = [];
let colorChoice = "black";
let name;
let cnv;


const test = () => {
  testArr.push(mouseX, mouseY);
};


function canvasCenter(){
  let x = (windowWidth - width) / 2;
  let y = (windowHeight - height) / 3;
  cnv.position(x, y);
}

function setup() {
  cnv = createCanvas(640, 480);
  canvasCenter();
  $("#defaultCanvas0")
  .mousedown(function() {
    if (record === true) {
      timer = setInterval(test, 5);
    }
  })
  .mouseup(function() {
    clearInterval(timer);
    record = false;
  });
  let c = document.getElementById("defaultCanvas0");
  let ctx = c.getContext("2d");
  ctx.lineWidth = 5;
  ctx.strokeStyle = 'black';
}

function draw() {
  if (mouseIsPressed) {
    line(mouseX, mouseY, pmouseX, pmouseY);
  }
}

$("#executeBtn").on("click", function() {
  function timeloop() {
    const c = document.getElementById("defaultCanvas0");
    const ctx = c.getContext("2d");
    ctx.beginPath();
    ctx.strokeStyle = colorChoice;
    ctx.moveTo(testArr[thing - 2], testArr[thing - 1]);
    thing += 2;
    ctx.lineTo(testArr[thing - 2], testArr[thing - 1]);
    ctx.stroke();
    
    if (thing + 1 < testArr.length) {
      setTimeout(timeloop, 10);
    }
  }
  timeloop();
});

$("#clean").on("click", function() {
  thing = 2;
  clear();
});

$("#rec").on("click", function() {
  testArr=[];
  thing=2;
  clear();
  name = prompt("How would you like to name this recording?");
  if(name.length === 0){alert("Image Name Required To Save. Please Try Again")}else{
    alert("Please start drawing. The recording will be saved under the name " + name +". Once you have finished, you can view your recording by pressing the 'execute' button." )
    record = true;}
  })
  
  
  $("#saveImage").on("click", function(event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();
    
    $.ajax({
      method: "POST",
      url: "/api/images/",
      data: {
        name: name,
        coordinates: JSON.stringify({array: testArr}),
        color: colorChoice
      }
    })
  });
  
  
  $("#saveImg").on("click", function(){
    // var image = new Image();
    // var base64Stream = document.getElementById("defaultCanvas0").toDataURL("image/jpg")
    // .replace("image/jpg", "image/octet-stream");
    // image.src= base64Stream;
    // $("#imgTests").append(image);
    // console.log(image);
    // console.log(testArr.length);
});

$(".colorTag").on("click", function(){
  let c = document.getElementById("defaultCanvas0");
  let ctx = c.getContext("2d");
  colorChoice = $(this).attr("id");
  let colorArr = ["red", "orange", "yellow", "green", "blue", "purple", "black"]
  for(var i = 0; i < colorArr.length; i++){
    if(colorArr[i] === colorChoice){
      ctx.strokeStyle = colorChoice;
    }}
})

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("modalOpen");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
} 



$("#modalOpen").on("click", function(ev) {
  ev.preventDefault();
  $.ajax({
    method: "GET",
    url:"/api/images/"
  }).then(function(res) {
    $("#loadBtns").html("");
    for (let i = 0; i< res.length; i++) {
      let loadBtn = $("<button>");
      let dataCoord = JSON.parse(res[i].coordinates);
      
      loadBtn.text(res[i].name);
      loadBtn.attr("class", "toolBtn retBtn");
      loadBtn.attr("data-coord", dataCoord.array);
      loadBtn.attr("data-color", res[i].color);
      $("#loadBtns").append(loadBtn);
    }
    $(".retBtn").on("click", function(){
      event.stopPropagation()
      testArr = [];
      colorChoice = event.target.attributes[2].nodeValue;
      let returnData = event.target.attributes[1].nodeValue
      console.log(colorChoice);
      let newArrOne = returnData.split(",");
      for (let j=0; j<newArrOne.length; j++) {
        testArr.push(parseFloat(newArrOne[j]));
      }
    })
  })
})
  
  $(".colorTag").on("click", function(){
    let c = document.getElementById("defaultCanvas0");
    let ctx = c.getContext("2d");
    colorChoice = $(this).attr("id");
    let colorArr = ["red", "orange", "yellow", "green", "blue", "purple", "black"]
    for(var i = 0; i < colorArr.length; i++){
      if(colorArr[i] === colorChoice){
        ctx.strokeStyle = colorChoice;
      }}
    })
    
    // Get the modal
    var modal = document.getElementById("myModal");
    
    // Get the button that opens the modal
    var btn = document.getElementById("modalOpen");
    
    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];
    
    // When the user clicks on the button, open the modal
    btn.onclick = function() {
      modal.style.display = "block";
    }
    
    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
      modal.style.display = "none";
    }
    
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    } 
    
    
    
    $("#modalOpen").on("click", function(ev) {
      ev.preventDefault();
      $.ajax({
        method: "GET",
        url:"/api/images"
      }).then(function(res) {
        $("#loadBtns").html("");
        for (let i = 0; i< res.length; i++) {
          let loadBtn = $("<button>");
          let dataCoord = JSON.parse(res[i].coordinates);
          
          loadBtn.text(res[i].name);
          loadBtn.attr("class", "toolBtn retBtn");
          loadBtn.attr("data-coord", dataCoord.array);
          loadBtn.attr("data-color", res[i].color);
          $("#loadBtns").append(loadBtn);
        }
        $(".retBtn").on("click", function(){
          event.stopPropagation()
          testArr = [];
          colorChoice = event.target.attributes[2].nodeValue;
          let returnData = event.target.attributes[1].nodeValue
          let newArrOne = returnData.split(",");
          for (let j=0; j<newArrOne.length; j++) {
            testArr.push(parseFloat(newArrOne[j]));
          }
        })
      })

    })