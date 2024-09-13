
struct Symbol(String);

struct Role(Symbol);

enum Concept {
    Atomic(Symbol),
    Conjunction(Box<Concept>, Box<Concept>),
    Disjunction(Box<Concept>, Box<Concept>),
    Negation(Box<Concept>),
    Subsumption(Box<Concept>, Box<Concept>),
    Equivalence(Box<Concept>, Box<Concept>),
    ExistentialRestriction(Box<Concept>, Role),
    ValueRestriction(Box<Concept>, Role)
}

struct RoleInstance(Role, Concept, Concept);
