import { CharacterControls } from "app/types"
import kaboom, { Color, KaboomCtx, KaboomOpt } from "kaboom"

import { Knight, KnightStates } from "./Knight"
import knightFramesPNG from "./knight_frames_small.png"

export class GameController {
  k: KaboomCtx

  constructor(options: KaboomOpt | undefined) {
    this.k = kaboom(options)
  }

  start(
    firstPlayerControls?: CharacterControls,
    secondPlayerControls?: CharacterControls
  ) {
    if (!firstPlayerControls) {
      firstPlayerControls = {
        attack: "j",
        def: "k",
        moveDown: "s",
        moveLeft: "a",
        moveRight: "d",
        moveUp: "w",
      }
    }
    if (!secondPlayerControls) {
      secondPlayerControls = {
        attack: "4",
        def: "5",
        moveDown: "down",
        moveLeft: "left",
        moveRight: "right",
        moveUp: "up",
      }
    }

    const player = new Knight(
      this.k,
      knightFramesPNG,
      { x: this.k.width() / 2, y: this.k.height() / 8 },
      "player"
    )
    player.setControls(firstPlayerControls)

    const player2 = new Knight(
      this.k,
      knightFramesPNG,
      { x: 200, y: 200 },
      "player2",
      [150, 50, 225]
    )
    player2.setControls(secondPlayerControls)

    player.onAttack(() => {
      if (!player.sprite.isColliding(player2.sprite)) return

      if (player2.state === KnightStates.def) {
        player.stunned()
      }

      if (
        player2.state !== KnightStates.def &&
        player2.state !== KnightStates.stun &&
        player2.state !== KnightStates.die
      ) {
        player2.attacked(
          player2.sprite.pos.x < player.sprite.pos.x ? "left" : "right"
        )
      }
    })
  }
}
