const { users } = require("./users");

const uuid = require("uuid");


const getAllUsers = () => {

    return users;
}


const getUserByFirstName = (firstName) => {

    const vratiUsera = users.filter(user => user.firstName === firstName)[0];

    return vratiUsera;


}


const insertUser = (firstName, lastName, number, email, password) => {

    const user = {

        id: uuid.v4(),
        firstName,
        lastName,
        number,
        email,
        password,
        status: 'active'
    }
    const proveri = getUserByFirstName(firstName);

    if (proveri != null) {

        return false;
    }

    users.push(user);


    return true;


}


const userChangePassword = (firstName, newp, oldp) => {


    const user = users.find(elem => elem.firstName === firstName && elem.password===oldp);

    if (!user) {
        return false;
    }

    user.password = newp;
    return true;

}


const deleteUser=(firstName)=>{

    const userindex=users.findIndex(elem=> elem.firstName===firstName);

    if (userindex===-1){

        return false;
    }

    users.splice(userindex,1);
    return true;
}

module.exports = {

 getAllUsers, getUserByFirstName, insertUser,userChangePassword,deleteUser
}



