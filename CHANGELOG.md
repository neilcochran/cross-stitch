## Version 1.1.2

-   Add keywords to package.json

## Version 1.1.1

-   Add installation instructions to README.md
-   Update LICENSE.md copyright year to 2024

## Version 1.1.0

-   Renamed PatternColor -> Color
-   Added validateCrossStitchPattern which performs all available validations on the given pattern
-   Add various supporting validations
-   Validation methods take more specific parameters, instead of always taking the whole pattern
-   All pattern `Properties` attributes are now required (other than `notes` which is still optional)

## Version 1.0.0

-   First full release!
-   Bug fix: jsonToModel() was not parsing ThreeQuarterStitches correctly
-   TypeDoc was not generated for 0.5.1, it is updated in this version

## Version 0.5.1

-   Replace README.md relative image links with full image links so that github pages can also render them

## Version 0.5.0

-   Separate validation from model objects
-   Added pattern stitch totals (by stitch type as well as color)
-   Calculate pattern totals and pattern dimensions

## Version 0.4.1

-   Add validation & tests for enums & type aliases that previously accepted invalid values at runtime in jsonToModel()

## Version 0.4.0

-   Add validations
-   Add unit tests

## Version 0.3.1

-   Remove DMC-Floss.ts which was merged into utility.ts

## Version 0.3.0

-   Add Floss Brand support
-   Add all DMC floss colors as pre defined constants
-   Rename and refactor other various schema elements

## Version 0.2.1

-   Add TSDoc for `validation.ts` functions.
-   Add TSDoc for `utility.ts` functions.
-   Update generated documentation

## Version 0.2.0

-   Create JSON schema definitions and documentation
-   Create TypeScript models with constructor validation
-   Adds the first set of exported validation and utility functions

## Version 0.1.0

-   Create initial project structure using `mk-ts-app`
