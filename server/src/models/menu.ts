export class Menu {
    constructor(
        public id: number,
        public name: string,
        public subMenus: Menu[]
    ) {}
}
