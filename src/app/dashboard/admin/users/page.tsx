import { getUsers } from '@/lib/api/users';
import React from 'react';

const AdminUsersPage =async () => {

    const users = await getUsers()
    

    return (
        <div>
            
        </div>
    );
};

export default AdminUsersPage;