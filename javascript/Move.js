class Move {
    constructor(type,square,square_to,attacker,defender,attacker_destroyed,defender_destroyed) {
        this.type = type;
        this.square = square;
        this.square_to = square_to;
        this.attacker = attacker;
        this.defender = defender;
        this.attacker_destroyed = attacker_destroyed;
        this.defender_destroyed = defender_destroyed;
    }
}

