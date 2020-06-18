import React from 'react';


const UserCard = ({user}) => {
    return (
        <div>
            {user.map(u => (
                <div key={u.id}>
                    <h2>{u.name}</h2>
                    <h3>{u.email}</h3>
                </div>
            ))}
        </div>
    )
}

export default UserCard;