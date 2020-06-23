class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    racer1 = createSprite(200,100);
    racer1.addImage("racer1",racer1_img);

    racer1.collide(ground1);

    

    racer2 = createSprite(200,300);
    racer2.addImage("racer2",racer1_img);

    racer3 = createSprite(200,500);
    racer3.addImage("racer3",racer1_img);

    racer4 = createSprite(200,700);
    racer4.addImage("racer4",racer1_img);

    racers = [racer1, racer2, racer3, racer4];



  }

  play(){
    form.hide();
    
    Player.getPlayerInfo();

    player.getRacersAtEnd();
    
    if(allPlayers !== undefined){
      background("white");
      
      var index = 0;

      var x;
      var y = 0;

      for(var plr in allPlayers){
 
        index = index + 1 ;

        y = y + 200;

        x = displayWidth - allPlayers[plr].distance;
        racers[index-1].x = x;
        racers[index-1].y = y;

       
        if (index === player.index){
          stroke(10);
          fill("red");
          ellipse(x,y,30,30);
          racers[index - 1].shapeColor = "red";
          camera.position.x =  racers[index-1].x;
          camera.position.y = displayHeight/2 + 100;
        }
      
      }

    }

    if(keyIsDown(RIGHT_ARROW) && player.index !== null){
      player.distance -=10;
      player.update();
    }

    if(keyDown(UP_ARROW) && player.index !== null){
      console.log(racer1.y);

      racers[index -4].y -=50;
    }

    if(player.index !== null){
      if(player.y === 200);
      player.velocityY = 2;
    }

    if(player.distance < -3860){
      gameState = 2;
      player.rank ++;
      Player.updateRacersAtEnd(player.rank);
    }
   
    //console.log(racer1.x);
    drawSprites();
  }

  end(){
    console.log("Game Ended");
    console.log(player.rank);
  }
}

