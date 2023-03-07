# Tags-input-tests

This repository contains automated tests for a tag input field on this . The tests are written using the Cypress test automation framework.

## Installation
Before running the tests, make sure you have Node.js and npm installed. Then, clone the repository and install the dependencies by running:

git clone https://github.com/rachelalpern/Tags-input-tests.git

Install the required packages using npm install.

Start the Cypress Test Runner using npm run cy:open.

## Execution
To execute the tests, simply run npm run cy:run.

This will run all the tests in headless mode and generate the results in the terminal.

## Test Scenarios
The tests cover the following scenarios:

### Default tags tests
Verify that the tags box contains the default tags "node" and "javascript".

Verify that with default tags, only 8 tags remaining.
### Tags Insertion tests
Verify that the user can insert a tag by pressing the enter key.

Verify that the user can insert multiple tags by adding a comma after each tag name.

Verify that the tags length should be more than one character - Single insert.

Verify that the tags length should be more than one character - Multi insert.

Verify that the tags should not be duplicated - Single insert.

Verify that the tags should not be duplicated - Multi insert.

Verify that the maximum number of tags in the tags box is 10 - Single insert.

Verify that the maximum number of tags in the tags box is 10 - Multi insert.

Verify that the remaining tags indication updates after inserting a new tag.

### Tags Deletion tests
Verify that the user can delete a default tag by clicking on the remove icon.

Verify that the user can delete a tag after insertion.

Verify that the "Remove All" button removes all the tags from the tags box - Default.

Verify that the "Remove All" button removes all the tags from the tags box - After insertion.
