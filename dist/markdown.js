"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_tags_1 = require("common-tags");
const playedBy = {
    "Ba'Raknul": "Liam",
    "Biron": "Chris",
    "Orin": "Morgan",
    "Quinn": "Mark",
};
const renderEvent = (event) => {
    switch (event.kind) {
        case 'action': return `\n  <p class="action">${event.message}</p>`;
        case 'speech': return `\n  <p>${event.message}</p>`;
        case 'partial': return `\n  <p><span class="action">${event.action}</span> ${event.message}</p>`;
    }
};
const renderEvents = (events) => events.map(renderEvent).join('');
const renderPlayerMessage = (message) => {
    if (message.events.length === 1) {
        const event = message.events[0];
        switch (event.kind) {
            case 'action': return `\n<dt>${message.actor}</dt>\n<dd class="action">${event.message}</dd>\n`;
            case 'speech': return `\n<dt>${message.actor}</dt>\n<dd>${event.message}</dd>\n`;
            case 'partial': return `\n<dt>${message.actor}</dt>\n<dd><span class="action">${event.action}</span> ${event.message}</dd>\n`;
        }
    }
    return `\n<dt>${message.actor}</dt>\n<dd>${renderEvents(message.events)}\n</dd>\n`;
};
const renderGameMasterMessage = (message) => {
    const preamble = common_tags_1.stripIndent `
    </dl>`;
    const messages = message.events.map(event => `<p>${event.message}</p>`).join('\n\n');
    const postamble = common_tags_1.stripIndent `
    <dl>`;
    return preamble + '\n\n' + messages + '\n\n' + postamble;
};
const renderMessage = (message) => {
    switch (message.kind) {
        case 'player': return renderPlayerMessage(message);
        case 'roll': return `</dl>\n\n<aside>\n  <p>${playedBy[message.roller]} rolled a ${message.result} for ${message.roller}'s ${message.check} check.</p>\n</aside>\n\n<dl>`;
        case 'private': return '';
        case 'gm': return renderGameMasterMessage(message);
    }
};
exports.toMarkdown = (messages) => {
    const preamble = common_tags_1.stripIndent `
      ---
      title:
      date:
      collection: articles
      layout: post.hbs
      id:
      ---
      <section class="chat">

      <dl>`;
    const postamble = common_tags_1.stripIndent `
      </dl>

      <p>To be continued...</p>

      </section>`;
    return preamble + messages.map(renderMessage).join('') + postamble;
};
