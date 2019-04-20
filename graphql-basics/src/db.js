


let users = [
{ id: "1", name: "deyvid", email: "deyvidyury@gmail.com", age: 34 },
{ id: "2", name: "sara", email: "sara@gmail.com", age: 24 },
{ id: "3", name: "Mike", email: "mike@gmail.com", age: 14 }
];

let posts = [
{
    id: "1",
    title: "Post One",
    body: "This is post one",
    published: true,
    author: "1"
},
{
    id: "2",
    title: "Post Two",
    body: "This is post two",
    published: false,
    author: "1"
},
{
    id: "3",
    title: "Post Three",
    body: "This is post three",
    published: true,
    author: "2"
}
];

let comments = [
{
    id: "1",
    text: "Comment one",
    author: '1',
    post: '1'
},
{
    id: "2",
    text: "Comment two",
    author: '2',
    post: '2'
},
{
    id: "3",
    text: "Comment three",
    author: '3',
    post: '3'
},
{
    id: "4",
    text: "Comment four",
    author: '1',
    post: '3'
},
{
    id: "5",
    text: "Comment five",
    author: '2',
    post: '2'
},
{
    id: "6",
    text: "Comment six",
    author: '3',
    post: '1'
},
]

const db = {
    users,
    posts,
    comments
}

export {db as default}