import { isMoveItemTypeAtOnce, ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { isTrump } from '../Card'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { Bid } from './Bid'
import { Memory } from './Memory'
import { getPoigneeMinTrumps, poignees } from './Poignee'
import { RuleId } from './RuleId'

export class PoigneeRule extends PlayerTurnRule {
  getPlayerMoves() {
    return this.poigneeMoves
  }

  get poigneeMoves() {
    const moves: MaterialMove[] = []
    const poigneeMinTrumps = getPoigneeMinTrumps(this.game.players.length)
    const playerTrumpsOrdered = this.playerTrumpsForPoignee.sort((item) => item.id)
    const indexes = playerTrumpsOrdered.getIndexes()
    for (const poignee of poignees) {
      moves.push(
        ...getCombinations(indexes, poigneeMinTrumps[poignee]).map((list) => this.material(MaterialType.Card).indexes(list).moveItemsAtOnce({ type: LocationType.Poigne }))
      )
    }

    return moves
  }

  get playerTrumpsForPoignee() {
    const playerTrumps = this.material(MaterialType.Card).player(this.player).id(isTrump)
    // Lorsque le preneur possède 4 Rois et 15 atouts, l’atout écarté doit être remontré avec la triple Poignée qui est alors comptabilisée.
    const bid = this.remind<Bid | undefined>(Memory.Bid, this.player)
    if (bid && bid < Bid.GuardWithoutTheKitty) {
      return playerTrumps
    } else {
      return playerTrumps.location(LocationType.Hand)
    }
  }


  afterItemMove(move: ItemMove) {
    if (isMoveItemTypeAtOnce(MaterialType.Card)(move)) {
      const poigneeMinTrumps = getPoigneeMinTrumps(this.game.players.length)
      const chosenPoignee = poignees.find((p) => poigneeMinTrumps[p] === move.indexes.length)
      this.memorize(Memory.Poigne, chosenPoignee, this.player)
      for (const item of this.material(MaterialType.Card).indexes(move.indexes).getItems()) {
        delete item.selected
      }
      return [this.rules().startSimultaneousRule(RuleId.AcknownledgePoignee, this.game.players.filter((p) => p !== this.player))]
    }

    return []
  }
}

/**
 * Compute possible combination depending on the array and the size of the combination
 * @param array The list of element to pick
 * @param size number of element to pick
 */
const getCombinations = (array: any[], size: number): any[] => {
  var i, j, combs, head, tailcombs;

  // There is no way to take e.g. arrays of 5 elements from
  // a array of 4.
  if (size > array.length || size <= 0) {
    return [];
  }

  // K-sized array has only one K-sized subarray.
  if (size == array.length) {
    return [array];
  }

  // There is N 1-sized subarrays in a N-sized array.
  if (size == 1) {
    combs = [];
    for (i = 0; i < array.length; i++) {
      combs.push([array[i]]);
    }
    return combs;
  }

  combs = [];
  for (i = 0; i < array.length - size + 1; i++) {
    // head is a list that includes only our current element.
    head = array.slice(i, i + 1);
    // We take smaller combinations from the subsequent elements
    tailcombs = getCombinations(array.slice(i + 1), size - 1);
    // For each (k-1)-combination we join it with the current
    // and store it to the array of k-combinations.
    for (j = 0; j < tailcombs.length; j++) {
      combs.push(head.concat(tailcombs[j]));
    }
  }
  return combs;
};