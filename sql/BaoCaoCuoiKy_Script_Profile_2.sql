Create Or Replace Procedure createProfile(
    nameProfile In varchar2 Default 'ProfileName',
    session_per_user In varchar2 Default 'unlimited',
    connect_times In varchar2 Default '60',
    idle_times In varchar2 Default '60'
)
As
    strQuery nvarchar2(2000);
Begin
    strQuery := ('Create Profile ' || nameProfile || ' LIMIT' || 
        ' SESSIONS_PER_USER ' || session_per_user || 
        ' CONNECT_TIME ' || connect_times || 
        ' IDLE_TIME ' || idle_times);
    Execute Immediate strQuery;
End;
/




Create Or Replace Procedure updateProfile_sessionUser(
    nameProfile In varchar2 Default 'ProfileName',
    session_per_user In varchar2 Default ''
)
As
    strQuery nvarchar2(2000);
Begin
    If (Length(session_per_user) > 0) Then
    Begin
        strQuery := ('Alter Profile ' || nameProfile || ' LIMIT' || 
            ' SESSIONS_PER_USER ' || session_per_user);
        Execute Immediate strQuery;
    End;
    End If;
End;
/





Create Or Replace Procedure updateProfile_connectTime(
    nameProfile In varchar2 Default 'ProfileName',
    connect_times In varchar2 Default ''
)
As
    strQuery nvarchar2(2000);
Begin
    If (Length(connect_times) > 0) Then
    Begin
        strQuery := ('Alter Profile ' || nameProfile || ' LIMIT' || 
            ' CONNECT_TIME ' || connect_times);
        Execute Immediate strQuery;
    End;
    End If;
End;
/






Create Or Replace Procedure updateProfile_idleTime(
    nameProfile In varchar2 Default 'ProfileName',
    idle_times In varchar2 Default ''
)
As
    strQuery nvarchar2(2000);
Begin
    If (Length(idle_times) > 0) Then
    Begin
        strQuery := ('Alter Profile ' || nameProfile || ' LIMIT' || 
            ' IDLE_TIME ' || idle_times);
        Execute Immediate strQuery;
    End;
    End If;
End;
/





Create Or Replace Procedure deleteProfile(
    nameProfile In varchar2 Default 'ProfileName'
)
As
    strQuery nvarchar2(2000);
Begin
    strQuery := ('Drop Profile ' || nameProfile || ' CASCADE');
    Execute Immediate strQuery;
End;
/