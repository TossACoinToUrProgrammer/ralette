import { CharacterControls } from "app/types"
import kaboom, { Color, KaboomCtx, KaboomOpt } from "kaboom"

import { Knight, KnightStates } from "./Knight"

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
      { x: this.k.width() / 2, y: this.k.height() / 8 },
      "player"
    )
    player.setControls(firstPlayerControls)

    const player2 = new Knight(
      this.k,
      { x: 200, y: 200 },
      "player2",
      [150, 50, 225]
    )
    player2.setControls(secondPlayerControls)

    player.onAttack(() => this._onAttackHandler(player, player2))
    player2.onAttack(() => this._onAttackHandler(player2, player))
  }

  _onAttackHandler(player: Knight, player2: Knight) {
    //--- check if attack within range, if not => return
    const playerX = player.sprite.pos.x
    const playerY = player.sprite.pos.y
    const player2X = player2.sprite.pos.x
    const player2Y = player2.sprite.pos.y

    if (player.sprite.flipX) {
      if (player2X < playerX - 200 || player2X >= playerX) return
    } else {
      if (playerX < player2X - 200 || playerX >= player2X) return
    }

    if (playerY < player2Y) {
      if (playerY + 60 < player2Y) return
    } else {
      if (playerY - 100 > player2Y) return
    }
    //---------------------------------------------------

    if (player2.state === KnightStates.def) {
      player.stunned()
      return
    }

    if (
      player2.state !== KnightStates.stun &&
      player2.state !== KnightStates.die
    ) {
      player2.attacked(
        player2.sprite.pos.x < player.sprite.pos.x ? "left" : "right"
      )
      return
    }
  }
}
