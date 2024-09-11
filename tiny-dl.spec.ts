import { expect, test } from 'vitest'
import { infer, Statements, SubConcept } from './tiny-dl.ts'
import { List, Set } from 'immutable'

test('basic infer', () => {
    const aBox: Statements = Set([List(["betty", ":", "Cat"])])
    const tBox: Statements = Set([List(["Cat", SubConcept, "Animal"])])

    expect(infer(tBox, aBox)).toEqual(Set([
        List(["betty", ":", "Cat"]),
        List(["betty", ":", "Animal"])
    ]))
})
