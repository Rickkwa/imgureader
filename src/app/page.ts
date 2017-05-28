export class Page {
    id: string;
    link: string;
    size: number;
    width: number;
    height: number;

    constructor(id, link, size, width, height) {
        this.id = id;
        this.link = link;
        this.size = size;
        this.width = width;
        this.height = height;
    }
}
