function rectangularCollision({ rectangle1, rectangle2, minDistance = 20 }) {
  // Positions et dimensions des boîtes d'attaque
  const rect1X = rectangle1.attackBox.position.x;
  const rect1Y = rectangle1.attackBox.position.y;
  const rect1Width = rectangle1.attackBox.width;
  const rect1Height = rectangle1.attackBox.height;

  const rect2X = rectangle2.attackBox.position.x;
  const rect2Y = rectangle2.attackBox.position.y;
  const rect2Width = rectangle2.attackBox.width;
  const rect2Height = rectangle2.attackBox.height;

  // Calculer le centre des boîtes d'attaque
  const rect1CenterX = rect1X + rect1Width / 2;
  const rect1CenterY = rect1Y + rect1Height / 2;

  const rect2CenterX = rect2X + rect2Width / 2;
  const rect2CenterY = rect2Y + rect2Height / 2;

  // Calculer la distance entre les centres des boîtes d'attaque
  const distanceX = Math.abs(rect1CenterX - rect2CenterX);
  const distanceY = Math.abs(rect1CenterY - rect2CenterY);

  // Vérifier la collision en prenant en compte la distance minimale
  const collision =
    distanceX < (rect1Width + rect2Width) / 2 + minDistance &&
    distanceY < (rect1Height + rect2Height) / 2 + minDistance;

  // Retourner un objet avec des informations sur la collision
  return {
    collision: collision,
    rect1: {
      x: rect1X,
      y: rect1Y,
      width: rect1Width,
      height: rect1Height,
    },
    rect2: {
      x: rect2X,
      y: rect2Y,
      width: rect2Width,
      height: rect2Height,
    },
  };
}
 


function determineWinner({ player, enemy, timerId }) {
  clearTimeout(timerId)
  document.querySelector('#displayText').style.display = 'flex'
  if (player.health === enemy.health) {
    document.querySelector('#displayText').innerHTML = 'Temps écoulé, match nul'
  } else if (player.health > enemy.health) {
    document.querySelector('#displayText').innerHTML = 'Vicoire du capitaine ecologie encore'
  } else if (player.health < enemy.health) {
    document.querySelector('#displayText').innerHTML = 'Vicoire du capitaine ecologie qui ne perd jamais'
  }
}

let timer = 60
let timerId
function decreaseTimer() {
  if (timer > 0) {
    timerId = setTimeout(decreaseTimer, 1000)
    timer--
    document.querySelector('#timer').innerHTML = timer
  }

  if (timer === 0) {
    determineWinner({ player, enemy, timerId })
  }
}
