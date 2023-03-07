/// <reference types="cypress" />
import _ from "lodash";

describe('Test suite', () =>{
    const defaultTags = ['node', 'javascript']
    const maxTags = 10
    const enter = '{enter}'
    const tags = ['Java', 'Git', 'React', 'Linux', 'Python', 'C++','C', 'Bitbuckt', 'ios', 'Android', 'Go', 'Perl', 'Redux']
    const singleChar = '$'
    var tagListCount = 2

    beforeEach(() => {
        cy.visit('/')
        tagListCount = 2
    })

    describe('Deafult tags tests', () =>{
        it('Verify that the tags box contains the default tags "node" and "javascript"', () =>{
            defaultTags.forEach((tag) => {
                getTagsBox().should('contain', tag)
            })
        })
    
        it('Verify that with deafult tags, only 8 tags remaining', () =>{
            const remainingTags = maxTags - defaultTags.length
            getDetails().should('contain',remainingTags)
        })
    
    })

    describe('Tags Insertion tests', () =>{
        it('Verify that the user can insert a tag by pressing the enter key', () =>{
            const tagToAdd = _.sample(tags)
            getTagsBox().find('input').type(`${tagToAdd}${enter}`)
            getTagsBox().should('contain',tagToAdd)
        })

        it('Verify that the user can insert multiple tags by adding a comma after each tag name', () =>{
            const tagsToAdd = _.sampleSize(tags,maxTags/2)
            getTagsBox().find('input').type(tagsToAdd.join()+enter)
            for(let i=0; i < tagsToAdd.length; i++)
            {
                getTagsBox().should('contain',tagsToAdd[i])
            }
        })

        it('Verify that the tags length should be more than one character - Single insert', () =>{
            getTagsBox().find('input').type(singleChar+enter)
            getTagsBox().should('not.contain',singleChar)
        })

        it('Verify that the tags length should be more than one character - Multi insert', () =>{
            const tagsToAdd = _.sampleSize(tags,maxTags/2) + singleChar
            getTagsBox().find('input').type(tagsToAdd.join()+enter)
            getTagsBox().should('not.contain',singleChar)
        })

        it('Verify that the tags should not be duplicated - Single insert', () =>{
            const dup = _.sample(defaultTags)
            getTagsBox().find('input').type(dup+enter)
            getTagsBox().get(`li:contains(${dup})`).should('have.length', 1)
        })

        it('Verify that the tags should not be duplicated - Multi insert', () =>{
            var tagsToAdd = _.sampleSize(tags,maxTags/2)
            const dup = _.sample(tagsToAdd)
            tagsToAdd.push(dup)
            getTagsBox().find('input').type(tagsToAdd.join()+enter)
            getTagsBox().get(`li:contains(${dup})`).should('have.length', 1)
        })

        it('Verify that the maximum number of tags in the tags box is 10 - single insert', () =>{
            var genArr = Array.from({length:maxTags},(v,k)=>k+1)
            cy.wrap(genArr).each((index) => {
                getTagsBox().find('input').type(_.sample(tags)+index+enter)
            })
            getDetails().should('contain','0')
            getTagsBox().get('li').should('have.length', maxTags)

        })

        it('Verify that the maximum number of tags in the tags box is 10 - Multi insert', () =>{
            const tagsToAdd = _.sampleSize(tags,maxTags)
            getTagsBox().find('input').type(tagsToAdd.join()+enter)
            getDetails().should('contain','0')
            getTagsBox().get('li').should('have.length', maxTags)
        })

        it('Verify that the remaining tags indication updates after inserting a new tag', () =>{
            getTagsBox().find('input').type(_.sample(tags)+enter)
            tagListCount++
            getDetails().should('contain',maxTags-tagListCount)
            const tagsToAdd = _.sampleSize(tags,maxTags/2)
            tagListCount = tagListCount + tagsToAdd.length
            getTagsBox().find('input').type(tagsToAdd.join()+enter)
            getDetails().should('contain',maxTags-tagListCount)
        })
    })

    describe('Tags Deletion tests', () =>{
        it('Verify that the user can delete a deafult tag by clicking on the remove icon', () =>{
            const tag = _.sample(defaultTags)

            getTagsBox().get(`li:contains(${tag})`).find('.uit').click()
            tagListCount--
            getTagsBox().should('not.contain',tag)
            getDetails().should('contain',maxTags-tagListCount)
        })

        it('Verify that the user can delete a tag after insertation', () =>{
            const tag = _.sample(tags)
            getTagsBox().find('input').type(tag+enter)
            tagListCount++
            getDetails().should('contain',maxTags-tagListCount)
            getTagsBox().get(`li:contains(${tag})`).find('.uit').click()
            tagListCount--
            getTagsBox().should('not.contain',tag)
            getDetails().should('contain',maxTags-tagListCount)
        })

        it('Verify that the "Remove All" button removes all the tags from the tags box - Deafult', () =>{
            cy.get('.details button').click()
            getTagsBox().get('li').should('have.length', 0)
            getDetails().should('contain',maxTags)
        })

        it('Verify that the "Remove All" button removes all the tags from the tags box - After insertation', () =>{
            const tagsToAdd = _.sampleSize(tags,maxTags-defaultTags.length)
            getTagsBox().find('input').type(tagsToAdd.join()+enter)
            getDetails().should('contain','0')
            cy.get('.details button').click()
            getTagsBox().get('li').should('have.length', 0)
            getDetails().should('contain',maxTags)
        })
    })
})

function getTagsBox(){
    return cy.get('.content')
}

function getDetails(){
    return  cy.get('.details')

}
