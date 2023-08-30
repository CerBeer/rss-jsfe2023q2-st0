
const bpl_books = [
    {id: '01', season: 'Winter', name: 'The Book Eaters', author: 'Sunyi Dean'},
    {id: '02', season: 'Winter', name: 'Cackle', author: 'Rachel Harrison'},
    {id: '03', season: 'Winter', name: 'Dante: Poet of the Secular World', author: 'Erich Auerbach'},
    {id: '04', season: 'Winter', name: 'The Last Queen', author: 'Clive Irving'},
    {id: '05', season: 'Spring', name: 'The Body', author: 'Stephen King'},
    {id: '06', season: 'Spring', name: 'Carry: A Memoir of Survival on Stolen Land', author: 'Toni Jenson'},
    {id: '07', season: 'Spring', name: 'Days of Distraction', author: 'Alexandra Chang'},
    {id: '08', season: 'Spring', name: 'Dominicana', author: 'Angie Cruz'},
    {id: '09', season: 'Summer', name: 'Crude: A Memoir', author: 'Pablo Fajardo & ​​Sophie Tardy-Joubert'},
    {id: '10', season: 'Summer', name: 'Let My People Go Surfing', author: 'Yvon Chouinard'},
    {id: '11', season: 'Summer', name: 'The Octopus Museum: Poems', author: 'Brenda Shaughnessy'},
    {id: '12', season: 'Summer', name: 'Shark Dialogues: A Novel', author: 'Kiana Davenport'},
    {id: '13', season: 'Autumn', name: 'Casual Conversation', author: 'Renia White'},
    {id: '14', season: 'Autumn', name: 'The Great Fire', author: 'Lou Ureneck'},
    {id: '15', season: 'Autumn', name: 'Rickey: The Life and Legend', author: 'Howard Bryant'},
    {id: '16', season: 'Autumn', name: 'Slug: And Other Stories', author: 'Megan Milks'},
];

let registeredUsers = new Map();
let authorizedUser = '';

function getEmptyUser() {
    let emptyUser = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        cardId: '',
        books: ''
    }
    return emptyUser;
}