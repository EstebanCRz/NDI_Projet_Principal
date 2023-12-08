const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

c.fillRect(0, 0, canvas.width, canvas.height)

const gravity = 0.7

const background = new Sprite({
  position: {
    x: 0,
    y: 0
  },
  imageSrc: './img/background.png'
})


const player = new Fighter({
  position: {
    x: 400,
    y: 0
  },
  velocity: {
    x: 0,
    y: 0
  },

  imageSrc: './img/captaine/Idle.png',
  framesMax: 8,
  scale: 2.5,
  offset: {
    x: 205,
    y: 0,
  },
  sprites: {
    idle: {
      imageSrc: './img/captaine/Idle.png',
      framesMax: 8
    },
    run: {
      imageSrc: './img/captaine/Run.png',
      framesMax: 8
    },
    jump: {
      imageSrc: './img/captaine/Jump.png',
      framesMax: 2
    },
    fall: {
      imageSrc: './img/captaine/Fall.png',
      framesMax: 2
    },
    attack1: {
      imageSrc: './img/captaine/Attack1.png',
      framesMax: 6
    },
    takeHit: {
      imageSrc: './img/captaine/Take Hit - white silhouette.png',
      framesMax: 4
    },
    death: {
      imageSrc: './img/captaine/Death.png',
      framesMax: 6
    }
  },
  attackBox: {
    offset: {
      x: 100,
      y: 50,
    },
    width: 100,  // Ajustez la largeur de la boîte d'attaque
    height: 30,  // Ajustez la hauteur de la boîte d'attaque
  },
});

const enemy = new Fighter({
  position: {
    x: 200,
    y: 100
  },
  velocity: {
    x: 0,
    y: 0
  },
  color: 'blue',
  offset: {
    x: -50,
    y: 0
  },
  imageSrc: './img/kenji/Idle.png',
  framesMax: 4,
  scale: 2.5,
  offset: {
    x: -400,
    y: -10,
  },
  sprites: {
    idle: {
      imageSrc: './img/trump/Idle.png',
      framesMax: 4
    },
    run: {
      imageSrc: './img/trump/Run.png',
      framesMax: 8
    },
    jump: {
      imageSrc: './img/trump/Jump.png',
      framesMax: 2
    },
    fall: {
      imageSrc: './img/trump/Fall.png',
      framesMax: 2
    },
    attack1: {
      imageSrc: './img/trump/Attack1.png',
      framesMax: 4
    },
    takeHit: {
      imageSrc: './img/trump/Take hit.png',
      framesMax: 3
    },
    death: {
      imageSrc: './img/trump/Death.png',
      framesMax: 7
    }
  },
  attackBox: {
    offset: {
      x: -170,
      y: 50,
    },
    width: 120,  // Ajustez la largeur de la boîte d'attaque
    height: 30,  // Ajustez la hauteur de la boîte d'attaque
  },
});

console.log(player)

const keys = {
  q: {
    pressed: false
  },
  d: {
    pressed: false
  },
  ArrowRight: {
    pressed: false
  },
  ArrowLeft: {
    pressed: false
  }
}

decreaseTimer()

function animate() {
  window.requestAnimationFrame(animate)
  c.fillStyle = 'black'
  c.fillRect(0, 0, canvas.width, canvas.height)
  background.update()
  c.fillStyle = 'rgba(255, 255, 255, 0.15)'
  c.fillRect(0, 0, canvas.width, canvas.height)
  player.update()
  enemy.update()

  player.velocity.x = 0
  enemy.velocity.x = 0

  // player movement

  if (keys.q.pressed && player.lastKey === 'q') {
    player.velocity.x = -5
    player.switchSprite('run')
  } else if (keys.d.pressed && player.lastKey === 'd') {
    player.velocity.x = 5
    player.switchSprite('run')
  } else {
    player.switchSprite('idle')
  }

  // jumping
  if (player.velocity.y < 0) {
    player.switchSprite('jump')
  } else if (player.velocity.y > 0) {
    player.switchSprite('fall')
  }

  // Enemy movement
  if (keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft') {
    enemy.velocity.x = -5
    enemy.switchSprite('run')
  } else if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight') {
    enemy.velocity.x = 5
    enemy.switchSprite('run')
  } else {
    enemy.switchSprite('idle')
  }

  // jumping
  if (enemy.velocity.y < 0) {
    enemy.switchSprite('jump')
  } else if (enemy.velocity.y > 0) {
    enemy.switchSprite('fall')
  }

  // detect for collision & enemy gets hit
  if (
    rectangularCollision({
      rectangle1: player,
      rectangle2: enemy
    }) &&
    player.isAttacking &&
    player.framesCurrent === 4
  ) {
    enemy.takeHit()
    player.isAttacking = false

    gsap.to('#enemyHealth', {
      width: enemy.health + '%'
    })
  }

  // if player misses
  if (player.isAttacking && player.framesCurrent === 4) {
    player.isAttacking = false
  }

  // this is where our player gets hit
  if (
    rectangularCollision({
      rectangle1: enemy,
      rectangle2: player
    }) &&
    enemy.isAttacking &&
    enemy.framesCurrent === 2
  ) {
    player.takeHit()
    enemy.isAttacking = false

  }

  // if player misses
  if (enemy.isAttacking && enemy.framesCurrent === 2) {
    enemy.isAttacking = false
  }

  // end game based on health
  if (enemy.health <= 0 || player.health <= 0) {
    determineWinner({ player, enemy, timerId })
  }
}

animate()

window.addEventListener('keydown', (event) => {
  if (!player.dead) {
    switch (event.key) {
      case 'd':
        keys.d.pressed = true
        player.lastKey = 'd'
        break
      case 'q':
        keys.q.pressed = true
        player.lastKey = 'q'
        break
      case 'z':
        player.velocity.y = -20
        break
      case ' ':
        player.attack()
        break
    }
  }

  if (!enemy.dead) {
    switch (event.key) {
      case 'ArrowRight':
        keys.ArrowRight.pressed = true
        enemy.lastKey = 'ArrowRight'
        break
      case 'ArrowLeft':
        keys.ArrowLeft.pressed = true
        enemy.lastKey = 'ArrowLeft'
        break
      case 'ArrowUp':
        enemy.velocity.y = -20
        break
      case 'ArrowDown':
        enemy.attack()

        break
    }
  }
})

window.addEventListener('keyup', (event) => {
  switch (event.key) {
    case 'd':
      keys.d.pressed = false
      break
    case 'a':
      keys.a.pressed = false
      break
  }

  // enemy keys
  switch (event.key) {
    case 'ArrowRight':
      keys.ArrowRight.pressed = false
      break
    case 'ArrowLeft':
      keys.ArrowLeft.pressed = false
      break
  }
})
