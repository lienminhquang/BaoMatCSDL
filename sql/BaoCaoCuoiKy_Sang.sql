--pro create use--
CREATE OR REPLACE PROCEDURE CREATE_USER(PUSERNAME IN VARCHAR2,PPASSWORD IN VARCHAR2,PDEAFAULT_TABLESPACE IN VARCHAR2 
,PTEMPORARY_TABLESSPACE IN VARCHAR2 ,PQUOTA IN VARCHAR2)
AS
    strQuery1 nvarchar2(200);
    strQuery2 nvarchar2(200);
BEGIN
    strQuery1 := ('CREATE USER '||PUSERNAME||' IDENTIFIED BY '||PPASSWORD|| ' TEMPORARY TABLESPACE '||PTEMPORARY_TABLESSPACE||
    ' DEFAULT TABLESPACE '||PDEAFAULT_TABLESPACE||' QUOTA '||PQUOTA|| ' ON USERS');
    EXECUTE IMMEDIATE ( strQuery1 );
END ;






--View priviliage of user
Select * From DBA_SYS_PRIVS Where grantee='AA';
--View role of user
Select * From DBA_ROLE_PRIVS where grantee = 'AA';
--View profile
Select profile, resource_name, limit From DBA_PROFILES Where profile='TESTPROFILE';
--View info user (admin)
Select * From DBA_USERS;
--View info user (user)
Select * From DBA_USERS Where Username=USER;









--PROC DELETE USER--
CREATE OR REPLACE PROCEDURE DELETE_USER(PUSERNAME IN VARCHAR2)
AS
    strQuery nvarchar2(200);
BEGIN
    strQuery := ('DROP USER '||PUSERNAME);
    EXECUTE IMMEDIATE ( strQuery );
END ;





Select only_user('USER_MANAGER')From dual;
drop PROCEDURE only_user;

--policy user chỉ xem được thông tin của mình
Create Or Replace Function Only_User(
	p_schema In Varchar2 Default Null,
	p_object In Varchar2 Default Null
)
Return Varchar2
As
	c_user Varchar2(100);
Begin
	c_user := USER;
	If (c_user = 'USER_MANAGER') Then
		Begin
			Return '1=1';
		End;
	Else
		Begin
			Return 'USERNAME = user';
		End;
	End If;
	Exception When Others Then Return '1=0';
End;
/
BEGIN 
DBMS_RLS.add_policy 
(object_schema     => 'USER_MANAGER', 
object_name        => 'USERS',
policy_name        => 'p_Only_Users', 
function_schema    => 'USER_MANAGER',
policy_function    => 'Only_User', 
statement_types    => 'SELECT'); 
END; 

--kiểm tra quyền trước khi thực hiện
Create Or Replace Function Check_Priv(
	priv in varchar2 default null
)
Return number
As
	c_user Varchar2(100);
    c_check number;
    c_countpriv number;
Begin
	c_user := user;
	select needtocheck into c_check from sys_privileges where name=priv;
    if(c_check = 0) then
        return 1;
    Else
		Begin
			Select count(*) into c_countpriv From DBA_SYS_PRIVS Where grantee=c_user and privilege=priv;
            if(c_countpriv = 1) then
                return 1;
            else
                return 0;
            end if;
		End;
	End If;
End;


select needtocheck from sys_privileges where name='CREATE SESSION';
Select count(*) From DBA_SYS_PRIVS Where grantee='USER_MANAGER' and privilege='CREATE SESSION';

select Check_Priv('CREATE SESSION') from SYS.dual ;