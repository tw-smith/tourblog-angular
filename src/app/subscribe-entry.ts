export class SubscribeFormEntry {
    constructor (
        public email: string,
        public password: string,
        public repeatPassword: string,
    ) {}
}

export class SubscribeResponse{
    constructor (
        public data: any //TODO make this type checking more specific
    ) {}
}