---
to: _templates/<%= name %>/<%= action || 'new' %>/prompt.cjs
---

// see types of prompts:
// https://github.com/enquirer/enquirer/tree/master/examples
//
module.exports = [
  {
    type: 'input',
    name: 'message',
    message: "What's your message?"
  }
]
