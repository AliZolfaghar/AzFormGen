# AzFormGen
Form Generator with express and svelte 5 



/**

token : 
{
    userid : uuid , 
    displayName 
    roles 
    acls 
}

header : authorization : bearer <TOKEN>

200 
{ token : '' } 

400,500 
{ message : 'error message' }

axios => response | response.data.message

*/



/*

knex migrate:make create_users_table
knex migrate:latest
knex migrate:rollback
knex migrate:latest --env production

*/

