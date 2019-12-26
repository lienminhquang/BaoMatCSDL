create table sys_privileges (id Number, name varchar(255), needtocheck number, constraint pk primary key (id));
insert into user_manager.sys_privileges values(1, 'CREATE PROFILE', 1);
insert into user_manager.sys_privileges values(2, 'ALTER PROFILE', 1);
insert into user_manager.sys_privileges values(3, 'DROP PROFILE', 1);
insert into user_manager.sys_privileges values(4, 'CREATE ROLE', 1);
insert into user_manager.sys_privileges values(5, 'ALTER ANY ROLE', 1);
insert into user_manager.sys_privileges values(6, 'DROP ANY ROLE', 1);
insert into user_manager.sys_privileges values(7, 'GRANT ANY ROLE', 1);
insert into user_manager.sys_privileges values(8, 'CREATE SESSION', 1);
insert into user_manager.sys_privileges values(9, 'CREATE ANY TABLE', 0);
insert into user_manager.sys_privileges values(10, 'ALTER ANY TABLE', 0);
insert into user_manager.sys_privileges values(12, 'DROP ANY TABLE', 0);
insert into user_manager.sys_privileges values(13, 'SELECT ANY TABLE', 1);
insert into user_manager.sys_privileges values(14, 'DELETE ANY TABLE', 0);
insert into user_manager.sys_privileges values(15, 'INSERT ANY TABLE', 0);
insert into user_manager.sys_privileges values(16, 'UPDATE ANY TABLE', 0);
insert into user_manager.sys_privileges values(17, 'CREATE TABLE', 0);
insert into user_manager.sys_privileges values(18, 'CREATE USER', 1);
insert into user_manager.sys_privileges values(19, 'ALTER USER', 1);
insert into user_manager.sys_privileges values(20, 'DROP TABLE', 1);


create table obj_privileges (id number, name varchar(255), object_name varchar(255), column_row number, needtocheck number, constraint pk primary key (id)); -- 1: column, 0: table
insert into user_manager.obj_privileges values(1, 'SELECT', 'USERS', 0, 1);
insert into user_manager.obj_privileges values(2, 'INSERT', 'USERS', 0, 0);
insert into user_manager.obj_privileges values(3, 'DELETE', 'USERS', 0, 0);
insert into user_manager.obj_privileges values(4, 'SELECT', 'USERS', 0, 1);
insert into user_manager.obj_privileges values(5, 'INSERT', 'USERS', 0, 0);

Create Or Replace Function Only_User(
	p_schema In Varchar2 Default Null,
	p_object In Varchar2 Default Null
)
Return Varchar2
As
	c_user Varchar2(100);
Begin
	c_user := user;
	If (c_user = 'User_Manager') Then
		Begin
			Return '1=1';
		End
	Else
		Begin
			Return 'Username = user';
		End;
	End If;
	Exception When Other Then Return '1=0';
End;
/



SELECT * FROM ROLE_TAB_PRIVS where OWNER = 'USER_MANAGER';




