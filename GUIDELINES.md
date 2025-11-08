## Guidelines

## DS Motivations
- Visual consistency
- Share component
- Time saving
- Less duplicated code betweend appliances
- Efficient documentation
- Better / unified user experience
- Less custom styles in appliance

### Scaffolding
All component files are in `src` directory.  
It will be divided into some sections (To be defined). 
Each section folder have an `index.tsx` that export all types and component.  
To import a component in an appliance, write :   
`import { Stack } from '@gw/skin/Spacing';` 

#### Component
A component is located in a folder named according to the component name. 
One file equal one component.
- Related unit tests are located in `__tests__` directory, the test file is named according to the component name.
- Component is located in index.tsx
- Story name is suffixed with `.stories.tsx`
- Styles are named `styles.module.scss`

For example, with a Stack component : 
```
├── Stack
|   ├── __tests__
|   |   ├── Stack.test.tsx
|   ├── index.tsx
|   ├── Stack.stories.tsx
|   └── styles.module.scss
```
If it make sense we could add a `<ComponentName>.constant.ts` to share constants between stories, E2E tests & unit tests.

### Commits
Commit are formatted according to [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/).
Commit format is enforced using [commitlint](https://github.com/conventional-changelog/commitlint).

### Storybook
We are using [storybook](https://storybook.js.org/) to visualize & document components.  
All components will be documented and all props will be defined in docs tab.  
Storybook ComponentName should be exactly the same as define in code (follow folder scaffolding if any).

Features : 
  - All props documented in docs tab
  - Dark mode
  - Interactive stories
  - A11y 
We should define when to use component variant vs params.
If we have only one case, instead of adding a default Folder, we should set  
`Default.storyName` = `ComponentName`

### Naming consistency
Each component has an exported type (TypeScript) in PascalCase (ex: `export type StackProps = {}`)  
Props will be ordered alphabetically in type declaration.  
Props will be spread. Sort order will be defined later.   

Naming pattern :
- `with<Something>`: boolean that enabled/disabled feature.
```ts
export type StackProps = {
  withGrid?: boolean; // Activate or not the grid feature
}
```

- "Simple past" : For state
```ts
export type TooltipProps = {
  isOpened: boolean;
}
```

- Infinitive : For methods
```ts
export type TooltipProps = {
  isOpened: boolean; // Opened state
  open: () => void // Method to open the tooltip
}
```

- `on<EventName>` : For callbacks
```ts
export type ButtonProps = {
  onClick: () => void;
}
```

- `handle<Something>` : For internal callback
```ts
const Button = ({ }) => {
  const handleClick = () => {
    console.log('click')
  }

  return <button onClick={handleClick}>Button</button>
}
```

- `use<Infinitive>` : React hooks

- MY_CONSTANT : Constants should be in `screaming snake case`.


### Formaters & linters
Our formatter is `prettier`. Rules are  
- See `.prettierrc` for generic rules. 
- [Import order](https://github.com/trivago/prettier-plugin-sort-imports/tree/master/src)

Our javascript/typescript linter is `eslint`. Rules are :  
- No `any` with TS
- [Props order](https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-sort-props.md) : 
  - Shorthand last
  - Callback just before shorthand
  - Order props alphabetically
  - Reserved props first
- Use PascalCase in components, interfaces, or type aliases
- Prefer conditional rendering with ternary operator or early return
- Carrefully use `&&` because it can lead to `0 bug` https://kentcdodds.com/blog/use-ternaries-rather-than-and-and-in-jsx
- Avoid long list of function arguments (prefer object)
- Use destructuring
- Prefer template literals
- Avoid default export ?
- Avoid curly braces for string props. test="test" 
- Use typescript `as const` for true const
- Code should be descriptive enough to be understood without comments (No TODO / NOTE annotation). Write comment only if not obvious.
- Extract reusable logic into custom hooks
- Handle all possible errors / state (if API state, loading, ...)
- Use shorthand for boolean props `<Form withError />`

Style will be lint by Stylelint
We'll use stylelint to lint styles :
  - inline style should be avoided (exception for animation)
  - [Props order](https://github.com/hudochenkov/stylelint-order)

### Disabled props
Properties `className` and `style` are unexposed, except for Stack and Grid components and generics components.
A set of variant is defined and should be sufficient.

### Styles
We are using `Sass` and `vanilla CSS variables`
> Define variables name

Styles will be scoped with [CSS Modules](https://github.com/css-modules/css-modules).  
Filename is : `styles.module.scss`

### Unit tests
We'll be using [vitest](https://vitest.dev/) and [React testing library](https://testing-library.com/docs/react-testing-library/intro/).  
We'll use the TDD approach.
High Coverage should not be a goal but a side effect of the TDD approach (https://marcgg.com/blog/2015/11/03/code-coverage-vanity-metric/). 
Each bugfix should start with a regression test.
If possible, test accessibility.

#### Perf tests
Measure and check regression over rerender, FPS, payload size, lazy loading if make sense, eventually render time
https://gearheart.io/articles/react-performance-testing-with-jest/
We should also focus on perceived performance (skeleton over loader, avoid layout shift), avoid jank (for example use useDeferredValue for inputs https://beta.reactjs.org/apis/react/useDeferredValue).
Suspense can also help https://beta.reactjs.org/apis/react/Suspense
Follow React performance guidelines https://www.developerway.com/?filter=performance

#### Helpers
Some helpers are available `@gatewatcher/bistoury/utils-tests`. We must use them.

### E2E / Visual tests
Using [cypress](https://www.cypress.io/). Each component will have at least one visual/ Sometime, compent will have e2e tests.
Cypress visual tests are based on storybook.

### Types
Some util types are available in `@gatewatcher/bistoury/utils-types`.
`DataTestId` defines automatically `data-testid`.  
Generic types `TestId` and `TestIds` are use to define `data-testid`.

### Imports
We will be using this syntax to import type :  
`import type { StackProps } from '@gw/skin'`

### React patterns
- Favor Compound Component pattern
- FaaC (Function As Child pattern also known internally by the name "Render pattern")
- Animations with [react spring](https://react-spring.dev/). Transitions will be have a pattern for timing, ease, ...
- Avoid using indexes as key props
- Use fragment instead of adding DOM element
- Avoid huge component
- Avoid prop drilling but prefer local state over global one. If needed, React context should be use to share global state.
- use `useReducer` instead of `useState` when state is complex enough
- Favor composition
- Favor hook pattern
- Define which pattern we want to use for variant (base, one file by variant ?)
- Use `as` pattern when it make sense
- i18n shouldn't be a part of the DS
- define when to forward ref (using `forwardRef`)
- in case of item in list, create a component for item and a parent component (List, Item)
- use `classNames` util form ui-kit to format className
- use MouseEvent and other events from React
https://reactpatterns.com/

### React antipatterns
- Avoid HooC when possible, prefer hooks
- Don't spread props. Types will be extend or all props will be declared.
- Don't use SyntheticEvent 
```ts
type Button = JSX.IntrinsicElements['button'] & {}
```

### Inputs
We are using controlled components if there is no performance issue.

### Issues template (To be defined)

### MR review process
- At least one validation
- Test plan
- Use label `waiting for review` when MR is ready to be reviewed & ping reviewers
Reviewer should review MR as soon as possible (max 24h).

## Component API
We should define consistent component API (To be defined)

## Dependencies
- Focus on minimal dependencies (reduction of attack surface, less maintenance difficulties, better control over code flexibility, quality and security)
- If dependency is minimal prefer forking
- When it make sense to use a dependency, we should add a abstraction layer (exception can be adopted for primitive libs)

# Security
Take care about:
- XSS https://www.stackhawk.com/blog/react-xss-guide-examples-and-prevention/
- CSP violation (appliances use strict CSP rules)
- Open redirect

# Bug avoidance
- Use optional chaining if things can be null (don't trust user input, api data etc)

# Release workflow
- SEMVER is used, changelog is auto generated using lerna.
- CI is responsible for releasing a new version when new commit is merged into master.
