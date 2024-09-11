import { expect, test } from 'vitest'
import { infer, Statements, Subsumption, IsA, Equalivant } from './tiny-dl.ts'
import { List, Set } from 'immutable'

test('basic infer', () => {
    const aBox: Statements = Set([List(["betty", IsA, "Cat"])])
    const tBox: Statements = Set([List(["Cat", Subsumption, "Animal"])])

    expect(infer(tBox, aBox)).toEqual(Set([
        List(["betty", IsA, "Cat"]),
        List(["betty", IsA, "Animal"])
    ]))
})

test('extented infer', () => {
    const aBox: Statements = Set([List(["betty", IsA, "Cat"])])
    const tBox: Statements = Set([
        List(["Cat", Subsumption, "Vetebrate"]),
        List(["Vetebrate", Subsumption, "Animal"]),
    ])

    expect(infer(tBox, aBox)).toEqual(Set([
        List(["betty", IsA, "Cat"]),
        List(["betty", IsA, "Animal"]),
        List(["betty", IsA, "Vetebrate"])
    ]))
})

test('equivalency', () => {
    const aBox: Statements = Set([List(["betty", IsA, "HouseCat"])])
    const tBox: Statements = Set([
        List(["HouseCat", Equalivant, "DomesticCat"]),
    ])

    expect(infer(tBox, aBox)).toEqual(Set([
        List(["betty", IsA, "HouseCat"]),
        List(["betty", IsA, "DomesticCat"]),
    ]))
})

test('equivalency flipped', () => {
    const aBox: Statements = Set([List(["betty", IsA, "HouseCat"])])
    const tBox: Statements = Set([
        List(["DomesticCat", Equalivant, "HouseCat"]),
    ])

    expect(infer(tBox, aBox)).toEqual(Set([
        List(["betty", IsA, "HouseCat"]),
        List(["betty", IsA, "DomesticCat"]),
    ]))
})
