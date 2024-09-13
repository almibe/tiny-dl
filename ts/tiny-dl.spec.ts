import { expect, test } from 'vitest'
import { infer, individual, subsumes, equalivant, conjuction } from './tiny-dl.ts'
import { Set } from 'immutable'

test('basic infer', () => {
    const aBox = Set([individual("betty", "Cat")])
    const tBox = Set([subsumes("Animal", "Cat")])

    expect(infer(tBox, aBox)).toEqual(Set([
        individual("betty", "Cat"),
        individual("betty", "Animal")
    ]))
})

test('extented infer', () => {
    const aBox = Set([individual("betty", "Cat")])
    const tBox = Set([
        subsumes("Vetebrate", "Cat"),
        subsumes("Animal", "Vetebrate"),
    ])

    expect(infer(tBox, aBox)).toEqual(Set([
        individual("betty", "Cat"),
        individual("betty", "Animal"),
        individual("betty", "Vetebrate")
    ]))
})

test('equivalency', () => {
    const aBox = Set([individual("betty", "HouseCat")])
    const tBox = Set([
        equalivant("HouseCat", "DomesticCat")
    ])

    expect(infer(tBox, aBox)).toEqual(Set([
        individual("betty", "HouseCat"),
        individual("betty", "DomesticCat"),
    ]))
})

test('equivalency flipped', () => {
    const aBox = Set([individual("betty", "HouseCat")])
    const tBox = Set([
        equalivant("DomesticCat", "HouseCat"),
    ])

    expect(infer(tBox, aBox)).toEqual(Set([
        individual("betty", "HouseCat"),
        individual("betty", "DomesticCat"),
    ]))
})

test('concept intersection', () => {
    const aBox = Set([individual("betty", "Spayed")])
    const tBox = Set([
        equalivant("Spayed", conjuction("Female", "Fixed")),
    ])

    expect(infer(tBox, aBox)).toEqual(Set([
        individual("betty", "Spayed"),
        individual("betty", "Female"),
        individual("betty", "Fixed")
    ]))
})
