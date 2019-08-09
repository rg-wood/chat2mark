import { groupAdjacent } from '../src/group-adjacent'
import * as chai from 'chai'

const expect = chai.expect

describe('Array.groupAdjacent()', () => {

  it('should group adjacent values', () => {
    const incrementsofOne: (prev: number, cur: number) => boolean = (prev: number, cur: number) => cur - prev === 1
    expect(groupAdjacent([1, 2, 3, 6, 7, 8], incrementsofOne)).to.deep.equal([[1, 2, 3], [6, 7, 8]])
  })

})
