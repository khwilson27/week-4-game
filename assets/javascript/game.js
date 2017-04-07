
// define variables
var emmaHtml = $("#emma").html();
var ryanHtml = $("#ryan").html();
var johnHtml = $("#john").html();
var hollywoodHtml = $("#hollywood").html();

var emmaTarget = $("#emma");
var ryanTarget = $("#ryan");
var johnTarget = $("#john");
var hollywoodTarget = $("#hollywood");

var charactersHtml = [emmaHtml, ryanHtml, johnHtml, hollywoodHtml];
var charactersTarget = [emmaTarget, ryanTarget, johnTarget, hollywoodTarget];

// console.log(charactersHtml);
// console.log(charactersTarget);

$(".click").on("click", function() {

    var dataYourCounter = 0;
    for (var i=0; i<charactersTarget.length; i++) {
        if (charactersTarget[i].find(".figure").attr("data-your") == "1") {
          dataYourCounter++;
        }
    }

    if (dataYourCounter<1) {
          $(this).find(".figure").attr("data-your", "1");

          for (var i=0; i<charactersTarget.length; i++) {
            if (charactersTarget[i].find("figure").attr("data-your") != "1") {

                var attrId = charactersTarget[i].attr("id");
                var attrClass = charactersTarget[i].attr("class");

                var newDiv = $("<div>").attr("id", attrId).addClass(attrClass);
                newDiv.append(charactersHtml[i]);
                newDiv.find(".characterImg").addClass("enemiesAvailable");

                charactersTarget[i].remove();
                $("#toAttack").append(newDiv);
            }


          }
  }

})




