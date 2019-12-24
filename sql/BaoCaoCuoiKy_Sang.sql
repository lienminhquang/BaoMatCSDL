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