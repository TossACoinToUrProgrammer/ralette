import { CharacterControls } from "app/types"
import {
  AnchorComp,
  AreaComp,
  BodyComp,
  Color,
  ColorComp,
  GameObj,
  KaboomCtx,
  Key,
  PosComp,
  ScaleComp,
  SpriteComp,
} from "kaboom"

import knightFramesPNG from "./knight_frames_small.png"
import slashPng from "./slashFrames2.png"

export enum KnightStates {
  idle = "idle",
  attack = "attack",
  def = "def",
  stun = "stun",
  die = "die",
  run = "run",
  attackCharge = "attackCharge",
  defCharge = "defCharge",
}

enum Directions {
  up = "up",
  left = "left",
  right = "right",
  down = "down",
}

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
  moveKeys: { key: Key; direction: Directions }[] = []
  _onAttack?: Function

  constructor(
    k: KaboomCtx,
    pos: { x: number; y: number },
    name: string,
    color?: [number, number, number]
  ) {
    this.k = k

    k.loadSprite("knight", knightFramesPNG, {
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
          from: 25,
          to: 34,
          speed: 10,
        },
        [KnightStates.run]: {
          from: 36,
          to: 45,
          speed: 10,
          loop: true,
        },
      },
    })
    k.loadSprite("slash", slashPng, {
      sliceX: 6,
      anims: {
        slash: {
          from: 0,
          to: 5,
          speed: 10,
        },
      },
    })

    this.sprite = k.add([
      k.sprite("knight"),
      k.pos(pos.x, pos.y),
      k.anchor("center"),
      k.scale(4),
      k.area({ scale: 0.8, offset: k.vec2(0, 10) }),
      k.body({ gravityScale: 0 }),
      k.z(1),
      color ? k.color(...color) : k.color(),
      name,
    ])

    this._init()
  }

  _init() {
    this._setAnimEndListener()
  }

  setControls(controls: CharacterControls) {
    const { attack, def, moveUp, moveDown, moveLeft, moveRight } = controls

    this._initMoveKeys(moveUp, moveDown, moveLeft, moveRight)
    // set move keys "down" and "release" listeners
    this.moveKeys.forEach((moveKey) => {
      this.k.onKeyDown(moveKey.key, () => {
        this.run(moveKey.direction)
      })

      this.k.onKeyRelease(moveKey.key, () => {
        // play idle animation only if none of moveKeys are pressed and current state is run
        if (!this._isMoveKeyDown() && this.state === KnightStates.run) {
          this.sprite.play(KnightStates.idle)
        }
      })
    })

    this.k.onKeyPress(attack, () => {
      this.attack()
    })

    this.k.onKeyPress(def, () => {
      this.def()
    })
  }

  _initMoveKeys(moveUp: Key, moveDown: Key, moveLeft: Key, moveRight: Key) {
    this.moveKeys = [
      { key: moveLeft, direction: Directions.left },
      { key: moveDown, direction: Directions.down },
      { key: moveRight, direction: Directions.right },
      { key: moveUp, direction: Directions.up },
    ]
  }

  _setAnimEndListener() {
    this.sprite.onAnimEnd((animation) => {
      if (animation !== KnightStates.idle && animation !== KnightStates.run) {
        this.state = KnightStates.idle
      }
    })
  }

  run(direction: Directions) {
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
      if (this._onAttack) this._onAttack()
      this._playSlashAnim()
      this.state = KnightStates.attack
    }, 150)
  }

  _playSlashAnim() {
    const x = this.sprite.flipX ? -130 : -50

    const slash = this.k.add([
      this.k.sprite("slash"),
      this.k.pos(this.sprite.pos.x + x, this.sprite.pos.y - 80),
      this.k.lifespan(0.3, { fade: 0.5 }),
      this.k.scale(0.6),
      this.k.z(0),
    ]) as GameObj<SpriteComp>

    slash.flipX = this.sprite.flipX

    slash.play("slash")
  }

  def() {
    if (this.state !== KnightStates.run && this.state !== KnightStates.idle) {
      return
    }

    this.state = KnightStates.defCharge
    this.sprite.play(KnightStates.def)

    let resetColors: Function
    setTimeout(() => {
      this.state = KnightStates.def
      resetColors = this._changeColor(155, 255, 55)
    }, 40)

    setTimeout(() => {
      this.state = KnightStates.defCharge
      resetColors()
    }, 200)
  }

  stunned() {
    this.state = KnightStates.stun
    this.sprite.play(KnightStates.stun)
  }

  attacked(pushDirection: "left" | "right") {
    // set red filter
    const resetColors = this._changeColor(255, 55, 55)

    // smooth push effect
    const interval = setInterval(() => {
      this.sprite.move(pushDirection === "left" ? -200 : 200, 0)
    }, 30)

    setTimeout(() => {
      resetColors()
      clearInterval(interval)
    }, 300)
  }

  onAttack(cb: Function) {
    this._onAttack = cb
  }

  // changes sprite.color and returns function that cancels these changes
  _changeColor(r: number, g: number, b: number) {
    const temp = { ...this.sprite.color } as Color
    this.sprite.color = { r, g, b } as Color

    return () => {
      this.sprite.color = temp
    }
  }

  _isMoveKeyDown(): boolean {
    return this.moveKeys.some((moveKey) => this.k.isKeyDown(moveKey.key))
  }
}
