$(document).ready(function() {

    // define global variables
    var emmaHtml = $("#emma").html();
    var ryanHtml = $("#ryan").html();
    var johnHtml = $("#john").html();
    var hollywoodHtml = $("#hollywood").html();
    var originalHtml = $("#yourCharImg").html();

    var emmaTarget = $("#emma");
    var ryanTarget = $("#ryan");
    var johnTarget = $("#john");
    var hollywoodTarget = $("#hollywood");

    var charactersHtml = [emmaHtml, ryanHtml, johnHtml, hollywoodHtml];
    var charactersTarget = [emmaTarget, ryanTarget, johnTarget, hollywoodTarget];

    var yourCharOGattack;

    // reprint all characters' HP values
    var reprintHP = function () {

        for (var i=0; i<charactersTarget.length; i++) {
            var currentHP = parseInt(charactersTarget[i].find(".figure").attr("data-hp"));
            charactersTarget[i].find(".hp").text("HP: " + currentHP);
        }

    }

    // reassigns target variables and array to new locations
    var refreshTarget = function() {
      
        emmaTarget = $("#emma");
        ryanTarget = $("#ryan");
        johnTarget = $("#john");
        hollywoodTarget = $("#hollywood");

        charactersTarget = [emmaTarget, ryanTarget, johnTarget, hollywoodTarget];
    }

    // checks to see if any enemies exist...if not, alert winning message
    var winCheck = function() {
        var enemyCounter = 0;
        for (var i=0; i<charactersTarget.length; i++) {
            if (charactersTarget[i].find(".figure").attr("data-attack") == 1) {
              enemyCounter++;
            }
             else if (charactersTarget[i].find(".figure").attr("data-defender") == 1) {
              enemyCounter++;
            }
        }

        if (enemyCounter<=0) {
          $(".combatText").append("You have defeated all enemies! Congratulations!");
        }

    }

    // resets the game
    $(".restartBtn").on("click", function() {

              $("#yourCharImg").empty();
              $("#toAttack").empty();
              $("#toFight").empty();
              $(".combatText").empty();

              $("#yourCharImg").html(originalHtml);

              refreshTarget();
    }) 

    // choose your character and place all unchosen characters in the enemies area
    $(document).on("click", ".clickYour", function() {

        var dataCounter = 0;
        for (var i=0; i<charactersTarget.length; i++) {
            if (charactersTarget[i].find(".figure").attr("data-your") == 1) {
              dataCounter++;
            }
        }

        if (dataCounter<1) {
              $(this).find(".figure").attr("data-your", 1);
              yourCharOGattack = parseInt($(this).find(".figure").attr("data-ap"));

              for (var i=0; i<charactersTarget.length; i++) {
                if (charactersTarget[i].find("figure").attr("data-your") != 1) {

                    var attrId = charactersTarget[i].attr("id");

                    var newDiv = $("<div>").attr("id", attrId).addClass("click clickAttack");
                    newDiv.append(charactersHtml[i]);
                    newDiv.find(".characterImg").addClass("enemiesAvailable");
                    newDiv.find("figure").attr("data-attack", 1)

                    charactersTarget[i].remove();
                    $("#toAttack").append(newDiv);
                }

              refreshTarget(); 
              }
      }

    })

    // chosen enemies will move to defending area and allow for combat
    $(document).on("click", ".clickAttack", function() {

        var dataCounter = 0;
        for (var i=0; i<charactersTarget.length; i++) {
            if (charactersTarget[i].find(".figure").attr("data-defender") == 1) {
              dataCounter++;
            }
        }

        if (dataCounter<1) {
              $(this).find(".figure").attr("data-defender", 1).attr("data-attack", 0);

              var attrId = $(this).attr("id");

              var newDiv = $("<div>").attr("id", attrId).addClass("click clickDefender");
              newDiv.append($(this).html());
              newDiv.find(".characterImg").addClass("defender");
              newDiv.find("figure").attr("data-defender", 1)

              $(this).remove();
              $("#toFight").append(newDiv);

              refreshTarget();
        }
      
    })

    // conducts combat with your character and defending character
    $(".attackBtn").on("click", function() { 

              var yourChar;
              var yourCharCounter = 0;
              var defendingChar;
              var defendingCharCounter = 0;

              console.log(charactersTarget);

              // identify who is the attacker and defender
              for (var i=0; i<charactersTarget.length; i++) {
                  if (charactersTarget[i].find(".figure").attr("data-your") == 1) {
                    yourChar = charactersTarget[i];
                    yourCharCounter++;
                  }
                  else if (charactersTarget[i].find(".figure").attr("data-defender") == 1) {
                    defendingChar = charactersTarget[i];
                    defendingCharCounter++;
                  }
              }

              if (defendingCharCounter == 1 && yourCharCounter == 1) {

                    // define variables for values necessary for combat
                    var yourCharAtk = parseInt(yourChar.find(".figure").attr("data-ap"));
                    var yourCharHP = parseInt(yourChar.find(".figure").attr("data-hp"));
                    var defendingCharCounterAtk = parseInt(defendingChar.find(".figure").attr("data-cap"));
                    var defendingCharHp = parseInt(defendingChar.find(".figure").attr("data-hp"));

                    // inflict damage on opponenent
                    defendingCharHp -= yourCharAtk;

                    // if defender is under 0 hp, remove from game and print combat text. If defender is still still alive, print combat text
                    if (defendingCharHp <= 0) {
                      defendingChar.remove();
                      $(".combatText").text("You have dealt " + yourCharAtk + " damage! Defending character has been defeated! ");
                    }
                    else {
                      yourCharHP -= defendingCharCounterAtk;
                      $(".combatText").text("You have dealt " + yourCharAtk + " damage! Defending character has counter-attacked for " + defendingCharCounterAtk + " damage! ");
                      
                      if (yourCharHP <= 0) {
                          $(".combatText").append("You have been defeated! Try again!");
                          yourChar.remove();
                      }

                    }

                    // scale up your damage and reprint new HP values
                    yourCharAtk += yourCharOGattack;

                    yourChar.find(".figure").attr("data-ap", yourCharAtk);
                    yourChar.find(".figure").attr("data-hp", yourCharHP);
                    defendingChar.find(".figure").attr("data-hp", defendingCharHp);

                    reprintHP();
                    refreshTarget();
                    winCheck();

              }
    })  

})

