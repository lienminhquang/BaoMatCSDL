-- Create Object of your table
Create Type TABLE_RES_OBJ As Object(
     userName varchar(255),
     email varchar(255),
     `name` varchar(255),
     address varchar(255)
);

--Create a type of your object 
Create Type TABLE_RES As Table Of TABLE_RES_OBJ;
/


Create Or Replace Function findUser(
    userName In varchar
)
Return TABLE_RES
As
    resultTable TABLE_RES;
Begin
    Insert Into resultTable(userName, email, `name`, address)
        Select userName, email, `name`, address From `users` Where `user`.userName = userName;
    Return resultTable;
End;
/
