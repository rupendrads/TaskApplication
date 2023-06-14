export interface iTask {
    id: number,
    title: string|undefined,
    status: string|undefined
}

export class Task implements iTask
{
    public id: number = -1;
    public title: string|undefined = undefined;
    public status: string|undefined = undefined;

    constructor(id: number, title: string, status: string){
        this.id = id;
        this.title = title;
        this.status = status;
    }
}