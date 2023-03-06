/// <reference types="cypress" />

describe('Test suite', () =>{

    describe('Deafult tags tests', () =>{
        it('Verify that the tags box contains the default tags "node" and "javascript"', () =>{
            cy.visit('/')
            cy.get('.content').should('contain','node')
            cy.get('.content').should('contain','javascript')
        })
    
        it('Verify that with deafult tags, onlt 8 tags remaining', () =>{
            cy.visit('/')
            cy.get('.details').should('contain','8')
        })
    
    })
    
    describe('Tags Insertion tests', () =>{
        it('Verify that the user can insert a tag by pressing the enter key', () =>{
            cy.visit('/')
            cy.get('.content').find('input').type('Python{enter}')
            cy.get('.content').should('contain','Python')
        })

        it('Verify that the user can insert multiple tags by adding a comma after each tag name', () =>{
            cy.visit('/')
            cy.get('.content').find('input').type('Java, Git, React, Linux{enter}')
            cy.get('.content').should('contain','Java').and('contain','Git').and('contain','React').and('contain','Linux')
        })

        it('Verify that the tags length should be more than one character - Single insert', () =>{
            cy.visit('/')
            cy.get('.content').find('input').type('J{enter}')
            cy.get('.content').should('not.contain','J')
        })

        it('Verify that the tags length should be more than one character - Multi insert', () =>{
            cy.visit('/')
            cy.get('.content').find('input').type('Java, Git, React, Linux,J{enter}')
            cy.get('.content').should('not.contain','J')
        })

        it('Verify that the tags should not be duplicated - Single insert', () =>{
            cy.visit('/')
            cy.get('.content').find('input').type('node{enter}')
            cy.get('.content').get('li:contains(node)').should('have.length', 1)
        })

        it('Verify that the tags should not be duplicated - Multi insert', () =>{
            cy.visit('/')
            cy.get('.content').find('input').type('Java, node, node, node,javascript{enter}')
            cy.get('.content').get('li:contains(node)').should('have.length', 1)
        })

        it('Verify that the maximum number of tags in the tags box is 10 - single insert', () =>{
            cy.visit('/')
            var genArr = Array.from({length:10},(v,k)=>k+1)
            cy.wrap(genArr).each((index) => {
                cy.get('.content').find('input').type('Java'+index+'{enter}')
            })
            cy.get('.details').should('contain','0')
            cy.get('.content').get('li').should('have.length', 10)

        })

        it('Verify that the maximum number of tags in the tags box is 10 - Multi insert', () =>{
            cy.visit('/')
            cy.get('.content').find('input').type('Java1,Java2,Java3,Java4,Java5,Java6,Java7,Java8,Java9,Java10{enter}')
            cy.get('.details').should('contain','0')
            cy.get('.content').get('li').should('have.length', 10)
        })

        it('Verify that the remaining tags indication updates after inserting a new tag', () =>{
            cy.visit('/')
            cy.get('.content').find('input').type('React{enter}')
            cy.get('.details').should('contain','7')
            cy.get('.content').find('input').type('Java, Git, Mongo, Linux{enter}')
            cy.get('.details').should('contain','3')
        })
    })

    describe('Tags Deletion tests', () =>{
        it('Verify that the user can delete a deafult tag by clicking on the remove icon', () =>{
            cy.visit('/')
            cy.get('.content').get('li:contains(node)').find('.uit').click()
            cy.get('.content').should('not.contain','node')
            cy.get('.details').should('contain','9')
        })

        it('Verify that the user can delete a tag after insertation', () =>{
            cy.visit('/')
            cy.get('.content').find('input').type('Python{enter}')
            cy.get('.details').should('contain','7')
            cy.get('.content').get('li:contains(Python)').find('.uit').click()
            cy.get('.content').should('not.contain','Python')
            cy.get('.details').should('contain','8')
        })

        it('Verify that the "Remove All" button removes all the tags from the tags box - Deafult', () =>{
            cy.visit('/')
            cy.get('.details button').click()
            cy.get('.content').get('li').should('have.length', 0)
            cy.get('.details').should('contain','10')
        })

        it('Verify that the "Remove All" button removes all the tags from the tags box - After insertation', () =>{
            cy.visit('/')
            cy.get('.content').find('input').type('Java1,Java2,Java3,Java4,Java5,Java6,Java7, Java8{enter}')
            cy.get('.details').should('contain','0')
            cy.get('.details button').click()
            cy.get('.content').get('li').should('have.length', 0)
            cy.get('.details').should('contain','10')
        })

        

    })

    
})
