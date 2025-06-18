# skin

Gatewatcher Design System

## Figma

[Maquettes Figma](https://www.figma.com/file/xRJI6rsiEX2A89W4iTpBLG/Gatewatcher---Design-system?t=MQMleY89hVv9KtdV-0)

## Linters

Fix all linters (ts and scss) : `npm run lint:fix`

## Component generation

```
npx hygen component new
```

1. **Enter the component name.**  
   Separate words will be automatically Pascal-cased.
2. **Enter the component path, starting from `src/`.**  
   Directories will be created if they don't exist.  
    This can be left empty.
3. **Enter the story category or leave it empty.**  
   Storybook will group stories according to this.

## Utils

### Cypress

Location : `./cypress/utils.ts`

- `goTo(group: string, component: string): { goToStory() }` Accept groupName and
  componentName. It returns a function to go withCypress on story, with params
  if necessary.

```ts
const { goToStory } = goTo('typography', 'title');
// Return a function to go on Typography/Title method
it('should match screenshot', () => {
  goToStory();
  // go on Typography/title -> default Story
  cy.matchSnapshot('paragraph');
});

it('should match screenshot with extra markup', () => {
  goToStory('with-extra-markup');
  // go on Typography/title -> with extra markup story
  cy.matchSnapshot('with-extra-markup');
});

it('should match screenshot with extra markup', () => {
  goToStory('heading-level', { as: 'h2' });
  // go on Typography/title -> HeadingLevel story with as params
  // typography-title--heading-level&args=as:h2
  cy.matchSnapshot('with-extra-markup');
});
```

### Storybook

Location : `./.storybook/utils.ts`

- `addSelect(propName: string, choices: string[])` : Add select on storybook
  controls
- `addMultiSelect(propName: string, choices: string[])` : Add MultiSelect on
  storybook controls
- `addInlineRadio(propName: string, choices: string[])` : Add select on
  storybook controls

### Components

Location : `./src/utils/index.ts`
