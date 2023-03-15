import {
  AnchorComp,
  AreaComp,
  BodyComp,
  ColorComp,
  GameObj,
  KaboomCtx,
  Key,
  PosComp,
  ScaleComp,
  SpriteComp,
} from "kaboom"

enum KnightStates {
  idle = "idle",
  attack = "attack",
  def = "def",
  stun = "stun",
  die = "die",
  run = "run",
  attackCharge = "attackCharge",
}

enum Directions {
  up = "up",
  left = "left",
  right = "right",
  down = "down",
}

const MOVE_KEYS: { key: Key; direction: Directions }[] = [
  { key: "a", direction: Directions.left },
  { key: "s", direction: Directions.down },
  { key: "d", direction: Directions.right },
  { key: "w", direction: Directions.up },
]

export class Knight {
  sprite: GameObj<
    | SpriteComp
    | PosComp
    | AnchorComp
    | ScaleComp
    | AreaComp
    | BodyComp
    | ColorComp
  >
  k: KaboomCtx
  state: KnightStates = KnightStates.idle

  constructor(
    k: KaboomCtx,
    framesImg: string,
    pos: { x: number; y: number },
    name: string
  ) {
    this.k = k

    k.loadSprite("knight", framesImg, {
      sliceX: 46,
      anims: {
        [KnightStates.idle]: {
          from: 0,
          to: 0,
          speed: 1,
        },
        [KnightStates.def]: {
          from: 1,
          to: 6,
          speed: 16,
        },
        [KnightStates.attack]: {
          from: 8,
          to: 16,
          speed: 29,
        },
        [KnightStates.die]: {
          from: 17,
          to: 24,
          speed: 5,
        },
        [KnightStates.stun]: {
          from: 24,
          to: 34,
          speed: 5,
          loop: true,
        },
        [KnightStates.run]: {
          from: 36,
          to: 45,
          speed: 10,
          loop: true,
        },
      },
    })

    this.sprite = k.add([
      k.sprite("knight"),
      k.pos(pos.x, pos.y),
      k.anchor("center"),
      k.scale(4),
      k.area({ offset: k.vec2(0, 10) }),
      k.body({ gravityScale: 0 }),
      k.color(),
      name,
    ])

    this._init()
  }

  _init() {
    this._initAnimEndListeners()
  }

  initKeyListeners() {
    // init move keys "down" and "release" listeners
    MOVE_KEYS.forEach((moveKey) => {
      this.k.onKeyDown(moveKey.key, () => {
        this.move(moveKey.direction)
      })

      this.k.onKeyRelease(moveKey.key, () => {
        // play idle animation only if none of moveKeys are pressed
        if (!this._isMoveKeyDown()) {
          this.sprite.play(KnightStates.idle)
        }
      })
    })

    this.k.onKeyPress("j", () => {
      this.attack()
    })

    this.k.onKeyPress("k", () => {
      this.def()
    })
  }

  _initAnimEndListeners() {
    this.sprite.onAnimEnd((animation) => {
      if (animation !== KnightStates.idle && animation !== KnightStates.run) {
        this.state = KnightStates.idle
      }
    })
  }

  move(direction: Directions) {
    if (this.state !== KnightStates.idle && this.state !== KnightStates.run) {
      return
    }

    this.state = KnightStates.run

    // play run animation only if current animation is idle or undefined
    if (this.sprite.curAnim() === KnightStates.idle || !this.sprite.curAnim()) {
      this.sprite.play(KnightStates.run)
    }

    switch (direction) {
      case Directions.up:
        this.sprite.move(0, -100)
        break

      case Directions.down:
        this.sprite.move(0, 100)
        break

      case Directions.left:
        this.sprite.flipX = true
        this.sprite.move(-100, 0)
        break

      case Directions.right:
        this.sprite.flipX = false
        this.sprite.move(100, 0)
        break
    }
  }

  attack() {
    if (this.state !== KnightStates.run && this.state !== KnightStates.idle) {
      return
    }
    
    this.state = KnightStates.attackCharge
    this.sprite.play(KnightStates.attack)

    setTimeout(() => {
      this.state = KnightStates.attack
    }, 150)
  }

  def() {
    if (this.state !== KnightStates.run && this.state !== KnightStates.idle) {
      return
    }
    
    this.state = KnightStates.def
    this.sprite.play(KnightStates.def)
  }

  _isMoveKeyDown(): boolean {
    return MOVE_KEYS.some((moveKey) => this.k.isKeyDown(moveKey.key))
  }
}
