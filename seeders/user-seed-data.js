const dbUsers = [];
const userNames = [
    'Will',
    'Meyer',
    'Elmer',
    'Caden',
    'Person1',
    'ThisIsAUser',
    'unnamed',
    'disconnected',
    'hacker-u',
    'wisconsinRocks2020',
    'steve jobs',
    'person123'
];
const userEmails = [
    'will@email.com',
    'meyer@email.com',
    'elmer@email.com',
    'caden@email.com',
    'person1@email.com',
    'thisisauser@email123.com',
    'unnamed@unnamed.org',
    'disconnected@thisisanemail.net',
    'hacker.u@hacked.gov',
    'wisconsinrocks@wisc.gov',
    'thisistherealstevenjobs@stevie.com',
    'person123@1234567.com'
];


const randomLetters = [
    'a',
    'b',
    'ads',
    'gf'
]

const randomCity = [
    'Madison',
    'Baraboo',
    'Rock Springs',
    'Delton',
    'Adams',
    'Wisconsin Rapids',
    'Rhinelander',
    'Portage'
]

userNames.forEach( name => {
    dbUsers.push({
        name: name,
        email: userEmails.pop(),
        userLoginId: `${Math.floor(Math.random() * 80)}${randomLetters[Math.floor(Math.random() * randomLetters.length)]}${randomLetters[Math.floor(Math.random() * randomLetters.length)].repeat(Math.floor(Math.random() * 10))}`,
        city: randomCity[Math.floor(Math.random() * randomCity.length)],
        state: 'WI',
        phone: '123-456-7890'
    })
})






module.exports = dbUsers;

// [
//     {
//         name: 'Meyer',
//         email: 'a.email@email.com',
//         userLoginId: 'loginIDSTUFF',
//         state: 'WI',
//         city: "Manitowoc",
//         phone: '123-456-7890'
//     },
//     {
//         name: 'Elmer',
//         email: 'another.email@email.com',
//         userLoginId: '8713576354165asdasf456',
//         city: 'Madison',
//         state: 'WI'
//     },
//     {
//         name: 'Caden',
//         email: 'yet.another.email@email.com',
//         userLoginId: '5a4sd46a4s5d468a',
//         city: 'Chicago'
//     },
//     {
//         name: 'Will',
//         email: 'last@email.com',
//         phone: '555-555-5555',
//         userLoginId: 'qwerty',
//         city: 'Sauk City',
//         state: 'WI'
//     }
// ]