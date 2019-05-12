
export interface Game {
    _id: string;
    teamHome: string;
    teamVisitor: string;
    score: {
        home: number,
        visitor: number
    };
}

export class GameObj {
    _id: string;
    teamHome: string;
    teamVisitor: string;
    score: {
        home: number,
        visitor: number
    };

    constructor(data: any) {
        this._id = data._id || '';
        this.teamHome = data.teamHome || '';
        this.teamVisitor = data.teamVisitor || '';
        this.score = data.score || {
            home: 0,
            visitor: 0
        };
    }

    getLabel() {
        if (this.teamHome && this.teamVisitor)
            return this.teamHome + ' vs ' + this.teamVisitor;
        return '';
    }
}
