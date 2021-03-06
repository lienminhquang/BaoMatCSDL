--pro create user--
CREATE OR REPLACE PROCEDURE CREATE_USER(PUSERNAME IN VARCHAR2,PPASSWORD IN VARCHAR2,PDEAFAULT_TABLESPACE IN VARCHAR2 
,PTEMPORARY_TABLESSPACE IN VARCHAR2 ,PQUOTA IN VARCHAR2,PROLE IN VARCHAR2)
AS
    strQuery1 nvarchar2(200);
    strQuery2 nvarchar2(200);
BEGIN
    strQuery := ('CREATE USER '||PUSERNAME||' IDENTIFIED BY '||PPASSWORD|| ' TEMPORARY TABLESPACE '||PTEMPORARY_TABLESSPACE||
    ' DEFAULT TABLESPACE '||PDEAFAULT_TABLESPACE||' QUOTA '||PQUOTA|| ' ON USERS');
    EXECUTE IMMEDIATE ( strQuery );
    strquery2 := ('GRANT '||PROLE|| ' TO '||PUSERNAME );
    EXECUTE IMMEDIATE ( strQuery2 );
END ;


DROP PROCEDURE CREATE_USER;
DROP USER AA;
EXECUTE CREATE_USER('aa','123','USERS','TEMP','500M')
--PROC DELETE USER--
CREATE OR REPLACE PROCEDURE DELETE_USER(PUSERNAME IN VARCHAR2)
AS
    strQuery nvarchar2(200);
BEGIN
    strQuery := ('DROP USER '||PUSERNAME);
    EXECUTE IMMEDIATE ( strQuery );
END ;
DROP PROCEDURE DELETE_USER;
EXECUTE DELETE_USER('AA')
--TAO ROLE C-U-I-D--
CREATE ROLE CUIDROLE;
GRANT DELETE ANY TABLE TO CUIDROLE
GRANT CREATE ANY TABLE TO CUIDROLE
GRANT INSERT ANY TABLE TO CUIDROLE
GRANT UPDATE ANY TABLE TO CUIDROLE
--TAO ROLE DANG NHAP--
CREATE ROLE LOGINROLE;
GRANT CREATE SESSION TO LOGINROLE;
--TAO ROLE VOI QUYEN DBA
CREATE ROLE DBAROLE;
GRANT DBA TO DBAROLE;