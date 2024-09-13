import { Set } from "immutable";

export type Symbol = string

type AtomicConcept = Symbol

type Concept = AtomicConcept | Disjuction | Conjuction | Equivalence | Not | Subsumption

type Role = Symbol

export type Subsumption = {subsumee: Concept, subsumer: Concept}

export function subsumes(subsumer: Concept, subsumee: Concept): Subsumption {
    return {subsumee: subsumee, subsumer: subsumer}
}

export type Equivalence = {left: Concept, right: Concept, relation: "equalivant"}

export function equalivant(left: Concept, right: Concept): Equivalence {
    return {left: left, right: right, relation: "equalivant"}
}

export type Not = { concept: Concept, relation: "not"}

export function not(concept: Concept): Not {
    return { concept: concept, relation: "not"}
}

export type Conjuction = { left: Concept, right: Concept, relation: "conjunction" }

export function conjuction(left: Concept, right: Concept): Conjuction {
    return { left: left, right: right, relation: "conjunction" }
}

export type Disjuction = { left: Concept, right: Concept, kind: "disjunction" }

export function disjuction(left: Concept, right: Concept): Disjuction {
    return { left: left, right: right, kind: "disjunction" }
}

export type ExistentialRestriction = { concept: Concept, role: Role, kind: "existentialRestriction" }

export function existentialRestriction(concept: Concept, role: Role): ExistentialRestriction {
    return { concept: concept, role: role, kind: "existentialRestriction" }
}

export type ValueRestriction = { concept: Concept, role: Role, kind: "valueRestriction" }

export function valueRestriction(concept: Concept, role: Role): ValueRestriction {
    return { concept: concept, role: role, kind: "valueRestriction" }
}

export type Individual = {individual: Symbol, concept: Concept } 

export function individual(symbol: Symbol, concept: Concept): Individual {
    return {individual: symbol, concept: concept }
}

export type RoleInstance = { role: Role, left: Concept, right: Concept }

export function roleInstance(role: Role, left: Concept, right: Concept): RoleInstance {
    return { role: role, left: left, right: right }
}

export type ABox = Set<Individual | RoleInstance>

export type TBox = Set<Concept>

export function infer(tBox: TBox, aBox: ABox): ABox {
    let results = Set()
    let lastResults: undefined | Set<Individual> = undefined
    let workingABox = aBox
    while (results != lastResults) {
        tBox.forEach((rule) => {
            if (rule.subsumee && rule.subsumer) {
                const subConcept = rule.subsumee
                const concept = rule.subsumer
                workingABox.forEach(ind => {
                    if (ind.individual && ind.concept == subConcept) {
                        results = results.add(individual(ind.individual, concept))
                    }
                })
            } else if (rule.relation == "equalivant") {
                const left = rule.left
                const right = rule.right
                workingABox.forEach(ind => {
                    if (ind.concept == left) {
                        results = results.add(individual(ind.individual, right))
                    } else if (ind.concept == right) {
                        results = results.add(individual(ind.individual, left))
                    }
                })
            }
            lastResults = results;
            workingABox = results.union(workingABox);
        })
    }
    return results.union(workingABox)
}
