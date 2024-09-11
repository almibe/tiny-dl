import { List, Set } from "immutable";

export type Symbol = string
export type Statement = List<Symbol>
export type Statements = Set<Statement>

export const Equalivant = "≡"
export const Subsumption = "⊑"
export const IsA = ":"

export function infer(tBox: Statements, aBox: Statements): Statements {
    let results: Statements = Set()
    let lastResults: undefined | Statements = undefined
    let workingABox = aBox
    while (results != lastResults) {
        tBox.forEach((rule) => {
            if (rule.get(1) == Subsumption) {
                const subConcept = rule.get(0)
                const concept = rule.get(2) as string
                workingABox.forEach(statement => {
                    if (statement.get(1) == IsA && statement.get(2) == subConcept) {
                        results = results.add(List([statement.get(0) as string, IsA, concept]))
                    }
                })
            } else if (rule.get(1) == Equalivant) {
                const left = rule.get(0) as string
                const right = rule.get(2) as string
                workingABox.forEach(statement => {
                    if (statement.get(1) == IsA && statement.get(2) == left) {
                        results = results.add(List([statement.get(0) as string, IsA, right]))
                    } else if (statement.get(1) == IsA && statement.get(2) == right) {
                        results = results.add(List([statement.get(0) as string, IsA, left]))
                    }
                })
            } else {
                throw "Unknown Rule! " + rule.get(1)
            }   
            lastResults = results;
            workingABox = results.union(workingABox);
        })
    }
    return results.union(workingABox)
}
