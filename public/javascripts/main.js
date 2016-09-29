(function(){
  'use-strict';

  function readJSON(file, callback) {
      var rawFile = new XMLHttpRequest();
      rawFile.overrideMimeType("application/json");
      rawFile.open("GET", file, true);
      rawFile.onreadystatechange = function() {
          if (rawFile.readyState === 4 && rawFile.status == "200") {
              callback(rawFile.responseText);
          }
      }
      rawFile.send(null);
  }

  //usage:
  readJSON("/fazenda.json", function(text){
      var fazenda = JSON.parse(text);
      for(var participant in fazenda.data){

        fazenda.data.sort(function(a, b){
            return a.positive - b.positive;
        })
        if(fazenda.data[participant].positive <= 0 || fazenda.data[participant].negative <= 0){
          var haveNoVotes = 0;
          var positiveVotes = haveNoVotes;
          var negativeVotes = haveNoVotes;
          var totalVotes = positiveVotes + negativeVotes;
          var percentLike = haveNoVotes;
          var percentDislike = haveNoVotes;
        }
        else {
          var positiveVotes = parseInt(fazenda.data[participant].positive);
          var negativeVotes = parseInt(fazenda.data[participant].negative);
          var totalVotes = positiveVotes + negativeVotes;
          var percentLike = (positiveVotes/totalVotes) * 100;
          percentLike = Math.round(percentLike).toFixed(0);
          var percentDislike = (negativeVotes/(positiveVotes + negativeVotes)) * 100;
          percentDislike = Math.round(percentDislike).toFixed(0);
        }

        var name = fazenda.data[participant].name;
        var avatarUrl = fazenda.data[participant].picture;
        var description = fazenda.data[participant].description;
        var descriptionConverted = document.createElement('div');
        descriptionConverted.innerHTML = description;

// CRIA OS ELEMENTOS

        var li = document.createElement('li');
        var avatar = document.createElement('div');
        var avatarImg = document.createElement('img');
        var position = document.createElement('div');
        var positionNumber = document.createElement('span');
        var info = document.createElement('div');
        var infoName = document.createElement('h2');
        var infoDescription = document.createElement('sub');
        var tooltipText = document.createElement('div');
        var positive = document.createElement('div');
        var positiveTitle = document.createElement('p');
        var positiveNumber = document.createElement('span');
        var negative = document.createElement('div');
        var negativeTitle = document.createElement('p');
        var negativeNumber = document.createElement('span');

// DEFINE AS CLASSES DE CADA ELEMENTO

        li.className = 'tooltip';
        avatar.className = 'avatar';
        position.className = 'position';
        info.className = 'info';
        infoName.className = 'name';
        infoDescription.className = 'description';
        tooltipText.className = 'tooltiptext';
        positive.className = 'positive';
        negative.className = 'negative';

// AGRUPA OS ELEMENTOS

        li.appendChild(avatar);
        li.appendChild(info);
        li.appendChild(tooltipText);

        avatar.appendChild(avatarImg);
        avatar.appendChild(position);

        position.appendChild(positionNumber);

        info.appendChild(infoName);
        info.appendChild(infoDescription);

        tooltipText.appendChild(positive);
        tooltipText.appendChild(negative);

        positive.appendChild(positiveTitle);
        positive.appendChild(positiveNumber);

        negative.appendChild(negativeTitle);
        negative.appendChild(negativeNumber);

// DEFINE O VALOR DOS ITENS
        avatarImg.src = avatarUrl;
        avatarImg.alt = name + " - " + description;
        infoName.appendChild(document.createTextNode(name));
        infoDescription.appendChild(descriptionConverted);
        positiveTitle.appendChild(document.createTextNode("Gostam"));
        negativeTitle.appendChild(document.createTextNode("Não gostam"));
        positiveNumber.appendChild(document.createTextNode(percentLike + "%"));
        negativeNumber.appendChild(document.createTextNode(percentDislike + "%"));

// CONTA O NÚMERO DE PARTICIPANTES E DEFINE A CLASSIFICAÇÃO
        if(numberCount <= fazenda.data.length){
          numberCount--;

        }else {
          var numberCount = fazenda.data.length;
        }

// DEFINE O VALOR DAS POSIÇÕES
        positionNumber.appendChild(document.createTextNode(numberCount));

// EXIBE A LISTA NA TELA
        var list = document.getElementById("ranking");
        list.insertBefore(li, list.childNodes[0]);
      }

  });

})();
