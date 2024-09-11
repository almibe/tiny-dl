import { List, Set } from "immutable";
import { aB } from "vitest/dist/chunks/reporters.C_zwCd4j.js";

export type Symbol = string
export type Statement = List<Symbol>
export type Statements = Set<Statement>

export const SubConcept = "⊑"

export function infer(tBox: Statements, aBox: Statements): Statements {
    let results: Statements = Set()
    tBox.forEach((rule) => {
        if (rule.get(1) == SubConcept) {
            const subConcept = rule.get(0)
            const concept = rule.get(2) as string
            aBox.forEach(statement => {
                if (statement.get(1) == ":" && statement.get(2) == subConcept) {
                    results = results.add(List([statement.get(0) as string, ":", concept]))
                }
            })
        } else {
            throw "Unknown Rule! " + rule.get(1)
        }
    })
    return results.union(aBox)
}
