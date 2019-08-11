// variables for all.
var name;
var YourCharacter;
var YourDefender;
var myPlayer = "";
var myDef = "";

// Health Points - HP
// Attack Power - AP
// Counter Attack Power = CAP

var attack;
var attackcharacter;
var attackerHP; 
var attackerAP;
var attackerCAP;

var defend;
var defendcharacter;
var defenderHP;
var defenderAP;
var defenderCAP;


function reset() { 

    $("#photoRow").show();
    
    $(".restart").hide();
    $(".attackButton").show();
    
    // reset myCharacter and myDefender to equal nothing.
  
    var myChar = "";
    
    var myDef = "";
    
    
    
    
  // reset health points.
               characters.Ryu.healthPoints = 120;
            characters.Ken.healthPoints = 100;
        characters.Sagat.healthPoints = 150;
    characters.MBison.healthPoints = 180;
    
 // reset attack power.
    characters.Ryu.attackPower = 8;
        characters.Ken.attackPower = 10;
            characters.Sagat.attackPower = 10;
              characters.MBison.attackPower = 12;

 //Character's health to show on website.
    $(".RyuHP").html(characters.Ryu.healthPoints);
      $(".KenHP").html(characters.Ken.healthPoints);
        $(".SagatHP").html(characters.Sagat.healthPoints);
          $(".MbisonHP").html(characters.MBison.healthPoints);

 //Character's names to show on website.
          $(".FnameR").html(characters.Ryu.fullName);
        $(".FnameK").html(characters.Ken.fullName);
      $(".FnameS").html(characters.Sagat.fullName);
    $(".FnameM").html(characters.MBison.fullName);

 //Photos to show on website.
    $("#sagat").appendTo("#photoRow");
      $("#MBison").appendTo("#photoRow");  
        $("#ken").appendTo("#photoRow");
          $("#ryu").appendTo("#photoRow");
    
 // delete all in-game text.
          $(".youAttacked").empty();
        $(".attackedBack").empty();
      $(".youDefeated").empty();
   $(".youWon").empty();
      $(".youLose").empty();
          $(".noEnemy").empty();
    
  // reset border colors. 
$(".firstRow").css({"background-color": "white", "outline-color": "rgb(0, 98, 255)", 
"border-width": "3px", "outline-style": "solid", "border-color": "white", "outline-width": "3px"});

};

// Audio for each Character

function AudioRyu() {
    var x = document.createElement("AUDIO");
  
    if (x.canPlayType("audio/wav")) {
      x.setAttribute("src","../audio/Ryu.wav");
    } else {
      x.setAttribute("src","../audio/Ryu.wav");
    }
  
    
    document.body.appendChild(x);
  }

  function AudioKen() {
    var k = document.createElement("AUDIO");
  
    if (k.canPlayType("audio/wav")) {
      k.setAttribute("src","audio/Ken.wav");
    } else {
      k.setAttribute("src","../audio/Ken.wav");
    }
  
    
    document.body.appendChild(k);
  }

  function AudioSagat() {
    var s = document.createElement("AUDIO");
  
    if (s.canPlayType("audio/wav")) {
      s.setAttribute("src","../audio/Sagat.wav");
    } else {
      s.setAttribute("src","../audio/Sagat.wav");
    }
  
    
    document.body.appendChild(s);
  }

  function AudioMBison() {
    var MB = document.createElement("AUDIO");
  
    if (MB.canPlayType("audio/wav")) {
      MB.setAttribute("src","../audio/MBison.wav");
    } else {
      MB.setAttribute("src","../audio/MBison.wav");
    }
  
    
    document.body.appendChild(MB);
  }





$(document).ready(function(){
reset();

// When clicked on a character, pc selects which was chosen then moves the one clicked into
// "Your Character" and moves the other three into "Enemies available to attack".
$(".firstRow").click(function(){
    
        
   if (myChar == "") {
   // appends the chosen character to "Your Character"
   console.log(this);          
   $(this).appendTo("#yourChar");
   myChar = $(this);
   YourCharacter = $(myChar).attr("value");
      }
   // Determine who is currently "Your Character" and assigns
   // to the character array's properties. 
   if (YourCharacter == characters.Ryu.name) {
           attackerHP = characters.Ryu.healthPoints;
           attackerAP = characters.Ryu.attackPower;
           attackerCAP = characters.Ryu.counterAttackPower;
           attackerFN = characters.Ryu.fullName;
           attack = characters.Ryu;
           x;
   }
   else if (YourCharacter == characters.Ken.name){
           attackerHP = characters.Ken.healthPoints;
           attackerAP = characters.Ken.attackPower;
           attackerCAP = characters.Ken.counterAttackPower;
           attackerFN = characters.Ken.fullName;
           attack = characters.Ken;
           k;
   }
   else if (YourCharacter == characters.Sagat.name){
           attackerHP = characters.Sagat.healthPoints;
           attackerAP = characters.Sagat.attackPower;
           attackerCAP = characters.Sagat.counterAttackPower;
           attackerFN = characters.Sagat.fullName;
           attack = characters.Sagat;
           s;
   }
   else if (YourCharacter == characters.MBison.name){
           attackerHP = characters.MBison.healthPoints;
           attackerAP = characters.MBison.attackPower;
           attackerCAP = characters.MBison.counterAttackPower;
           attackerFN = characters.MBison.fullName;
           attack = characters.MBison;
           MB;
   }
          
   // clones the other three characters to "Enemies available to attack" three separate divs.
   for (var i = 0; i < 4; i++) {
       $("._" + [i]).not(myChar).appendTo("#enemies" + [i]);

       // changing color
       $("._" + [i]).not(myChar).css({"background-color": "red", "outline-color": "black", 
           "border-width": "3px", "outline-style": "solid", "border-color": "black", "outline-width": "1px"});


   }
           
   // Clears the characters from the top.
  
   $("#photoRow").hide();
  
});


