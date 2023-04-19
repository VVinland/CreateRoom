class User {
    constructor() {
        this.users = [];
    }

    addUser(id, name, room) {
        const user = { id, name, room }
        this.users.push(user)
        return user;
    }

    getUserList(room) {
        const users = this.users.filter(function (user) {
            return user.room === room;
        })
        const namesArray = users.map(function (user) {
            return user.name;
        })

        return namesArray;
    }

    getUser(id){
        return this.users.filter(function(user){
            return user.id === id;
        })[0]
    }

    removeUser(id){
        const user = this.getUser(id);

        if(user){
            this.users = this.users.filter(function(user){
                return user.id !== id;
            })
        }

        return user;
    }

}

export {
    User
}