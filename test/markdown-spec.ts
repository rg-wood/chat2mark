// import { toMarkdown } from '../src/markdown'
// import { PlayerMessage, GameMasterMessage, Action, Speech, Rolls, Roll, Private, PartialAction } from '../src/messages'
// import * as chai from 'chai'
// import { stripIndent } from 'common-tags'

// const expect = chai.expect

// describe('toMarkdown()', () => {
//   it('should add markdown preamble', () => {
//     expect(toMarkdown([])).to.include(
//       `---
// title:
// date:
// collection: articles
// layout: post.hbs
// id:
// ---`)
//   })

//   it('should include simple speech message', () => {
//     expect(toMarkdown([new PlayerMessage('Orin', [new Speech('You do have an awful lot of stories.')])])).to.include(
//       stripIndent`
//         <section class="chat">

//         <dl>
//         <dt>Orin</dt>
//         <dd>You do have an awful lot of stories.</dd>
//         </dl>

//         <p>To be continued...</p>

//         </section>`
//     )
//   })

//   it('should include complex speech message', () => {
//     const message: PlayerMessage =
//       new PlayerMessage(
//         'Orin',
//         [
//           new Speech('You do have an awful lot of stories.'),
//           new Speech('But they are all boring!')
//         ]
//       )

//     expect(toMarkdown([message])).to.include(
//       stripIndent`
//         <dt>Orin</dt>
//         <dd>
//           <p>You do have an awful lot of stories.</p>
//           <p>But they are all boring!</p>
//         </dd>`
//     )
//   })

//   it('should include simple action message', () => {
//     expect(toMarkdown([new PlayerMessage('Orin', [new Action('raises an eyebrow at Quinn.')])])).to.include(
//       stripIndent`
//         <dl>
//         <dt>Orin</dt>
//         <dd class="action">raises an eyebrow at Quinn.</dd>
//         </dl>`)
//   })

//   it('should include complex action message', () => {
//     const message: PlayerMessage =
//       new PlayerMessage(
//         'Orin',
//         [
//           new Action('raises an eyebrow at Quinn.'),
//           new Action('Takes a bite out of an apple.')
//         ]
//       )

//     expect(toMarkdown([message])).to.include(
//       stripIndent`
//         <dt>Orin</dt>
//         <dd>
//           <p class="action">raises an eyebrow at Quinn.</p>
//           <p class="action">Takes a bite out of an apple.</p>
//         </dd>`
//     )
//   })

//   it('should include complex action and speech message', () => {
//     const message: PlayerMessage =
//       new PlayerMessage(
//         'Orin',
//         [
//           new Action('raises an eyebrow at Quinn.'),
//           new Speech('That sounds strange.')
//         ]
//       )

//     expect(toMarkdown([message])).to.include(
//       stripIndent`
//         <dt>Orin</dt>
//         <dd>
//           <p class="action">raises an eyebrow at Quinn.</p>
//           <p>That sounds strange.</p>
//         </dd>`
//     )
//   })

//   it('should space messages', () => {
//     const messages = [
//       new PlayerMessage('Orin', [new Speech('You do have an awful lot of stories.')]),
//       new PlayerMessage('Biron', [new Speech('Best way to learn.')])
//     ]

//     expect(toMarkdown(messages)).to.include(
//       stripIndent`
//         <dt>Orin</dt>
//         <dd>You do have an awful lot of stories.</dd>

//         <dt>Biron</dt>
//         <dd>Best way to learn.</dd>`)
//   })

//   it('should include simple roll message', () => {
//     expect(toMarkdown([new Rolls([new Roll('Orin', 9, 'Stealth')])])).to.include(
//       stripIndent`
//         <aside>
//           <p>Morgan rolled a 9 for Orin's Stealth check.</p>
//         </aside>`)
//   })

//   it('should include simple roll message without check', () => {
//     expect(toMarkdown([new Rolls([new Roll('Orin', 9)])])).to.include(
//       stripIndent`
//         <aside>
//           <p>Morgan rolled a 9.</p>
//         </aside>`)
//   })

//   it('should terminate and start description list around roll message', () => {
//     expect(toMarkdown([new Rolls([new Roll('Orin', 9, 'Stealth')])])).to.include(
//       stripIndent`
//         </dl>

//         <aside>
//           <p>Morgan rolled a 9 for Orin's Stealth check.</p>
//         </aside>

//         <dl>`)
//   })

//   it('should include multiple roll message', () => {
//     expect(toMarkdown([new Rolls([new Roll('Orin', 9, 'Stealth'), new Roll('Quinn', 15, 'Perception')])])).to.include(
//       stripIndent`
//         <aside>
//           <p>Morgan rolled a 9 for Orin's Stealth check.</p>
//           <p>Mark rolled a 15 for Quinn's Perception check.</p>
//         </aside>`)
//   })

//   it('should ignore private message', () => {
//     expect(toMarkdown([new Private()])).to.include(
//       stripIndent`
//         <section class="chat">

//         <dl></dl>

//         <p>To be continued...</p>

//         </section>`
//     )
//   })

//   it('should include partial action', () => {
//     expect(toMarkdown([new PlayerMessage('Biron', [new PartialAction('grunts', 'Best way to learn.')])])).to.include(
//       stripIndent`
//         <dt>Biron</dt>
//         <dd><span class="action">grunts</span> Best way to learn.</dd>`)
//   })

//   it('should include partial action mixed with another message', () => {
//     const message = new PlayerMessage(
//       'Biron',
//       [
//         new PartialAction('grunts', 'Best way to learn.'),
//         new Speech('That sounds strange.')
//       ]
//     )

//     expect(toMarkdown([message])).to.include(
//       stripIndent`
//         <dt>Biron</dt>
//         <dd>
//           <p><span class="action">grunts</span> Best way to learn.</p>`
//     )
//   })

//   it('should include GM speech', () => {
//     expect(toMarkdown([new GameMasterMessage([new Speech('Hello, World')])])).to.include(
//       stripIndent`
//         <p>Hello, World</p>`)
//   })

//   it('should close and open list around GM speech', () => {
//     expect(toMarkdown([new GameMasterMessage([new Speech('Hello, World')])])).to.include(
//       stripIndent`
//         </dl>

//         <p>Hello, World</p>

//         <dl>`
//     )
//   })

//   it('should properly space GMs speech', () => {
//     expect(toMarkdown([new GameMasterMessage([new Speech('Hello, World'), new Speech('Hello, World')])])).to.include(
//       stripIndent`
//         </dl>

//         <p>Hello, World</p>

//         <p>Hello, World</p>

//         <dl>`
//     )
//   })

// })
