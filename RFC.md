# Main purpose

The main objective of Skin is to work hand to hand with Figma, where Figma will provide interfaces, skin will provide their implementations.

The main idea is to implement design tokens which will make possible to connect a figma component to a skin one.

# Tokens

We can find 3 types of tokens:
- Base: primitive value of the design system
- Generic: variant of use of base
- Specific: contextualisation of generic

This 3 types of tokens will serve as a metronome when splitting our code.
# Implementation

```tsx
// Base
<ButtonBase />
<button>{children}</button>

// Generic
<ButtonIcon />
<ButtonBase>
	<Icon />
</ButtonBase>

// Specific
<ButtonClose />
```

As we can see, the implementation of `ButtonBase` is done with the native html tags, the same that we will found in the browser's DOM.
The implementation of `ButtonIcon` is done with the utilisation of two base components, `ButtonBase` and `Icon`. When assembled they will provide a generic button which display an icon with a button capabilities.
`ButtonClose` is the contextualisation of a `ButtonIcon`.

# Keep in mind

It is entirely possible to integrate several successive layers of the same type to build complex components. That said, it is important to keep the hierarchical order given to not have semantic inconsistency, also to avoid complex maintenance and therefore too expensive.

It is also important to keep in mind when building components that greater the number of layers is, the more complex debugging and maintenance will be.

# Compounds over slot

Two approaches are possible with the structure we saw previously. 

- Slots 
- Compounds 

The slot approach is very flexible because integration constraints are almost non-existent. The main problem that we will encounter in the long term is potentially a lack of coherence between integrations because there is too much freedom.
The constraint must therefore be exercised at the figma level to limit the duplication of almost identical components. 
Lots of generic components and few specific components. 
Therefore involves less code but more maintenance potentially for integration and interaction issues between components.

The compound will be a little less flexible but will make it possible to provide compositions that have been designed to fit perfectly with each other.
The constraint will therefore not be at the level of figma but at the level of the code itself. Indeed for the creation of a new integration it will be necessary to go through the compound development cycle which should limit the number of variants of the same component.
An identical number of generic components with more specific components.
More code but maintenance would potentially be less important because the compounds will have been tested and thought out upstream.

# Nomenclature 

As we have define before, we have 3 types of tokens, Base / Generic / Specific.

- Base will be named with the suffix `Base` like `ButtonBase`.
- Generic are composed component with base's, like `ButtonIcon`.
- Specific are contextualized generic component, like `ButtonClose`.

Base component will never be exposed, it must be wrapped into a Generic. Into this category we will found all the DOM native tags based components.

Generic component must, most of the time, never be exposed.
The reason are multiple but the main one is the maintainability and our capabilities to scale our products without multiple maintainance.

Specific component are exposed, they are composed with generics. Most of the time it will have a main specific component, like a `Table` for example, and this `Table` will have multiple `compounds` with it. It compounds are the main reason why generic component are not exposed, it's because they are aliased here.
The main reason is because we want to keep the control on how the main component are integrated and with what kind of other component. The idea behind is to constrain the product team to reuse the already developped component or to define the contribution of the new component against the cost of its development compared to an already existing component close to the need.

```tsx
// Main specific <Table>
// Specific compounds <Table.Headers> <Table.HeaderCell>
<Table>
	<Table.Headers>
		<Table.HeaderCell />
	</Table.Headers>
</Table>

// Specific Table:
<ListingBatchSelect>
	<ListingEdition>
		<ListingSort>
			<LoadMore>
				<TableContent />
			</LoadMore>
		</ListingSort>
	</ListingEdition>
</ListingBatchSelect>

// Generic TableContent:
<TableContext.Provider>
	<div>
		<Stack>
			<div/>
			<table>
				<Listing />
			</table>
			<div/>
			<animated.div>
				<TableBatchActions />
			</animated.div>
		</Stack>
	</div>
</TableContext.Provider>

// Specific Table.Headers
<thead>
	<tr>{children}</tr>
</thead>

// Specific Table.HeaderCell
<th>
	<Stack>
		<span>{children}</span>
		<Sort />
	</Stack>
</th>
```