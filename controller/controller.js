const express = require('express');
const { getAllUsers, getUserByFirstName, insertUser, userChangePassword, deleteUser } = require("../metode");
const validator = require('validator');


const getAll= (req, res) => {

    const useri = getAllUsers();

    res.status(200).json(useri);

};


const getByFirstName=(req, res) => {

    const usern = req.params.firstName;


    if (usern == undefined) {


        res.status(400).json();
    } else {

        const user = getUserByFirstName(usern);

        if (user.length != 0) {

            res.status(200).json(user);
        } else {

            res.status(404).json();
        }
    }
};

const insert=(req, res) => {

   const {firstName,lastName, number,email,password}=req.body;


    if (!firstName ||!lastName || !number ||!email || !password || !validator.isEmail(email) || !validator.isAlphanumeric(firstName) || !validator.isStrongPassword(password)) {
        res.status(400).json("Pogresni podaci!")

    } else {

        const dodat = insertUser(firstName, lastName, number, email, password);

        if (dodat) {

            res.status(201).json("OK");
        } else {


            res.status(401).json("Korisnik već postoji!");
        }

    }
};


const update= (req, res) => {


const {oldpassword,newpassword,firstName}=req.body;

if (!firstName || !oldpassword || !newpassword){
    res.status(400).json("Pogresni podaci!");
}else{

    if (!validator.isStrongPassword(newpassword)){
        res.status(400).json("Slaba sifra!");
    }else{

        const promenjen=userChangePassword(firstName,newpassword,oldpassword);

        if (promenjen){

            const user=getUserByfirstName(firstName);
            res.status(200).json(user);
        }else{

            res.status(400).json("Pogresan firstName ili password!!!!");
        }

    }
}


};



const deleteU= (req, res) => {

    const firstName=req.params.firstName;

    if (!firstName){

        res.status(400).json("Nije obrisano!");
    }
    else{


        const obrisan=deleteUser(firstName);

        if (obrisan){

            res.status(200).json("Obrisano")
        }else{

            res.status(404).json("Nije obrisano!");
        }
    }


};


module.exports={

    getAll,
    getByFirstName,
    deleteU,
    update,
    insert
}